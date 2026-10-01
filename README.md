# Lunchables

A slide deck app for talks with live demos. Slides are Markdown files that can embed Svelte components, so a slide can show a code snippet and run that same feature right below it. The first deck is "Lunchable: Install Nothing", a 20 minute talk on native browser APIs (dialog, popover, view transitions, anchor positioning, exclusive accordions and more).

Built with Svelte 5, SvelteKit (remote functions, prerendering), mdsvex, Shiki and Tailwind CSS 4.

## Getting started

The project uses [bun](https://bun.sh).

```bash
bun install
bun run dev        # http://localhost:5173, redirects to the default deck
```

| Command           | What it does                    |
| ----------------- | ------------------------------- |
| `bun run dev`     | Start the dev server            |
| `bun run build`   | Build and prerender every deck  |
| `bun run preview` | Serve the production build      |
| `bun run check`   | Type check with svelte-check    |
| `bun run lint`    | Prettier and ESLint             |
| `bun run format`  | Format everything with Prettier |
| `bun run new`     | Create a new presentation       |

## Project layout

```
src/
  presentations/
    install-nothing/          one folder per deck, the folder name is the URL
      config.ts               title, description, cover
      slides/*.md             the slides
      components/             components only this deck uses (demos, ShipScore)
      assets/                 images only this deck uses
  lib/
    presentations.ts          finds every deck's config.ts, sets defaultPresentation
    slides.remote.ts          getSlides(deck), a prerendered remote function
    slides.ts                 previous/next/counter logic
    types.ts                  Slide and PresentationConfig
    components/SlideFooter.svelte
    components/custom/        Markdown element overrides, shared by all decks
  routes/
    +page.ts                  / redirects to the default deck
    [deck]/+page.svelte       deck cover
    [deck]/+layout.svelte     keyboard navigation and footer
    [deck]/[slug]/            a single slide
    mdsvex.svelte             Markdown layout, registers the custom elements
```

## Adding a presentation

Run `bun run new` and answer the prompts:

| Prompt           | Default               | Notes                                                                                              |
| ---------------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| Title            | none                  | Required                                                                                           |
| Folder / URL     | the title in URL form | Lowercase letters, numbers and dashes. Must not exist yet or match a route in `src/routes`         |
| Description      | empty                 | Becomes the cover's meta description                                                               |
| Cover heading    | the title             |                                                                                                    |
| Cover image path | none                  | Type, paste or drag a file into the terminal. It is copied to `assets/cover.<ext>`. Enter skips it |

Press Enter to accept a default. Ctrl+C or Ctrl+D stops without writing anything.

The script creates `config.ts`, a first slide at `slides/1intro.md` and, if you gave an image, `assets/cover.<ext>`. Run `bun run dev` and open `/<folder>`.

### By hand

The script only writes files, so you can also create them yourself:

1. Create a folder under `src/presentations/`. The folder name becomes the URL, so use something like `my-talk` to get `/my-talk`.
2. Add `config.ts`:

   ```ts
   import type { PresentationConfig } from '$lib/types';
   import cover from './assets/cover.svg';

   export default {
   	title: 'My talk',
   	description: 'Shown as the meta description of the cover page',
   	cover: {
   		image: cover, // optional
   		alt: 'My talk logo', // optional, falls back to the title
   		heading: 'Big heading on the cover'
   	}
   } satisfies PresentationConfig;
   ```

3. Add slides to `slides/` (see the next section).
4. Open `/my-talk`.

That's it. The registry, the routes and the build all pick up the new folder on their own. To make `/` open your deck, change `defaultPresentation` in [src/lib/presentations.ts](src/lib/presentations.ts).

If the cover has no `image`, the heading links to the first slide instead.

## Writing slides

Each slide is a Markdown file in the deck's `slides/` folder. The file name is the slide's URL (`intro.md` becomes `/my-talk/intro`), and frontmatter sets the rest:

```md
---
title: Modals x Alerts x Dialogs
subtitle: Basic Modal
type: 'demo'
order: 6
---
```

| Field      | Required | Meaning                                                                                                     |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `title`    | yes      | Slide title, also the browser tab title                                                                     |
| `subtitle` | no       | Big yellow heading on `demo` and `ship` slides, shown in the slide picker                                   |
| `type`     | yes      | `content`, `demo`, `ship` or `code` (layouts below)                                                         |
| `order`    | yes      | Position in the deck. Slides are sorted by this number, not by file name, so give each slide a unique value |

### Slide types

- **`content`**: large italic yellow title with the Markdown body below it in large prose. Use it for bullet lists and text.
- **`demo`**: small title, big subtitle, and the body inside a bordered, scrollable box. Use it for a live demo with its code.
- **`ship`**: like `demo` without the border. Meant for the ship score component.
- **`code`**: shows only `title | code`. The Markdown body is not rendered for this type.

### Components in slides

Import components in a `<script>` block and use them like in any Svelte file:

```md
<script>
  import BasicDialog from '../components/BasicModal.svelte'
</script>

<BasicDialog />
```

Components used by one deck go in that deck's `components/` folder and are imported with a relative path. Shared components go in `src/lib` and are imported with `$lib/...`.

### Code blocks

Fenced code blocks are highlighted at build time with Shiki's `github-dark` theme and get line numbers. Code renders in JetBrains Mono with ligatures, so `!==` and `=>` show as single glyphs.

Only `html`, `css` and `javascript` are loaded. Any other language renders as plain text. To add one, extend `langs` in [svelte.config.js](svelte.config.js).

### Markdown styling

[src/routes/mdsvex.svelte](src/routes/mdsvex.svelte) replaces some Markdown elements with custom components from `src/lib/components/custom/`, for every deck:

| Markdown       | Renders as                                 |
| -------------- | ------------------------------------------ |
| `_text_`       | Non-italic text with a wavy teal underline |
| `- item` lists | Large text (`text-5xl`) with a 🗴 marker    |
| `![alt](src)`  | `<img>` with `loading="lazy"`              |
| Code blocks    | `<pre>` at 95% width                       |

### Images

Import images instead of linking them by path, so Vite bundles them and the URL works under any deck prefix:

```md
<script>
  import grid from '../assets/grid.png'
</script>

<img src={grid} alt="Browser support grid" />
```

Files in `static/` are served from `/` and work with an absolute path (`/favicon.png`), but they aren't tied to a deck.

### Ship score

`ShipScore` (in the install-nothing deck) shows a "ship score" button. Clicking it reveals a verdict, the browser versions that support the feature, and optional extra labels:

```svelte
<ShipScore chrome="37" firefox="98" safari="15.4" globalScore="95%!" shipIt inUse />
```

| Prop                          | Meaning                                                               |
| ----------------------------- | --------------------------------------------------------------------- |
| `chrome`, `firefox`, `safari` | First supported version. Leave one out and that browser shows a red X |
| `shipIt`, `tryIt`, `checkIt`  | Verdict, checked in that order: SHIP IT, TRY IT or CHECK IT           |
| `globalScore`                 | Large global usage figure, e.g. `"95%!"`                              |
| `inUse`                       | Shows "used in VUE-UI"                                                |

## Presenting

| Key            | Action                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `→` or `Space` | Next slide. On the cover this opens the first slide, on the last slide it returns to the cover |
| `←`            | Previous slide. On the first slide it returns to the cover                                     |

The footer on every slide has Previous, a counter (`6 / 34`) and Next. On the last slide Next becomes a reload icon that links back to the cover. Clicking the counter opens a list of every slide, with the current one highlighted. Pick a slide to jump to it.

Page changes animate with the View Transitions API in browsers that support it. The slide, the title and the footer each have their own transition name.

Most demos rely on recent APIs (popover, anchor positioning, `@starting-style`, view transitions), so present from an up-to-date Chrome.

## Build and deploy

Every page is prerendered. `bun run build` writes static HTML for `/`, each deck cover, every slide, plus the result of `getSlides` for each deck. The project uses `@sveltejs/adapter-auto`. To deploy as a plain static site, swap it for `@sveltejs/adapter-static`.
