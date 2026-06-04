# Installing Spartacus 221121.7 with Angular 21

This guide provides step-by-step instructions for creating a fresh Angular 20 application and installing Spartacus 221121.7

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: Version 22 or higher
- **npm**: Version 10 or higher
- **Angular CLI**: Version 21.1.0

Install or update Angular CLI globally:

```bash
npm install -g @angular/cli@21.1.0
```

## Step 1: Create a New Angular 21 Application

Create a new Angular 21 application:

```bash
ng new my-spartacus-app --style=scss --ssr=false --zoneless=false --file-name-style-guide=2016
cd my-spartacus-app
```

## Step 2: Install Spartacus

Run the Spartacus schematics to add Spartacus to your project:

```bash
ng add @spartacus/schematics@221121.7
```

The schematics will:
- Install required Spartacus libraries
- Configure your application for Spartacus

## Step 3: SSR-Specific Configuration (If Using SSR)

For Spartacus with Server-Side Rendering (SSR), run the following command:

```bash
ng add @spartacus/schematics@221121.7 --ssr
```

This will set up SSR-specific configurations, including:

- `provideClientHydration(withEventReplay(), withNoHttpTransferCache(), withIncrementalHydration())` — enables Angular hydration with event replay, disables the HTTP transfer cache (required for Spartacus state transfer), and enables incremental hydration for `@defer` blocks.

> **Note:** `withIncrementalHydration()` requires Angular 20 or later. JS chunks for custom components inside `@defer (hydrate on <trigger>)` blocks are only downloaded when the trigger fires. See [Enable Incremental Hydration](./migration.md#enable-incremental-hydration-optional-ssr-only) in the migration guide for details and limitations.
>
> **Angular 22+ users:** `withIncrementalHydration()` is deprecated since Angular v22 — incremental hydration is enabled by default in `provideClientHydration()` and this call can be safely removed. It is planned for removal in Angular v24. To opt out, use `withNoIncrementalHydration()`.

