# Test plan for release [version]

## Background

Test plan lists the minimum necessary testing required for [number] release.
Planned release date:
Sprint reviews have demos of functionality being released. See demos
Regression testing to be handled mostly by automated testing.
Manual testing required for new features only (where not covered by automation)
Testing must be done only with [version]
New mandate: No major open bugs allowed. ⚠️ ⚠️ ⚠️ Not necessarily true - if something is important enough to block the release, we say it's critical or blocker; we have 30 days after bug report to fix a bug
In other words, a bug classified as major not yet resolved will block release unless exceptions are made.

## New features for this release

[features]

## Commerce Suite CX Compatibility

- CX 2005
- CX 2011
- CX 2105

## Schematics

Confirm Spartacus [version] can be deployed in Windows, Mac, Linux using [schematics script](https://github.com/SAP/spartacus/tree/develop/scripts/install)

- Windows
- Linux
- Mac

## Deployments

- Linux server with Schematics script
- CCV2

## Server Links

Deploy [version] in CCV2

- B2C
- B2B

Deploy [version] in Linux Server

- CSR B2C
- SSR B2C

- CSR B2B
- SSR B2B

## Critical Open Bugs / QA Concerns

 No Blockers bugs, no critical bugs opened prior to release.
 No major bugs either more than 30 days old. List of Major bugs to fix: . If a bug is serious enough that it blocks a release, set it to blocker.

## SSR Testing

Manual testing in CCV2. Happy path.
E2E tests adopted to run in SSR mode.

## Cypress Automated Regression Testing

Run full regression suite with [version] release branch in CI.
-- Attach screenshot and link of dashboard with final results

 Run full regression suite with [version] release branch (CCV2/dev server)
-- Attach screenshot and link of dashboard with final results

 Run all flaky tests either locally, CCV2 or Linux server.
-- In the case of actual failures, please investigate and open bugs if functional regression observed.
-- Manual execution of flaky tests here: TBD

## New Features Automated Testing

[features]

## New Features Manual Testing

[features]

## New Features Security Validation

- Static scans
- Dynamic scans
- Third party libraries vulnerabilities
- Theat Modeling where applicable

## New Features Accessibility Testing

[features]

## New Features Mobile/Exploratory-Smoke Testing

Several combinations of browser & OS needed for the key new features that had new UI.

TIME-BOX this activity to no more than 1 hour per browser/os combination. ⌛

Please add your name next to the browser or feature list item below.

Create bug tickets if necessary.

### Desktop

- Chrome
  - Windows
    - B2C Checkout happy path
    - B2B Checkout happy path
  - Mac
    - B2C Checkout happy path
    - B2B Checkout happy path
- Firefox
  - Windows
    - B2C Checkout happy path
    - B2B Checkout happy path
  - Mac
    - B2C Checkout happy path
    - B2B Checkout happy path
- Safari (Mac)
  - B2C Checkout happy path
  - B2B Checkout happy path
- Edge (Windows)
  - B2C Checkout happy path
  - B2B Checkout happy path
- iOS (mobile)
  - Safari
    - B2C Checkout happy path
    - B2B Checkout happy path
- Chrome
  - B2C Checkout happy path (iPhone 12)
  - B2B Checkout happy path (iPhone 12)
- iOS (Tablet - iPad Air, Pro, etc)
  - Safari (iPad Pro)
    - B2C Checkout happy path
    - B2B Checkout happy path
- Chrome (iPad Air)
  - B2C Checkout happy path
  - B2B Checkout happy path
- Android (Tablet - Samsung)
  - Chrome
    - B2C Checkout happy path
    - B2B Checkout happy path
- Firefox
  - B2C Checkout happy path
  - B2B Checkout happy path
- Android (mobile)
  - Chrome
    - B2C Checkout happy path
    - B2B Checkout happy path
  - Firefox
    - B2C Checkout happy path
    - B2B Checkout happy path

## Functional Interoperability with non-Core Modules

- CPQ
- Smartedit
- CDS
- CDC
- Qualtrics

## Performance Testing (Documentation Purposes Only)

- Homepage load [previous] vs [next]
- Checkout flow [previous] vs [next]
- Login/Logout flow [previous] vs [next]
- Lighthouse reports.
- Others TBD
