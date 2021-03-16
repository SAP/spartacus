import { getSystemPath } from "@angular-devkit/core";
import { TempScopedNodeJsSyncHost } from "@angular-devkit/core/node/testing";
import { HostTree, Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner, UnitTestTree } from "@angular-devkit/schematics/testing";
import * as shx from 'shelljs';
import { runMigration, writeFile } from "../../../shared/utils/test-utils";

const MIGRATION_SCRIPT_NAME = 'migration-v4-rename-symbol-01';
const PREVIOUS_IMPORT = `import { OtherComponent, StoreFinderMapComponent } from "@spartacus/storefront";`;
const NEW_IMPORT = `import { OtherComponent, StoreFinderMapComponent } from "@spartacus/storefinder/components";`;
const TAIL = `const testArray = [StoreFinderMapComponent, OtherComponent];`;
describe('renamed symbols', () => {
  let host: TempScopedNodeJsSyncHost;
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
      writeFile(host, '/src/index.ts', PREVIOUS_IMPORT + '\n\n' + TAIL);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      // console.log(content);
      expect(content).toEqual(NEW_IMPORT + '\n\n' + TAIL);
    });
  });
  
});
