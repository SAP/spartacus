# Snapshot builds

Snapshot builds are a way for Spartacus users to have access to library fixes or features that have not yet been officially released in our npm libraries.

Snapshot builds are published in the following github repositories:

* [Core](https://github.com/SAP/cloud-commerce-spartacus-storefront-core-builds)
* [Styles](https://github.com/SAP/cloud-commerce-spartacus-storefront-styles-builds)
* [Storefront](https://github.com/SAP/cloud-commerce-spartacus-storefront-storefront-builds)

Each commit represents a Snapshot. We create a snapshot every time a change is merged to develop. A github release with the source code is created per snapshot.

To import a snapshot build in your shell app, just update the library dependency in your package.json, as follows: 

```json
{
  "dependencies" : {
    "@spartacus/core": "SAP/cloud-commerce-spartacus-storefront-core-builds",
    "@spartacus/styles": "SAP/cloud-commerce-spartacus-storefront-styles-builds",
    "@spartacus/storefront": "SAP/cloud-commerce-spartacus-storefront-storefront-builds"
    }
}
 ```

This will allow you to import the latest (most recent) snapshot from github.

If you want to import a specific snapshot, append the suffix of the github repo and the git tag of the release in your dependency version, as follows:

```json
{
  "dependencies" : {
    "@spartacus/core": "SAP/cloud-commerce-spartacus-storefront-core-builds#core-0.1.0+abcde23f",
    "@spartacus/styles": "SAP/cloud-commerce-spartacus-storefront-styles-builds#styles-0.1.0+abcde23f",
    "@spartacus/storefront": "SAP/cloud-commerce-spartacus-storefront-storefront-builds#storefront-0.1.0+abcde23f"
  }
}
 ```
