# UI Components & Styling

## Overview

This project uses **shadcn/ui** components built on **Radix UI** primitives, styled with **Tailwind CSS v4**.

- shadcn style: `radix-nova`
- Base color: `neutral`
- CSS variables: enabled
- Icon library: `lucide-react`

## Tailwind CSS v4

- Tailwind v4 uses a **CSS-first config** — the theme is defined via CSS custom properties in `app/globals.css`, not `tailwind.config.js`.
- Do not create a `tailwind.config.js/ts` file.
- Use CSS variables (e.g., `--color-primary`, `--radius`) defined in `globals.css` and reference them as Tailwind utilities (e.g., `bg-primary`, `rounded-lg`).
- Arbitrary values like `bg-[#hex]` are discouraged for colors — prefer theme tokens.

## Class Name Merging

Always use the `cn()` utility from `@/lib/utils` for any conditional or merged class names.

```ts
import { cn } from "@/lib/utils";

<div className={cn("flex items-center gap-2", isActive && "bg-primary text-primary-foreground")} />
```

Never use template literals for conditional classes. Never concatenate class strings manually.

## shadcn/ui Components

- All shadcn components live in `components/ui/` and are **managed by the shadcn CLI**.
- **Do not manually edit files in `components/ui/`.**
- To add a new component: `npx shadcn add <component>`.
- To update a component: `npx shadcn add <component> --overwrite`.

### Available Components

Currently installed:
- `Button` (`components/ui/button.tsx`) — use for all interactive button elements.

### Button Usage

```tsx
import { Button } from "@/components/ui/button";

// Variants: default | outline | secondary | ghost | destructive | link
// Sizes: default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg

<Button variant="outline" size="sm">Cancel</Button>
<Button>Submit</Button>
<Button variant="destructive">Delete</Button>
```

## Icons

Use `lucide-react` for all icons. Do not install other icon libraries.

```tsx
import { Link2, Copy, Trash2 } from "lucide-react";

<Link2 className="size-4" />
```

- Always set a `size-*` class on icons.
- Pass `aria-hidden="true"` on decorative icons.
- Provide `aria-label` on icon-only buttons.

## Custom Components

When building new components outside `components/ui/`:

1. Use `cva` from `class-variance-authority` for components with variants.
2. Use `cn()` for all className composition.
3. Forward refs with `React.forwardRef` when the component wraps a native HTML element.
4. Expose a `className` prop to allow overrides from the call site.

```tsx
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-4 shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}
```

## Dark Mode

- Dark mode is supported via the `dark` class on `<html>`.
- Use `dark:` variants in Tailwind for dark mode overrides.
- Do not hardcode light-only colors — always provide a `dark:` counterpart where needed.
