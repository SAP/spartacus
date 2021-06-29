import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import {
  ProjectType,
  WorkspaceProject,
} from '@schematics/angular/utility/workspace-models';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { SPARTACUS_CORE } from '../../shared/constants';
import {
  buildDefaultPath,
  getAngularJsonFile,
  getDefaultProjectNameFromWorkspace,
  getProject,
  getProjectFromWorkspace,
  getProjectTargets,
  getSourceRoot,
  getWorkspace,
  isWorkspaceProject,
  isWorkspaceSchema,
  validateSpartacusInstallation,
} from './workspace-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);
const expectedProject = {
  architect: {
    build: {
      builder: '@angular-devkit/build-angular:browser',
      configurations: {
        production: {
          budgets: [
            {
              maximumError: '5mb',
              maximumWarning: '2mb',
              type: 'initial',
            },
            {
              maximumError: '10kb',
              maximumWarning: '6kb',
              type: 'anyComponentStyle',
            },
          ],
          buildOptimizer: true,
          extractCss: true,
          extractLicenses: true,
          fileReplacements: [
            {
              replace: 'src/environments/environment.ts',
              with: 'src/environments/environment.prod.ts',
            },
          ],
          namedChunks: false,
          optimization: true,
          outputHashing: 'all',
          sourceMap: false,
          vendorChunk: false,
        },
      },
      options: {
        aot: true,
        assets: ['src/favicon.ico', 'src/assets'],
        index: 'src/index.html',
        main: 'src/main.ts',
        outputPath: 'dist/schematics-test',
        polyfills: 'src/polyfills.ts',
        scripts: [],
        styles: ['src/styles.scss'],
        tsConfig: 'tsconfig.app.json',
      },
    },
    e2e: {
      builder: '@angular-devkit/build-angular:protractor',
      configurations: {
        production: {
          devServerTarget: 'schematics-test:serve:production',
        },
      },
      options: {
        devServerTarget: 'schematics-test:serve',
        protractorConfig: 'e2e/protractor.conf.js',
      },
    },
    'extract-i18n': {
      builder: '@angular-devkit/build-angular:extract-i18n',
      options: {
        browserTarget: 'schematics-test:build',
      },
    },
    lint: {
      builder: '@angular-devkit/build-angular:tslint',
      options: {
        exclude: ['**/node_modules/**'],
        tsConfig: [
          'tsconfig.app.json',
          'tsconfig.spec.json',
          'e2e/tsconfig.json',
        ],
      },
    },
    serve: {
      builder: '@angular-devkit/build-angular:dev-server',
      configurations: {
        production: {
          browserTarget: 'schematics-test:build:production',
        },
      },
      options: {
        browserTarget: 'schematics-test:build',
      },
    },
    test: {
      builder: '@angular-devkit/build-angular:karma',
      options: {
        assets: ['src/favicon.ico', 'src/assets'],
        karmaConfig: 'karma.conf.js',
        main: 'src/test.ts',
        polyfills: 'src/polyfills.ts',
        scripts: [],
        styles: ['src/styles.scss'],
        tsConfig: 'tsconfig.spec.json',
      },
    },
  },
  prefix: 'app',
  projectType: 'application',
  root: '',
  schematics: {
    '@schematics/angular:component': {
      style: 'scss',
    },
  },
  sourceRoot: 'src',
};

