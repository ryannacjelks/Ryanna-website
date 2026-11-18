# Ryanna Jelks — Portfolio

A personal portfolio showcasing UX/UI design, human-centered computing, and community leadership. Built with HTML, CSS, and JavaScript, with a pastel visual style and interactive project navigation.

**[Visit the portfolio](https://ryannacjelks.github.io/Ryanna-website/)** · **[See All Work](https://ryannacjelks.github.io/Ryanna-website/work.html)**

## Features

- **Interactive cork bulletin board:** a textured cork surface, wooden frame, pastel project notes, and star, heart, and flower thumbtacks. On desktop, drag notes to arrange them or click to open a project description. Narrow screens show the notes vertically, and touch input scrolls the page instead of dragging notes. Each note is a native button with keyboard support. Dragging does not open the description.
- **Consistent project colors:** pinned notes, thumbtacks, featured folders, and project description backgrounds share each project’s palette.
- **Board details:** the drag-and-click instruction sits inside the bottom-right corner; “MOVE AN IDEA. MAKE A CONNECTION.” is centered underneath the board.
- **Stacked featured folders:** Twitch, Meta, and Unity Hub slide over one another during scrolling. On narrow screens, folders use normal vertical scrolling so their content stays readable. The persistent angled tabs navigate between projects. Each folder presents the title, date, role, focus, summary, highlights, and an Open Project button.
- **All Work gallery:** a responsive two-column project index with description dialogs and project-specific icons.
- **Project resources:** presentation PDFs and Figma links are available inside the project dialogs.
- **Technical skills carousel:** computer skills, coding skills, and certificates, with swipe, arrow-button, and keyboard navigation.
- **About and leadership sections:** portrait, “people first.” sticker, education, and campus leadership experience.
- **Resume access:** view or download the latest PDF from the homepage.
- **Email contact options:** “Email me” expands to offer the visitor’s email app, Gmail, Outlook, and a copy-address button. The address is also available in a read-only field for manual copying.
- **Accessibility features:** skip link, visible focus styles, keyboard-operated project buttons and dialogs, readable labels, generous controls, scrollable dialogs, reduced-motion support, forced-color focus styles, and print styles.

## Projects

| Project | Context | Date |
| --- | --- | --- |
| Community Climb | Twitch Design Challenge winner; mobile Hype Train experience | September–October 2026 |
| Where Plans Go to Die? | Meta Design Challenge; event planning and individual RSVPs in messaging | August–September 2026 |
| Unity Hub | Inclusive campus app prototype for Indiana University | August–November 2024 |
| Accenture North America | Product Design Job Simulation through Forage | December 2024 |

### Project palette

| Project ID | Pinned project / featured work | Color | Hex | Thumbtack |
| --- | --- | --- | --- | --- |
| `twitch` | Community Climb | Blue | `#d6e9fb` | Star |
| `meta` | Where Plans Go to Die? | Pink | `#f8dcdf` | Heart |
| `unity` | Unity Hub | Lavender | `#e1d8f4` | Flower |

### Project previews and descriptions

- **Twitch:** three-phone illustration showing the live climb, community support, and a goal unlocking.
- **Meta:** four-phone illustration showing the complete flow: create an event → ask individuals → share in the group chat → collect RSVPs.
- **Unity Hub:** three original Figma screens showing Home, Discover, and Profile.
- **Accenture:** a process illustration for a Forage learning simulation, not employment.

The Meta description lists each role separately with mini-star markers. Description dialogs opened from All Work include a small project-specific icon.

## Transparency and AI-assisted presentation

The portfolio distinguishes original prototype screens from illustrations created to present the work.

| Project | Preview source and treatment |
| --- | --- |
| Twitch — Community Climb | AI-generated composition based on real screens from the Figma prototype, arranged into a three-phone presentation of the user flow. |
| Meta — Where Plans Go to Die? | AI-generated composition based on real screens from the Figma prototype, arranged into a four-phone presentation of event creation, individual invitations, sharing in the group chat, and RSVPs. |
| Unity Hub | Original Figma screenshots showing Home, Discover, and Profile, including sample profile and event content from the prototype. |
| Accenture North America | Process illustration for a Forage learning simulation; not original client screens or employment at Accenture. |

AI-generated compositions are presentation illustrations, not unaltered exports of the interfaces. The original Figma designs and presentation PDFs are linked inside the project descriptions so visitors can review the source work.

The Twitch and Meta project descriptions include this notice:

> Based on real screens from my Figma prototype. AI was used to create this composition and arrange the screens together to illustrate the user flow. View the original design in Figma.

A shorter notice appears beneath both previews on Featured Work and All Work:

> Based on real Figma screens · AI-generated flow composition

When updating project visuals, keep the captions in `index.html` and `work.html`, the project notes in `app.js`, and this section consistent with how the assets were created.

## Mobile and desktop behavior

- The hero switches to a flowing layout on tablet-sized screens; phone-sized screens show one pinned project note per row.
- The All Work gallery uses two columns on desktop and one column on phones.
- Project descriptions scroll within the viewport. Escape closes a dialog and returns focus to its opening control.
- Touchscreen visitors can tap projects and scroll naturally. Desktop visitors can also rearrange the board notes.
- The skills carousel supports touch scrolling, buttons, and keyboard controls.

Live checks covered narrow reflow at approximately 340 CSS pixels and desktop layout at 1363 CSS pixels, including project dialogs, gallery layout, keyboard activation, focus return, and carousel controls. These checks are not a full accessibility certification or a test on every physical device.

## Contact behavior

“Email me” opens contact choices directly on the page rather than relying only on a `mailto:` handler, which requires a configured email app.

- **Open email app:** uses `mailto:ryajelks@iu.edu`.
- **Compose in Gmail / Outlook:** opens a browser-based draft addressed to Ryanna; the visitor signs in if needed and sends it themselves.
- **Copy email address:** uses the browser Clipboard API and announces success. If copying is unavailable or denied, the address field is selected for manual copying.
- The expandable choices and email links remain available without JavaScript. The copy button appears when JavaScript is active.

The portfolio does not submit or send email itself.

## Run locally

From the repository root, start a static server with Python 3:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) for the homepage or [http://localhost:8000/work.html](http://localhost:8000/work.html) for the gallery.

No package installation or build step is required. The site uses plain HTML, CSS, JavaScript, inline SVG, and local image/PDF assets. It runs without Three.js, WebGL, or a backend. A local server is recommended when previewing pages and assets.

There is no Play/Pause motion button or automatic cork-board animation. Reduced-motion preferences remain supported for scrolling and other transitions.

## Source files

| Path | Purpose |
| --- | --- |
| `index.html` | Cork bulletin board, featured folders, about, leadership, skills, and contact |
| `work.html` | All Work gallery |
| `style.css` | Shared layout, responsive styling, illustrations, and accessibility styles |
| `app.js` | Shared project data, description colors, dialogs, icons, folder navigation, skills carousel, note dragging, and email address copying |
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
- Keep project IDs consistent across pinned notes and featured buttons in `index.html`, gallery buttons in `work.html`, and the shared data in `app.js`.
- Keep note, folder, description, and thumbtack colors aligned in `style.css` when changing a project’s palette.
- Update the preview caption and dialog note to distinguish original screens from illustrations.
- Put new visual assets in `images/` and provide descriptive alternative text.
- Keep presentation and Figma links inside the dialogs.

When changing shared CSS or JavaScript, refresh the relevant `?v=` values in **both HTML pages** to avoid stale browser caches.

### Contact details

If the email address changes, update every occurrence in `index.html`: the summary, email-app link, Gmail and Outlook compose URLs, and read-only address field. The copy handler in `app.js` reads the field value. Keep the address in this README consistent too.

## Deploy and verify

The site is hosted on GitHub Pages. Changes committed and pushed to `main` trigger the **pages build and deployment** workflow.

After publishing:

- Confirm the deployment succeeded in the repository’s **Actions** tab.
- Check both the homepage and All Work gallery.
- Verify pinned-note clicks and dragging, matching description colors, project icons, Figma and PDF links, resume downloads, stacked-folder navigation, and the skills carousel.
- Check a narrow screen layout and keyboard navigation, including Escape and focus return from dialogs.
- Open “Email me,” verify the compose links address the correct recipient, and check the copy-address confirmation and manual-copy fallback.
