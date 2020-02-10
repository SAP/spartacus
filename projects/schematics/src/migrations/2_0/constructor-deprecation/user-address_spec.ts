import {
  getSystemPath,
  normalize,
  strings,
  virtualFs,
} from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  findNodes,
  getSourceNodes,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import * as shx from 'shelljs';
import * as ts from 'typescript';
import { AUTH_SERVICE, SPARTACUS_CORE, STORE } from '../../../shared/constants';
import { findConstructor } from '../../../shared/utils/file-utils';

const NOT_INHERITING_SPARTACUS_CLASS = `
    import { Store } from '@ngrx/store';
    import { StateWithProcess, StateWithUser } from '@spartacus/core';
    export class InheritingService {
      constructor(_store: Store<StateWithUser | StateWithProcess<void>>) {}
    }
`;
const NO_CONSTRUCTOR = `
    import { UserAddressService } from '@spartacus/core';
    import { Store } from '@ngrx/store';
    export class InheritingService extends UserAddressService {}
`;
const WRONG_PARAM_ORDER = `
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
const NO_SUPER_CALL = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(store: Store<StateWithUser | StateWithProcess<void>>) {}
    }
`;
const CALL_EXPRESSION_NO_SUPER = `
    import { Store } from '@ngrx/store';
    import {
      StateWithProcess,
      StateWithUser,
      UserAddressService
    } from '@spartacus/core';
    export class InheritingService extends UserAddressService {
      constructor(store: Store<StateWithUser | StateWithProcess<void>>) {
        console.log(Math.random());
      }
    }
`;
const EMPTY_SUPER = `
import { Store } from '@ngrx/store';
import {
  StateWithProcess,
  StateWithUser,
  UserAddressService
} from '@spartacus/core';
export class InheritingService extends UserAddressService {
  constructor(store: Store<StateWithUser | StateWithProcess<void>>) {
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

describe('constructor user-address migration', () => {
  let host = new TempScopedNodeJsSyncHost();
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../migrations.json')
    );
    host = new TempScopedNodeJsSyncHost();
    appTree = new UnitTestTree(new HostTree(host));

    writeFile(
      '/tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          lib: ['es2015'],
        },
      })
    );
    writeFile(
      '/angular.json',
      JSON.stringify({
        projects: {
          sourceRoot: 'src',
          test: {
            architect: { build: { options: { tsConfig: './tsconfig.json' } } },
          },
        },
      })
    );

    previousWorkingDir = shx.pwd();
    tmpDirPath = getSystemPath(host.root);

    // Switch into the temporary directory path. This allows us to run
    // the schematic against our custom unit test tree.
    shx.cd(tmpDirPath);
  });

  afterEach(() => {
    shx.cd(previousWorkingDir);
    shx.rm('-r', tmpDirPath);
  });

  describe('when the class does NOT extend a Spartacus class', () => {
    it('should skip it', async () => {
      writeFile('/src/index.ts', NOT_INHERITING_SPARTACUS_CLASS);

      await runMigration();

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NOT_INHERITING_SPARTACUS_CLASS);
    });
  });

  describe('when the class does NOT have a constructor', () => {
    it('should skip it', async () => {
      writeFile('/src/index.ts', NO_CONSTRUCTOR);

      await runMigration();

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NO_CONSTRUCTOR);
    });
  });

  describe('when the class has the wrong param order', () => {
    it('should skip it', async () => {
      writeFile('/src/index.ts', WRONG_PARAM_ORDER);

      await runMigration();

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(WRONG_PARAM_ORDER);
    });
  });

  // TODO:#6432 - handle the case when there are constructor params, but nothing is passed to super()?
  describe('when the class does NOT have a super call', () => {
    it('should create it', async () => {
      writeFile('/src/index.ts', NO_SUPER_CALL);

      await runMigration();

      const content = appTree.readContent('/src/index.ts');

      const source = ts.createSourceFile(
        'xxx',
        content,
        ts.ScriptTarget.Latest
      );
      const nodes = getSourceNodes(source);
      const constructorNode = getConstructor(nodes);
      const superNode = getSuperNode(constructorNode);
      expect(superNode).toBeTruthy();
    });
  });

  describe('when the class has a CallExpression node which is NOT of type super', () => {
    it('should create it', async () => {
      const filePath = '/src/index.ts';
      writeFile(filePath, CALL_EXPRESSION_NO_SUPER);

      await runMigration();

      const content = appTree.readContent(filePath);

      const source = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true
      );
      const nodes = getSourceNodes(source);
      const constructorNode = getConstructor(nodes);
      const superNode = getSuperNode(constructorNode);
      expect(superNode).toBeTruthy();
      expect(isImported(source, AUTH_SERVICE, SPARTACUS_CORE)).toEqual(true);
    });
  });

  describe('when the class has an empty super() call', () => {
    it('should add param to it', async () => {
      const filePath = '/src/index.ts';
      writeFile(filePath, EMPTY_SUPER);

      await runMigration();

      const content = appTree.readContent(filePath);

      const source = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true
      );
      const nodes = getSourceNodes(source);
      const constructorNode = getConstructor(nodes);
      const params = getParams(constructorNode, [
        strings.camelize(STORE),
        strings.camelize(AUTH_SERVICE),
      ]);
      // TODO:#6432 - expect both store and auth?
      expect(params).toEqual([strings.camelize(AUTH_SERVICE)]);
      expect(isImported(source, AUTH_SERVICE, SPARTACUS_CORE)).toEqual(true);
    });
  });

  describe('when all the pre-conditions are valid', () => {
    it('should just append the missing parameters', async () => {
      const filePath = '/src/index.ts';
      writeFile(filePath, VALID_TEST_CLASS);

      await runMigration();

      const content = appTree.readContent(filePath);
      console.log(content);

      const source = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true
      );
      const nodes = getSourceNodes(source);
      const constructorNode = getConstructor(nodes);
      const params = getParams(constructorNode, [
        strings.camelize(STORE),
        strings.camelize(AUTH_SERVICE),
      ]);
      expect(params).toEqual([
        strings.camelize(STORE),
        strings.camelize(AUTH_SERVICE),
      ]);
      expect(isImported(source, AUTH_SERVICE, SPARTACUS_CORE)).toEqual(true);
    });
  });

  function writeFile(filePath: string, contents: string): void {
    host.sync.write(
      normalize(filePath),
      virtualFs.stringToFileBuffer(contents)
    );
  }

  function runMigration(): Promise<UnitTestTree> {
    return schematicRunner
      .runSchematicAsync(
        'migration-v2-constructor-user-address-03',
        {},
        appTree
      )
      .toPromise();
  }

  // TODO:#6432 - make this available to other spec files?
  // TODO:#6432 - if yes, extract the `writeFile()` and `runMigration()` methods as well to the test-utils.ts
  function getConstructor(nodes: ts.Node[]): ts.Node {
    const constructorNode = findConstructor(nodes);
    if (!constructorNode) {
      throw new Error('No constructor node found');
    }
    return constructorNode;
  }

  function getSuperNode(constructorNode: ts.Node): ts.Node | undefined {
    const superNodes = findNodes(constructorNode, ts.SyntaxKind.SuperKeyword);
    if (!superNodes || superNodes.length === 0) {
      return undefined;
    }
    return superNodes[0];
  }

  function getParams(
    constructorNode: ts.Node,
    camelizedParamNames: string[]
  ): string[] {
    const superNode = getSuperNode(constructorNode);
    if (!superNode) {
      throw new Error('No super() node found');
    }

    const callExpressions = findNodes(
      constructorNode,
      ts.SyntaxKind.CallExpression
    );
    if (!callExpressions || callExpressions.length === 0) {
      throw new Error('No call expressions found in constructor');
    }
    const params = findNodes(callExpressions[0], ts.SyntaxKind.Identifier);

    camelizedParamNames = camelizedParamNames.map(param =>
      strings.camelize(param)
    );

    return params
      .filter(n => n.kind === ts.SyntaxKind.Identifier)
      .map(n => n.getText())
      .filter(text => camelizedParamNames.includes(text));
  }
});
