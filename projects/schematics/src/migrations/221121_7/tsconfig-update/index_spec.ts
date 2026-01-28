/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

const collectionPath = join(__dirname, '../../migrations.json');
const MIGRATION_SCRIPT_NAME = '03-migration-v221121_7-tsconfig-update';

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
      expect(updatedConfig).toMatchSnapshot();
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
      expect(updatedConfig).toMatchSnapshot();
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
      expect(updatedConfig).toMatchSnapshot();
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
      expect(updatedConfig).toMatchSnapshot();
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
      expect(updatedConfig).toMatchSnapshot();
    });
  });

  describe('edge cases', () => {
    it('should skip if tsconfig.json does not exist', async () => {
      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

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
      expect(updatedConfig).toMatchSnapshot();
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
      expect(updatedConfig).toMatchSnapshot();
    });
  });
});
