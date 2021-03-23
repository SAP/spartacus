import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import {
  LibraryOptions as SpartacusQualtricsOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');
const qualtricsModulePath =
  'src/app/spartacus/features/qualtrics/qualtrics-feature.module.ts';

// TODO: Improve tests after lib-util test update
describe('Spartacus Qualtrics schematics: ng-add', () => {
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

  const defaultOptions: SpartacusQualtricsOptions = {
    configuration: 'b2c',
    project: 'schematics-test',
    lazy: true,
    features: [],
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

  describe('Qualtrics feature', () => {
    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should add style import to /src/styles/spartacus/qualtrics-embedded-feedback.scss', async () => {
        const content = appTree.readContent(
          '/src/styles/spartacus/qualtrics-embedded-feedback.scss'
        );
        expect(content).toEqual(`@import "@spartacus/qualtrics";`);
      });

      it('should add update angular.json with spartacus/qualtrics-embedded-feedback.scss', async () => {
        const content = appTree.readContent('/angular.json');
        const angularJson = JSON.parse(content);
        const buildStyles: string[] =
          angularJson.projects['schematics-test'].architect.build.options
            .styles;
        expect(buildStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/qualtrics-embedded-feedback.scss',
        ]);

        const testStyles: string[] =
          angularJson.projects['schematics-test'].architect.test.options.styles;
        expect(testStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/qualtrics-embedded-feedback.scss',
        ]);
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
        const qualtricsModule = appTree.readContent(qualtricsModulePath);
        expect(qualtricsModule).toContain(
          `import { QualtricsRootModule } from "@spartacus/qualtrics/root";`
        );
        expect(qualtricsModule).toContain(
          `import { QualtricsModule } from "@spartacus/qualtrics";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const qualtricsModule = appTree.readContent(qualtricsModulePath);
        expect(qualtricsModule).not.toContain(
          `import('@spartacus/qualtrics').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import QualtricsRootModule and contain the lazy loading syntax', async () => {
        const qualtricsModule = appTree.readContent(qualtricsModulePath);
        expect(qualtricsModule).toContain(
          `import { QualtricsRootModule } from "@spartacus/qualtrics/root";`
        );
        expect(qualtricsModule).toContain(
          `import('@spartacus/qualtrics').then(`
        );
      });

      it('should not contain the QualtricsModule import', () => {
        const qualtricsModule = appTree.readContent(qualtricsModulePath);
        expect(qualtricsModule).not.toContain(
          `import { QualtricsModule } from "@spartacus/qualtrics";`
        );
      });
    });
  });
});
