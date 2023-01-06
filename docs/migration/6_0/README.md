For 6.0+, typescript breaking changes will be detected by a script and the documentation and migration schematics will be generated.

This folder contains the documentation input for the breaking change types that are not handled automatically and for automatically detected breaking changes that need a manual migration comment.

To streamline the process, doc input for different change types go in different files.  Here is a list of changes and their corresponding files:

* Migration comment for top level api elements (input for the doc + schematics generation): `migration-comments-api-elements.json`
* Migration comment for class members (input for the doc + schematics generation): `migration-comments-members.json`
* Mappings for renamed top level api elements (input for the doc + schematics generation): `renamed-api-mappings.json`
* Html template changes: `html.md`
* Styling changes: `styling.md`  
* Manual doc for certain typescript changes `typescript-manual-doc.md`

For more details see https://wiki.one.int.sap/wiki/x/9WSWtQ

