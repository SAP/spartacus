import * as path from 'path';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { getPathResultsForFile } from './file-utils';
import { addImport, importModule } from './module-file-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

describe('Module file utils', () => {
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

  describe('addImport', () => {
    it('should add passed import', async () => {
      const appModulePath = getPathResultsForFile(
        appTree,
        'app.module.ts',
        'src'
      )[0];
      expect(appModulePath).toBeTruthy();
      addImport(appTree, appModulePath, 'MockUnitTestModule', '@test');

      const buffer = appTree.read(appModulePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const fileContent = buffer.toString();
        expect(
          fileContent.includes("import { MockUnitTestModule } from '@test';")
        ).toBeTruthy();
      }
    });
  });

  describe('importModule', () => {
    it('should add passed position to import array', async () => {
      const appModulePath = getPathResultsForFile(
        appTree,
        'app.module.ts',
        'src'
      )[0];
      expect(appModulePath).toBeTruthy();
      importModule(appTree, appModulePath, 'MockUnitTestModule');

      const buffer = appTree.read(appModulePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const fileContent = buffer.toString();
        expect(fileContent.includes('MockUnitTestModule')).toBeTruthy();
      }
    });
  });
});
