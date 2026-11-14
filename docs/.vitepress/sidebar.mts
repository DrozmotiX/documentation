// Baut Navigation und Sidebar aus der Ordnerstruktur unter docs/.
// Reihenfolge: `order` im Frontmatter (stammt aus den Zahlen-Präfixen), danach Titel.
// Titel: `title` im Frontmatter, sonst die erste #-Überschrift, sonst der Dateiname.
import fs from 'node:fs'
import path from 'node:path'
import type { DefaultTheme } from 'vitepress'

export const DOCS = path.resolve(__dirname, '..')

interface Page {
  title: string
  order: number
}

function readPage(file: string): Page {
  const src = fs.readFileSync(file, 'utf8')
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src)?.[1] ?? ''
  const get = (k: string) => {
    const v = new RegExp(`^${k}:\\s*(.+)$`, 'm').exec(fm)?.[1]?.trim()
    if (!v) return undefined
    try { return JSON.parse(v) } catch { return v.replace(/^['"]|['"]$/g, '') }
  }
  const h1 = /^#\s+(.+)$/m.exec(src.replace(/^---[\s\S]*?---/, ''))?.[1]
  return {
    title: String(get('title') ?? h1 ?? path.basename(file, '.md')).replace(/[`*_]/g, '').trim(),
    order: Number(get('order') ?? 999),
  }
}

/** Ordner -> Sidebar-Einträge (rekursiv). */
function itemsFor(dir: string, url: string, depth = 0): DefaultTheme.SidebarItem[] {
  if (!fs.existsSync(dir)) return []
  const entries: (DefaultTheme.SidebarItem & { _o: number })[] = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'img' || e.name === 'public') continue
    const abs = path.join(dir, e.name)
    if (e.isDirectory()) {
      const index = path.join(abs, 'index.md')
      const meta = fs.existsSync(index) ? readPage(index) : { title: e.name, order: 999 }
      entries.push({
        text: meta.title,
        link: fs.existsSync(index) ? `${url}${e.name}/` : undefined,
        collapsed: depth > 0 ? true : false,
        items: itemsFor(abs, `${url}${e.name}/`, depth + 1),
        _o: meta.order,
      })
    } else if (e.name.endsWith('.md') && e.name !== 'index.md') {
      const meta = readPage(abs)
      entries.push({ text: meta.title, link: `${url}${e.name.slice(0, -3)}`, _o: meta.order })
    }
  }
  return entries
    .sort((a, b) => a._o - b._o || String(a.text).localeCompare(String(b.text)))
    .map(({ _o, ...item }) => item)
}

/** Ein Abschnitt (z. B. /setup/) als eine Sidebar-Gruppe mit Startseite. */
function section(lang: string, name: string, collapsedChildren = false): DefaultTheme.SidebarItem[] {
  const base = lang === 'en' ? '' : `${lang}/`
  const dir = path.join(DOCS, base, name)
  const index = path.join(dir, 'index.md')
  const meta = fs.existsSync(index) ? readPage(index) : { title: name }
  const items = itemsFor(dir, `/${base}${name}/`)
  if (collapsedChildren) items.forEach(i => i.items && (i.collapsed = true))
  if (name === 'adapter') {
    // Adapter immer unter ihrem Namen und alphabetisch, egal wie die Startseite heißt
    for (const i of items) {
      const id = i.link!.split('/').filter(Boolean).pop()!
      i.text = adapterName(id, path.join(dir, id, 'index.md'))
    }
    items.sort((a, b) => String(a.text).localeCompare(String(b.text)))
  }
  return [{ text: meta.title, link: `/${base}${name}/`, items }]
}

export function sidebarFor(lang: string): DefaultTheme.SidebarMulti {
  const base = lang === 'en' ? '/' : `/${lang}/`
  return {
    [`${base}overview/`]: section(lang, 'overview'),
    [`${base}setup/`]: section(lang, 'setup'),
    [`${base}adapter/`]: section(lang, 'adapter', true),
  }
}

/** Adapter-Liste für das Nav-Menü: alle Unterordner von docs/[lang/]adapter. */
export function adapterNav(lang: string): DefaultTheme.NavItemWithLink[] {
  const base = lang === 'en' ? '' : `${lang}/`
  const dir = path.join(DOCS, base, 'adapter')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory() && fs.existsSync(path.join(dir, e.name, 'index.md')))
    .map(e => ({ text: adapterName(e.name, path.join(dir, e.name, 'index.md')), link: `/${base}adapter/${e.name}/` }))
    .sort((a, b) => a.text.localeCompare(b.text))
}

const cfg = JSON.parse(fs.readFileSync(path.resolve(DOCS, '../adapters.config.json'), 'utf8'))
const LOCAL_NAMES: Record<string, string> = { esphome: 'ESPHome', tado: 'Tado', 'klipper-moonraker': 'Klipper-Moonraker' }
function adapterName(id: string, index: string) {
  return (
    cfg.adapters.find((a: { id: string }) => a.id === id)?.name ??
    LOCAL_NAMES[id] ??
    readPage(index).title.replace(/^ioBroker\./, '')
  )
}
