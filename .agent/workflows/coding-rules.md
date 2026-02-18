---
description: Strict coding rules for the 2Creative project — always follow these
---

## AI Coding Instructions (Strict)

1. **MUI Only** — Always use MUI components and styling; avoid custom CSS when MUI provides a component.
2. **DRY Code** — Extract reusable helpers into `/lib/utils/` or `/lib/helpers/`. Do not duplicate logic; check existing helpers/services first.
3. **No Hardcoded Secrets** — Never hardcode sensitive data; use `.env` instead.
4. **Firebase CLI** — Always use the installed Firebase CLI for ops and debugging.
5. **Component Reuse** — Always try to use the same components to avoid code duplication.
6. **Lint After Changes** — Always run linting after code changes:
// turbo
```bash
npm run lint
```
