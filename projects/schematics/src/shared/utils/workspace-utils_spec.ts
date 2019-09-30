import * as path from 'path';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { getProjectFromWorkspace, getWorkspace } from './workspace-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

describe('Workspace utils', () => {
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

  describe('getWorkspace', () => {
    it('should return data about project', async () => {
      const workspaceInfo = getWorkspace(appTree, [
        '/angular.json',
        '/.angular.json',
      ]);
      expect(workspaceInfo.path).toEqual('/angular.json');
      expect(workspaceInfo.workspace.defaultProject).toEqual(appOptions.name);
    });
  });

  describe('getProjectFromWorkspace', () => {
    it('should return workspace project object', async () => {
      const workspaceProjectObject = getProjectFromWorkspace(
        appTree,
        defaultOptions,
        ['/angular.json', '/.angular.json']
      );
      expect(workspaceProjectObject.projectType).toEqual('application');
      expect(workspaceProjectObject.sourceRoot).toEqual('src');
    });
  });
});
