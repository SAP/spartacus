import { Tree } from '@angular-devkit/schematics';
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
import { UTF_8 } from '../constants';
import { SPARTACUS_SCHEMATICS } from '../libs-constants';
import {
  getMajorVersionNumber,
  getServerTsPathForApplicationBuilder,
  getSpartacusCurrentFeatureLevel,
  getSpartacusSchematicsVersion,
  isSsrUsed,
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
    zoneless: false,
    fileNameStyleGuide: FileNameStyleGuide.The2016,
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
      expect(featureLevel).toMatch(/\d+\.\d+/);
      expect(featureLevel).toEqual(
        version.substring(0, version.lastIndexOf('.'))
      );
    });
  });

  describe('SSR Application Builder Tests', () => {
    let ssrTree: UnitTestTree;

    const createWorkspace = (
      builderType: string,
      serverPath?: string,
      ssrEntry?: string,
      additionalOptions: Record<string, unknown> = {},
      configurations: Record<string, unknown> = {}
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
                  ...additionalOptions,
                },
                configurations,
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

      it('should return true when using @angular/build:application builder with SSR', () => {
        createWorkspace(
          '@angular/build:application',
          'src/main.server.ts',
          'server.ts'
        );
        ssrTree.create('server.ts', 'export const server = {};');
        expect(isSsrUsed(ssrTree)).toBeTruthy();
      });

      it.each([
        { name: 'disabled SSR', options: { ssr: false } },
        { name: 'missing entry', options: { ssr: {} } },
        { name: 'missing server', options: { server: undefined } },
        { name: 'invalid entry', options: { ssr: { entry: 42 } } },
        { name: 'invalid server', options: { server: true } },
      ])(
        'returns false for $name despite an existing server file',
        ({ options }) => {
          createWorkspace(
            '@angular/build:application',
            'src/main.server.ts',
            'server.ts',
            options
          );
          ssrTree.create('server.ts', 'export const server = {};');

          expect(isSsrUsed(ssrTree)).toBe(false);
        }
      );

      it.each(['', ' \n  '])(
        'returns false for an empty server entry',
        (content) => {
          createWorkspace(
            '@angular/build:application',
            'src/main.server.ts',
            'server.ts'
          );
          ssrTree.create('server.ts', content);

          expect(isSsrUsed(ssrTree)).toBe(false);
        }
      );

      it('does not infer SSR from its dependency or an unconfigured server file', () => {
        createWorkspace('@angular/build:application');
        ssrTree.create('server.ts', 'export const server = {};');
        ssrTree.create(
          'package.json',
          JSON.stringify({ dependencies: { '@angular/ssr': '21.2.23' } })
        );

        expect(isSsrUsed(ssrTree)).toBe(false);
      });

      it('accepts SSR with prerender disabled and a separate noSsr configuration', () => {
        createWorkspace(
          '@angular/build:application',
          'src/main.server.ts',
          'server.ts',
          { prerender: false },
          { noSsr: { ssr: false, server: undefined } }
        );
        ssrTree.create('server.ts', 'export const server = {};');

        expect(isSsrUsed(ssrTree)).toBe(true);
      });

      it('uses the selected project consistently when finding the server entry', () => {
        ssrTree.create(
          'angular.json',
          JSON.stringify({
            projects: {
              csr: {
                architect: {
                  build: { builder: '@angular/build:application', options: {} },
                },
              },
              ssr: {
                architect: {
                  build: {
                    builder: '@angular/build:application',
                    options: {
                      server: 'ssr/main.server.ts',
                      ssr: { entry: 'ssr/server.ts' },
                    },
                  },
                },
              },
            },
          })
        );
        ssrTree.create('ssr/server.ts', 'export const server = {};');

        expect(isSsrUsed(ssrTree)).toBe(false);
        expect(isSsrUsed(ssrTree, 'csr')).toBe(false);
        expect(isSsrUsed(ssrTree, 'ssr')).toBe(true);
        expect(getServerTsPathForApplicationBuilder(ssrTree, 'ssr')).toBe(
          'ssr/server.ts'
        );
        expect(getServerTsPathForApplicationBuilder(ssrTree, 'csr')).toBeNull();
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
