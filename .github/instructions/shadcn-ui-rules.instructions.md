---
description: Read this file before implementing any UI-related features or fixes. It defines the rules for using shadcn/ui components, adding new components, and composing UI elements in the project.
---

# shadcn/ui Component Rules

## Core Rule

**All UI elements must use shadcn/ui components. Never create custom components.**

If a needed component does not exist in `components/ui/`, add it via the CLI:

```bash
npx shadcn add <component>
```

Do not build a component from scratch when a shadcn/ui equivalent exists.

## What Counts as a Custom Component

Forbidden patterns:
- Writing a new `<button>` element styled with Tailwind instead of using `<Button>` from shadcn.
- Creating wrapper components that replicate what shadcn already provides (e.g., a custom `Modal` instead of `Dialog`).
- Building form fields manually instead of using `Input`, `Select`, `Checkbox`, etc.

## Adding New Components

1. Check the [shadcn/ui component list](https://ui.shadcn.com/docs/components) before building anything.
2. If the component exists, install it: `npx shadcn add <component>`.
3. Import from `@/components/ui/<component>`.
4. Never modify files inside `components/ui/` — they are CLI-managed.

## Composing UI

You may create layout or page-level components that **compose** shadcn/ui primitives together. These live outside `components/ui/`. The rule is: the leaf-level interactive/visual elements must come from shadcn/ui.

## Currently Installed Components

| Component | Import Path |
|---|---|
| `Button` | `@/components/ui/button` |

Update this table when new components are added.
