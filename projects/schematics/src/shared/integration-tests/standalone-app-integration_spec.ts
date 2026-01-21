/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  FileNameStyleGuide,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { SPARTACUS_SCHEMATICS } from '../libs-constants';

const collectionPath = path.join(__dirname, '../../collection.json');

/**
 * Integration test for the full standalone app installation flow.
 * This test creates a fresh standalone Angular app, runs add-spartacus,
 * then runs add-ssr, and verifies all modified files.
 */
describe('Standalone App Integration Test', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const standaloneAppOptions: ApplicationOptions = {
    name: 'standalone-integration-test',
    inlineStyle: false,
    inlineTemplate: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    zoneless: false,
    fileNameStyleGuide: FileNameStyleGuide.The2016,
    standalone: true,
  };

  const spartacusOptions: SpartacusOptions = {
    project: 'standalone-integration-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
  };

  beforeAll(async () => {
    // Create workspace
    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    // Create standalone Angular application
    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      standaloneAppOptions,
      appTree
    );

    // Run add-spartacus schematic
    appTree = await schematicRunner.runSchematic(
      'add-spartacus',
      spartacusOptions,
      appTree
    );

    // Run add-ssr schematic
    appTree = await schematicRunner.runSchematic(
      'add-ssr',
      spartacusOptions,
      appTree
    );
  });

  describe('File existence', () => {
    it('should create all required files', () => {
      const projectPath = '/src/app';

      expect(appTree.exists(`${projectPath}/app.component.ts`)).toBe(true);

      // Verify key files exist
      expect(appTree.exists(`${projectPath}/app.config.ts`)).toBe(true);
      expect(appTree.exists(`${projectPath}/app.config.server.ts`)).toBe(true);
      expect(appTree.exists(`${projectPath}/app.module.ts`)).toBe(true);
      expect(appTree.exists(`${projectPath}/app.module.server.ts`)).toBe(true);

      expect(
        appTree.exists(`${projectPath}/spartacus/spartacus.module.ts`)
      ).toBe(true);
    });
  });

  describe('Snapshots', () => {
    it('should match snapshot for app.config.ts (CSR + SSR)', () => {
      const appConfig = appTree.readContent('/src/app/app.config.ts');
      expect(appConfig).toMatchSnapshot();
    });

    it('should match snapshot for app.config.server.ts (if exists)', () => {
      const filePath = '/src/app/app.config.server.ts';
      if (appTree.exists(filePath)) {
        const appConfigServer = appTree.readContent(filePath);
        expect(appConfigServer).toMatchSnapshot();
      } else {
        expect(appTree.exists(filePath)).toBe(false);
      }
    });

    it('should match snapshot for app.component.ts', () => {
      const appComponent = appTree.readContent('/src/app/app.component.ts');
      expect(appComponent).toMatchSnapshot();
    });

    it('should match snapshot for app.module.ts (if exists)', () => {
      const filePath = '/src/app/app.module.ts';
      if (appTree.exists(filePath)) {
        const appModule = appTree.readContent(filePath);
        expect(appModule).toMatchSnapshot();
      } else {
        expect(appTree.exists(filePath)).toBe(false);
      }
    });

    it('should match snapshot for app.module.server.ts (if exists)', () => {
      const filePath = '/src/app/app.module.server.ts';
      if (appTree.exists(filePath)) {
        const appModuleServer = appTree.readContent(filePath);
        expect(appModuleServer).toMatchSnapshot();
      } else {
        expect(appTree.exists(filePath)).toBe(false);
      }
    });

    it('should match snapshot for server.ts (if exists)', () => {
      const filePath = '/src/server.ts';
      if (appTree.exists(filePath)) {
        const serverTs = appTree.readContent(filePath);
        expect(serverTs).toMatchSnapshot();
      } else {
        expect(appTree.exists(filePath)).toBe(false);
      }
    });

    it('should match snapshot for app.component.html (if exists)', () => {
      const filePath = '/src/app/app.component.html';
      if (appTree.exists(filePath)) {
        const appComponentHtml = appTree.readContent(filePath);
        expect(appComponentHtml).toMatchSnapshot();
      } else {
        expect(appTree.exists(filePath)).toBe(false);
      }
    });

    it('should match snapshot for angular.json', () => {
      const angularJson = appTree.readContent('/angular.json');
      const angularObj = JSON.parse(angularJson);
      expect(angularObj).toMatchSnapshot();
    });

    it('should match snapshot for package.json', () => {
      const packageJson = appTree.readContent('/package.json');
      const packageObj = JSON.parse(packageJson);
      expect(packageObj).toMatchSnapshot();
    });

    it('should match snapshot for spartacus.module.ts', () => {
      const spartacusModule = appTree.readContent(
        '/src/app/spartacus/spartacus.module.ts'
      );
      expect(spartacusModule).toMatchSnapshot();
    });

    it('should match snapshot for spartacus-configuration.module.ts', () => {
      const spartacusConfigModule = appTree.readContent(
        '/src/app/spartacus/spartacus-configuration.module.ts'
      );
      expect(spartacusConfigModule).toMatchSnapshot();
    });

    it('should match snapshot for spartacus-features.module.ts', () => {
      const spartacusFeaturesModule = appTree.readContent(
        '/src/app/spartacus/spartacus-features.module.ts'
      );
      expect(spartacusFeaturesModule).toMatchSnapshot();
    });
  });
});
