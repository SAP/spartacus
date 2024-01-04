import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { ANGULAR_SSR } from '../shared/constants';
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';
import { getPathResultsForFile } from '../shared/utils/file-utils';

const collectionPath = path.join(__dirname, '../collection.json');

describe('add-ssr', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
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

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
  };

  beforeEach(async () => {
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

    appTree = await schematicRunner.runSchematic(
      'add-spartacus',
      { ...defaultOptions, name: 'schematics-test' },
      appTree
    );

    appTree = await schematicRunner.runSchematic(
      'add-ssr',
      { ...defaultOptions, name: 'schematics-test' },
      appTree
    );
  });

  describe('package.json', () => {
    it('should add SSR dependencies', async () => {
      const packageJson = appTree.readContent('/package.json');
      const packageObj = JSON.parse(packageJson);
      const depPackageList = Object.keys(packageObj.dependencies);

      expect(depPackageList.includes('@angular/platform-server')).toBe(true);
      expect(depPackageList.includes(ANGULAR_SSR)).toBe(true);
      expect(depPackageList.includes('@spartacus/setup')).toBe(true);
    });
  });

  describe('angular.json', () => {
    it('should be configured properly', async () => {
      const angularJson = appTree.readContent('/angular.json');
      const angularObj = JSON.parse(angularJson);
      expect(angularObj).toMatchSnapshot();
    });
  });

  describe('server.ts', () => {
    it('should be configured properly', async () => {
      const serverTs = appTree.readContent('/server.ts');
      expect(serverTs).toMatchSnapshot();
    });
  });

  describe('app.module.server.ts', () => {
    it('should be updated', () => {
      const content = appTree.readContent('./src/app/app.module.server.ts');
      expect(content).toMatchSnapshot();
    });
  });

  describe('app.module.ts', () => {
    it('should be updated', () => {
      const content = appTree.readContent('./src/app/app.module.ts');
      expect(content).toMatchSnapshot();
    });
  });

  describe('index.html', () => {
    it('should contain occ-backend-base-url attribute in meta tags', async () => {
      const indexHtmlPath = getPathResultsForFile(
        appTree,
        'index.html',
        '/src'
      )[0];
      const indexHtml = appTree.readContent(indexHtmlPath);
      expect(indexHtml).toMatchSnapshot();
    });
  });
});
