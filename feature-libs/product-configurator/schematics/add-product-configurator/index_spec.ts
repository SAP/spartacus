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
  PRODUCT_CONFIGURATOR_CPQ_FEATURE_NAME,
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME,
  PRODUCT_CONFIGURATOR_VC_FEATURE_NAME,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_SCHEMATICS,
  LibraryOptions as SpartacusProductConfiguratorOptions,
  cartBaseFeatureModulePath,
  checkoutFeatureModulePath,
  orderFeatureModulePath,
  productConfiguratorFeatureModulePath,
  productConfiguratorRulebasedWrapperModulePath,
  userFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const scssFilePath = 'src/styles/spartacus/product-configurator.scss';

describe('Spartacus product configurator schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_PRODUCT_CONFIGURATOR,
    collectionPath
  );

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
    standalone: false,
  };

  const libraryNoFeaturesOptions: SpartacusProductConfiguratorOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const libraryOptionsOnlyVC: SpartacusProductConfiguratorOptions = {
    ...libraryNoFeaturesOptions,
    features: [PRODUCT_CONFIGURATOR_VC_FEATURE_NAME],
  };

  const libraryOptionsOnlyCPQ: SpartacusProductConfiguratorOptions = {
    ...libraryNoFeaturesOptions,
    features: [PRODUCT_CONFIGURATOR_CPQ_FEATURE_NAME],
  };

  const libraryOptionsOnlyTextfield: SpartacusProductConfiguratorOptions = {
    ...libraryNoFeaturesOptions,
    features: [PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      '../../projects/schematics/src/collection.json'
    );

    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    );

    appTree = await schematicRunner.runExternalSchematic(
      SPARTACUS_SCHEMATICS,
      'ng-add',
      { ...libraryNoFeaturesOptions, name: 'schematics-test' },
      appTree
    );
  });

  describe('Without features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        libraryNoFeaturesOptions,
        appTree
      );
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

  describe('Product config feature', () => {
    describe('VC', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            libraryOptionsOnlyVC,
            appTree
          );
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(
            productConfiguratorFeatureModulePath
          );
          expect(module).toMatchSnapshot();

          expect(
            appTree.readContent(productConfiguratorRulebasedWrapperModulePath)
          ).toBeFalsy();
        });

        it('should NOT install the required feature dependencies', async () => {
          const userFeatureModule = appTree.readContent(userFeatureModulePath);
          expect(userFeatureModule).toBeFalsy();

          const orderFeatureModule = appTree.readContent(
            orderFeatureModulePath
          );
          expect(orderFeatureModule).toBeFalsy();

          const cartBaseFeatureModule = appTree.readContent(
            cartBaseFeatureModulePath
          );
          expect(cartBaseFeatureModule).toBeFalsy();

          const checkoutFeatureModule = appTree.readContent(
            checkoutFeatureModulePath
          );
          expect(checkoutFeatureModule).toBeFalsy();
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
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            { ...libraryOptionsOnlyVC, lazy: false },
            appTree
          );
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(
            productConfiguratorFeatureModulePath
          );
          expect(module).toMatchSnapshot();

          expect(
            appTree.readContent(productConfiguratorRulebasedWrapperModulePath)
          ).toBeFalsy();
        });
      });
    });

    describe('CPQ', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            libraryOptionsOnlyVC,
            appTree
          );

          appTree = await schematicRunner.runSchematic(
            'ng-add',
            libraryOptionsOnlyCPQ,
            appTree
          );
        });

        it('should add the feature using the lazy loading syntax, and include VC as well', async () => {
          const module = appTree.readContent(
            productConfiguratorFeatureModulePath
          );
          expect(module).toMatchSnapshot();

          const wrapperModule = appTree.readContent(
            productConfiguratorRulebasedWrapperModulePath
          );
          expect(wrapperModule).toMatchSnapshot();
        });

        it('should NOT install the required feature dependencies', async () => {
          const userFeatureModule = appTree.readContent(userFeatureModulePath);
          expect(userFeatureModule).toBeFalsy();

          const orderFeatureModule = appTree.readContent(
            orderFeatureModulePath
          );
          expect(orderFeatureModule).toBeFalsy();

          const cartBaseFeatureModule = appTree.readContent(
            cartBaseFeatureModulePath
          );
          expect(cartBaseFeatureModule).toBeFalsy();

          const checkoutFeatureModule = appTree.readContent(
            checkoutFeatureModulePath
          );
          expect(checkoutFeatureModule).toBeFalsy();
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
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            { ...libraryOptionsOnlyVC, lazy: false },
            appTree
          );

          appTree = await schematicRunner.runSchematic(
            'ng-add',
            { ...libraryOptionsOnlyCPQ, lazy: false },
            appTree
          );
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(
            productConfiguratorFeatureModulePath
          );
          expect(module).toMatchSnapshot();

          expect(
            appTree.readContent(productConfiguratorRulebasedWrapperModulePath)
          ).toBeFalsy();
        });
      });
    });

    describe('Textfield', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            libraryOptionsOnlyTextfield,
            appTree
          );
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(
            productConfiguratorFeatureModulePath
          );
          expect(module).toMatchSnapshot();

          expect(
            appTree.readContent(productConfiguratorRulebasedWrapperModulePath)
          ).toBeFalsy();
        });

        it('should NOT install the required feature dependencies', async () => {
          const userFeatureModule = appTree.readContent(userFeatureModulePath);
          expect(userFeatureModule).toBeFalsy();

          const orderFeatureModule = appTree.readContent(
            orderFeatureModulePath
          );
          expect(orderFeatureModule).toBeFalsy();

          const cartBaseFeatureModule = appTree.readContent(
            cartBaseFeatureModulePath
          );
          expect(cartBaseFeatureModule).toBeFalsy();

          const checkoutFeatureModule = appTree.readContent(
            checkoutFeatureModulePath
          );
          expect(checkoutFeatureModule).toBeFalsy();
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
          it('configuration should not be added', () => {
            const configurationModule = appTree.readContent(
              `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
            );
            expect(configurationModule).toMatchSnapshot();
          });
        });
      });

      describe('eager loading', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            { ...libraryOptionsOnlyTextfield, lazy: false },
            appTree
          );
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(
            productConfiguratorFeatureModulePath
          );
          expect(module).toMatchSnapshot();

          expect(
            appTree.readContent(productConfiguratorRulebasedWrapperModulePath)
          ).toBeFalsy();
        });
      });
    });

    describe('CPQ and Textfield', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            libraryOptionsOnlyVC,
            appTree
          );

          appTree = await schematicRunner.runSchematic(
            'ng-add',
            {
              ...libraryNoFeaturesOptions,
              features: [
                PRODUCT_CONFIGURATOR_CPQ_FEATURE_NAME,
                PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME,
              ],
            },
            appTree
          );
        });

        it('should add the feature using the lazy loading syntax, including VC as well', async () => {
          const module = appTree.readContent(
            productConfiguratorFeatureModulePath
          );
          expect(module).toMatchSnapshot();

          const wrapperModule = appTree.readContent(
            productConfiguratorRulebasedWrapperModulePath
          );
          expect(wrapperModule).toMatchSnapshot();
        });

        it('should NOT install the required feature dependencies', async () => {
          const userFeatureModule = appTree.readContent(userFeatureModulePath);
          expect(userFeatureModule).toBeFalsy();

          const orderFeatureModule = appTree.readContent(
            orderFeatureModulePath
          );
          expect(orderFeatureModule).toBeFalsy();

          const cartBaseFeatureModule = appTree.readContent(
            cartBaseFeatureModulePath
          );
          expect(cartBaseFeatureModule).toBeFalsy();

          const checkoutFeatureModule = appTree.readContent(
            checkoutFeatureModulePath
          );
          expect(checkoutFeatureModule).toBeFalsy();
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
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            { ...libraryOptionsOnlyVC, lazy: false },
            appTree
          );

          appTree = await schematicRunner.runSchematic(
            'ng-add',
            {
              ...libraryNoFeaturesOptions,
              features: [
                PRODUCT_CONFIGURATOR_CPQ_FEATURE_NAME,
                PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME,
              ],
              lazy: false,
            },
            appTree
          );
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(
            productConfiguratorFeatureModulePath
          );
          expect(module).toMatchSnapshot();

          expect(
            appTree.readContent(productConfiguratorRulebasedWrapperModulePath)
          ).toBeFalsy();
        });
      });
    });
  });
});
