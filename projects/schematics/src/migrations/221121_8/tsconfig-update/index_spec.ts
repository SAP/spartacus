/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

const collectionPath = join(__dirname, '../../migrations.json');
const MIGRATION_SCRIPT_NAME = '02-migration-v221121_8-tsconfig-update';

describe('Update tsconfig.json for Angular 21 migration', () => {
  let tree: Tree;
  let runner: SchematicTestRunner;

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
  });

  describe('compilerOptions updates', () => {
    it('should remove outDir, esModuleInterop, and moduleResolution', async () => {
      const tsconfigContent = {
        compileOnSave: false,
        compilerOptions: {
          outDir: './dist/out-tsc',
          esModuleInterop: true,
          moduleResolution: 'bundler',
          strict: true,
          noImplicitOverride: true,
          module: 'ES2022',
          target: 'ES2022',
        },
        angularCompilerOptions: {
          enableI18nLegacyMessageIdFormat: false,
          strictInjectionParameters: true,
        },
      };

      tree.create('/tsconfig.json', JSON.stringify(tsconfigContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedConfig = JSON.parse(newTree.readText('/tsconfig.json'));

      expect(updatedConfig.compilerOptions.outDir).toBeUndefined();
      expect(updatedConfig.compilerOptions.esModuleInterop).toBeUndefined();
      expect(updatedConfig.compilerOptions.moduleResolution).toBeUndefined();
      expect(updatedConfig.compilerOptions.strict).toBe(true);
      expect(updatedConfig.compilerOptions.target).toBe('ES2022');
    });

    it('should update module to "preserve"', async () => {
      const tsconfigContent = {
        compileOnSave: false,
        compilerOptions: {
          module: 'ES2022',
          target: 'ES2022',
        },
      };

      tree.create('/tsconfig.json', JSON.stringify(tsconfigContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedConfig = JSON.parse(newTree.readText('/tsconfig.json'));
      expect(updatedConfig.compilerOptions.module).toBe('preserve');
    });

    it('should not update module if it is already "preserve"', async () => {
      const tsconfigContent = {
        compileOnSave: false,
        compilerOptions: {
          module: 'preserve',
          target: 'ES2022',
        },
      };

      tree.create('/tsconfig.json', JSON.stringify(tsconfigContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedConfig = JSON.parse(newTree.readText('/tsconfig.json'));
      expect(updatedConfig.compilerOptions.module).toBe('preserve');
    });
  });

  describe('files and references additions', () => {
    it('should add files and references arrays', async () => {
      const tsconfigContent = {
        compileOnSave: false,
        compilerOptions: {
          module: 'ES2022',
          target: 'ES2022',
        },
        angularCompilerOptions: {
          enableI18nLegacyMessageIdFormat: false,
        },
      };

      tree.create('/tsconfig.json', JSON.stringify(tsconfigContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedConfig = JSON.parse(newTree.readText('/tsconfig.json'));
      expect(updatedConfig.files).toEqual([]);
      expect(updatedConfig.references).toEqual([
        { path: './tsconfig.app.json' },
        { path: './tsconfig.spec.json' },
      ]);
    });

    it('should not override existing files and references', async () => {
      const existingReferences = [{ path: './custom.json' }];
      const tsconfigContent = {
        compileOnSave: false,
        compilerOptions: {
          module: 'ES2022',
          target: 'ES2022',
        },
        files: ['src/main.ts'],
        references: existingReferences,
      };

      tree.create('/tsconfig.json', JSON.stringify(tsconfigContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedConfig = JSON.parse(newTree.readText('/tsconfig.json'));
      expect(updatedConfig.files).toEqual(['src/main.ts']);
      expect(updatedConfig.references).toEqual(existingReferences);
    });
  });

  describe('edge cases', () => {
    it('should skip if tsconfig.json does not exist', async () => {
      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      // Tree should remain empty if tsconfig.json doesn't exist
      expect(newTree.exists('/tsconfig.json')).toBe(false);
    });

    it('should handle tsconfig.json with no compilerOptions', async () => {
      const tsconfigContent = {
        compileOnSave: false,
      };

      tree.create('/tsconfig.json', JSON.stringify(tsconfigContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedConfig = JSON.parse(newTree.readText('/tsconfig.json'));
      // compilerOptions should not be created if it doesn't exist
      // since there's nothing to remove or modify
      expect(updatedConfig.compilerOptions).toBeUndefined();
      expect(updatedConfig.files).toEqual([]);
      expect(updatedConfig.references).toBeDefined();
    });

    it('should apply all transformations in a single migration', async () => {
      const tsconfigContent = {
        compileOnSave: false,
        compilerOptions: {
          outDir: './dist/out-tsc',
          esModuleInterop: true,
          moduleResolution: 'bundler',
          strict: true,
          noImplicitOverride: true,
          noPropertyAccessFromIndexSignature: true,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
          skipLibCheck: true,
          isolatedModules: true,
          experimentalDecorators: true,
          importHelpers: true,
          target: 'ES2022',
          module: 'ES2022',
        },
        angularCompilerOptions: {
          enableI18nLegacyMessageIdFormat: false,
          strictInjectionParameters: true,
          strictInputAccessModifiers: true,
          strictTemplates: true,
        },
      };

      tree.create('/tsconfig.json', JSON.stringify(tsconfigContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedConfig = JSON.parse(newTree.readText('/tsconfig.json'));

      // Verify removed properties
      expect(updatedConfig.compilerOptions.outDir).toBeUndefined();
      expect(updatedConfig.compilerOptions.esModuleInterop).toBeUndefined();
      expect(updatedConfig.compilerOptions.moduleResolution).toBeUndefined();

      // Verify updated properties
      expect(updatedConfig.compilerOptions.module).toBe('preserve');

      // Verify added properties
      expect(updatedConfig.files).toEqual([]);
      expect(updatedConfig.references).toEqual([
        { path: './tsconfig.app.json' },
        { path: './tsconfig.spec.json' },
      ]);

      // Verify unmodified properties are intact
      expect(updatedConfig.compilerOptions.strict).toBe(true);
      expect(updatedConfig.compilerOptions.noImplicitOverride).toBe(true);
      expect(updatedConfig.compilerOptions.experimentalDecorators).toBe(true);
      expect(
        updatedConfig.angularCompilerOptions.enableI18nLegacyMessageIdFormat
      ).toBe(false);
    });
  });
});
