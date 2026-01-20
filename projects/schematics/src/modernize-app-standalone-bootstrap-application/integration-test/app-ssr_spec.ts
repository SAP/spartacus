import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { loadFixturesIntoTree } from '../../test/fixtures-test-utils';

const collectionPath = join(__dirname, '../../collection.json');

const SCHEMATICS_NAME = 'modernize-app-standalone-bootstrap-application';

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

  it('should create src/app/app.config.server.ts', () => {
    expect(tree.exists('/src/app/app.config.server.ts')).toBeTruthy();
    const content = tree.readContent('/src/app/app.config.server.ts');
    expect(content).toContain(
      'export const config = mergeApplicationConfig(appConfig, serverConfig)'
    );
    expect(content).toContain('provideServerRendering()');
    expect(content).toContain('importProvidersFrom(AppServerModule)');
  });

  it('should update the src/app/app.module.server.ts', () => {
    const content = tree.readContent('/src/app/app.module.server.ts');
    expect(content).not.toContain('imports: [AppModule]');
    expect(content).not.toContain('bootstrap: [AppComponent]');
  });

  it('should update the src/main.server.ts', () => {
    const content = tree.readContent('/src/main.server.ts');
    expect(content).toContain(
      'const bootstrap = (context: BootstrapContext) =>'
    );
    expect(content).toContain(
      'bootstrapApplication(AppComponent, config, context)'
    );
    expect(content).toContain('export default bootstrap');
    expect(content).not.toContain('export { AppServerModule');
  });

  it('should update the src/server.ts', () => {
    const content = tree.readContent('/src/server.ts');
    expect(content).toContain('import bootstrap from');
    expect(content).toContain('bootstrap: bootstrap');
    expect(content).not.toContain('AppServerModule');
  });

  it('should move hydration config from app.module.ts to app.config.ts', () => {
    const appModuleContent = tree.readContent('/src/app/app.module.ts');
    // The hydration provider call should be removed from providers array
    expect(appModuleContent).not.toContain('provideClientHydration(');

    const appConfigContent = tree.readContent('/src/app/app.config.ts');
    expect(appConfigContent).toContain('provideClientHydration');
  });
});
