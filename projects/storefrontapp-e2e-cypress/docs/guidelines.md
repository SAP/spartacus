# E2E testing guidelines

## About

This document describes practices we use for our cypress tests. As a baseline we use [Cypress best practices](https://docs.cypress.io/guides/references/best-practices.html). Below you will find a series of recommendations we developed that help us keep tests maintainable and fast.

## Using different API server

For situations when you use different API server please update url in cypress environment variables. Default values are set in `cypress.json` file. You can override those in `cypress.env.json` which is ignored by `git`. Using different API url in tests configuration and in application will broke tests, so be aware of that behavior.

## Assertions

- We encourage you to use `cy.get` instead of `should('exist')` assertion, because `get` will fail if the element doesn't exist. In cases where you only want to check for existence of an element only (and not do anything with it), it is ok.
- For multiple assertions within an element, use the `within` command. It creates a scope for the assertions and makes test cleaner.

## Helpers

- for repeatable, simple tasks, create a function in `helpers` directory
- if you use a helper function very often, create a global command instead (examples: `ngSelect`, `selectUserMenuOption`)

### generateMail helper

To create a user account that has a unique email address, you can use the `generateMail` helper available in `helpers/user.ts`.
As a first argument you pass your unique string to differentiate between users. Second argument is `newTimestamp`. Setting it to `true` will generate a unique email on every test refresh.

## Tests that require user login

Registering and logging in with user interface takes some time. Instead we recommend to use the command `requireLoggedIn` command. It will create new user or login as existing one (if you want to share the same user between multiple tests).

Command `requireLoggedIn` accepts 2 arguments. First one is user object. You only pass it for tests that intend to share the same user. As a second argument you pass options object. There is one option available `freshUserOnTestRefresh` that will force creating new user (might be helpful for development) instead of using already created.

### Separate user for this test (recommended approach)

``` ts
context('Context', () => {
  before(() => {
    cy.requireLoggedIn();
  })
})
```

### Access user email

``` ts
context('Context', () => {
  before(() => {
    cy.requireLoggedIn().then(email => { /* you can access to email here */ });
  })
})
```

### Using the same user in multiple tests

To avoid some issues regarding test order keep shared users in one file and only reference them in tests.
Example user (`standardUser`) available in `sample-data/shared-users.ts`.

``` ts
import { standardUser } from '../sample-data/shared-users.ts';

context('Context', () => {
  before(() => {
    cy.requireLoggedIn(standardUser);
  })
})
```

### Fresh user on test restart (development purpose only)

While debugging test this will create fresh user on each test restart instead of using user created in the first run.
It is only useful for shared users. If you rely on unique user for spec (you don't pass user to `requireLoggedIn` command) this options doesn't change behavior.
Never use this feature in production! If you need unique user for test don't pass user reference.

``` ts
import { standardUser } from '../sample-data/shared-users.ts';

context('Context', () => {
  before(() => {
    cy.requireLoggedIn(standardUser, { freshUserOnTestRefresh: true });
  })
})
```

## Providing custom Spartacus configuration

For backward compatibility new features are disabled by default, but can be enabled by changing the global Spartacus Config, which normally is provided in the build time in `app.module`. However, in e2e tests we can inject dynamically a config chunk that will extend the original one (from app.module) by using the helper `cy.cxConfig(config: Config)`. For example:

```typescript
context('Express checkout', () => {
  beforeEach(() => {
    cy.cxConfig({ checkout: { express: true }});
  });
  /* ... */
});
```
