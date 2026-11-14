# DrozmotiX-OSS | OpenSource support for SmartHome Solutions

We love to share and hope this site will help you find your way in realising your personal Smart Home solution.
The site is published at [https://drozmotix.github.io](https://drozmotix.github.io).

## How it works

The site is built with [VitePress](https://vitepress.dev). It combines two kinds of content:

| Content | Where it lives | Edit it in |
|---|---|---|
| Overview, "My Setup", older adapter pages (ESPHome, Tado, Klipper-Moonraker) | `docs/` (English) and `docs/de/` (German) in this repository | this repository |
| Adapter documentation for **SourceAnalytix** and **WLED** | `docs/<lang>/` in each adapter repository | the adapter repository |

Adapter documentation is **never copied by hand**. On every build, `scripts/sync-adapters.mjs` fetches `docs/de` and `docs/en`
from the repositories listed in [`adapters.config.json`](adapters.config.json) and places them under `docs/[de/]adapter/<id>/`.
These folders are git-ignored. While an adapter has no docs yet, a short placeholder page is generated instead.

During the sync, files are mapped to clean URLs:

- number prefixes are dropped and become the sidebar order (`01.erste-schritte/02.erster-zaehler.md` → `/de/adapter/sourceanalytix/erste-schritte/erster-zaehler`)
- `README.md` becomes the folder's start page, relative links are rewritten to match
- "Edit this page" links point to the original file in the adapter repository

So adapter docs should use plain GitHub Markdown (GitHub alerts like `> [!NOTE]`, relative links to `.md` files, numbered folders with a `README.md`), which then looks the same on GitHub and on this site.

Sidebar and the "Adapter" menu are generated from the folder structure (`docs/.vitepress/sidebar.mts`).
Old VuePress URLs (`/languages/<lang>/...`) redirect to the new pages via [`redirects.json`](redirects.json).

## Local development

```bash
npm install
npm run dev          # uses the adapter repos next to this folder (../ioBroker.sourceanalytix, ../ioBroker.wled)
npm run dev:remote   # fetches adapter docs from GitHub instead
npm run build        # production build into docs/.vitepress/dist
```

To preview another branch of an adapter: `ADAPTER_REF_WLED=my-branch npm run dev:remote`.

## Adding an adapter

1. Add an entry to [`adapters.config.json`](adapters.config.json) (`id`, `name`, `repo`, `branch`, `localPath`).
2. Add its generated folders to `.gitignore`.
3. Optional: copy [`.github/adapter-docs-trigger.example.yml`](.github/adapter-docs-trigger.example.yml) into the adapter repo so a change in its `docs/` rebuilds this site right away (otherwise the nightly build picks it up).

## Deployment

[`.github/workflows/build-deploy.yml`](.github/workflows/build-deploy.yml) builds on every push to `main`, on demand, nightly and when an adapter repository signals a docs change, and pushes the result to [DrozmotiX/DrozmotiX.github.io](https://github.com/DrozmotiX/DrozmotiX.github.io). It needs a deploy key as secret `PAGES_DEPLOY_KEY` (setup steps are in the workflow file).

## Contributing

Every page has an "edit this page" link at the bottom. For pages coming from an adapter, the link opens the file in that adapter's repository.
For larger changes, fork this repository (or the adapter repository) and open a pull request. If you can, provide your changes in EN & DE; if not, we still welcome your PR and will handle the translation.

If you would like to support this OSS project in another way, we accept donations to buy products supporting our development activities  
[![Donate](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Examples of behavior that contributes to creating a positive environment include:**

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

**Examples of unacceptable behavior by participants include:**
* The use of sexualized language or imagery and unwelcome sexual attention or advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a professional setting
* Our Responsibilities

Contributors are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Contributors have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at oss@DrozmotiX.eu. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Contributors who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.