describe('Workspace utils', () => {
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
  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  beforeEach(async () => {
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
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
  });

  describe('getSourceRoot', () => {
    it('should return the source root of the default project', async () => {
      const sourceRoot = getSourceRoot(appTree, {});
      expect(sourceRoot).toEqual('src');
    });
  });

  describe('getWorkspace', () => {
    it('should return data about project', async () => {
      const workspaceInfo = getWorkspace(appTree);
      expect(workspaceInfo.path).toEqual('/angular.json');
      expect(workspaceInfo.workspace.defaultProject).toEqual(appOptions.name);
    });
  });

  describe('getAngularJsonFile', () => {
    it('should return workspace', async () => {
      const workspace = getAngularJsonFile(appTree);
      expect(workspace.defaultProject).toEqual(appOptions.name);
    });

    it('should throw an error if Angular not found', async () => {
      expect(() => getAngularJsonFile(appTree, [])).toThrowError(
        new SchematicsException(`Could not find Angular`)
      );
    });

    it('should throw an error if not found path', async () => {
      expect(() =>
        getAngularJsonFile({
          ...appTree,
          read: (_path) => null,
          exists: (_path) => true,
        } as Tree)
      ).toThrowError(new SchematicsException(`Could not find (/angular.json)`));
    });
  });

  describe('getProjectFromWorkspace', () => {
    it('should return workspace project object', async () => {
      const workspaceProjectObject = getProjectFromWorkspace(
        appTree,
        defaultOptions
      );
      expect(workspaceProjectObject.projectType).toEqual('application');
      expect(workspaceProjectObject.sourceRoot).toEqual('src');
    });

    it('should throw an error if project is not passed', async () => {
      expect(() =>
        getProjectFromWorkspace(appTree as Tree, {} as SpartacusOptions)
      ).toThrowError(new SchematicsException('Option "project" is required.'));
    });

    it('should throw an error if project is not defined in this workspace', async () => {
      expect(() =>
        getProjectFromWorkspace(appTree, {
          project: 'projectKey',
        } as SpartacusOptions)
      ).toThrowError(
        new SchematicsException(`Project is not defined in this workspace.`)
      );
    });
  });

  describe('getDefaultProjectNameFromWorkspace', () => {
    it('should return default project name from workspace', () => {
      const workspaceName = getDefaultProjectNameFromWorkspace(appTree);
      expect(workspaceName).toEqual('schematics-test');
    });
  });

  describe('getProjectTargets', () => {
    it('should return project targets', () => {
      const projectTargets = getProjectTargets(
        getProjectFromWorkspace(appTree, defaultOptions)
      );
      expect(projectTargets).toEqual(expectedProject.architect);
    });

    it('should throw an error if not found', () => {
      expect(() =>
        getProjectTargets({
          projectType: ProjectType.Application,
          root: 'root',
          prefix: 'prefix',
        })
      ).toThrowError(new Error('Project target not found.'));
    });
  });

  describe('buildDefaultPath', () => {
    let project: WorkspaceProject;
    beforeEach(() => {
      project = {
        projectType: ProjectType.Application,
        root: 'foo',
        prefix: 'app',
      };
    });

    it('should handle projectType of application', () => {
      const result = buildDefaultPath(project);
      expect(result).toEqual('/foo/src/app');
    });

    it('should handle projectType of library', () => {
      project = { ...project, projectType: ProjectType.Library };
      const result = buildDefaultPath(project);
      expect(result).toEqual('/foo/src/lib');
    });

    it('should handle sourceRoot', () => {
      project = { ...project, sourceRoot: 'foo/bar/custom' };
      const result = buildDefaultPath(project);
      expect(result).toEqual('/foo/bar/custom/app');
    });
  });

  describe('getProject', () => {
    it('should return project', () => {
      const project = getProject(appTree, 'schematics-test');
      expect(project).toEqual(expectedProject);
    });

    it('should return undefined for unknown name', () => {
      const project = getProject(appTree, 'unknownName');
      expect(project).toBeUndefined();
    });
  });

  describe('isWorkspaceSchema', () => {
    it('should return true', () => {
      const project = isWorkspaceSchema({
        projectType: ProjectType.Application,
        root: 'root',
        prefix: 'prefix',
        projects: {},
      });
      expect(project).toEqual(true);
    });

    it('should return false if it does not', () => {
      const project = isWorkspaceSchema({
        projectType: ProjectType.Application,
        root: 'root',
        prefix: 'prefix',
      });
      expect(project).toEqual(false);
    });
  });

  describe('isWorkspaceProject', () => {
    it('should return true for a compatible type', () => {
      expect(
        isWorkspaceProject({
          projectType: ProjectType.Application,
        })
      ).toEqual(true);
      expect(
        isWorkspaceProject({
          projectType: ProjectType.Library,
        })
      ).toEqual(true);
    });

    it('should return false for missing type', () => {
      expect(
        isWorkspaceProject({
          otherProperty: 'otherProperty',
        })
      ).toEqual(false);
      expect(isWorkspaceProject(null)).toEqual(false);
    });
  });

  describe('validateSpartacusInstallation', () => {
    it('should throw an error if key is missing', () => {
      expect(() =>
        validateSpartacusInstallation({ dependencies: {} })
      ).toThrowError(
        new SchematicsException(
          `Spartacus is not detected. Please first install Spartacus by running: 'ng add @spartacus/schematics'.
    To see more options, please check our documentation.`
        )
      );
    });

    it('should not throw an error if key exists', () => {
      expect(() =>
        validateSpartacusInstallation({
          dependencies: { [SPARTACUS_CORE]: '/..' },
        })
      ).not.toThrowError();
    });
  });
});
