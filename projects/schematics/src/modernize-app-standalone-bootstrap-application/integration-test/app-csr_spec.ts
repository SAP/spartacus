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

  it('should update the src/app/app.component.ts to be standalone', () => {
    const content = tree.readContent('/src/app/app.component.ts');
    expect(content).toContain('imports: [StorefrontComponent]');
    expect(content).toContain(
      'import { StorefrontComponent } from "@spartacus/storefront"'
    );
    expect(content).not.toContain('standalone: false');
  });

  it('should update the src/app/app.module.ts', () => {
    const content = tree.readContent('/src/app/app.module.ts');
    expect(content).not.toContain('bootstrap: [AppComponent]');
    expect(content).not.toContain('declarations: [AppComponent]');
    expect(content).not.toContain('BrowserModule');
  });

  it('should create src/app/app.config.ts', () => {
    expect(tree.exists('/src/app/app.config.ts')).toBeTruthy();
    const content = tree.readContent('/src/app/app.config.ts');
    expect(content).toContain('export const appConfig: ApplicationConfig');
    expect(content).toContain('provideBrowserGlobalErrorListeners()');
    expect(content).toContain(
      'provideZoneChangeDetection({ eventCoalescing: true })'
    );
    expect(content).toContain(
      'provideHttpClient(withFetch(), withInterceptorsFromDi())'
    );
    expect(content).toContain('importProvidersFrom(AppModule)');
  });

  it('should update the src/main.ts', () => {
    const content = tree.readContent('/src/main.ts');
    expect(content).toContain('bootstrapApplication(AppComponent, appConfig)');
    expect(content).not.toContain('platformBrowser');
    expect(content).not.toContain('bootstrapModule');
    expect(content).toContain(
      'import { bootstrapApplication } from "@angular/platform-browser"'
    );
    expect(content).toContain(
      'import { AppComponent } from "./app/app.component"'
    );
    expect(content).toContain('import { appConfig } from "./app/app.config"');
  });

  it('should update the angular.json', () => {
    const content = tree.readContent('/angular.json');
    const angularJson = JSON.parse(content);

    // Check if standalone: false is removed from schematics
    const schematics = (angularJson as any).schematics;
    if (schematics) {
      expect(
        schematics['@schematics/angular:component']?.standalone
      ).toBeUndefined();
      expect(
        schematics['@schematics/angular:directive']?.standalone
      ).toBeUndefined();
      expect(
        schematics['@schematics/angular:pipe']?.standalone
      ).toBeUndefined();
    }
  });
});
