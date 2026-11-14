#!/usr/bin/env node
// Holt die Doku der Adapter (docs/<lang>/ im Adapter-Repo) und legt sie unter docs/[de/]adapter/<id>/ ab.
// Die Adapter-Repos bleiben die einzige Quelle; hier wird nichts von Hand gepflegt.
//
//   node scripts/sync-adapters.mjs            -> aus GitHub (Branch laut adapters.config.json)
//   node scripts/sync-adapters.mjs --local    -> aus den Nachbar-Ordnern (localPath), z. B. ../ioBroker.wled
//   ADAPTER_REF_WLED=feature/x node ...       -> anderen Branch/Tag für einen Adapter
//
// Was beim Kopieren passiert (gleiche Regeln wie bei der Migration, siehe scripts/lib/normalize.mjs):
//   - Zahlen-Präfixe fallen aus Ordnern/Dateien weg und werden zu `order` im Frontmatter (Sidebar-Reihenfolge)
//   - README.md wird index.md, relative Links werden passend umgeschrieben
//   - Frontmatter bekommt `editLink` auf die Originaldatei im Adapter-Repo
//   - Platzhalter wie <Einheit> außerhalb von Code werden als Text maskiert (sonst bricht der Vue-Build ab)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { escapeStrayTags, normalizeRelPath, orderOf, rewriteLinks, rewriteUrl, withFrontmatter } from './lib/normalize.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'adapters.config.json'), 'utf8'));
const useLocal = process.argv.includes('--local');
const docsRoot = path.join(root, 'docs');
const manifest = { generatedAt: new Date().toISOString(), adapters: {} };

function git(args, cwd) {
    return execFileSync('git', args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
}

/** Liefert { dir, ref, commit } mit dem ausgecheckten docs-Ordner oder null. */
function fetchSource(a) {
    const envRef = process.env[`ADAPTER_REF_${a.id.toUpperCase().replace(/-/g, '_')}`];
    if (useLocal) {
        const repoDir = path.resolve(root, a.localPath);
        const dir = path.join(repoDir, a.docsDir);
        if (!fs.existsSync(dir)) return null;
        let ref = 'local', commit;
        try {
            ref = git(['rev-parse', '--abbrev-ref', 'HEAD'], repoDir);
            commit = git(['rev-parse', '--short', 'HEAD'], repoDir);
        } catch {}
        return { dir, ref, commit };
    }
    const ref = envRef || a.branch;
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `docs-${a.id}-`));
    try {
        git(['clone', '--depth', '1', '--filter=blob:none', '--sparse', '--branch', ref, `https://github.com/${a.repo}.git`, tmp]);
        git(['sparse-checkout', 'set', a.docsDir], tmp);
        const dir = path.join(tmp, a.docsDir);
        if (!fs.existsSync(dir)) return null;
        return { dir, ref, commit: git(['rev-parse', '--short', 'HEAD'], tmp) };
    } catch (e) {
        console.warn(`  ! ${a.repo}@${ref} nicht erreichbar: ${e.stderr?.toString().trim() || e.message}`);
        return null;
    }
}

/**
 * Links, die den Sprachordner verlassen: in eine andere Sprache -> deren Seite auf dieser Website,
 * aus docs/ heraus (README, Code …) -> Datei auf GitHub. Alles andere: normale Umschreibung.
 */
