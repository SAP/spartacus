# TODO

1. move @angular-devkit/schematics to the main package.json?

  - remove it from schematics
  - remove it from the my-account

2. Validate if adding to a Spartacus project

  - check for the @sparatcus/core dep
  - additionally check if the my-account lib is already present in the package.json

4. In ts.config.schematics.json:

```json

    "paths": {
      "@ngrx/data/schematics-core": ["./schematics-core"]
    },
```








{
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "stripInternal": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "downlevelIteration": true,
    "outDir": "../../out-tsc/lib",
    "sourceMap": true,
    "inlineSources": true,
    "lib": ["es2020", "dom"],
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["migrations/**/*.ts", "schematics/**/*.ts"],
  "exclude": ["**/*.spec.ts"],
  "angularCompilerOptions": {
    "skipMetadataEmit": true,
    "enableSummariesForJit": false,
    "enableIvy": false
  }
}
