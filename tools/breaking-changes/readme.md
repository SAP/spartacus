# Dependencies

To make sure we get an accurate diff, do not update the dependencies of this tool unless you are sure that we don't need to compaare the results with data generated with a previous version of the dependencies.

# Produce the breaking change list

- yarn install

- run clone.sh
This will clone the Spartacus repo in 2 folders ./src/old and ./src/new

- checkout the approproate commit in ./src/old and ./src/new  
These will be the 2 versions compared for breaking changes.

- Build Spartacus libs
In both ./src/old and ./src/new, run `yarn install` and `yarn build:libs`.


- Extract the publiic API.
Run `yarn extract-all` in this folder.  This will extract the public api in ./src/*/temp folder into many files. (one per entry point)

- Parse the public API
Run `yarn parse-all`.  This will parse the files in ./src/*/temp and produce a `./src/*/public-api.json` file containing all the public api.

- Compare old and new public API
Run `yarn compare`.  This compares both ./src/*/public-api.json files to create aa list ov breaking changes in `./data/breaking`

# Generate migration schematics code

`gen-const` : generates the array of migration data for the constructor migration schematic in `projects/schematics/src/migrations/*/constructor-deprecations`


`gen-deleted` : generates the array of migration data for the removed public api schematic in `projects/schematics/src/migrations/*/removed-public-api-deprecations`

`gen-moved` : generates the array of migration data for the renamed public api schematic in `projects/schematics/src/migrations/5_0/rename-symbol`


`gen-methods-props` : generates the array of migration data for the deprecated methods and properties schematic in `projects/schematics/src/migrations/5_0/methods-and-properties-deprecations`

# Generate doc
`gen-doc` : generated the human readable doc listing all the breaking changes in the markdown format.
