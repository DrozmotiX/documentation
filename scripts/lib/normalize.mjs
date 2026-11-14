// Gemeinsame Regeln, wie Ordner/Dateien aus Markdown-Quellen auf URLs abgebildet werden.
// Gilt für die einmalige Migration der alten VuePress-Seiten und für den Sync der Adapter-Dokus.
//   01.erste-schritte/README.md  ->  erste-schritte/index.md   (order 1)
//   02.BareMetal.md              ->  bare-metal.md             (order 2)
import path from 'node:path';

const ORDER_PREFIX = /^(\d+)[._-]/;

/** Reihenfolge aus dem Zahlen-Präfix (01., 02_ …), sonst undefined. */
export function orderOf(name) {
    const m = ORDER_PREFIX.exec(name);
    return m ? Number(m[1]) : undefined;
}

/** Ein Pfadsegment normalisieren: Präfix weg, README -> index, klein, Leerzeichen -> "-". */
export function normalizeSegment(seg) {
    if (seg === '.' || seg === '..' || seg === '') return seg;
    const s = seg.replace(ORDER_PREFIX, '');
    if (/^readme\.md$/i.test(s)) return 'index.md';
    return s.replace(/\s+/g, '-').replace(/^[_-]+/, '').toLowerCase();
}

export function normalizeRelPath(rel) {
    return rel.split(/[\\/]/).map(normalizeSegment).join('/');
}

const isRelative = url => url && !/^([a-z][a-z0-9+.-]*:|\/\/|\/|#|mailto:)/i.test(url);

/** Relativen Link umschreiben; externe Links, absolute Pfade und Anker bleiben unverändert. */
export function rewriteUrl(url) {
    if (!isRelative(url)) return url;
    const m = /^([^#?]*)(.*)$/.exec(url);
    let p = normalizeRelPath(m[1]);
    // ".../index.md" -> ".../" damit Links auf Inhaltsseiten sauber aussehen
    p = p.replace(/(^|\/)index\.md$/, '$1') || './';
    return p + m[2];
}

/** Alle Markdown- und HTML-Links/Bilder in einem Dokument umschreiben (Codeblöcke bleiben unberührt). */
export function rewriteLinks(md) {
    const parts = md.split(/(^```[\s\S]*?^```|^~~~[\s\S]*?^~~~)/m);
    return parts
        .map((chunk, i) => {
            if (i % 2 === 1) return chunk; // Codeblock
            return chunk
                .replace(/(\]\()(<?)([^)\s>]+)(>?)/g, (_, a, lt, url, gt) => a + lt + rewriteUrl(url) + gt)
                .replace(/^(\[[^\]]+\]:\s*)(\S+)/gm, (_, a, url) => a + rewriteUrl(url))
                .replace(/(\s(?:src|href)=["'])([^"']+)(["'])/g, (_, a, url, b) => a + rewriteUrl(url) + b);
        })
        .join('');
}

/** Frontmatter-Felder setzen/ergänzen (einfaches YAML, nur flache Werte). */
export function withFrontmatter(md, fields) {
    let body = md;
    let existing = '';
    const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(md);
    if (m) {
        existing = m[1];
        body = md.slice(m[0].length);
    }
    const lines = existing ? existing.split(/\r?\n/) : [];
    for (const [k, v] of Object.entries(fields)) {
        if (v === undefined) continue;
        const idx = lines.findIndex(l => l.startsWith(`${k}:`));
        const line = `${k}: ${JSON.stringify(v)}`;
        if (idx >= 0) lines[idx] = line;
        else lines.push(line);
    }
    if (!lines.length) return body;
    return `---\n${lines.join('\n')}\n---\n\n${body.replace(/^\s+/, '')}`;
}
