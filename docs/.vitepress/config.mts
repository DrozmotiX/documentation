import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'
import { adapterNav, sidebarFor } from './sidebar.mts'

export default defineConfig({
  title: 'DrozmotiX-OSS',
  cleanUrls: true,
  lastUpdated: true,
  // Platzhalter "ToDo"-Seiten und Adapter-Dokus enthalten noch Links, die erst später Ziele bekommen.
  ignoreDeadLinks: 'localhostLinks',

  // "Mein Setup" ist vorerst ausgeblendet: wird später auf ein eigenes Docker-Konzept umgebaut.
  // Die Seiten bleiben in docs/setup und docs/de/setup liegen; zum Einblenden diese Zeile entfernen
  // und die Nav-Einträge "My Setup"/"Mein Setup" sowie die Sidebar in sidebar.mts wieder aktivieren.
  srcExclude: ['setup/**', 'de/setup/**'],

  head: [['meta', { name: 'theme-color', content: '#3eaf7c' }]],

  markdown: {
    // Die Adapter-Dokus sind für GitHub geschrieben: GitHub-Alerts (> [!NOTE]) werden als Hinweisboxen dargestellt.
    gfmAlerts: true,
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: 'We love to share and hope this site helps you build your personal smart home solution',
      themeConfig: {
        nav: [
          { text: 'Overview', link: '/overview/' },
          { text: 'Adapter', items: [{ text: 'All adapters', link: '/adapter/' }, ...adapterNav('en')] },
          { text: 'Support me', link: 'https://paypal.me/DutchmanNL' },
        ],
        sidebar: sidebarFor('en'),
        editLink: { pattern: editLink, text: 'Help us improve this page on GitHub' },
      },
    },
    de: {
      label: 'Deutsch',
      lang: 'de-DE',
      link: '/de/',
      description: 'Wir teilen unser Wissen und hoffen, dass diese Seite dir bei deiner Smart-Home-Lösung hilft',
      themeConfig: {
        nav: [
          { text: 'Übersicht', link: '/de/overview/' },
          { text: 'Adapter', items: [{ text: 'Alle Adapter', link: '/de/adapter/' }, ...adapterNav('de')] },
          { text: 'Unterstütze mich', link: 'https://paypal.me/DutchmanNL' },
        ],
        sidebar: sidebarFor('de'),
        editLink: { pattern: editLink, text: 'Diese Seite auf GitHub verbessern' },
        outline: { label: 'Auf dieser Seite', level: [2, 3] },
        docFooter: { prev: 'Zurück', next: 'Weiter' },
        lastUpdated: { text: 'Zuletzt aktualisiert' },
        darkModeSwitchLabel: 'Darstellung',
        sidebarMenuLabel: 'Menü',
        returnToTopLabel: 'Nach oben',
        langMenuLabel: 'Sprache',
      },
    },
  },

  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/DrozmotiX' }],
    outline: { level: [2, 3] },
    footer: {
      message: 'Knowledge has no value unless you use and share it',
      copyright: 'Made by Rafal Drozda · MIT License',
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          de: {
            translations: {
              button: { buttonText: 'Suchen', buttonAriaLabel: 'Suchen' },
              modal: {
                noResultsText: 'Keine Ergebnisse für',
                resetButtonTitle: 'Suche zurücksetzen',
                footer: { selectText: 'auswählen', navigateText: 'navigieren', closeText: 'schließen' },
              },
            },
          },
        },
      },
    },
  },

  // Alte VuePress-URLs (/languages/<lang>/...) auf die neuen Seiten weiterleiten.
  buildEnd({ outDir }) {
    const redirects: Record<string, string> = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../../redirects.json'), 'utf8'),
    )
    for (const [from, to] of Object.entries(redirects)) {
      const file = path.join(outDir, from.endsWith('/') ? `${from}index.html` : from)
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(
        file,
        `<!doctype html><meta charset="utf-8"><title>Redirect</title><link rel="canonical" href="${to}"><meta http-equiv="refresh" content="0; url=${to}"><a href="${to}">${to}</a>\n`,
      )
    }
  },
})

/**
 * Seiten aus Adapter-Repos verlinken auf ihre Originaldatei, alle anderen auf dieses Repo.
 * Achtung: VitePress schickt diese Funktion als Text in den Browser, sie darf nichts von außen verwenden.
 */
function editLink(page: { filePath: string; frontmatter: Record<string, any> }) {
  return page.frontmatter.editLink ?? `https://github.com/DrozmotiX/documentation/edit/main/docs/${page.filePath}`
}
