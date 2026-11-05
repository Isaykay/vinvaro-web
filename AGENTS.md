<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## VINVARO website: content rules

- **Audience:** independent car dealers and automotive businesses (owners, sales, operations, admin). Canonical domain https://vinvaro.com; Dutch is primary, English lives under `/en`.
- **Facts before copy:** product claims must trace to the product in `../vinvaro-web-client` (modules, integration catalogue in `supabase/migrations`, i18n dictionaries). Integration status (live, beta, planned) comes from the catalogue; never promote a planned integration as live.
- **Voice:** brand guidelines in `../vinvaro-web-client/brand`. Specific, human, in control. Proof before promise: no invented customer counts, time savings, valuation accuracy or market leadership. Use je/jij in Dutch.
- **Logo:** always the outlined SVG in `src/components/ui.tsx` (`Logo`, `Mark`); never type the wordmark in a font.
- House style: no em dashes in site copy; sentence case; illustrations show fictional, illustrative records.
