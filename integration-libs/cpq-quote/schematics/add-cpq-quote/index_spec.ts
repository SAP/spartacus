/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  CART_BASE_FEATURE_NAME,
  cartBaseWrapperModulePath,
  CPQ_QUOTE_FEATURE_NAME,
  generateDefaultWorkspace,
  LibraryOptions as SpartacusCpqQuoteOptions,
  orderFeatureModulePath,
  SPARTACUS_CART_BASE,
  SPARTACUS_CPQ_QUOTE,
  SPARTACUS_SCHEMATICS,
  userFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const featureModulePath =
  'src/app/spartacus/features/cpq-quote/cpq-quote-feature.module.ts';
describe('Spartacus Cpq-quote', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_CPQ_QUOTE,
    collectionPath
  );

  let appTree: UnitTestTree;

  const libraryNoFeaturesOptions: SpartacusCpqQuoteOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const cartBaseFeatureOptions: SpartacusCpqQuoteOptions = {
    ...libraryNoFeaturesOptions,
    features: [CART_BASE_FEATURE_NAME],
  };

  const cpqQuoteFeatureOptions: SpartacusCpqQuoteOptions = {
    ...libraryNoFeaturesOptions,
    features: [CPQ_QUOTE_FEATURE_NAME],
  };

  async function generateWorkspace() {
    schematicRunner.registerCollection(
      SPARTACUS_CART_BASE,
      path.join(
        __dirname,
        '../../../../feature-libs/checkout/schematics/collection.json'
      )
    );
    return (appTree = await generateDefaultWorkspace(schematicRunner, appTree));
  }

  describe('Without features', () => {
    beforeAll(async () => {
      appTree = await generateWorkspace();
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        libraryNoFeaturesOptions,
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(featureModulePath)).toBeFalsy();
    });
  });

  describe('CPQ-QUOTE feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateWorkspace();
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          cartBaseFeatureOptions,
          appTree
        );

        appTree = await schematicRunner.runSchematic(
          'ng-add',
          cpqQuoteFeatureOptions,
          appTree
        );
      });

      it('should install necessary Spartacus libraries', async () => {
        const packageJson = JSON.parse(appTree.readContent('package.json'));
        let dependencies: Record<string, string> = {};
        dependencies = { ...packageJson.dependencies };
        dependencies = { ...dependencies, ...packageJson.devDependencies };

        for (const toAdd in peerDependencies) {
          if (
            !peerDependencies.hasOwnProperty(toAdd) ||
            toAdd === SPARTACUS_SCHEMATICS
          ) {
            continue;
          }
          const expectedDependency = dependencies[toAdd];
          expect(expectedDependency).toBeTruthy();
        }
      });

      it('should NOT install the required feature dependencies', async () => {
        const userFeatureModule = appTree.readContent(userFeatureModulePath);
        expect(userFeatureModule).toBeFalsy();

        const orderFeatureModule = appTree.readContent(orderFeatureModulePath);
        expect(orderFeatureModule).toBeFalsy();
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(featureModulePath);
        expect(module).toMatchSnapshot();

        const wrapperModule = appTree.readContent(cartBaseWrapperModulePath);
        expect(wrapperModule).toMatchSnapshot();
      });
    });
  });

  describe('eager loading', () => {
    beforeAll(async () => {
      appTree = await generateWorkspace();
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        { ...cartBaseFeatureOptions, lazy: false },
        appTree
      );

      appTree = await schematicRunner.runSchematic(
        'ng-add',
        { ...cpqQuoteFeatureOptions, lazy: false },
        appTree
      );
    });

    it('should import appropriate modules', async () => {
      const module = appTree.readContent(featureModulePath);
      expect(module).toMatchSnapshot();

      expect(appTree.readContent(cartBaseWrapperModulePath)).toBeFalsy();
    });
  });
});
