# `spartacus/valid-for-feature-mixin-argument`

Custom Stylelint rule that validates the first argument of the SCSS mixin
`@include forFeature('<key>')` against the keys of the TypeScript interface
`FeatureTogglesInterface`, defined in:

```
core-libs/core/src/features-config/feature-toggles/config/feature-toggles.ts
```

This way **the TS interface remains the single source of truth** — there is no
duplicated list of feature flags anywhere in SCSS or in the plugin itself.

## What it catches

```scss
%cx-my-component {
  @include forFeature('myFeatureFlag')  { color: red; }     // ✓ valid (quoted literal, key exists in TS)
  @include forFeature(myFeatureFlag)    { color: red; }     // ✓ valid (bare Sass identifier, key exists in TS)
  @include forFeature('typoFeatureFlg') { color: red; }     // ✗ unknown key
  @include forFeature($featureVar)      { color: red; }     // ✗ non-static argument (variable)
  @include forFeature(#{$x})            { color: red; }     // ✗ non-static argument (interpolation)
  @include forFeature()                 { color: red; }     // ✗ missing argument
}
```

Both quoted SCSS strings AND bare Sass identifiers are accepted as static
arguments, because Sass treats them equivalently as `string` values. Anything
that could change at compile time (a `$variable`, interpolation `#{...}`,
a function call, ...) is flagged — otherwise the rule could be silently bypassed.

## How it works

1. On the first invocation, the rule uses [`ts-morph`](https://ts-morph.com/)
   to parse `feature-toggles.ts` and extract all property names from
   `FeatureTogglesInterface`.
2. The result is cached in-memory, keyed by the file's `mtime`, so repeated
   lint runs (e.g. in watch mode / IDE) do **not** reparse the TS file unless
   it has been modified.
3. For each `@include forFeature(...)` at-rule, the first argument is parsed
   as a static SCSS string literal and checked against the set of valid keys.
4. Non-static arguments (variables, interpolations, function calls) are
   reported — they would bypass the static check.

## Configuration

In `.stylelintrc.json`:

```json
{
  "plugins": ["./tools/stylelint-rules"],
  "rules": {
    "spartacus/valid-for-feature-mixin-argument": true
  }
}
```

The rule accepts a single primary option: `true` (enabled) / `false` (disabled).

## Notes & limitations

- This rule is intentionally **strict**: any argument that is not a static
  string literal will be flagged. If you really need a dynamic value, you can
  silence it locally with `/* stylelint-disable-next-line spartacus/valid-for-feature-mixin-argument */`.
- It does NOT replace the runtime checks already present in the mixin (those
  guard against e.g. wrong type passed at compile time). It is an additional
  safety net for typos.
- The rule looks up the interface by name. If `FeatureTogglesInterface` is
  ever renamed or moved, update the constants at the top of
  [`feature-toggles-keys.js`](./feature-toggles-keys.js).
