# Installing Spartacus 221121.8 with Angular 21

This guide provides step-by-step instructions for creating a fresh Angular 20 application and installing Spartacus 221121.8

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: Version 22 or higher
- **npm**: Version 10 or higher
- **Angular CLI**: Version 21

Install or update Angular CLI globally:

```bash
npm install -g @angular/cli@21
```

## Step 1: Create a New Angular 21 Application

Create a new Angular 21 application:

```bash
ng new my-spartacus-app --style=scss --ssr=false --zoneless=false --standalone=false --file-name-style-guide=2016
cd my-spartacus-app
```

## Step 2: Install Spartacus

Run the Spartacus schematics to add Spartacus to your project:

```bash
ng add @spartacus/schematics@221121.<latest>
```

The schematics will:
- rename files in the project to use classic file name style guide (e.g., `app.component.ts` instead of `app.ts`)
- Install required Spartacus libraries
- Configure your application for Spartacus

## Manual Changes

//TODO: if Angular installation schematics are updated to include these changes, we can remove this section.
In `main.ts`, update the replace deprecated BootstrapOptions object property `ngZoneEventCoalescing` with the new `provideZoneChangeDetection` function:

```diff
+ import { provideZoneChangeDetection } from '@angular/core';

 platformBrowser().bootstrapModule(AppModule, {
-  ngZoneEventCoalescing: true,
+  provideZoneChangeDetection({ eventCoalescing: true }),
})
  .catch(err => console.error(err));
```

## Step 3: SSR-Specific Configuration (If Using SSR)

For Spartacus with Server-Side Rendering (SSR), run the following command:

```bash
ng add @spartacus/schematics@221121.<latest> --ssr
```
This will set up SSR-specific configurations.

### Manual Changes for SSR with `application` builder

If you enabled SSR during project creation, you need to make an additional manual changes in the project files:

1. remove `app.routes.server.ts` file as it is not supported by Spartacus SSR.
2. remove `provideServerRendering` from `app.server.module.ts` file:

```diff
import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { provideServer } from '@spartacus/setup/ssr';
import { App } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [AppModule],
  providers: [
-   provideServerRendering(withRoutes(serverRoutes)),
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
  ],
  bootstrap: [App],
})
export class AppServerModule {}
```
