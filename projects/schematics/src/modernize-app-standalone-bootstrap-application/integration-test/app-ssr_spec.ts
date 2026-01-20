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

  describe('src/app/app.config.server.ts', () => {
    let content: string;

    beforeAll(() => {
      content = tree.readContent('/src/app/app.config.server.ts');
    });

    it('should create the file', () => {
      expect(tree.exists('/src/app/app.config.server.ts')).toBeTruthy();
    });

    it('should export config with mergeApplicationConfig', () => {
      expect(content).toContain(
        'export const config = mergeApplicationConfig(appConfig, serverConfig)'
      );
    });

    it('should include provideServerRendering() in providers', () => {
      expect(content).toContain('provideServerRendering()');
    });

    it('should include importProvidersFrom(AppServerModule) in providers', () => {
      expect(content).toContain('importProvidersFrom(AppServerModule)');
    });

    it('should import ApplicationConfig from @angular/core', () => {
      expect(content).toContain('ApplicationConfig');
      expect(content).toContain('importProvidersFrom');
      expect(content).toContain('mergeApplicationConfig');
    });

    it('should import provideServerRendering from @angular/ssr or @angular/platform-server', () => {
      expect(content).toMatch(
        /provideServerRendering.*from ['"]@angular\/(ssr|platform-server)/
      );
    });

    it('should import appConfig', () => {
      expect(content).toMatch(/import.*appConfig.*from ['"]\.?\/app\.config/);
    });

    it('should import AppServerModule', () => {
      expect(content).toMatch(
        /import.*AppServerModule.*from ['"]\.?\/app\.module\.server/
      );
    });

    it('should declare serverConfig constant', () => {
      expect(content).toContain('const serverConfig: ApplicationConfig');
    });
  });

  describe('src/app/app.module.server.ts', () => {
    let content: string;

    beforeAll(() => {
      content = tree.readContent('/src/app/app.module.server.ts');
    });

    it('should remove AppModule from imports array', () => {
      expect(content).not.toContain('AppModule');
    });

    it('should remove ServerModule from imports array', () => {
      expect(content).not.toMatch(/imports:\s*\[[^\]]*ServerModule/);
    });

    it('should remove bootstrap: [AppComponent] from @NgModule', () => {
      expect(content).not.toContain('bootstrap: [AppComponent]');
      expect(content).not.toContain('bootstrap:');
    });

    it('should remove AppModule import statement', () => {
      expect(content).not.toContain("import { AppModule } from './app.module'");
    });

    it('should remove ServerModule import statement', () => {
      expect(content).not.toContain(
        "import { ServerModule } from '@angular/platform-server'"
      );
    });

    it('should preserve @NgModule decorator', () => {
      expect(content).toContain('@NgModule');
    });

    it('should preserve AppServerModule class definition', () => {
      expect(content).toContain('export class AppServerModule {}');
    });
  });

  describe('src/main.server.ts', () => {
    let content: string;

    beforeAll(() => {
      content = tree.readContent('/src/main.server.ts');
    });

    it('should remove export of AppServerModule', () => {
      expect(content).not.toContain('export { AppServerModule');
    });

    it('should import BootstrapContext and bootstrapApplication from @angular/platform-browser', () => {
      expect(content).toContain('BootstrapContext');
      expect(content).toContain('bootstrapApplication');
      expect(content).toContain('@angular/platform-browser');
    });

    it('should import AppComponent', () => {
      expect(content).toContain(
        'import { AppComponent } from "./app/app.component"'
      );
    });

    it('should import config from app.config.server', () => {
      expect(content).toContain(
        'import { config } from "./app/app.config.server"'
      );
    });

    it('should define bootstrap function with BootstrapContext', () => {
      expect(content).toContain(
        'const bootstrap = (context: BootstrapContext) =>'
      );
    });

    it('should call bootstrapApplication with AppComponent, config, and context', () => {
      expect(content).toContain(
        'bootstrapApplication(AppComponent, config, context)'
      );
    });

    it('should export bootstrap as default', () => {
      expect(content).toContain('export default bootstrap');
    });
  });

  describe('src/server.ts', () => {
    let content: string;

    beforeAll(() => {
      content = tree.readContent('/src/server.ts');
    });

    it('should import bootstrap instead of AppServerModule', () => {
      expect(content).toContain('import bootstrap from');
      expect(content).toContain('./main.server');
    });

    it('should not import AppServerModule anymore', () => {
      expect(content).not.toContain('AppServerModule');
    });

    it('should update ngExpressEngine to use bootstrap', () => {
      expect(content).toContain('bootstrap: bootstrap');
    });

    it('should preserve other CommonEngine.render configuration', () => {
      expect(content).toContain('documentFilePath: indexHtml');
      expect(content).toContain('publicPath: browserDistFolder');
      expect(content).toContain('providers:');
    });

    it('should preserve the rest of server.ts file structure', () => {
      expect(content).toContain('export function app()');
      expect(content).toContain('const commonEngine = new CommonEngine()');
    });
  });

  describe('Hydration configuration migration', () => {
    let appModuleContent: string;
    let appConfigContent: string;

    beforeAll(() => {
      appModuleContent = tree.readContent('/src/app/app.module.ts');
      appConfigContent = tree.readContent('/src/app/app.config.ts');
    });

    it('should remove provideClientHydration from app.module.ts providers', () => {
      expect(appModuleContent).not.toContain('provideClientHydration(');
    });

    it('should remove provideClientHydration import from app.module.ts if not used', () => {
      // Check that it's not in the providers array
      expect(appModuleContent).not.toMatch(
        /providers:\s*\[[^\]]*provideClientHydration/
      );
    });

    it('should remove withEventReplay from providers', () => {
      // Check it's not in providers array
      expect(appModuleContent).not.toMatch(
        /providers:\s*\[[^\]]*withEventReplay/
      );
    });

    it('should remove withNoHttpTransferCache from providers', () => {
      // Check it's not in providers array
      expect(appModuleContent).not.toMatch(
        /providers:\s*\[[^\]]*withNoHttpTransferCache/
      );
    });

    it('should add provideClientHydration to app.config.ts providers', () => {
      expect(appConfigContent).toContain('provideClientHydration');
    });

    it('should include withEventReplay and withNoHttpTransferCache in app.config.ts', () => {
      expect(appConfigContent).toContain(
        'provideClientHydration(withEventReplay(), withNoHttpTransferCache())'
      );
    });

    it('should import hydration functions in app.config.ts', () => {
      expect(appConfigContent).toContain('provideClientHydration');
      expect(appConfigContent).toContain('withEventReplay');
      expect(appConfigContent).toContain('withNoHttpTransferCache');
      expect(appConfigContent).toContain('@angular/platform-browser');
    });
  });

  // Common CSR+SSR tests - these should also pass for SSR apps
  describe('Common transformations (also applied to SSR apps)', () => {
    describe('src/app/app.component.ts', () => {
      let content: string;

      beforeAll(() => {
        content = tree.readContent('/src/app/app.component.ts');
      });

      it('should remove standalone: false', () => {
        expect(content).not.toContain('standalone: false');
      });

      it('should add imports: [StorefrontComponent]', () => {
        expect(content).toContain('imports: [StorefrontComponent]');
      });

      it('should import StorefrontComponent', () => {
        expect(content).toContain(
          'import { StorefrontComponent } from "@spartacus/storefront"'
        );
      });
    });

    describe('src/app/app.module.ts', () => {
      let content: string;

      beforeAll(() => {
        content = tree.readContent('/src/app/app.module.ts');
      });

      it('should remove bootstrap: [AppComponent]', () => {
        expect(content).not.toContain('bootstrap: [AppComponent]');
      });

      it('should remove declarations: [AppComponent]', () => {
        expect(content).not.toContain('declarations: [AppComponent]');
      });

      it('should remove BrowserModule', () => {
        expect(content).not.toContain('BrowserModule');
      });

      it('should preserve other imports', () => {
        expect(content).toContain('AppRoutingModule');
        expect(content).toContain('SpartacusModule');
      });
    });

    describe('src/app/app.config.ts', () => {
      let content: string;

      beforeAll(() => {
        content = tree.readContent('/src/app/app.config.ts');
      });

      it('should create the file', () => {
        expect(tree.exists('/src/app/app.config.ts')).toBeTruthy();
      });

      it('should export ApplicationConfig', () => {
        expect(content).toContain('export const appConfig: ApplicationConfig');
      });

      it('should include all required providers', () => {
        expect(content).toContain('provideBrowserGlobalErrorListeners()');
        expect(content).toContain(
          'provideZoneChangeDetection({ eventCoalescing: true })'
        );
        expect(content).toContain(
          'provideHttpClient(withFetch(), withInterceptorsFromDi())'
        );
        expect(content).toContain('importProvidersFrom(AppModule)');
      });
    });

    describe('src/main.ts', () => {
      let content: string;

      beforeAll(() => {
        content = tree.readContent('/src/main.ts');
      });

      it('should use bootstrapApplication', () => {
        expect(content).toContain(
          'bootstrapApplication(AppComponent, appConfig)'
        );
      });

      it('should not use platformBrowser or bootstrapModule', () => {
        expect(content).not.toContain('platformBrowser');
        expect(content).not.toContain('bootstrapModule');
      });

      it('should import required symbols', () => {
        expect(content).toContain('bootstrapApplication');
        expect(content).toContain('AppComponent');
        expect(content).toContain('appConfig');
      });
    });

    describe('angular.json', () => {
      let angularJson: any;

      beforeAll(() => {
        const content = tree.readContent('/angular.json');
        angularJson = JSON.parse(content);
      });

      it('should remove standalone: false from schematics', () => {
        expect(
          angularJson.schematics?.['@schematics/angular:component']?.standalone
        ).toBeUndefined();
        expect(
          angularJson.schematics?.['@schematics/angular:directive']?.standalone
        ).toBeUndefined();
        expect(
          angularJson.schematics?.['@schematics/angular:pipe']?.standalone
        ).toBeUndefined();
      });
    });
  });
});
