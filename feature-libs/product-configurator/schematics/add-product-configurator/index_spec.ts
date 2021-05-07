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
  LibraryOptions as SpartacusProductConfiguratorOptions,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { CLI_CPQ_FEATURE, CLI_TEXTFIELD_FEATURE } from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const spartacusFeaturesModulePath =
  'src/app/spartacus/spartacus-features.module.ts';
const featureModulePath =
  'src/app/spartacus/features/product-configurator/product-configurator-feature.module.ts';
const scssFilePath = 'src/styles/spartacus/product-configurator.scss';

describe('Spartacus product configurator schematics: ng-add', () => {
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

  const defaultFeatureOptions: SpartacusProductConfiguratorOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const optionsIncludingCpq: SpartacusProductConfiguratorOptions = {
    ...defaultFeatureOptions,
    features: [CLI_CPQ_FEATURE],
  };

  const optionsIncludingTextfield: SpartacusProductConfiguratorOptions = {
    ...defaultFeatureOptions,
    features: [CLI_TEXTFIELD_FEATURE],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
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
        { ...defaultFeatureOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('Product config feature', () => {
    describe('Rulebased', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
            .toPromise();
        });

        it('should install necessary Spartacus libraries', async () => {
          const packageJson = appTree.readContent('package.json');
          expect(packageJson).toMatchSnapshot();
        });

        it('should import feature module to SpartacusFeaturesModule', () => {
          const spartacusFeaturesModule = appTree.readContent(
            spartacusFeaturesModulePath
          );
          expect(spartacusFeaturesModule).toMatchSnapshot();
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });

        describe('styling', () => {
          it('should create a proper scss file', () => {
            const scssContent = appTree.readContent(scssFilePath);
            expect(scssContent).toMatchSnapshot();
          });

          it('should update angular.json', async () => {
            const content = appTree.readContent('/angular.json');
            expect(content).toMatchSnapshot();
          });
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
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });

    describe('Rulebased with CPQ', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', optionsIncludingCpq, appTree)
            .toPromise();
        });

        it('should install necessary Spartacus libraries', async () => {
          const packageJson = appTree.readContent('package.json');
          expect(packageJson).toMatchSnapshot();
        });

        it('should import feature module to SpartacusFeaturesModule', () => {
          const spartacusFeaturesModule = appTree.readContent(
            spartacusFeaturesModulePath
          );
          expect(spartacusFeaturesModule).toMatchSnapshot();
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });

        describe('styling', () => {
          it('should create a proper scss file', () => {
            const scssContent = appTree.readContent(scssFilePath);
            expect(scssContent).toMatchSnapshot();
          });

          it('should update angular.json', async () => {
            const content = appTree.readContent('/angular.json');
            expect(content).toMatchSnapshot();
          });
        });

        describe('b2b features', () => {
          it('configuration should be added', () => {
            const configurationModule = appTree.readContent(
              `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
            );
            expect(configurationModule).toMatchSnapshot();
          });
        });
      });

      describe('eager loading', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              { ...optionsIncludingCpq, lazy: false },
              appTree
            )
            .toPromise();
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });

    describe('Rulebased with Textfield', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', optionsIncludingTextfield, appTree)
            .toPromise();
        });

        it('should install necessary Spartacus libraries', async () => {
          const packageJson = appTree.readContent('package.json');
          expect(packageJson).toMatchSnapshot();
        });

        it('should import feature module to SpartacusFeaturesModule', () => {
          const spartacusFeaturesModule = appTree.readContent(
            spartacusFeaturesModulePath
          );
          expect(spartacusFeaturesModule).toMatchSnapshot();
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });

        describe('styling', () => {
          it('should create a proper scss file', () => {
            const scssContent = appTree.readContent(scssFilePath);
            expect(scssContent).toMatchSnapshot();
          });

          it('should update angular.json', async () => {
            const content = appTree.readContent('/angular.json');
            expect(content).toMatchSnapshot();
          });
        });

        describe('b2b features', () => {
          it('configuration should be added', () => {
            const configurationModule = appTree.readContent(
              `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
            );
            expect(configurationModule).toMatchSnapshot();
          });
        });
      });

      describe('eager loading', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              { ...optionsIncludingTextfield, lazy: false },
              appTree
            )
            .toPromise();
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });

    describe('Rulebased with both CPQ and Textfield', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...defaultFeatureOptions,
                features: [CLI_CPQ_FEATURE, CLI_TEXTFIELD_FEATURE],
              },
              appTree
            )
            .toPromise();
        });

        it('should install necessary Spartacus libraries', async () => {
          const packageJson = appTree.readContent('package.json');
          expect(packageJson).toMatchSnapshot();
        });

        it('should import feature module to SpartacusFeaturesModule', () => {
          const spartacusFeaturesModule = appTree.readContent(
            spartacusFeaturesModulePath
          );
          expect(spartacusFeaturesModule).toMatchSnapshot();
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });

        describe('styling', () => {
          it('should create a proper scss file', () => {
            const scssContent = appTree.readContent(scssFilePath);
            expect(scssContent).toMatchSnapshot();
          });

          it('should update angular.json', async () => {
            const content = appTree.readContent('/angular.json');
            expect(content).toMatchSnapshot();
          });
        });

        describe('b2b features', () => {
          it('configuration should be added', () => {
            const configurationModule = appTree.readContent(
              `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
            );
            expect(configurationModule).toMatchSnapshot();
          });
        });
      });

      describe('eager loading', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...defaultFeatureOptions,
                features: [CLI_CPQ_FEATURE, CLI_TEXTFIELD_FEATURE],
                lazy: false,
              },
              appTree
            )
            .toPromise();
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });
  });
});
