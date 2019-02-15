# E2E test guidelines

## About

This document describes practices we use for our cypress tests. As a baseline we use [Cypress good practices](https://docs.cypress.io/guides/references/best-practices.html). Below you will find rules we developed that help us keep tests maintainable and fast.

## Assertions

- you don't need to use `should('exist')` assertion, because query command will fail if this element doesn't exist
- for multiple assertions use `within` command - it makes it much more cleaner

## Helpers

- for repeatable, simple tasks create function in `helpers` directory
- if you use helper very often create global command instead (examples: `ngSelect`, `selectUserMenuOption`)

## Tests that require user login

Registering and logging in with user interface takes some time. Instead we recommend to use our command `requireLoggedIn`.
It will create new user or login as existing one (if you want to share the same user between multiple tests).

Command `requireLoggedIn` accepts 2 arguments. First one is user object. Only `alias` property is required in this object to differentiate between user accounts. Additionally you can pass other properties to change user name or password (all options visible with TS definitions). As a second argument you pass options object. There is one option available `alwaysNew` that will force creating new user (might be helpful for development) instead of using already created.

### Using the same user in multiple tests

``` ts
// test1.js

context('Context', () => {
  before(() => {
    cy.requireLoggedIn({ alias: 'shared' });
  })
})

// test2.js

context('Context 2', () => {
  before(() => {
    // logged as the user from test1.js
    cy.requireLoggedIn({ alias: 'shared' });
  })
})
```

### Always create now user (for development purpose)

``` ts
// test1.js

context('Context', () => {
  before(() => {
    cy.requireLoggedIn({ alias: 'standard' }, { alwaysNew: true });
  })
})
```

### Separate user for this test

``` ts
// test1.js

context('Context', () => {
  before(() => {
    cy.requireLoggedIn({ alias: 'some-unique-alias' });
  })
})
```

### Access user email

``` ts
// test1.js

context('Context', () => {
  before(() => {
    cy.requireLoggedIn({ alias: 'standard' }).then(email => { /* you can access to email here */ });
  })
})
```
