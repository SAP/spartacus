import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { runMigration, writeFile } from '../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-component-selectors-04';

const SINGLE_USAGE_EXAMPLE = `<div>test</div>
<cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>`;
const SINGLE_USAGE_EXAMPLE_EXPECTED = `<div>test</div>
<!-- 'isLevel13' property has been removed. --><cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>`;

const MULTI_USAGE_EXAMPLE = `<cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>
<div>test</div>
<cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>`;
const MULTI_USAGE_EXAMPLE_EXPECTED = `<!-- 'isLevel13' property has been removed. --><cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>
<div>test</div>
<!-- 'isLevel13' property has been removed. --><cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>`;

describe('component selectors migration', () => {
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
          'schematics-test': {
            projectType: 'application',
            sourceRoot: 'src',
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

  describe('when the html file contains a single usage', () => {
    it('should add a comment', async () => {
      writeFile(host, '/src/test.html', SINGLE_USAGE_EXAMPLE);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/test.html');
      expect(content).toEqual(SINGLE_USAGE_EXAMPLE_EXPECTED);
    });
  });

  describe('when the html file contains multiple usages', () => {
    it('should add comments', async () => {
      writeFile(host, '/src/test.html', MULTI_USAGE_EXAMPLE);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/test.html');
      expect(content).toEqual(MULTI_USAGE_EXAMPLE_EXPECTED);
    });
  });
});
