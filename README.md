# Ryanna Jelks — Portfolio

A personal portfolio showcasing UX/UI design, human-centered computing, and community leadership. Built with HTML, CSS, and JavaScript, with a pastel visual style and interactive project navigation.

**[Visit the portfolio](https://ryannacjelks.github.io/Ryanna-website/)** · **[See All Work](https://ryannacjelks.github.io/Ryanna-website/work.html)**

## Features

- **Interactive idea board:** arrange three project cards by dragging, or click a card to open its project description. Each card is a native button with keyboard support; reduced-motion and pause controls are respected.
- **Stacked featured folders:** Twitch, Meta, and Unity Hub slide over one another during scrolling. The angled tabs navigate between projects.
- **All Work gallery:** a responsive two-column project index with description dialogs and project-specific icons.
- **Project resources:** presentation PDFs and Figma links are available inside the project dialogs.
- **Technical skills carousel:** computer skills, coding skills, and certificates, with swipe, arrow-button, and keyboard navigation.
- **About and leadership sections:** portrait, “people first.” sticker, education, and campus leadership experience.
- **Resume access:** view or download the latest PDF from the homepage.
- **Accessibility features:** skip link, visible focus styles, native dialogs, motion controls, reduced-motion support, and print styles.

## Projects

| Project | Context | Date |
| --- | --- | --- |
| Community Climb | Twitch Design Challenge winner; mobile Hype Train experience | September–October 2026 |
| Where Plans Go to Die? | Meta Design Challenge; event planning and individual RSVPs in messaging | August–September 2026 |
| Unity Hub | Inclusive campus app prototype for Indiana University | August–November 2024 |
| Accenture North America | Product Design Job Simulation through Forage | December 2024 |

Accenture is a learning simulation, not employment. Twitch and Meta previews are illustrations based on the Figma designs; Unity Hub displays original Figma screens. The original design and presentation links remain available in the project dialogs.

## Run locally

From the repository root, start a static server with Python 3:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) for the homepage or [http://localhost:8000/work.html](http://localhost:8000/work.html) for the gallery.

No package installation or build step is required. The site runs without WebGL or a 3D engine. A local server is recommended when previewing pages and assets.

## Source files

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage, featured folders, about, leadership, skills, and contact |
| `work.html` | All Work gallery |
| `style.css` | Shared layout, responsive styling, illustrations, and accessibility styles |
| `app.js` | Shared project data, dialogs, icons, folder navigation, and skills carousel |
| `images/` | Portrait, original Unity Hub screens, and project illustrations |
| `ryanna-jelks-resume.pdf` | Current downloadable resume |
| `P2T5_Twitch.pdf` | Twitch presentation |
| `P1T5_Meta.pdf` | Meta presentation |
| `Thesis defense (1).pdf` | Unity Hub presentation |

## Update content

### Resume

1. Replace `ryanna-jelks-resume.pdf` with the corrected PDF, keeping the filename.
2. Update the three resume links in `index.html` with a new `?v=` value so browsers load the replacement.
3. Update any affected roles, dates, education, skills, or project descriptions separately. Replacing the PDF does not update the page text.

### Projects and resources

- Edit featured summaries and role lists in `index.html`.
- Edit gallery cards in `work.html`.
- Edit the shared `data` object in `app.js` for dialog titles, roles, descriptions, highlights, notes, and resource links.
- Keep project IDs consistent across the HTML buttons, `app.js`, and the idea-board buttons in `index.html`.
- Put new visual assets in `images/` and provide descriptive alternative text.
- Keep presentation and Figma links inside the dialogs.

When changing shared CSS or JavaScript, refresh the relevant `?v=` values in **both HTML pages** to avoid stale browser caches.

## Deploy and verify

The site is hosted on GitHub Pages. Changes committed and pushed to `main` trigger the **pages build and deployment** workflow.

After publishing:

- Confirm the deployment succeeded in the repository’s **Actions** tab.
- Check both the homepage and All Work gallery.
- Verify project dialogs, Figma and PDF links, resume downloads, folder navigation, and the skills carousel.
- Check a narrow screen layout and keyboard navigation.
