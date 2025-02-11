import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { loadFixturesIntoTree } from '../../test/fixtures-test-utils';

const collectionPath = join(__dirname, '../../collection.json');

const SCHEMATICS_NAME = 'modernize-app-migrated-from-2211_32-to-2211_35';

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

  it('should update the tsconfig.json', () => {
    expect(tree.readContent('/tsconfig.json')).toMatchSnapshot();
  });

  it('should have an empty src/assets folder', () => {
    const assetsDir = tree.getDir('/src/assets');
    const files = assetsDir.subfiles;
    expect(files.length).toBe(0);
  });

  it('should move contents of src/assets to /public folder', () => {
    expect(tree.exists('/public/i18n-assets/pdf.json')).toBeTruthy();
    expect(tree.exists('/public/i18n-assets/video.json')).toBeTruthy();
  });

  it('should move src/favicon.ico to public/favicon.ico', () => {
    expect(tree.exists('/src/favicon.ico')).toBeFalsy();
    expect(tree.exists('/public/favicon.ico')).toBeTruthy();
  });

  it('should update the src/main.ts', () => {
    expect(tree.readContent('/src/main.ts')).toMatchSnapshot();
  });

  it('should move server.ts to src/server.ts', () => {
    expect(tree.exists('/server.ts')).toBeFalsy();
    expect(tree.exists('/src/server.ts')).toBeTruthy();
  });

  it('should update the src/server.ts', () => {
    expect(tree.readContent('/src/server.ts')).toMatchSnapshot();
  });

  it('should update the tsconfig.app.json', () => {
    expect(tree.readContent('/tsconfig.app.json')).toMatchSnapshot();
  });

  it('should update the src/app/spartacus/spartacus-configuration.module.ts', () => {
    expect(
      tree.readContent('/src/app/spartacus/spartacus-configuration.module.ts')
    ).toMatchSnapshot();
  });
});
