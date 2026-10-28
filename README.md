# Rafael Espinosa — QA Engineer Portfolio

A one-page portfolio built with React and Vite. It includes a Python + Playwright test suite that tests the site itself.

## Run it locally

You need Node.js 20.19 or newer.

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Project structure

```
rafael-portfolio/
├─ index.html
├─ vite.config.js            # base: "./" so the build works on any host or sub-path
├─ public/                   # files served as-is (favicon, resume PDF, screenshots)
├─ src/
│  ├─ main.jsx               # entry point (loads global.css first)
│  ├─ App.jsx                # page layout: the list of sections
│  ├─ styles/global.css      # colour tokens, buttons, tags, shared layout
│  ├─ components/            # one component (+ its CSS) per section
│  ├─ data/                  # ALL editable content lives here
│  │  ├─ profile.js          # name, intro, links, About text, resume file
│  │  ├─ skills.js           # skill groups and levels
│  │  ├─ experience.js       # job entry and education
│  │  ├─ projects.js         # project cards and filter categories
│  │  ├─ bugs.js             # sample bug reports
│  │  ├─ testCases.js        # sample test cases
│  │  ├─ automation.js       # Automation section (reads the real test files)
│  │  └─ workflow.js         # QA workflow steps
│  └─ lib/                   # small helpers (syntax highlighter, resume link)
└─ automation/               # pytest + Playwright tests for this site
   ├─ requirements.txt
   ├─ pytest.ini
   └─ tests/
```

## Updating your content

You only need to edit the files in `src/data/`; the components read from them. Each file starts with a comment explaining its fields.

| To change | Edit | Notes |
|---|---|---|
| Name, intro, email, GitHub, LinkedIn, About text | `profile.js` | |
| Skills | `skills.js` | Set `level` to `"hands-on"`, `"learning"` or `"confirm"`. Change `"confirm"` once a skill is confirmed. |
| Job responsibilities | `experience.js` | Set `confirmed: true` on each line you've checked; delete any that don't apply. Unconfirmed lines show a "To confirm" tag. |
| Education | `experience.js` → `education` | Fill in `institution`, `graduation`, set `degreeConfirmed: true`. Placeholders show until then. |
| Projects | `projects.js` | `kind` must be `"real"`, `"practice"` or `"demo"`, so cards are honestly labelled. Add `repoUrl` to show a Repository button. |
| Project screenshots | `public/projects/` + `projects.js` | Add `{ src: "projects/file.png", alt: "..." }` to `screenshots`. Only use approved, sanitized images. |
| Bug reports / test cases | `bugs.js`, `testCases.js` | Keep them fictional or sanitized — no internal company data. |
| Automation repo link and results | `automation.js` | Set `repoUrl` once it's on GitHub. Only fill in `lastRun` with a result you actually ran. |

## Adding your resume

1. Save your resume as a PDF in `public/`, for example `public/Rafael-Espinosa-Resume.pdf`.
2. In `src/data/profile.js`, set `resumeFile: "Rafael-Espinosa-Resume.pdf"`.
3. Rebuild. The "Request my resume" email links become "Download resume" buttons.

Until a file is set, the site never shows a download button that leads nowhere.

## Running the automation tests

```bash
# terminal 1 — project root
npm run build
npm run preview

# terminal 2
cd automation
python -m venv .venv
.venv\Scripts\activate          # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium
pytest
```

The tests cover navigation links, the mobile menu, project filters, the details dialog and contact links. Every test also fails if the page logs a console error.

## Deploying

The build is a static site in `dist/`, so any static host works.

**Vercel or Netlify (easiest):** push the repo to GitHub, import it on vercel.com or netlify.com, and use:

- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` then redeploys automatically.

**GitHub Pages:** run `npm run build` and publish the `dist/` folder (for example with the `gh-pages` package or a GitHub Actions Pages workflow). No config change is needed because `vite.config.js` uses relative paths.
