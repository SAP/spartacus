---
name: New Release
about: Checklist for new release
title: 'New Release: x.y.z'
labels: release-activities
assignees: ''

---

- [ ] Validate that all merged tickets were tested (QA column must be empty, except for tickets marked as `not-blocking-release`)
- [ ] Create new maintenance branch `release/x.y.z`
- [ ] Announce new maintenance branch (Set topic in tribe channel)
- [ ] Create release branch `release/x.y.z` from the corresponding branch (develop/maintenance)
- [ ] [Bump versions for schematics migration](https://github.com/SAP/spartacus/blob/develop/projects/schematics/README.md#releasing-update-schematics)
- [ ] Run all e2e tests on release branch (Pro tip: run mobile, regression, smoke scripts in parallel to get all the results faster, after that retry failed tests in open mode)
- [ ] Build app on this branch using installation script; prepare the `scripts/install/config.sh` file as below:

    ```bash
    BACKEND_URL="https://spartacus-dev0.eastus.cloudapp.azure.com:9002"
    BRANCH='release/x.y.z'
    SPARTACUS_VERSION='x.y.z'
    ```

    If backend version is lower than 2005 add this as well to the above config:
    ```bash
    OCC_PREFIX="/rest/v2/"
    ```
    Finally, run the script:

    ```bash
    cd scripts/install && ./run.sh install
    ```

    Once finished, run `./run.sh start` to start the apps and check are they work fine. You can also go to each app directory and run it with yarn build, start, build:ssr etc.

- [ ] make are sure that release branch is working correctly, everything is passing and it builds.

---

## For Mac/Linux

- [ ] Cleanup repo, build and generate compodocs and publish on github pages, generate spartacussampleaddon archives (`./scripts/pre-release.sh`)

## For Windows

- [ ] Cleanup repo, build and generate compodocs and publish on github pages (`yarn generate:docs` and `yarn publish:docs` for patch stable/releases)
- [ ] Get the spartacussampledataaddon for both 1905 and 2005 CX versions (use `release/1905/next` and `release/2005/next` branches)
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledataaddon/archive/release/1905/next.zip` -> `spartacussampledataaddon.1905.zip`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledataaddon/archive/release/1905/next.tar.gz` -> `spartacussampledataaddon.1905.tar.gz`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/2005-2.0.0.zip` -> `spartacussampledataaddon.2005.zip`
  - [ ] Download and rename in root directory `https://github.tools.sap/cx-commerce/spartacussampledata/archive/2005-2.0.0.tar.gz` -> `spartacussampledataaddon.2005.tar.gz`

## For all operative systems

- [ ] Merge _next_ branches into _latest_ branches for each version (1905, 2005) (only if there are differences/changes among them).
- [ ] If branches were merged, tag the merge commit with the version of the release as a reference (e.g. `2.0.0-next.3)

---

- [ ] Before you release libraries fetch all git tags from github with `git fetch origin --tags` (required to generate release notes)
- [ ] Release libraries with release-it scripts
  - Make sure your GITHUB_TOKEN env variable is set
  - Check if you are logged into npm with `npm whoami`
  - If you are not logged in, then login with `npm login`
  - For each package select/type version when prompted:
    - [ ] `npm run release:core:with-changelog`
    - [ ] `npm run release:lib:with-changelog`
    - [ ] `npm run release:cds:with-changelog`
    - [ ] `npm run release:assets:with-changelog`
    - [ ] `npm run release:styles:with-changelog`
    - [ ] `npm run release:schematics:with-changelog`
    - [ ] `npm run release:setup:with-changelog`
    - [ ] `npm run release:my-account:with-changelog`
    - [ ] `npm run release:cdc:with-changelog` (since 2.1.0-next.0 - publish under `0.<packages-version>.0` eg. `0.201.0-next.0` for first `2.1.0-next.0` release)
      - [ ] before the script set the spartacus peerDependencies manually (as we publish it under 0.201.0-next.0 version)
- [ ] Check that the release notes are populated on github (if they are not, update them)
- [ ] Check tags on npm.
  - `next` tag should always reference the last non-stable version
  - `latest` tag should always point to the last stable version
  - You can leave `rc` tag until we release stable release.
  - Use `npm dist-tag` command for tag updates.
- [ ] Test the released libraries from a new shell app; change the `scripts/install/config.sh` to test npm tag (next/latest/rc) at the same time:
    ```bash
    SPARTACUS_VERSION=`next` # or `latest`, `rc`; still, you can set it to a specific one, ie `x.y.z` (or leave the config file unchanged)
    ```
    Run the installation script:
    ```bash
    cd scripts/install && run.sh install_npm
    ```
- [ ]  merge release branch (PR from release/x.y.z) to maintenance branch
- [ ]  inform PO about libraries successfully released
- [ ]  Announce the new release on tribe channel
