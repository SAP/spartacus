import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-constructor-page-meta-04';
const TEST = `
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
describe('constructor page-meta migration', () => {
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

  // TODO:#6520 - delete
  const DELETE_ME = true;
  describe('when the class does NOT extend a Spartacus class', () => {
    it('should skip it', async () => {
      writeFile(host, '/src/index.ts', TEST);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      if (DELETE_ME) console.log(content);
      expect(content).toEqual(TEST);
    });
  });
});
