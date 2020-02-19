import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import {
  InsertChange,
  ReplaceChange,
} from '@schematics/angular/utility/change';
import * as path from 'path';
import * as ts from 'typescript';
import {
  AUTH_SERVICE,
  NGRX_STORE,
  SPARTACUS_CORE,
  STORE,
  USER_ADDRESS_SERVICE,
  UTF_8,
} from '../constants';
import {
  addConstructorParam,
  ClassType,
  commitChanges,
  defineProperty,
  findConstructor,
  getAllTsSourceFiles,
  getIndexHtmlPath,
  getPathResultsForFile,
  getTsSourceFile,
  injectService,
  insertCommentAboveIdentifier,
  InsertDirection,
  isCandidateForConstructorDeprecation,
  renameIdentifierNode,
} from './file-utils';
import { getProjectFromWorkspace } from './workspace-utils';

const PARAMETER_LENGTH_MISS_MATCH_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      AuthService,
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        authService: AuthService,
        store: Store<StateWithUser | StateWithProcess<void>>
      ) {
        super(authService, store);
      }
    }
`;
const INHERITANCE_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import { StateWithProcess, StateWithUser } from '@spartacus/core';
    export class InheritingService {
      constructor(_store: Store<StateWithUser | StateWithProcess<void>>) {}
    }
`;
const IMPORT_MISSING_TEST_CLASS = `
    import { StateWithProcess, StateWithUser, UserAddressService } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(_store: Store<StateWithUser | StateWithProcess<void>>) {}
    }
`;
const NO_CONSTRUCTOR_TEST_CLASS = `
    import { UserAddressService } from '@spartacus/core';
    import { Store } from '@ngrx/store';
    export class InheritingService extends UserAddressService {}
`;
const WRONG_PARAMETER_ORDER_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      AuthService,
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        authService: AuthService,
        store: Store<StateWithUser | StateWithProcess<void>>
      ) {
        super(authService, store);
      }
    }
`;
const NO_SUPER_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        store: Store<StateWithUser | StateWithProcess<void>>
      ) {}
    }
`;
const EXPRESSION_NO_SUPER_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        store: Store<StateWithUser | StateWithProcess<void>>
      ) {
        console.log('test');
      }
    }
`;
const SUPER_PARAMETER_NUMBER_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(
        store: Store<StateWithUser | StateWithProcess<void>>
      ) {
        super();
      }
    }
`;
const VALID_TEST_CLASS = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritedService extends UserAddressService {
      constructor(store: Store<StateWithUser | StateWithProcess<void>>) {
        super(store);
      }
    }
`;

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

  describe('findConstructor', async () => {
    it('should return the constructor if found', () => {
      const constructorNode: ts.Node = {
        kind: ts.SyntaxKind.Constructor,
      } as ts.Node;

      const nodes: ts.Node[] = [constructorNode];
      expect(findConstructor(nodes)).toEqual(constructorNode);
    });
    it('should return undefined if the constructor is not found', () => {
      const nodes: ts.Node[] = [];
      expect(findConstructor(nodes)).toEqual(undefined);
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

  describe('isCandidateForConstructorDeprecation', async () => {
    it('should return false if the inheritance condition is not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        INHERITANCE_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );

      expect(
        isCandidateForConstructorDeprecation(source, USER_ADDRESS_SERVICE, [])
      ).toEqual(false);
    });
    it('should return false if the imports condition not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        IMPORT_MISSING_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const parameterClassTypes: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(
          source,
          USER_ADDRESS_SERVICE,
          parameterClassTypes
        )
      ).toEqual(false);
    });
    it('should return false if the constructor condition is not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        NO_CONSTRUCTOR_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const parameterClassTypes: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(
          source,
          USER_ADDRESS_SERVICE,
          parameterClassTypes
        )
      ).toEqual(false);
    });
    it('should return false if the parameter lengths condition is not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        PARAMETER_LENGTH_MISS_MATCH_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const parameterClassTypes: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(
          source,
          USER_ADDRESS_SERVICE,
          parameterClassTypes
        )
      ).toEqual(false);
    });
    it('should return false if the parameter order is not satisfied', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        WRONG_PARAMETER_ORDER_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const parameterClassTypes: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
        { className: USER_ADDRESS_SERVICE, importPath: SPARTACUS_CORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(
          source,
          USER_ADDRESS_SERVICE,
          parameterClassTypes
        )
      ).toEqual(false);
    });
    it('should return false if the super() call does NOT exist', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        NO_SUPER_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const parameterClassTypes: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(
          source,
          USER_ADDRESS_SERVICE,
          parameterClassTypes
        )
      ).toEqual(false);
    });
    it('should return false if an expression call exists, but it is NOT the super(); call', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        EXPRESSION_NO_SUPER_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const parameterClassTypes: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(
          source,
          USER_ADDRESS_SERVICE,
          parameterClassTypes
        )
      ).toEqual(false);
    });
    it('should return false if the expected number of parameters is not passed to super() call', () => {
      const source = ts.createSourceFile(
        'xxx.ts',
        SUPER_PARAMETER_NUMBER_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const parameterClassTypes: ClassType[] = [
        { className: STORE, importPath: NGRX_STORE },
      ];

      expect(
        isCandidateForConstructorDeprecation(
          source,
          USER_ADDRESS_SERVICE,
          parameterClassTypes
        )
      ).toEqual(false);
    });
  });

  describe('addConstructorParam', () => {
    it('should return the expected changes', () => {
      const sourcePath = 'xxx.ts';
      const source = ts.createSourceFile(
        sourcePath,
        VALID_TEST_CLASS,
        ts.ScriptTarget.Latest,
        true
      );
      const nodes = getSourceNodes(source);
      const constructorNode = findConstructor(nodes);
      const paramToAdd: ClassType = {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      };

      const changes = addConstructorParam(
        source,
        sourcePath,
        constructorNode,
        paramToAdd
      );
      expect(changes.length).toEqual(3);
      expect(changes[0].description).toEqual(
        `Inserted , authService: AuthService into position 288 of ${sourcePath}`
      );
      expect(changes[1].description).toEqual(
        `Inserted , AuthService into position 124 of ${sourcePath}`
      );
      expect(changes[2].description).toEqual(
        `Inserted , authService into position 311 of ${sourcePath}`
      );
    });
  });

  describe('injectService', () => {
    it('should create a Change to inject the specified service', async () => {
      const testPath = 'path-xxx';
      const ctorNode = {
        kind: ts.SyntaxKind.Constructor,
        pos: 0,
        getChildren: () => [] as ts.Node[],
        getStart: () => 10,
      } as ts.Node;

      const result = injectService(
        ctorNode,
        testPath,
        'dummyService',
        'private',
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
