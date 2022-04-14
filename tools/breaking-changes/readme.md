# Dependencies

To make sure we get an accurate diff, do not update the dependencies of this tool unless you are sure that we don't need to compare the results with data generated with a previous version of the dependencies.

# Produce the breaking change list

- yarn install

- run clone.sh
This will clone the Spartacus repo in 2 folders ./src/old and ./src/new

- checkout the approproate commit in ./src/old and ./src/new  
These will be the 2 versions compared for breaking changes.

- Build Spartacus libs
In both ./src/old and ./src/new, run `yarn install` and `yarn build:libs`.


- Extract the publiic API.
Run `yarn extract-all` in the breaking change tool home folder (tools/breaking-changes/).  This will extract the public api in ./src/*/temp folder into many files. (one per entry point)

- Parse the public API
Run `yarn parse-all`.  This will parse the files in ./src/*/temp and produce a `./src/*/public-api.json` file containing all the public api.

- Compare old and new public API
Run `yarn compare`.  This compares both ./src/*/public-api.json files to create aa list ov breaking changes in `./data/breaking`

# Generate migration schematics code

`gen-const` : generates the array of migration data for the constructor migration schematic in `projects/schematics/src/migrations/*_0/constructor-deprecations`


`gen-deleted` : generates the array of migration data for the removed public api schematic in `projects/schematics/src/migrations/*_0/removed-public-api-deprecations`

`gen-moved` : generates the array of migration data for the renamed public api schematic in `projects/schematics/src/migrations/*_0/rename-symbol`


`gen-methods-props` : generates the array of migration data for the deprecated methods and properties schematic in `projects/schematics/src/migrations/*_0/methods-and-properties-deprecations`

# Generate doc
`gen-doc` : generated the human readable doc listing all the breaking changes in the markdown format.
Typically the documentation is placed in the folder `docs/migration`


# Post generation tasks:

Some cases requires manual review to complete.  The preferable way to deal with those is to update the data in `breaking-changes.json`.  This way, the migration assets can be re-generated to reflect the changes.


## Review Deleted Elements
The API elements that were detected as deleted by the script need human intervention.  There are different cases:

### The API element is deleted

tl/dr: Add a migration comment in `breaking-changes.json`.

The simple case is when the API element is indeed deleted.  In this case, we have to add a `migrationComment` in the corresponding entry in `breaking-changes.json`.  The migration comment is meant to help users understand why the item is deleted and most importantly what to use instead.

### The API element is Renamed

tl/dr: Flag the api element as renamed in `breaking-changes.json` and add any other breaking changes that the api element might contain.  Then regenrate deleted schematics , renamed schematics and docs. 

The alternate case is when the API element was in fact renamed.  The renamed elements will be flagged as deleted by the script because there is no way the script can know that an item was renamed to something else. In this case we need to edit the corresponding entry in `breaking-changes.json` et express a rename instead of a deletion.

Moreover, the renamed item, sinice it was considered deleted, was not comopared with it's new counterpart to fiind breaking changes.  Further breaking changes that might have been made to the API element have to be found manually.

As a general note, rename API element sparingly.  They can cause alot of overhead in the breakiing change handling process.

## Manual review of the deprecated constructors.

The deprecated construtors must define all the overloaded signatures as well as the constructor implementation. (as shown in the documentation https://sap.github.io/spartacus-docs/breaking-changes/#adding-new-constructor-dependencies-in-minor-versions)

When overloaded signatures are defined in a class, the only thing that the api extractor will see are the overloaaded siignatures, and not the actual construtcor implementation. It can be good to manually review the constructor deprecations of the previous version to see if we have instances of constructors that don't list the overloaded signature.  If we do, we might need to add the missing constructor change in `breaking-changes.json`.

If the constructor deprecation was done as expected, the script should handle them well and no manual update should be required.

## Manual review of Config abstract classes

It is common that we add optional attributes in the Config abstract classes.  These cases are usually non-breaking changes.  The script can not handle those cases properly and this case benefits form a review.  If the change is non-breaking, simplpy remove the entry from `breaking-changes.json`.

## Manual review of TypeAlias changes

The script will report any change to TypeAlias kind of APII element.  
There are typically not a high volume of TypeAlias changes.
The manual rview should determine if the change is a breaking change or not.
