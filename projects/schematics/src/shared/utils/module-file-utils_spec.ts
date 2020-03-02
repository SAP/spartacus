import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { UTF_8 } from '../constants';
import { getPathResultsForFile } from './file-utils';
import {
  addImport,
  addToModuleDeclarations,
  addToModuleEntryComponents,
  addToModuleExports,
  addToModuleImports,
  stripTsFromImport,
} from './module-file-utils';

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

  describe('stripTsFromImport', () => {
    it('should strip the .ts when present', () => {
      const test1 = '../../components.ts';
      expect(stripTsFromImport(test1)).toEqual('../../components');

      const test2 = '../../ts.ts.ts';
      expect(stripTsFromImport(test2)).toEqual('../../ts.ts');
    });
    it('should NOT strip the .ts when the import path does not end with it', () => {
      const test = '../ts.tsts';
      expect(stripTsFromImport(test)).toEqual(test);
    });
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
        const fileContent = buffer.toString(UTF_8);
        expect(
          fileContent.includes("import { MockUnitTestModule } from '@test';")
        ).toBeTruthy();
      }
    });
  });

  describe('add metadata to ng module', () => {
    describe('addToModuleImports', () => {
      it('should add passed position to imports array', async () => {
        const appModulePath = getPathResultsForFile(
          appTree,
          'app.module.ts',
          'src'
        )[0];
        expect(appModulePath).toBeTruthy();
        const resultChange = addToModuleImports(
          appTree,
          appModulePath,
          'MockUnitTestModule'
        );

        expect(resultChange).toBeTruthy();
        expect(resultChange.length).toEqual(1);
        expect(resultChange[0].toAdd).toContain('MockUnitTestModule');
      });
    });
    describe('addToModuleDeclarations', () => {
      it('should add passed position to declarations array', async () => {
        const appModulePath = getPathResultsForFile(
          appTree,
          'app.module.ts',
          'src'
        )[0];
        expect(appModulePath).toBeTruthy();
        const resultChange = addToModuleDeclarations(
          appTree,
          appModulePath,
          'MockUnitTestModule'
        );

        expect(resultChange).toBeTruthy();
        expect(resultChange.length).toEqual(1);
        expect(resultChange[0].toAdd).toContain('MockUnitTestModule');
      });
    });
    describe('addToModuleEntryComponents', () => {
      it('should add passed position to entryComponents array', async () => {
        const appModulePath = getPathResultsForFile(
          appTree,
          'app.module.ts',
          'src'
        )[0];
        expect(appModulePath).toBeTruthy();
        const resultChange = addToModuleEntryComponents(
          appTree,
          appModulePath,
          'MockUnitTestModule'
        );

        expect(resultChange).toBeTruthy();
        expect(resultChange.length).toEqual(1);
        expect(resultChange[0].toAdd).toContain('MockUnitTestModule');
      });
    });
    describe('addToModuleExports', () => {
      it('should add passed position to exports array', async () => {
        const appModulePath = getPathResultsForFile(
          appTree,
          'app.module.ts',
          'src'
        )[0];
        expect(appModulePath).toBeTruthy();
        const resultChange = addToModuleExports(
          appTree,
          appModulePath,
          'MockUnitTestModule'
        );

        expect(resultChange).toBeTruthy();
        expect(resultChange.length).toEqual(1);
        expect(resultChange[0].toAdd).toContain('MockUnitTestModule');
      });
    });
  });
});
