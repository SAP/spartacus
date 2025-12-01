# Installing Spartacus 2211.21 with Angular 20

This guide provides step-by-step instructions for creating a fresh Angular 20 application and installing Spartacus 2211.21.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: Version 22 or higher
- **npm**: Version 10 or higher
- **Angular CLI**: Version 20

Install or update Angular CLI globally:

```bash
npm install -g @angular/cli@20
```

## Step 1: Create a New Angular 20 Application

Create a new Angular 20 application:

```bash
ng new my-spartacus-app --style=scss --ssr=false --zoneless=false --standalone=false
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

## Step 4: SSR-Specific Configuration (If Using SSR)

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
