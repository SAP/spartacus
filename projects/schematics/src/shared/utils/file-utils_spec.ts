import * as path from 'path';
import {
  getIndexHtmlPath,
  getPathResultsForFile,
  getTsSourceFile,
} from './file-utils';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { getProjectFromWorkspace } from './workspace-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

describe('File utils', () => {
  let appTree: UnitTestTree;
  const workspaceOptions: any = {
    name: 'workspace',
    version: '0.5.0',
  };
  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
    projectRoot: '',
  };
  const defaultOptions = {
    project: 'schematics-test',
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

  describe('getTsSourceFile', () => {
    it('should return TS file', async () => {
      const tsFile = getTsSourceFile(appTree, 'src/test.ts');
      const tsFileName = tsFile.fileName.split('/').pop();

      expect(tsFile).toBeTruthy();
      expect(tsFileName).toEqual('test.ts');
    });
  });

  describe('getIndexHtmlPath', () => {
    it('should return index.html path', async () => {
      const project = getProjectFromWorkspace(appTree, defaultOptions, [
        '/angular.json',
        '/.angular.json',
      ]);
      const projectIndexHtmlPath = getIndexHtmlPath(project);

      expect(projectIndexHtmlPath).toEqual(`src/index.html`);
    });
  });

  describe('getPathResultsForFile', () => {
    it('should return proper path for file', async () => {
      const pathsToFile = getPathResultsForFile(appTree, 'test.ts', 'src');

      expect(pathsToFile.length).toBeGreaterThan(0);
      expect(pathsToFile[0]).toEqual('/src/test.ts');
    });
  });
});
