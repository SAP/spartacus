rm -rf \"schematics/**/*.js\" \"schematics/**/*.js.map\" \"schematics/**/*.d.ts\"
tsc -p ./feature-libs/my-account/tsconfig.schematics.json
# TODO:#9092 - figure out a way to run schematics tests
# jasmine \"schematics/**/*_spec.js\"
