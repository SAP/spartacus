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

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    zoneless: false,
    fileNameStyleGuide: FileNameStyleGuide.The2016,
  };

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
  };

  async function buildBaseTree(): Promise<UnitTestTree> {
    let tree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );
    tree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      tree
    );
    tree = await schematicRunner.runSchematic(
      'add-spartacus',
      { ...defaultOptions, name: 'schematics-test' },
      tree
    );
    return tree;
  }

  describe('without runtimeConfig', () => {
    let appTree: UnitTestTree;

    beforeAll(async () => {
      const base = await buildBaseTree();
      appTree = await schematicRunner.runSchematic(
        'add-ssr',
        { ...defaultOptions, name: 'schematics-test' },
        base
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
        const serverTs = appTree.readContent('src/server.ts');
        expect(serverTs).toMatchSnapshot();
      });
    });

    describe('app.module.server.ts', () => {
      it('should be updated', () => {
        const content = appTree.readContent('./src/app/app.module.server.ts');
        expect(content).toMatchSnapshot();
      });
    });

    describe('app.config.ts', () => {
      it('should be updated', () => {
        const content = appTree.readContent('./src/app/app.config.ts');
        expect(content).toMatchSnapshot();
      });
    });

    describe('app.config.server.ts', () => {
      it('should be updated', () => {
        const content = appTree.readContent('./src/app/app.config.server.ts');
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

  describe('with runtimeConfig', () => {
    let appTree: UnitTestTree;

    beforeAll(async () => {
      const base = await buildBaseTree();
      appTree = await schematicRunner.runSchematic(
        'add-ssr',
        { ...defaultOptions, name: 'schematics-test', runtimeConfig: true },
        base
      );
    });

    describe('server.ts', () => {
      it('should wire getServerRuntimeEnvironment', async () => {
        const serverTs = appTree.readContent('src/server.ts');
        expect(serverTs).toMatchSnapshot();
      });

      it('should import getServerRuntimeEnvironment from @spartacus/setup', () => {
        const serverTs = appTree.readContent('src/server.ts');
        expect(serverTs).toContain('getServerRuntimeEnvironment');
        expect(serverTs).toContain('@spartacus/setup');
      });

      it('should inject RUNTIME_ENVIRONMENT provider', () => {
        const serverTs = appTree.readContent('src/server.ts');
        expect(serverTs).toContain('RUNTIME_ENVIRONMENT');
      });

      it('should make run() async', () => {
        const serverTs = appTree.readContent('src/server.ts');
        expect(serverTs).toContain('async function run');
      });
    });
  });
});
