# Checklist for migration to a new major version of Spartacus

- Update [installation docs](https://sap.github.io/spartacus-docs/building-the-spartacus-storefront-from-libraries/):
    - update angular (cli) version
    - update `node` version
    - update yarn version if needed
    - add new requirements if any
    - review the rest of document for missing updates/new steps
- Update installation script so new features are covered
- Update sampledata repo/documentation if needed
- Update schematics so new features are covered
- Handle automated migration and deprecations
- Add migration documentation, example: https://sap.github.io/spartacus-docs/updating-to-version-2/
- Update Release Information page: https://sap.github.io/spartacus-docs/release-information/
