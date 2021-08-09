/// <reference types="jest" />

import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = '00-migration-v4-rename-symbol';

const fileWithSimpleImport = `import { OtherComponent1, Test1Component } from "@spartacus/storefront";
import { Test2Component } from "@spartacus/core";

const array = [OtherComponent1, Test1Component, Test2Component];`;

// -----------------------------------------------------------------------

const fileWithSimpleImportWithAlias = `import { OtherComponent2 as Test, Test1Component } from "@spartacus/storefront";
import { Test2Component } from "@spartacus/core";

const array = [Test, Test1Component, Test2Component];`;

// -----------------------------------------------------------------------

const fileWithSimpleImportAndRename = `import { OtherComponent3, Test1Component } from "@spartacus/storefront";
import { Test2Component } from "@spartacus/core";

const array = [OtherComponent3, Test1Component, Test2Component];`;
// -----------------------------------------------------------------------

const fileWithRename = `import { OtherComponent4, Test1Component } from "@spartacus/storefront";
import { Test2Component } from "@spartacus/core";

const array = [OtherComponent4, Test1Component, Test2Component];`;
// -----------------------------------------------------------------------

const fileWithImportsAndCtor = `
import { Injectable } from '@angular/core';
import {
  AsmAuthHttpHeaderService,
  AuthService,
  AuthStorageService,
  CsAgentAuthService,
  GlobalMessageService,
  OAuthLibWrapperService,
  OccEndpointsService,
  RoutingService,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class X extends AsmAuthHttpHeaderService {
  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected csAgentAuthService: CsAgentAuthService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected occEndpointsService: OccEndpointsService
  ) {
    super(
      authService,
      authStorageService,
      csAgentAuthService,
      oAuthLibWrapperService,
      routingService,
      globalMessageService,
      occEndpointsService
    );
  }
}
`;

describe('renamed symbols', () => {
  let host: TempScopedNodeJsSyncHost;
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../test/migrations-test.json')
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
            architect: {
              build: { options: { tsConfig: './tsconfig.json' } },
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

  describe('Previous import', () => {
    it('should became new import', async () => {
      writeFile(host, '/src/index.ts', fileWithSimpleImport);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toMatchSnapshot();
    });

    it('should became new import and name with aliases', async () => {
      writeFile(host, '/src/index.ts', fileWithSimpleImportWithAlias);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toMatchSnapshot();
    });

    it('should became new import and new name', async () => {
      writeFile(host, '/src/index.ts', fileWithSimpleImportAndRename);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toMatchSnapshot();
    });
  });

  it('Should only rename node', async () => {
    writeFile(host, '/src/index.ts', fileWithRename);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    expect(content).toMatchSnapshot();
  });

  describe('when both rename symbol and ctor migration are required', () => {
    it('should be done in the correct order', async () => {
      writeFile(host, '/src/index.ts', fileWithImportsAndCtor);

      appTree = await runMigration(
        appTree,
        schematicRunner,
        MIGRATION_SCRIPT_NAME
      );
      appTree = await runMigration(
        appTree,
        schematicRunner,
        '01-migration-v4-constructor-deprecations'
      );

      const content = appTree.readContent('/src/index.ts');
      expect(content).toMatchSnapshot();
    });
  });
});
