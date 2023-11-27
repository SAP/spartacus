# Dependencies

To make sure we get an accurate diff, do not update the dependencies of this tool unless you are sure that we don't need to compare the results with data generated with a previous version of the dependencies.

# Configuration

Set the current (new) major version of Spartacus in the `common.ts` file.

```
export const NEW_MAJOR_VERSION = '6';
```

This major version number will dictate, among other things, various input and output file paths for the files implicated in the process.

# Produce the breaking change list

- Run `npm install`

- run clone.sh
This will clone the Spartacus repo in 2 folders ./src/old and ./src/new

- checkout the approproate commit in ./src/old and ./src/new  
These will be the 2 versions compared for breaking changes.

- Build Spartacus libs
In both ./src/old and ./src/new, run `npm install` and `npm run build:libs`. 
(Note if old release is < 6.0, it is `yarn install` and `yarn build:libs`)


- Extract the public API.
Run `npm run extract-all` in the breaking change tool home folder (tools/breaking-changes/).  This will extract the public api in ./src/*/temp folder into many files. (one per entry point)

- Parse the public API
Run `npm run parse-all`.  This will parse the files in ./src/*/temp and produce a `./src/*/public-api.json` file containing all the public api.

- Compare old and new public API
Run `npm run compare`.  This compares both ./src/*/public-api.json files to create a list of breaking changes in `./data/*_0/breaking-changes.json`.  This step also requires this input file: `docs/migration/*_0/renamed-api.json`.  It contains manually created mappings about API element that were renamed.



# Generate migration schematics code

Note: Some of the doc/schematics generators below read from the manual input files as well as the breaking change file.
Thes input files should be present:
- tools/breaking-changes/data/*_0/breaking-changes.json   (created by comparing the API between 2 versions)
- docs/migration/*_0/migration-comments-api-elements.json (structured manual doc input for top level api elements, mainly for deleted ones.)
- docs/migration/*_0/migration-comments-members.json      (structured manual doc input for deleted or renamed class members)
- docs/migration/*_0/renamed-api-mappings.json            (structured manual doc input for renamed public api elements)

The 6.0 migration files can be taken as a template or en example: https://github.com/SAP/spartacus/tree/release/6.0.x/docs/migration/6_0

The full documentation about those files can be found here: https://wiki.one.int.sap/wiki/x/9WSWtQ

`gen-const` : generates the array of migration data for the constructor migration schematic in `projects/schematics/src/migrations/*_0/constructor-deprecations`


`gen-deleted` : generates the array of migration data for the removed public api schematic in `projects/schematics/src/migrations/*_0/removed-public-api-deprecations`


`gen-moved` : generates the array of migration data for the renamed public api schematic in `projects/schematics/src/migrations/*_0/rename-symbol`


`gen-methods-props` : generates the array of migration data for the deprecated methods and properties schematic in `projects/schematics/src/migrations/*_0/methods-and-properties-deprecations`

# Generate doc
`gen-doc` : generated the human readable doc listing all the breaking changes in the markdown format.
Typically the documentation is placed in the folder `docs/migration`


# Post generation tasks:

Some cases requires manual review to complete.  The preferable way to deal with those is to update the data in `breaking-changes.json`.  This way, the migration assets can be re-generated to reflect the changes.

## Manual review of the deprecated constructors.

The deprecated construtors must define all the overloaded signatures as well as the constructor implementation. (as shown in the documentation https://sap.github.io/spartacus-docs/breaking-changes/#adding-new-constructor-dependencies-in-minor-versions)

When overloaded signatures are defined in a class, the only thing that the api extractor will see are the overloaaded siignatures, and not the actual construtcor implementation. It can be good to manually review the constructor deprecations of the previous version to see if we have instances of constructors that don't list the overloaded signature.  If we do, we might need to add the missing constructor change in `breaking-changes.json`.

If the constructor deprecation was done as expected, the script should handle them well and no manual update should be required.

## Manual review of Config abstract classes

It is common that we add optional attributes in the Config abstract classes.  These cases are usually non-breaking changes.  The script can not handle those cases properly and this case benefits form a review.  If the change is non-breaking, simplpy remove the entry from `breaking-changes.json`.

## Manual review of TypeAlias changes

The script will report any change to TypeAlias kind of API element.  
There are typically not a high volume of TypeAlias changes.
The manual review should determine if the change is a breaking change or not.
