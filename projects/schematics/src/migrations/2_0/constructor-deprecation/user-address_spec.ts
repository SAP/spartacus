import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';

const TEST_CLASS = `  
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

  it('should add missing parameters', async () => {
    writeFile('/src/index.ts', TEST_CLASS);

    await runMigration();

    const content = appTree.readContent('/src/index.ts');
    console.log(content);
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
        'migration-v2-update-cms-component-state-02',
        {},
        appTree
      )
      .toPromise();
  }
});
