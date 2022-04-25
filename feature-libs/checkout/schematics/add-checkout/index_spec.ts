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
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  LibraryOptions as SpartacusCheckoutOptions,
  SpartacusOptions,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const featureModulePath =
  'src/app/spartacus/features/checkout/checkout-feature.module.ts';
const scssFilePath = 'src/styles/spartacus/checkout.scss';

describe('Spartacus Checkout schematics: ng-add', () => {
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
    lazy: true,
    features: [],
  };

  const libraryNoFeaturesOptions: SpartacusCheckoutOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const checkoutBaseFeatureOptions: SpartacusCheckoutOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_CHECKOUT_BASE_FEATURE],
  };

  const checkoutB2BFeatureOptions: SpartacusCheckoutOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_CHECKOUT_B2B_FEATURE],
  };

  const checkoutScheduledReplenishmentFeatureOptions: SpartacusCheckoutOptions =
    {
      ...libraryNoFeaturesOptions,
      features: [CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE],
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
        SPARTACUS_SCHEMATICS,
        'ng-add',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('Without features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          { ...libraryNoFeaturesOptions, features: [] },
          appTree
        )
        .toPromise();
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(featureModulePath)).toBeFalsy();
    });

    it('should install necessary Spartacus libraries', () => {
      const packageJson = JSON.parse(appTree.readContent('package.json'));
      let dependencies: Record<string, string> = {};
      dependencies = { ...packageJson.dependencies };
      dependencies = { ...dependencies, ...packageJson.devDependencies };

      for (const toAdd in peerDependencies) {
        // skip the SPARTACUS_SCHEMATICS, as those are added only when running by the Angular CLI, and not in the testing environment
        if (
          !peerDependencies.hasOwnProperty(toAdd) ||
          toAdd === SPARTACUS_SCHEMATICS
        ) {
          continue;
        }
        // TODO: after 4.0: use this test, as we'll have synced versions between lib's and root package.json
        // const expectedVersion = (peerDependencies as Record<
        //   string,
        //   string
        // >)[toAdd];
        const expectedDependency = dependencies[toAdd];
        expect(expectedDependency).toBeTruthy();
        // expect(expectedDependency).toEqual(expectedVersion);
      }
    });
  });

  describe('Checkout feature', () => {
    describe('base', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', checkoutBaseFeatureOptions, appTree)
            .toPromise();
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
              { ...checkoutBaseFeatureOptions, lazy: false },
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

    describe('b2b', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', checkoutB2BFeatureOptions, appTree)
            .toPromise();
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
              { ...checkoutB2BFeatureOptions, lazy: false },
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

    describe('scheduled replenishment', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              checkoutScheduledReplenishmentFeatureOptions,
              appTree
            )
            .toPromise();
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
              { ...checkoutScheduledReplenishmentFeatureOptions, lazy: false },
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
