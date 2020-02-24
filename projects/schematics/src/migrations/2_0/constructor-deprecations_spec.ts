import { getSystemPath, strings } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  getSourceNodes,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import * as shx from 'shelljs';
import * as ts from 'typescript';
import { AUTH_SERVICE, SPARTACUS_CORE, STORE } from '../../shared/constants';
import {
  getConstructor,
  getParams,
  runMigration,
  writeFile,
} from '../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-constructor-deprecations-03';
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
const ADD_PARAMETER_VALID_TEST_CLASS = `  
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
const REMOVE_PARAMETER_VALID_TEST_CLASS = `
import { Dummy } from '@angular/core';
import {
  CmsService,
  FeatureConfigService,
  PageMetaResolver,
  PageMetaService
} from '@spartacus/core';
export class Test extends PageMetaService {
  constructor(
    resolvers: PageMetaResolver[],
    cms: CmsService,
    featureConfigService?: FeatureConfigService
  ) {
    super(resolvers, cms, featureConfigService);
  }
}
`;
const REMOVE_PARAMETER_EXPECTED_CLASS = `
import { Dummy } from '@angular/core';
import {
  CmsService,
  
  PageMetaResolver,
  PageMetaService
} from '@spartacus/core';
export class Test extends PageMetaService {
  constructor(
    resolvers: PageMetaResolver[],
    cms: CmsService
    
  ) {
    super(resolvers, cms );
  }
}
`;

describe('constructor migrations', () => {
  let host = new TempScopedNodeJsSyncHost();
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../migrations.json')
    );
    host = new TempScopedNodeJsSyncHost();
    appTree = new UnitTestTree(new HostTree(host));

    writeFile(
      host,
      '/tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          lib: ['es2015'],
        },
      })
    );
    writeFile(
      host,
      '/angular.json',
      JSON.stringify({
        projects: {
          'spartacus-test': {
            sourceRoot: 'src',
            test: {
              architect: {
                build: { options: { tsConfig: './tsconfig.json' } },
              },
            },
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
      writeFile(host, '/src/index.ts', NOT_INHERITING_SPARTACUS_CLASS);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NOT_INHERITING_SPARTACUS_CLASS);
    });
  });

  describe('when the class does NOT have a constructor', () => {
    it('should skip it', async () => {
      writeFile(host, '/src/index.ts', NO_CONSTRUCTOR);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NO_CONSTRUCTOR);
    });
  });

  describe('when the class has the wrong param order', () => {
    it('should skip it', async () => {
      writeFile(host, '/src/index.ts', WRONG_PARAM_ORDER);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(WRONG_PARAM_ORDER);
    });
  });

  describe('when the class does NOT have a super call', () => {
    it('should skip it', async () => {
      writeFile(host, '/src/index.ts', NO_SUPER_CALL);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NO_SUPER_CALL);
    });
  });

  describe('when the class has a CallExpression node which is NOT of type super', () => {
    it('should skip it', async () => {
      const filePath = '/src/index.ts';
      writeFile(host, filePath, CALL_EXPRESSION_NO_SUPER);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(filePath);
      expect(content).toEqual(CALL_EXPRESSION_NO_SUPER);
    });
  });

  describe('when all the pre-conditions are valid for adding a parameter', () => {
    it('should just append the missing parameters', async () => {
      const filePath = '/src/index.ts';
      writeFile(host, filePath, ADD_PARAMETER_VALID_TEST_CLASS);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

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
      expect(params).toEqual([
        strings.camelize(STORE),
        strings.camelize(AUTH_SERVICE),
      ]);
      expect(isImported(source, AUTH_SERVICE, SPARTACUS_CORE)).toEqual(true);
    });
  });

  describe('when all the pre-conditions are valid for removing a parameter', () => {
    it('should make the required changes', async () => {
      writeFile(host, '/src/index.ts', REMOVE_PARAMETER_VALID_TEST_CLASS);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(REMOVE_PARAMETER_EXPECTED_CLASS);
    });
  });
});
