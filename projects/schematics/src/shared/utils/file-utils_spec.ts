import * as path from 'path';
import { getTsSourceFile } from './file-utils';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

describe('File utils', () => {
  let appTree: UnitTestTree;
  const workspaceOptions: any = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '0.5.0',
  };
  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
  };
  const defaultOptions = {
    project: 'schematics-test',
  };
  const tsFilePath = path.join(`/projects/${appOptions.name}/src/test.ts`);

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
  });

  describe('getTsSourceFile', () => {
    it('should return TS file', async () => {
      const tree = await schematicRunner
        .runSchematicAsync('add-spartacus', defaultOptions, appTree)
        .toPromise();

      const tsFile = getTsSourceFile(tree, tsFilePath);
      const tsFileName = tsFile.fileName.split('/').pop();
      expect(tsFile).toBeTruthy();
      expect(tsFileName).toEqual('test.ts');
    });
  });
});
