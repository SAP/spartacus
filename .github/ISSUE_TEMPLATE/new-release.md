---
name: New Release
about: Checklist for new release
title: 'New Release: x.y.z'
labels: release-activities
assignees: ''

---

- [ ] Validate that every merged ticket was tested (QA column must be empty, except for tickets marked as `not-blocking-release`)
- [ ] Create new maintenance branch `release/x.y.z`
- [ ] Announce new maintenance branch. Set topic in tribe channel
- [ ] Create release branch `release/x.y.z` from ~current develop~ the maintenance branch (release/2.0.x)
- [ ] Bump versions of the migration https://github.com/SAP/spartacus/blob/develop/projects/schematics/README.md#releasing-update-schematics
- [ ] Bump peer dependencies versions
- [ ] Run all e2e tests on release branch (tip: run mobile, regression, smoke scripts in parallel to get all the results faster, after that retry failed tests in open mode)
- [ ] Build app on this branch using this script: https://github.tools.sap/cx-commerce/spartacus-installation. Use config (`config.sh`):
   ```
   BACKEND_URL="https://dev-com-17.accdemo.b2c.ydev.hybris.com:9002"
   BRANCH='release/2.0.0-rc.1'
   SPARTACUS_VERSION='2.0.0-rc.1'
   ```
   Using installation script not merged yet improved version (https://github.com/SAP/spartacus/pull/7433) please perform below steps:
     - [ ] cd to install script dir `cd scripts/install`
     - [ ] run `./run.sh install`
     - [ ] you can then go to each app directory and run it with yarn build, start, build:ssr etc.

- [ ]  make are sure that release branch is working correctly, everything is passing and it builds

---

  For Mac:
  - [ ]  cleanup repo, build and generate compodocs and publish on github pages, generate spartacussampleaddon archives (`./scripts/pre-release.sh`)

For Windows:
- [ ]  cleanup repo, build and generate compodocs and publish on github pages (`./scripts/pre-release.sh` - without sampleaddon zip)
- [ ]  download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledataaddon/archive/develop.zip` -> `spartacussampleaddon.zip`
- [ ]  download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledataaddon/archive/develop.tar.gz` -> `spartacussampleaddon.tar.gz`

---
 - [ ]  release libraries with release-it scripts (set GITHUB_TOKEN env variable, do `npm login`; for each package select rc1 version when prompted - when prompted):
   - [ ] `npm run release:assets:with-changelog`
   - [ ] `npm run release:styles:with-changelog`
   - [ ] `npm run release:lib:with-changelog`
   - [ ] `npm run release:core:with-changelog`
   - [ ] `npm run release:cds:with-changelog`
   - [ ] `npm run release:schematics:with-changelog`
- [ ]  check if release-notes are populated on github (if not update)
- [ ]  check tags on npm
- [ ]  check if everything builds from npm packages (install-script) `./run.sh install_npm` (change config's `SPARTACUS_VERSION` to `rc`)
- [ ]  merge release branch (PR from release/2.0.0-rc.1) to release/2.0.x
- [ ]  inform PO about released libraries
- [ ]  Announce the new release on tribe channel
