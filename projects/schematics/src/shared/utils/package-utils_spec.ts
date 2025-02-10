import { Tree } from '@angular-devkit/schematics';
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
import { UTF_8 } from '../constants';
import { SPARTACUS_SCHEMATICS } from '../libs-constants';
import {
  isSsrUsed,
  getMajorVersionNumber,
  getServerTsPathForApplicationBuilder,
  getSpartacusCurrentFeatureLevel,
  getSpartacusSchematicsVersion,
  readPackageJson,
} from './package-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner(
  SPARTACUS_SCHEMATICS,
  collectionPath
);

describe('Package utils', () => {
  let appTree: UnitTestTree;
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
    standalone: false,
  };
  const defaultOptions = {
    project: 'schematics-test',
  };

  beforeAll(async () => {
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
      defaultOptions,
      appTree
    );
  });

  describe('readPackageJson', () => {
    it('should return parsed package.json content', async () => {
      const buffer = appTree.read('package.json');

      if (buffer) {
        const packageJsonObject = JSON.parse(buffer.toString(UTF_8));
        expect(packageJsonObject).toEqual(readPackageJson(appTree));
      }
    });
  });

  describe('getMajorVersionNumber', () => {
    it('should return the major number', () => {
      const testVersion = '9.0.0';
      const majorVersion = getMajorVersionNumber(testVersion);
      expect(majorVersion).toEqual(9);
    });
    it('should return the major number even if the version string starts with a character', () => {
      const testVersion = '^9.0.0';
      const majorVersion = getMajorVersionNumber(testVersion);
      expect(majorVersion).toEqual(9);
    });
  });

  describe('getSpartacusSchematicsVersion', () => {
    it('should return spartacus version', async () => {
      const version = getSpartacusSchematicsVersion();
      expect(version).toBeTruthy();
      expect(version.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('getSpartacusCurrentFeatureLevel', () => {
    it('should return feature level based on spartacus current version', async () => {
      const version = getSpartacusSchematicsVersion();
      const featureLevel = getSpartacusCurrentFeatureLevel();
      expect(featureLevel).toBeTruthy();
      expect(featureLevel.length).toEqual(7);
      expect(featureLevel).toEqual(version.substring(0, 7));
    });
  });

  describe('SSR Application Builder Tests', () => {
    let ssrTree: UnitTestTree;

    const createWorkspace = (
      builderType: string,
      serverPath?: string,
      ssrEntry?: string
    ) => {
      const angularJson = {
        projects: {
          test: {
            architect: {
              build: {
                builder: builderType,
                options: {
                  ...(serverPath && { server: serverPath }),
                  ...(ssrEntry && { ssr: { entry: ssrEntry } }),
                },
              },
            },
          },
        },
      };
      ssrTree.create('angular.json', JSON.stringify(angularJson));
    };

    beforeEach(() => {
      ssrTree = new UnitTestTree(Tree.empty());
    });

    describe('isSsrUsed', () => {
      it('should return false when builder is not application builder', () => {
        createWorkspace('@angular-devkit/build-angular:browser');
        expect(isSsrUsed(ssrTree)).toBeFalsy();
      });

      it('should return false when SSR config is missing', () => {
        createWorkspace('@angular-devkit/build-angular:application');
        expect(isSsrUsed(ssrTree)).toBeFalsy();
      });

      it('should return false when server file does not exist', () => {
        createWorkspace(
          '@angular-devkit/build-angular:application',
          'src/main.server.ts',
          'server.ts'
        );
        expect(isSsrUsed(ssrTree)).toBeFalsy();
      });

      it('should return true when SSR is properly configured and server file exists', () => {
        createWorkspace(
          '@angular-devkit/build-angular:application',
          'src/main.server.ts',
          'server.ts'
        );
        ssrTree.create('server.ts', 'export const server = {};');
        expect(isSsrUsed(ssrTree)).toBeTruthy();
      });
    });

    describe('getServerTsPathForApplicationBuilder', () => {
      it('should return configured SSR entry path when it exists', () => {
        createWorkspace(
          '@angular-devkit/build-angular:application',
          'src/main.server.ts',
          'custom/server.ts'
        );
        ssrTree.create('custom/server.ts', 'export const server = {};');
        expect(getServerTsPathForApplicationBuilder(ssrTree)).toBe(
          'custom/server.ts'
        );
      });

      it('should return null when configured SSR entry path does not exist', () => {
        createWorkspace(
          '@angular-devkit/build-angular:application',
          'src/main.server.ts',
          'custom/server.ts'
        );
        expect(getServerTsPathForApplicationBuilder(ssrTree)).toBeNull();
      });

      it('should return null when no server file exists in any location', () => {
        createWorkspace('@angular-devkit/build-angular:application');
        expect(getServerTsPathForApplicationBuilder(ssrTree)).toBeNull();
      });
    });
  });
});
