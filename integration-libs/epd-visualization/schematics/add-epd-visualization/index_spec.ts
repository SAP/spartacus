/// <reference types="jest" />

import { RunSchematicTaskOptions } from '@angular-devkit/schematics/tasks/run-schematic/options';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  EPD_VISUALIZATION_FEATURE_NAME,
  epdFeatureModulePath,
  generateDefaultWorkspace,
  SPARTACUS_EPD_VISUALIZATION,
  SPARTACUS_SCHEMATICS,
  SpartacusEpdVisualizationOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const scssFilePath = 'src/styles/spartacus/epd-visualization.scss';

describe('Spartacus SAP EPD Visualization integration schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_EPD_VISUALIZATION,
    collectionPath
  );

  let appTree: UnitTestTree;

  const libraryNoFeaturesOptions: SpartacusEpdVisualizationOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
    baseUrl: 'https://epd-acc-eu20-consumer.visualization.eu20.acc.epd.dev.sap',
  };

  const visualizationFeatureOptions: SpartacusEpdVisualizationOptions = {
    ...libraryNoFeaturesOptions,
    features: [EPD_VISUALIZATION_FEATURE_NAME],
  };

  describe('Without features', () => {
    beforeAll(async () => {
      appTree = await generateDefaultWorkspace(schematicRunner, appTree);
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        libraryNoFeaturesOptions,
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(epdFeatureModulePath)).toBeFalsy();
    });
  });

  describe('SAP EPD Visualization feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          visualizationFeatureOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(epdFeatureModulePath);
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

      it('should install necessary Spartacus libraries', () => {
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

      it('should run the proper installation tasks', async () => {
        const tasks = schematicRunner.tasks.filter(
          (task) =>
            task.name === 'run-schematic' &&
            (task.options as RunSchematicTaskOptions<{}>).collection ===
              '@sap/epd-visualization'
        );

        expect(tasks.length).toEqual(0);
      });
    });

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...visualizationFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(epdFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('SAP EPD Visualization feature - No compilerOptions in tsconfig', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          visualizationFeatureOptions,
          appTree
        );
      });

      it('should install necessary Spartacus libraries', () => {
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

      it('should run the proper installation tasks', async () => {
        const tasks = schematicRunner.tasks.filter(
          (task) =>
            task.name === 'run-schematic' &&
            (task.options as RunSchematicTaskOptions<{}>).collection ===
              '@sap/epd-visualization'
        );

        expect(tasks.length).toEqual(0);
      });
    });

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...visualizationFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(epdFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
