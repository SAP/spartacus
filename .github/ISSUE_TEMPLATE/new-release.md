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

## Steps for Spartacus compodocs

- [ ] Generate compodocs (`yarn generate:docs`)
- [ ] Publish the new compodocs on github pages (`yarn publish:docs`)

## Steps for Spartacus sample data

### Do the following steps to keep track of spartacussampledata releases:

- [ ] Tag sample data branches for each Spartacus version (release/3.x, release/4.x, release/5.x):
  - [ ] `git clone https://github.tools.sap/cx-commerce/spartacussampledata` (if already present `cd spartacussampledata && git fetch origin`)
  - [ ] tag the final commit on [release/3.x](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/3.x) branch: `git tag *.*.* HEAD-COMMIT-HASH-FROM-release/3.x`
  - [ ] tag the final commit on [release/4.x](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/4.x) branch: `git tag *.*.* HEAD-COMMIT-HASH-FROM-release/4.x`
  - [ ] tag the final commit on [release/5.x](https://github.tools.sap/cx-commerce/spartacussampledata/commits/release/5.x) branch: `git tag *.*.* HEAD-COMMIT-HASH-FROM-release/5.x`
  - [ ] push created tags: `git push origin --tags`

### Do the following steps to release the spartacussampledata:

- [ ] Make sure the release is updated properly from [sap-samples](https://github.com/SAP-samples/cloud-commerce-sample-setup/releases/tag/sampledata)
  - [ ] visit our [github actions](https://github.com/SAP/spartacus/actions/workflows/publish-sample-data.yml) to publish the sample data to `sap-samples`.
  - [ ] unreleased input box should be the latest tagged Spartacus version from the above step. (e.g: 5.1.0)
  - [ ] current input box should be the MAJOR version before the **unreleased** release tagged Spartacus version from the above step. (e.g: 4.3.9)
  - [ ] previous input box should be the MAJOR version before the **current** release tagged version from the above step. (e.g: 3.4.10)
  - [ ] run the workflow from `develop`

---

## Release specific steps

- [ ] Test the released libraries from a new shell app
  - [ ] Change the `scripts/install/config.sh` to test npm tag (next/latest/rc) at the same time:

    ```bash
    SPARTACUS_VERSION=`next` # or `latest`, `rc`; still, you can set it to a specific one, ie `*.*.*` (or leave the config file unchanged)
    ```

  - [ ] Run the installation script to make sure you can create a shell app with the latest imported libraries with no errors:

    ```bash
    cd scripts/install && ./run.sh install_npm
    ```

    - [ ] Start and open the shell app locally, and do the following manual tests:
      - [ ] Open the homepage. Make sure it loads correctly and there are no errors in the console
      - [ ] Search for a product. Make sure search page works
      - [ ] Register a new user, login and make sure you can checkout

- [ ] Merge release branch (PR from release/*.*.*) to the maintenance branch
- [ ] Tag release version as `major.minor.patch` with reference to merge commit from the above step 
- [ ] Announce the new release on tribe channel
