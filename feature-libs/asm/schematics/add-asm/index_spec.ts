import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import {
  CLI_ASM_FEATURE,
  LibraryOptions as SpartacusAsmOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');
const asmFeatureModulePath =
  'src/app/spartacus/features/asm/asm-feature.module.ts';

// TODO: Improve tests after lib-util test update
describe('Spartacus Asm schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
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

  const defaultOptions: SpartacusAsmOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_ASM_FEATURE],
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    configuration: 'b2c',
    lazy: true,
    features: [],
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

  describe('Asm feature', () => {
    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultOptions, features: [] },
            appTree
          )
          .toPromise();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultOptions, lazy: false },
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
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import AsmRootModule and contain the lazy loading syntax', async () => {
        const asmModule = appTree.readContent(asmFeatureModulePath);
        expect(asmModule).toContain(
          `import { AsmRootModule } from "@spartacus/asm/root";`
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
          .runSchematicAsync('ng-add', defaultOptions, appTree)
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
