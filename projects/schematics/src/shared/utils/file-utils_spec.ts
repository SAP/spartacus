import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import {
  InsertChange,
  ReplaceChange,
} from '@schematics/angular/utility/change';
import * as path from 'path';
import * as ts from 'typescript';
import { UTF_8 } from '../constants';
import {
  commitChanges,
  defineProperty,
  getAllTsSourceFiles,
  getIndexHtmlPath,
  getPathResultsForFile,
  getTsSourceFile,
  injectService,
  insertCommentAboveIdentifier,
  InsertDirection,
  renameIdentifierNode,
} from './file-utils';
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

  describe('getAllTsSourceFiles', () => {
    it('should return all .ts files', () => {
      const basePath = '/src';
      const { buildPaths } = getProjectTsConfigPaths(appTree);
      let tsFilesFound = false;
      for (const tsconfigPath of buildPaths) {
        const sourceFiles = getAllTsSourceFiles(
          tsconfigPath,
          appTree,
          basePath
        );
        tsFilesFound = sourceFiles.length !== 0;
      }
      expect(tsFilesFound).toEqual(true);
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

  describe('commitChanges', () => {
    it('should commit provided InsertChanges', async () => {
      const filePath = 'src/index.html';
      const change = 'xxx';
      const testChange = new InsertChange(filePath, 0, change);
      const result = commitChanges(
        appTree,
        filePath,
        [testChange],
        InsertDirection.LEFT
      );

      expect(result).toBeFalsy();
      const buffer = appTree.read(filePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const content = buffer.toString(UTF_8);
        expect(content).toContain(change);
      }
    });
    it('should commit provided ReplaceChange', async () => {
      const filePath = '/src/app/app.component.ts';
      const change = 'ChangedAppComponent';

      const testChange = new ReplaceChange(
        filePath,
        173,
        'AppComponent',
        change
      );
      const result = commitChanges(
        appTree,
        filePath,
        [testChange],
        InsertDirection.LEFT
      );

      expect(result).toBeFalsy();
      const buffer = appTree.read(filePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const content = buffer.toString(UTF_8);
        expect(content).toContain(change);
      }
    });
  });

  describe('defineProperty', () => {
    it('should create a Change if the constructor exists', async () => {
      const testPath = 'path-xxx';
      const toAdd = 'add-xxx';
      const ctorNode = { kind: ts.SyntaxKind.Constructor, pos: 0 } as ts.Node;
      const result = defineProperty([ctorNode], testPath, toAdd);

      expect(result).toBeTruthy();
      expect(result.path).toEqual(testPath);
      expect(result.order).toEqual(1);
      expect(result.toAdd).toEqual(toAdd);
    });
  });

  describe('injectService', () => {
    it('should create a Change to inject the specified service', async () => {
      const testPath = 'path-xxx';
      const parameterListNode = { kind: ts.SyntaxKind.SyntaxList } as ts.Node;
      const ctorNode = {
        kind: ts.SyntaxKind.Constructor,
        pos: 0,
        getChildren: () => [parameterListNode],
      } as ts.Node;

      const result = injectService(
        [ctorNode],
        testPath,
        'dummyService',
        'DummyProperty'
      );
      expect(result).toBeTruthy();
      expect(result.toAdd).toEqual(`private dummyProperty: DummyService`);
    });
  });

  describe('insertCommentAboveIdentifier', () => {
    it('should return the InsertChanges', async () => {
      const filePath = '/src/app/app.component.ts';
      const source = getTsSourceFile(appTree, filePath);
      const identifierName = 'AppComponent';
      const commentToInsert = 'comment';

      const changes = insertCommentAboveIdentifier(
        filePath,
        source,
        identifierName,
        commentToInsert
      );
      expect(changes).toEqual([
        new InsertChange(filePath, 161, commentToInsert),
      ]);
    });
  });

  describe('renameIdentifierNode', () => {
    it('should return the ReplaceChange', async () => {
      const filePath = '/src/app/app.component.ts';
      const source = getTsSourceFile(appTree, filePath);
      const oldName = 'AppComponent';
      const newName = 'NewAppComponent';

      const changes = renameIdentifierNode(filePath, source, oldName, newName);
      expect(changes).toEqual([
        new ReplaceChange(filePath, 174, oldName, newName),
      ]);
    });
  });
});
