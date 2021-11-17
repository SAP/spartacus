import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { ANONYMOUS_CONSENTS, TODO_SPARTACUS } from '../../../shared/constants';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-config-deprecations-09';
const TEST_CLASS = `
const config = {
  features: {
    level: '1.5',
    anonymousConsents: true
  }
};

@NgModule({
  imports: [
    B2cStorefrontModule.withConfig({
      features: {
        level: '1.5',
        anonymousConsents: true
      }
    }),
  ],
  providers: [
    provideConfig(config),
    provideConfig({
      features: {
        level: '1.5',
        anonymousConsents: true
      }
    }),
  ]
})
export class AppModule {}
`;

describe('config deprecations migration', () => {
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
      `// ${TODO_SPARTACUS} '${ANONYMOUS_CONSENTS}' has been removed, as this feature is now enabled by default.\n`,
      'g'
    );
    const commentOccurrences = (content.match(regex) || []).length;
    expect(commentOccurrences).toEqual(3);
  });
});
