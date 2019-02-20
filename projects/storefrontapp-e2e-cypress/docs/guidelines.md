# E2E test guidelines

## About

This document describes practices we use for our cypress tests. As a baseline we use [Cypress good practices](https://docs.cypress.io/guides/references/best-practices.html). Below you will find rules we developed that help us keep tests maintainable and fast.

## Using different API server

For situations when you use different API server please update url in cypress environment variables. Default values are set in `cypress.json` file. You can override those in `cypress.env.json` which is ignored by `git`. Using different API url in tests configuration and in application will broke tests, so be aware of that behavior.

## Assertions

- you don't need to use `should('exist')` assertion, because query command will fail if this element doesn't exist
- for multiple assertions use `within` command - it makes it much more cleaner

## Helpers

- for repeatable, simple tasks create function in `helpers` directory
- if you use helper very often create global command instead (examples: `ngSelect`, `selectUserMenuOption`)

### generateMail helper

To create user account you need to have unique email address. There is a helper `generateMail` available in `helpers/user.ts` created for this use case.
As a first argument you pass your unique string to differentiate between users. Second argument is `newTimestamp` and setting it to `true` will generate unique mail on every test refresh.

## Tests that require user login

Registering and logging in with user interface takes some time. Instead we recommend to use our command `requireLoggedIn`.
It will create new user or login as existing one (if you want to share the same user between multiple tests).

Command `requireLoggedIn` accepts 2 arguments. First one is user object. You only pass it for tests that intend to share the same user. As a second argument you pass options object. There is one option available `freshUserOnTestRefresh` that will force creating new user (might be helpful for development) instead of using already created.

### Separate user for this test (recommended approach)

``` ts
// test1.js

context('Context', () => {
  before(() => {
    cy.requireLoggedIn();
  })
})
```

### Access user email

``` ts
// test1.js

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
// test1.js
import { standardUser } from '../sample-data/shared-users.ts';

context('Context', () => {
  before(() => {
    cy.requireLoggedIn(standardUser);
  })
})

// test2.js
import { standardUser } from '../sample-data/shared-users.ts';

context('Context 2', () => {
  before(() => {
    // logged as the user from test1.js
    cy.requireLoggedIn(standardUser);
  })
})
```

### Fresh user on test restart (development purpose only)

While debugging test this will create fresh user on each test restart instead of using user created in the first run.
It is only useful for shared users. If you rely on unique user for spec (you don't pass user to `requireLoggedIn` command) this options doesn't change behavior.
Never use this feature in production! If you need unique user for test don't pass user reference.

``` ts
// test1.js
import { standardUser } from '../sample-data/shared-users.ts';

context('Context', () => {
  before(() => {
    cy.requireLoggedIn(standardUser, { freshUserOnTestRefresh: true });
  })
})
```

