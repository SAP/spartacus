# Checklist for migration to a new major version of Spartacus

- Update [installation docs](https://sap.github.io/spartacus-docs/building-the-spartacus-storefront-from-libraries/):
    - update angular (cli) version
    - update `node` version
    - update `yarn` version if needed
    - add new requirements if any
    - review the rest of document for missing updates/new steps
- Update installation script:
    - set default `ANGULAR_CLI_VERSION` to the new one
    - cover new features if needed
- Update all dependencies to the newest available version. We set minimum required version for dependencies to the current latest minor available. Eg. we release spartacus 3.0 when newest Angular version is `10.1.3`. We then set the peerDependencies to `^10.1.0`.
- Update sampledata repo/documentation if needed
- Update schematics so new features are covered
- Remove the previous migration scripts from the projects/schematics/src/migrations/x_0 directory. Also, remove the references to the removed migration scripts from the projects/schematics/src/migrations/migrations.json
- Handle automated migration and deprecations
- Add migration documentation, example: https://sap.github.io/spartacus-docs/updating-to-version-2/
- Update Release Information page: https://sap.github.io/spartacus-docs/release-information/
