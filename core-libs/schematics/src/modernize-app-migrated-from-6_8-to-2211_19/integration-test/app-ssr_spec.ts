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

describe(`Schematics "${SCHEMATICS_NAME}" in SSR app`, () => {
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;
  let runner: SchematicTestRunner;

  beforeAll(async () => {
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));
    runner = new SchematicTestRunner('test', collectionPath);

    loadFixturesIntoTree({
      tree,
      fixturesDir: join(__dirname, '__fixtures__/app-ssr'),
    });
    tree = await runner.runSchematic(SCHEMATICS_NAME, {}, tree);
  });

  it('should update the angular.json', () => {
    expect(tree.readContent('/angular.json')).toMatchSnapshot();
  });

  it('should update the package.json', () => {
    expect(tree.readContent('/package.json')).toMatchSnapshot();
  });

  it('should update the server.ts', () => {
    expect(tree.readContent('/server.ts')).toMatchSnapshot();
  });

  it('should update the src/app/app.module.ts', () => {
    expect(tree.readContent('/src/app/app.module.ts')).toMatchSnapshot();
  });

  it('should rename the src/app/app.server.module.ts to src/app/app.module.server.ts (swapped words "server" and "module")', () => {
    expect(tree.exists('/src/app/app.server.module.ts')).toBeFalsy();
    expect(tree.readContent('/src/app/app.module.server.ts')).toMatchSnapshot();
  });

  it('should update the src/main.server.ts', () => {
    expect(tree.readContent('/src/main.server.ts')).toMatchSnapshot();
  });

  it('should update the tsconfig.app.json', () => {
    expect(tree.readContent('/tsconfig.app.json')).toMatchSnapshot();
  });

  it('should update the tsconfig.json', () => {
    expect(tree.readContent('/tsconfig.json')).toMatchSnapshot();
  });

  it('should remove the tsconfig.server.json', () => {
    expect(tree.exists('/tsconfig.server.json')).toBeFalsy();
  });
});
