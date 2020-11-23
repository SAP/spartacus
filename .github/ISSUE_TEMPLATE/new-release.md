---
name: New Release
about: Checklist for new release
title: 'New Release: x.y.z'
labels: release-activities
assignees: ''

---

## General steps

- [ ] Validate that all merged tickets were tested (QA column must be empty, except for tickets marked as `not-blocking-release`)
- [ ] Create new maintenance branch `release/x.y.z`
- [ ] Announce new maintenance branch (Set topic in tribe channel)
- [ ] Create release branch `release/x.y.z` from the corresponding branch (develop/maintenance)
- [ ] Follow the steps to [release update schematics](https://github.com/SAP/spartacus/blob/develop/projects/schematics/README.md#releasing-update-schematics)
- [ ] Build app on this branch using installation script; prepare the `scripts/install/config.sh` file as below:

    ```bash
    BACKEND_URL="https://spartacus-dev0.eastus.cloudapp.azure.com:9002"
    BRANCH='release/x.y.z'
    SPARTACUS_VERSION='x.y.z'
    ```

    If backend version is older than 2005, add this as well to the above config:

    ```bash
    OCC_PREFIX="/rest/v2/"
    ```

    Finally, run the script:

    ```bash
    cd scripts/install && ./run.sh install
    ```

    Once finished, run `./run.sh start` to start the apps and check that they are working. You can also go to each app directory and run it with `yarn build`, `start`, `build:ssr`, etc.

- [ ] Run all e2e tests on this latest build (Pro tip: run mobile, regression, smoke scripts in parallel to get all the results faster, after that retry failed tests in open mode)

---

## Steps for Spartacus sample data

### For Mac/Linux

- [ ] Cleanup repo, build and generate compodocs and publish on github pages, generate spartacussampledata archives (`./scripts/pre-release.sh`)

### For Windows

- [ ] Cleanup repo, build and generate compodocs and publish on github pages (`yarn generate:docs` and `yarn publish:docs` for patch stable/releases)
- [ ] Get the spartacussampledata source code zips for both 1905 and 2005 CX versions (use `release/1905/next` and `release/2005/next` branches)
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/1905/next.zip` -> `spartacussampledataaddon.1905.zip`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/release/1905/next.tar.gz` -> `spartacussampledataaddon.1905.tar.gz`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/2005-2.0.0.zip` -> `spartacussampledata.2005.zip`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/2005-2.0.0.tar.gz` -> `spartacussampledata.2005.tar.gz`

### For all operative systems

To keep track of spartacussampledata releases, we keep a `latest` branch on each supported version that always points to the latest stable release. Every release, we incorporate the latest changes to them.

- [ ] Merge _next_ branches into _latest_ branches for each version (1905, 2005) (only if there are additions/changes present in _next_ that are not in _latest_):
  - [ ] `git clone https://github.tools.sap/cx-commerce/spartacussampledata` (if already present `cd spartacussampledata && git fetch origin`)
  - [ ] `git checkout release/1905/latest && git diff release/1905/next` in case output is not empty create the PR and tag the final commit: `git tag 1905-x.y.z PR-COMMIT-HASH`
  - [ ] `git checkout release/2005/latest && git diff release/2005/next` in case output is not empty create the PR and tag the final commit: `git tag 2005-x.y.z PR-COMMIT-HASH`
  - [ ] If any of the two above tags was created: `git push origin [branch] --tags`

---

- [ ] Before you release libraries, fetch all git tags from github with `git fetch origin --tags` (required to generate release notes)
- [ ] Release libraries with `release-it` scripts
  - Make sure your GITHUB_TOKEN env variable is set
  - Check if you are logged into npm with `npm whoami`
  - If you are not logged in, then login with `npm login`
  - For each package select/type version when prompted:
    - [ ] `npm run release:core:with-changelog`
    - [ ] `npm run release:storefront:with-changelog`
    - [ ] `npm run release:cds:with-changelog`
    - [ ] `npm run release:assets:with-changelog`
    - [ ] `npm run release:styles:with-changelog`
    - [ ] `npm run release:schematics:with-changelog`
    - [ ] `npm run release:setup:with-changelog` (needed since `3.0.0-next.1`)
    - [ ] `npm run release:organization:with-changelog` (needed since `3.0.0-next.1`)
    - [ ] `npm run release:misc:with-changelog` (needed since `3.0.0-rc.0`)
    - [ ] `npm run release:cdc:with-changelog` (since 2.1.0-next.0 - publish under `0.<packages-version>.0` eg. `0.201.0-next.0` for first `2.1.0-next.0` release)
      - [ ] before the script set the spartacus peerDependencies manually (as we publish it under 0.201.0-next.0 version)
- [ ] Check that the release notes are populated on github (if they are not, update them)
- [ ] Check tags on npm.
  - `next` tag should always reference the last non-stable version
  - `latest` tag should always point to the last stable version
  - You can leave `rc` tag until we release stable release.
  - Use `npm view @spartacus/NAME@VERSION` (ie. `npm view @spartacus/cdc@next`) instead of clicking thru the `npmjs.org` website (which is much slower)
  - Use `npm dist-tag` command for tag updates.
- [ ] Test the released libraries from a new shell app; change the `scripts/install/config.sh` to test npm tag (next/latest/rc) at the same time:

    ```bash
    SPARTACUS_VERSION=`next` # or `latest`, `rc`; still, you can set it to a specific one, ie `x.y.z` (or leave the config file unchanged)
    ```

    Run the installation script:

    ```bash
    cd scripts/install && run.sh install_npm
    ```

- [ ]  Merge release branch (PR from release/x.y.z) to maintenance branch
- [ ]  Announce the new release on tribe channel