function resolveLink(a, fromDir, url) {
    const [, p, rest] = /^([^#?]*)(.*)$/.exec(url);
    if (!p) return undefined;
    const target = path.posix.normalize(path.posix.join(fromDir, p)); // relativ zur Repo-Wurzel
    const docsPrefix = `${a.docsDir}/`;
    const lang = cfg.languages.find(l => target === `${docsPrefix}${l}` || target.startsWith(`${docsPrefix}${l}/`));
    if (lang) {
        if (fromDir === `${docsPrefix}${lang}` || fromDir.startsWith(`${docsPrefix}${lang}/`)) return undefined; // gleiche Sprache
        const inner = target.slice(`${docsPrefix}${lang}`.length).replace(/^\//, '');
        const site = `${lang === 'en' ? '/' : `/${lang}/`}adapter/${a.id}/`;
        return site + rewriteUrl(inner || './').replace(/^\.\//, '') + rest;
    }
    if (!target.startsWith(docsPrefix)) {
        const kind = p.endsWith('/') ? 'tree' : 'blob';
        return `https://github.com/${a.repo}/${kind}/${a.branch}/${target.replace(/^\.\/?/, '')}${rest}`;
    }
    return undefined;
}

function copyTree(a, srcDir, destDir, editBase, dirOrder) {
    let pages = 0;
    for (const e of fs.readdirSync(srcDir, { withFileTypes: true })) {
        const src = path.join(srcDir, e.name);
        const dest = path.join(destDir, normalizeRelPath(e.name));
        if (e.isDirectory()) {
            pages += copyTree(a, src, dest, `${editBase}/${e.name}`, orderOf(e.name));
            continue;
        }
        fs.mkdirSync(destDir, { recursive: true });
        if (!e.name.endsWith('.md')) {
            fs.copyFileSync(src, dest);
            continue;
        }
        const fromDir = path.posix.dirname(`${editBase}/${e.name}`); // z. B. docs/de/01.erste-schritte
        let md = escapeStrayTags(rewriteLinks(fs.readFileSync(src, 'utf8'), url => resolveLink(a, fromDir, url)));
        md = withFrontmatter(md, {
            // Inhaltsseite eines Ordners übernimmt dessen Präfix (01.erste-schritte/README.md -> order 1)
            order: /^readme\.md$/i.test(e.name) ? dirOrder : orderOf(e.name),
            adapter: a.id,
            editLink: `https://github.com/${a.repo}/edit/${a.branch}/${editBase}/${e.name}`,
        });
        fs.writeFileSync(dest, md);
        pages++;
    }
    return pages;
}

function placeholder(a, lang, otherLangs) {
    const de = lang === 'de';
    const other = otherLangs.map(l => `- [${l === 'de' ? 'Deutsch' : 'English'}](${l === 'en' ? '/' : `/${l}/`}adapter/${a.id}/)`).join('\n');
    return withFrontmatter(
        `# ${a.name}\n\n${a.description?.[lang] ?? ''}\n\n> [!NOTE]\n> ${
            de
                ? `Die Dokumentation für ${a.name} entsteht gerade im [Adapter-Repository](https://github.com/${a.repo}) und erscheint hier automatisch.`
                : `The documentation for ${a.name} is being written in the [adapter repository](https://github.com/${a.repo}) and will appear here automatically.`
        }\n${other ? `\n${de ? 'Verfügbar in:' : 'Available in:'}\n\n${other}\n` : ''}`,
        { adapter: a.id, generated: true, editLink: false },
    );
}

for (const a of cfg.adapters) {
    console.log(`• ${a.name} (${useLocal ? a.localPath : a.repo})`);
    const src = fetchSource(a);
    const done = {};
    for (const lang of cfg.languages) {
        const dest = path.join(docsRoot, lang === 'en' ? '' : lang, 'adapter', a.id);
        fs.rmSync(dest, { recursive: true, force: true });
        const langDir = src && path.join(src.dir, lang);
        if (langDir && fs.existsSync(langDir)) {
            done[lang] = copyTree(a, langDir, dest, `${a.docsDir}/${lang}`);
            console.log(`  ${lang}: ${done[lang]} Seiten (${src.ref}${src.commit ? ` @ ${src.commit}` : ''})`);
        }
    }
    for (const lang of cfg.languages) {
        if (done[lang]) continue;
        const dest = path.join(docsRoot, lang === 'en' ? '' : lang, 'adapter', a.id);
        fs.mkdirSync(dest, { recursive: true });
        fs.writeFileSync(path.join(dest, 'index.md'), placeholder(a, lang, Object.keys(done)));
        console.log(`  ${lang}: noch keine Doku, Platzhalter angelegt`);
    }
    manifest.adapters[a.id] = { ref: src?.ref, commit: src?.commit, languages: Object.keys(done) };
}

fs.mkdirSync(path.join(docsRoot, '.vitepress', 'generated'), { recursive: true });
fs.writeFileSync(path.join(docsRoot, '.vitepress', 'generated', 'adapters.json'), JSON.stringify(manifest, null, 2) + '\n');
