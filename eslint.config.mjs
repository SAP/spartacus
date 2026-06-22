import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import nxPlugin from '@nx/eslint-plugin';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import importPlugin from 'eslint-plugin-import';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import preferArrowPlugin from 'eslint-plugin-prefer-arrow';

const TAG = {
  APP: 'type:app',
  FEATURE: 'type:feature',
  INTEGRATION: 'type:integration',
  UI: 'type:ui',
  CORE: 'scope:core',
};

export default defineConfig(
  globalIgnores(['**/schematics/**/*.d.ts']),
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      'projects/storefrontapp-e2e-cypress/**',
    ],
  },
  {
    files: ['**/*.ts'],
    extends: [
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@nx': nxPlugin,
      '@stylistic/ts': stylisticTs,
      'import': importPlugin,
      'jsdoc': jsdocPlugin,
      'prefer-arrow': preferArrowPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
        createDefaultProgram: true,
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      'sort-keys': 'off',
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'cx',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'cx',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/prefer-inject': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          accessibility: 'explicit',
        },
      ],
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          path: 'always',
          types: 'prefer-import',
          lib: 'always',
        },
      ],
      '@typescript-eslint/unified-signatures': 'error',
      '@stylistic/ts/quotes': 'off',
      '@stylistic/ts/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        },
      ],
      '@stylistic/ts/semi': ['error', 'always'],
      '@stylistic/ts/type-annotation-spacing': 'error',
      'import/no-deprecated': 'warn',
      'jsdoc/check-alignment': 'error',
      'jsdoc/newline-after-description': 'off',
      'jsdoc/no-types': 'off',
      'prefer-arrow/prefer-arrow-functions': 'off',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          allowCircularSelfDependency: true,
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
              notDependOnLibsWithTags: [TAG.APP],
            },
            {
              sourceTag: TAG.FEATURE,
              notDependOnLibsWithTags: [TAG.INTEGRATION],
            },
            {
              sourceTag: TAG.UI,
              notDependOnLibsWithTags: [TAG.FEATURE],
            },
            {
              sourceTag: TAG.CORE,
              notDependOnLibsWithTags: [TAG.UI, TAG.FEATURE],
            },
          ],
        },
      ],
      'complexity': 'off',
      'constructor-super': 'error',
      'eqeqeq': ['error', 'smart'],
      'guard-for-in': 'error',
      'id-blacklist': 'off',
      'id-match': 'off',
      'max-classes-per-file': 'off',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      'no-empty': 'off',
      'no-eval': 'error',
      'no-fallthrough': 'off',
      'no-invalid-this': 'off',
      'no-new-wrappers': 'error',
      'no-restricted-imports': [
        'error',
        {
          name: 'rxjs/Rx',
          message: "Please import directly from 'rxjs' instead",
        },
      ],
      'no-restricted-syntax': [
        'warn',
        {
          selector: 'MemberExpression[object.property.name="nativeElement"]',
          message:
            '[Spartacus] Do not access properties directly on nativeElement. Use Renderer2 instead (e.g. this.renderer.setStyle(this.el.nativeElement, ...)).',
        },
        {
          selector:
            'PropertyDefinition[accessibility="private"][value.type="CallExpression"][value.callee.name="inject"]:not([value.arguments.0.name="FeatureConfigService"]):not([value.arguments.0.name="FeatureToggles"])',
          message:
            `[Spartacus] Injected dependencies should use "protected" instead of "private" to allow customers to extend the class.
            (Exceptions: FeatureConfigService, FeatureToggles — those MUST be private; see @nx/workspace-feature-config-service-must-be-private and @nx/workspace-feature-toggles-must-be-private.)`,
        },
      ],
      'no-shadow': 'off',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'no-unsafe-finally': 'error',
      'no-unused-labels': 'error',
      'no-var': 'off',
      'object-shorthand': 'off',
      'one-var': ['error', 'never'],
      'prefer-const': 'off',
      'radix': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'off',
      'arrow-body-style': 'off',
      'arrow-parens': 'off',
      'comma-dangle': 'off',
      'curly': 'off',
      'eol-last': 'error',
      'linebreak-style': ['error', 'unix'],
      'max-len': 'off',
      'new-parens': 'error',
      'no-multiple-empty-lines': 'off',
      'no-trailing-spaces': 'error',
      'quote-props': ['error', 'as-needed'],
      'quotes': 'off',
      'space-before-function-paren': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
    ],
    rules: {
      '@angular-eslint/template/no-negated-async': 'off',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/prefer-control-flow': 'off',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
    },
  },
  {
    files: ['**/*.module.ts'],
    plugins: { '@nx': nxPlugin },
    rules: {
      '@nx/workspace-use-provide-default-config': 'error',
      '@nx/workspace-use-provide-default-config-factory': 'error',
      '@nx/workspace-use-provide-default-feature-toggles': 'error',
      '@nx/workspace-use-provide-default-feature-toggles-factory': 'error',
    },
  },
  {
    files: ['**/*.action*.ts'],
    plugins: { '@nx': nxPlugin },
    rules: {
      '@nx/workspace-no-ngrx-fail-action-without-error-action-implementation':
        'error',
      '@nx/workspace-ngrx-fail-action-must-initialize-error': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    plugins: { '@nx': nxPlugin },
    rules: {
      '@nx/workspace-no-const-enum': 'error',
      '@nx/workspace-feature-config-service-must-be-private': 'error',
      '@nx/workspace-feature-toggles-must-be-private': 'error',
      '@nx/workspace-no-self-public-api-import': 'warn',
    },
  },
);
