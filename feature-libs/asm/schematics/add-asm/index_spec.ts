/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import {
  CLI_ASM_FEATURE,
  LibraryOptions as SpartacusAsmOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');
const asmFeatureModulePath =
  'src/app/spartacus/features/asm/asm-feature.module.ts';

describe('Spartacus Asm schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    configuration: 'b2c',
    lazy: true,
    features: [],
  };

  const defaultFeatureOptions: SpartacusAsmOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_ASM_FEATURE],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      '@spartacus/schematics',
      '../../projects/schematics/src/collection.json'
    );

    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@spartacus/schematics',
        'ng-add',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('When no features are provided', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          { ...defaultFeatureOptions, features: [] },
          appTree
        )
        .toPromise();
    });

    it('should not create the feature module', () => {
      const featureModule = appTree.readContent(asmFeatureModulePath);
      expect(featureModule).toBeFalsy();
    });
    it('should not add the feature to the feature module', () => {
      const spartacusFeaturesModule = appTree.readContent(
        'src/app/spartacus/spartacus-features.module.ts'
      );
      expect(spartacusFeaturesModule).toMatchSnapshot();
    });
  });

  describe('Asm feature', () => {
    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
          .toPromise();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultFeatureOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const asmModule = appTree.readContent(asmFeatureModulePath);
        expect(asmModule).toContain(
          `import { AsmRootModule } from "@spartacus/asm/root";`
        );
        expect(asmModule).toContain(
          `import { AsmModule } from "@spartacus/asm";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const asmModule = appTree.readContent(asmFeatureModulePath);
        expect(asmModule).not.toContain(`import('@spartacus/asm').then(`);
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
          .toPromise();
      });

      it('should import AsmRootModule and contain the lazy loading syntax', async () => {
        const asmModule = appTree.readContent(asmFeatureModulePath);
        expect(asmModule).toContain(
          `import { AsmRootModule, ASM_FEATURE } from "@spartacus/asm/root";`
        );
        expect(asmModule).toContain(`import('@spartacus/asm').then(`);
      });

      it('should not contain the AsmModule import', () => {
        const asmModule = appTree.readContent(asmFeatureModulePath);
        expect(asmModule).not.toContain(
          `import { AsmModule } from "@spartacus/asm";`
        );
      });
    });
    describe('i18n', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
          .toPromise();
      });

      it('should import the i18n resource and chunk from assets', async () => {
        const asmModule = appTree.readContent(asmFeatureModulePath);
        expect(asmModule).toContain(
          `import { asmTranslationChunksConfig, asmTranslations } from "@spartacus/asm/assets";`
        );
      });
      it('should provideConfig', async () => {
        const asmModule = appTree.readContent(asmFeatureModulePath);
        expect(asmModule).toContain(`resources: asmTranslations,`);
        expect(asmModule).toContain(`chunks: asmTranslationChunksConfig,`);
      });
    });
  });
});
