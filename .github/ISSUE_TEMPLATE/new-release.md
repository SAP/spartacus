---
name: New Release
about: Checklist for new release
title: 'New Release: *.*.*'
labels: release-activities
assignees: ''

---

## Steps before the release

- [ ] Validate that all merged tickets were tested (QA column must be empty, except for tickets marked as `not-blocking-release`)
- [ ] If there is no maintenance branch yet:
  - [ ] Create new maintenance branch (`release/major.minor.x`)
  - [ ] Announce new maintenance branch (Set topic in tribe channel)
  - [ ] Bump the maintenance branch for the Hosting service deployment github action (workflows/deploy-hs.yml)
- [ ] Create new release branch `release/major.minor.patch.*` from the corresponding branch (develop/maintenance)
- [ ] Follow the steps to [release update schematics](https://github.com/SAP/spartacus/blob/develop/projects/schematics/README.md#releasing-update-schematics)
- [ ] If a new maintenance branch was created, enable the branch to be deployed by the hosting service deployment github action (workflows/deploy-hs.yml).
- [ ] Trigger a Travis build and make sure:
  - [ ] All e2e tests pass.
  - [ ] Installation script job runs successfully

---

## Steps for Spartacus sample data

### For Mac/Linux

- [ ] Cleanup repo, build and generate compodocs and publish on github pages, generate spartacussampledata archives (`./scripts/pre-release.sh`)

### For Windows

- [ ] For patch and stable releases:
  - [ ] Remove old versions sample data and documentation.
  - [ ] Generate compodocs (`yarn generate:docs`)
  - [ ] Publish the new compodocs on github pages (`yarn publish:docs`)
  - [ ] Get the spartacussampledata source code zips for versions 1905, 2005, 2011 and 2105 of CX (use `release/[version]/next` branches)
    - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/1905/next.zip` -> `spartacussampledataaddon.1905.zip`
    - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/1905/next.tar.gz` -> `spartacussampledataaddon.1905.tar.gz`
    - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2005/next.zip` -> `spartacussampledata.2005.zip`
    - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2005/next.tar.gz` -> `spartacussampledata.2005.tar.gz`
    - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2011/next.zip` -> `spartacussampledata.2011.zip`
    - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2011/next.tar.gz` -> `spartacussampledata.2011.tar.gz`
    - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2105/next.zip` -> `spartacussampledata.2105.zip`
    - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/2105/next.tar.gz` -> `spartacussampledata.2105.tar.gz`

### For all operative systems

Do the following steps to keep track of spartacussampledata releases:

- [ ] Tag sample data branches for each version (1905, 2005, 2011, 2105):
  - [ ] `git clone https://github.tools.sap/cx-commerce/spartacussampledata` (if already present `cd spartacussampledata && git fetch origin`)
  - [ ] tag the final commit on [release/1905/next](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/1905/next) branch: `git tag 1905-*.*.* HEAD-COMMIT-HASH-FROM-release/1905/next`
  - [ ] tag the final commit on [release/2005/next](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/2005/next) branch: `git tag 2005-*.*.* HEAD-COMMIT-HASH-FROM-release/2005/next`
  - [ ] tag the final commit on [release/2011/next](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/2011/next) branch: `git tag 2011-*.*.* HEAD-COMMIT-HASH-FROM-release/2011/next`
  - [ ] tag the final commit on [release/2105/next](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/2105/next) branch: `git tag 2105-*.*.* HEAD-COMMIT-HASH-FROM-release/2105/next`
  - [ ] push created tags: `git push origin --tags`

---

## Release specific steps

- [ ] Before you release libraries, fetch all git tags from github with `git fetch origin --tags` (required to generate release notes)
- [ ] Release libraries with release scripts:
  - Make sure your GITHUB_TOKEN env variable is set and valid
  - Check if you are logged into npm with `npm whoami`
  - If you are not logged in, then login with `npm login`
  - If there are any problems, setup 2FA for npm & `npm set @spartacus:registry https://registry.npmjs.org/`
  - For each package select/type version when prompted:
    - [ ] `npm run release:core:with-changelog`
    - [ ] `npm run release:storefront:with-changelog`
    - [ ] `npm run release:user:with-changelog` (needed since `3.2.0-rc.0`)
    - [ ] `npm run release:tracking:with-changelog` (needed since `3.2.0-next.0`)
    - [ ] `npm run release:cds:with-changelog`
    - [ ] `npm run release:assets:with-changelog`
    - [ ] `npm run release:styles:with-changelog`
    - [ ] `npm run release:order:with-changelog`
    - [ ] `npm run release:checkout:with-changelog` (needed since `4.0.0-rc.0`)
    - [ ] `npm run release:asm:with-changelog` (needed since `3.2.0-rc.0`)
    - [ ] `npm run release:cart:with-changelog` (needed since `3.2.0-rc.0`)
    - [ ] `npm run release:setup:with-changelog` (needed since `3.0.0-next.1`)
    - [ ] `npm run release:organization:with-changelog` (needed since `3.0.0-next.1`)
    - [ ] `npm run release:storefinder:with-changelog` (needed since `3.0.0-rc.0`)
    - [ ] `npm run release:product:with-changelog` (needed since `3.2.0-next.1`)
    - [ ] `npm run release:smartedit:with-changelog` (needed since `3.2.0-next.0`)
    - [ ] `npm run release:qualtrics:with-changelog` (needed since `3.1.0-next.0`)
    - [ ] `npm run release:product-configurator:with-changelog` (needed since `3.1.0-next.0`)
    - [ ] `npm run release:cdc:with-changelog` (needed since `3.1.0-next.0`)
      - [ ] For < 3.2.0 releases ONLY, set the spartacus peerDependencies manually, then run
      `npm run release:cdc:with-changelog`.
      - [ ] For older versions since 2.1.0-next.0 ONLY, publish under `0.<packages-version>.0` eg. `0.201.0-next.0` for first `2.1.0-next.0` release
    - [ ] `npm run release:digital-payments:with-changelog` (needed since `4.1.0-next.0`)
    - [ ] `npm run release:schematics:with-changelog`

- [ ] Check that the release notes are populated on github (if they are not, update them)
- [ ] Check tags on npm.
  - `next` tag should always reference the last non-stable version
  - `latest` tag should always point to the last stable version
  - You can leave `rc` tag until we release stable release.
  - Use `npm view @spartacus/NAME@VERSION` (ie. `npm view @spartacus/cdc@next`) instead of clicking thru the `npmjs.org` website (which is much slower)
  - Use `npm dist-tag` command for tag updates.
- [ ] Test the released libraries from a new shell app
  - [ ] Change the `scripts/install/config.sh` to test npm tag (next/latest/rc) at the same time:

    ```bash
    SPARTACUS_VERSION=`next` # or `latest`, `rc`; still, you can set it to a specific one, ie `*.*.*` (or leave the config file unchanged)
    ```

  - [ ] Run the installation script to make sure you can create a shell app with the latest imported libraries with no errors:

    ```bash
    cd scripts/install && ./run.sh install_npm
    ```

- [ ] Merge release branch (PR from release/*.*.*) to the maintenance branch
- [ ] Announce the new release on tribe channel
