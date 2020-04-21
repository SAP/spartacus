import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { KYMA_ENABLED, TODO_SPARTACUS } from '../../shared/constants';
import { runMigration, writeFile } from '../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-kyma-09';
const TEST_CLASS = `
@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,

    B2cStorefrontModule.withConfig({
      authentication: {
        kyma_enabled: true
      },
    }),
    KymaModule,
  ],

  bootstrap: [StorefrontComponent],
})
export class AppModule {}
`;

describe('kyma feature flag migration', () => {
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

  it('migrate', async () => {
    writeFile(host, '/src/index.ts', TEST_CLASS);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    const regex = new RegExp(
      `// ${TODO_SPARTACUS} '${KYMA_ENABLED}' has been removed. Just remove this property, as kyma is now enabled by just importing 'KymaModule'.\n`,
      'g'
    );
    const commentOccurrences = (content.match(regex) || []).length;
    expect(commentOccurrences).toEqual(1);
  });
});
