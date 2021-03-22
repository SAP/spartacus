import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import {
  LibraryOptions as SpartacusPersonalizationOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import { CLI_PERSONALIZATION_FEATURE } from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const personalizationModulePath =
  'src/app/spartacus/features/personalization-feature.module.ts';

// TODO: Improve tests after lib-util test update
describe('Spartacus Personalization schematics: ng-add', () => {
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

  const defaultOptions: SpartacusPersonalizationOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_PERSONALIZATION_FEATURE],
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    configuration: 'b2c',
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      '@spartacus/schematics',
      '../../projects/schematics/src/collection.json'
    );
    schematicRunner.registerCollection(
      '@spartacus/organization',
      '../../feature-libs/organization/schematics/collection.json'
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

  describe('Personalization feature', () => {
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
        const personalizationModule = appTree.readContent(
          personalizationModulePath
        );
        expect(personalizationModule).toContain(
          `import { PersonalizationRootModule } from "@spartacus/tracking/personalization/root";`
        );
        expect(personalizationModule).toContain(
          `import { PersonalizationModule } from "@spartacus/tracking/personalization";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const personalizationModule = appTree.readContent(
          personalizationModulePath
        );
        expect(personalizationModule).not.toContain(
          `import('@spartacus/tracking/personalization').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import PersonalizationRootModule and contain the lazy loading syntax', async () => {
        const personalizationModule = appTree.readContent(
          personalizationModulePath
        );
        expect(personalizationModule).toContain(
          `import { PersonalizationRootModule } from "@spartacus/tracking/personalization/root";`
        );
        expect(personalizationModule).toContain(
          `import('@spartacus/tracking/personalization').then(`
        );
      });

      it('should not contain the PersonalizationModule import', () => {
        const personalizationModule = appTree.readContent(
          personalizationModulePath
        );
        expect(personalizationModule).not.toContain(
          `import { PersonalizationModule } from "@spartacus/tracking/personalization";`
        );
      });
    });
  });

  describe('when other Spartacus features are already installed', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          '@spartacus/organization',
          'ng-add',
          { ...spartacusDefaultOptions, name: 'schematics-test' },
          appTree
        )
        .toPromise();
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();
    });

    it('should just append personalization feature without duplicating the featureModules config', () => {
      const personalizationModule = appTree.readContent(
        personalizationModulePath
      );
      expect(personalizationModule.match(/featureModules:/g)?.length).toEqual(
        1
      );
      expect(personalizationModule).toContain(`personalization: {`);
    });
  });
});
