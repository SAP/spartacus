import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { loadFixturesIntoTree } from '../../test/fixtures-test-utils';

const collectionPath = join(__dirname, '../../collection.json');

const SCHEMATICS_NAME = 'modernize-app-migrated-from-6_8-to-2211_19';

describe(`Schematics "${SCHEMATICS_NAME}" in CSR app`, () => {
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;
  let runner: SchematicTestRunner;

  beforeAll(async () => {
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));
    runner = new SchematicTestRunner('test', collectionPath);

    loadFixturesIntoTree({
      tree,
      fixturesDir: join(__dirname, '__fixtures__/app-csr'),
    });

    tree = await runner.runSchematic(SCHEMATICS_NAME, {}, tree);
  });

  it('should update the angular.json', () => {
    expect(tree.readContent('/angular.json')).toMatchSnapshot();
  });

  it('should update the tsconfig.json', () => {
    expect(tree.readContent('/tsconfig.json')).toMatchSnapshot();
  });
});
