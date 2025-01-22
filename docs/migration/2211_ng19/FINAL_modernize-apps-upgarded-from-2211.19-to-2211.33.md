# Modernize apps upgraded from Angular v22.11.19 to v22.11.33

New Angular 19 apps are configured a bit differently than the Angular 17 apps migrated to v19. This document is a migration guide for modernizing the migrated apps to look as much as possible like the new Angular 19 apps.

### `angular.json`

1. In the section `architect > build > options > assets`, please replace 2 string values in the array: `"src/favicon.ico"` and `"src/assets"` with a single object `{ "glob": "**/*", "input": "public" }`

```diff
             "assets": [
-              "src/favicon.ico",
-              "src/assets"
+              {
+                "glob": "**/*",
+                "input": "public"
+              },
```

2. Please do the same but now in the `test` section - `architect > test > options > assets`.
