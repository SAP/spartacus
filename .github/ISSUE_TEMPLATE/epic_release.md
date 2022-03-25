---
name: Epic Release
about: Epic Release Checklist
title: 'Epic Release: [epic name]'
labels: epic-release-activities
assignees: ''

---

The following is a checklist for new epics or features acceptance for Spartacus, based on [our Definition of Done document](https://sap.github.io/spartacus-docs/definition-of-done/)

## General

- [ ] Epic has been tested on a production-like server using Spartacus installation script
- [ ] Epic has been tested in all supported browsers and devices (Check list on DoD page)
- [ ] Epic has sufficient end to end (cypress) test coverage
- [ ] Schematics code deprecations have been provided and tested
- [ ] Epic complies with [Security best practices](https://sap.github.io/spartacus-docs/security-best-practices/)
- [ ] Epic complies with [Accessibility best practices](https://sap.github.io/spartacus-docs/a11y-best-practices/)
- [ ] Epic CSS supports directionality (if required)
- [ ] Epic code scans have been conducted (sonar, whitesource, checkmarx)
- [ ] Epic renders successfully in SSR

## Audits/reviews

- [ ] Architecture review of the epic (with @tobi-or-not-tobi)
- [ ] Security and threat modeling audit/review from the Security team
- [ ] Accessibility audit/review from the UX team

## New Library

If your epic will be introduced or introduces a new library:

- [ ] Library provides schematics to install the library
- [ ] Library modules can be lazy loaded appropriately
- [ ] Library has been tested for a customer using Spartacus installation script

## Sample data

If the new feature requires new or updated sample data for a specific Commerce backend version:

- [ ] Sample data has been added to the sampledata repo and merged to the next version to be released
- [ ] New sample data has been loaded and tested on a dev server
- [ ] New sample data has been loaded and tested in our CI server

## Documentation

- [ ] Documentation input is provided for it to be published on the doc site.
