# Installing Spartacus 221121.7 with Angular 21

This guide provides step-by-step instructions for creating a fresh Angular 20 application and installing Spartacus 221121.7

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: Version 22 or higher
- **npm**: Version 10 or higher
- **Angular CLI**: Version 21.0.5

Install or update Angular CLI globally:

```bash
npm install -g @angular/cli@21.0.5
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
This will set up SSR-specific configurations.

