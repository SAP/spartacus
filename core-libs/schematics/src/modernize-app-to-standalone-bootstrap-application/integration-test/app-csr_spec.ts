import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { loadFixturesIntoTree } from '../../test/fixtures-test-utils';

const collectionPath = join(__dirname, '../../collection.json');

const SCHEMATICS_NAME = 'modernize-app-to-standalone-bootstrap-application';

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

  describe('src/app/app.component.ts', () => {
    let content: string;

    beforeAll(() => {
      content = tree.readContent('/src/app/app.component.ts');
    });

    it('should be edited', () => {
      expect(content).toMatchSnapshot();
    });

    it('should remove standalone: false from @Component decorator', () => {
      expect(content).not.toContain('standalone: false');
    });

    it('should add imports: [StorefrontComponent] to @Component decorator', () => {
      expect(content).toContain('imports: [StorefrontComponent]');
    });

    it('should import StorefrontComponent from @spartacus/storefront', () => {
      expect(content).toContain(
        'import { StorefrontComponent } from "@spartacus/storefront"'
      );
    });

    it('should preserve existing @Component decorator properties', () => {
      expect(content).toContain("selector: 'app-root'");
    });

    it('should preserve component class body', () => {
      expect(content).toContain("title = 'mystore'");
      expect(content).toContain('export class AppComponent');
    });

    it('should not explicitly add standalone: true', () => {
      expect(content).not.toContain('standalone: true');
    });
  });

  describe('src/app/app.module.ts', () => {
    let content: string;

    beforeAll(() => {
      content = tree.readContent('/src/app/app.module.ts');
    });

    it('should be edited', () => {
      expect(content).toMatchSnapshot();
    });

    it('should remove bootstrap: [AppComponent] from @NgModule', () => {
      expect(content).not.toContain('bootstrap: [AppComponent]');
    });

    it('should remove declarations: [AppComponent] from @NgModule', () => {
      expect(content).not.toContain('AppComponent');
      expect(content).not.toContain('declarations:');
    });

    it('should remove BrowserModule from imports array', () => {
      expect(content).not.toContain('BrowserModule');
    });

    it('should remove provideBrowserGlobalErrorListeners from providers', () => {
      expect(content).not.toContain('provideBrowserGlobalErrorListeners()');
    });

    it('should remove provideZoneChangeDetection from providers', () => {
      expect(content).not.toContain('provideZoneChangeDetection');
    });

    it('should remove provideHttpClient from providers', () => {
      expect(content).not.toContain('provideHttpClient');
    });

    it('should preserve other imports in imports array', () => {
      expect(content).toContain('AppRoutingModule');
      expect(content).toContain('StoreModule.forRoot({})');
      expect(content).toContain('EffectsModule.forRoot([])');
      expect(content).toContain('SpartacusModule');
    });

    it('should preserve @NgModule decorator with remaining properties', () => {
      expect(content).toContain('@NgModule');
      expect(content).toContain('imports:');
    });

    it('should preserve AppModule class definition', () => {
      expect(content).toContain('export class AppModule { }');
    });
  });

  describe('src/app/app.config.ts', () => {
    let content: string;

    beforeAll(() => {
      content = tree.readContent('/src/app/app.config.ts');
    });

    it('should be created', () => {
      expect(content).toMatchSnapshot();
    });

    it('should create the file', () => {
      expect(tree.exists('/src/app/app.config.ts')).toBeTruthy();
    });

    it('should export ApplicationConfig constant', () => {
      expect(content).toContain('export const appConfig: ApplicationConfig');
    });

    it('should import provideHttpClient and related functions', () => {
      expect(content).toMatch(
        /import[\s\S]*provideHttpClient[\s\S]*from ['"]@angular\/common\/http/
      );
      expect(content).toMatch(
        /import[\s\S]*withFetch[\s\S]*from ['"]@angular\/common\/http/
      );
      expect(content).toMatch(
        /import[\s\S]*withInterceptorsFromDi[\s\S]*from ['"]@angular\/common\/http/
      );
    });

    it('should import ApplicationConfig and related functions from @angular/core', () => {
      expect(content).toContain('ApplicationConfig');
      expect(content).toContain('importProvidersFrom');
      expect(content).toContain('provideBrowserGlobalErrorListeners');
      expect(content).toContain('provideZoneChangeDetection');
    });

    it('should import AppModule', () => {
      expect(content).toMatch(/import.*AppModule.*from ['"]\.?\/app\.module/);
    });

    it('should include provideBrowserGlobalErrorListeners() in providers', () => {
      expect(content).toContain('provideBrowserGlobalErrorListeners()');
    });

    it('should include provideZoneChangeDetection in providers', () => {
      expect(content).toContain(
        'provideZoneChangeDetection({ eventCoalescing: true })'
      );
    });

    it('should include provideHttpClient in providers', () => {
      expect(content).toContain(
        'provideHttpClient(withFetch(), withInterceptorsFromDi())'
      );
    });

    it('should include importProvidersFrom(AppModule) in providers', () => {
      expect(content).toContain('importProvidersFrom(AppModule)');
    });
  });

  describe('src/main.ts', () => {
    let content: string;

    beforeAll(() => {
      content = tree.readContent('/src/main.ts');
    });

    it('should be edited', () => {
      expect(content).toMatchSnapshot();
    });

    it('should replace platformBrowser().bootstrapModule with bootstrapApplication', () => {
      expect(content).toContain(
        'bootstrapApplication(AppComponent, appConfig)'
      );
    });

    it('should not contain platformBrowser', () => {
      expect(content).not.toContain('platformBrowser');
    });

    it('should not contain bootstrapModule', () => {
      expect(content).not.toContain('bootstrapModule');
    });

    it('should import bootstrapApplication from @angular/platform-browser', () => {
      expect(content).toContain(
        'import { bootstrapApplication } from "@angular/platform-browser"'
      );
    });

    it('should import AppComponent', () => {
      expect(content).toContain(
        'import { AppComponent } from "./app/app.component"'
      );
    });

    it('should import appConfig', () => {
      expect(content).toContain('import { appConfig } from "./app/app.config"');
    });

    it('should preserve error handling with catch', () => {
      expect(content).toContain('.catch((err) => console.error(err))');
    });

    it('should not import AppModule anymore', () => {
      expect(content).not.toContain('AppModule');
    });
  });

  describe('angular.json', () => {
    let angularJson: any;

    beforeAll(() => {
      const content = tree.readContent('/angular.json');
      angularJson = JSON.parse(content);
    });

    it('should be edited', () => {
      expect(angularJson).toMatchSnapshot();
    });

    it('should remove standalone: false from @schematics/angular:component', () => {
      const componentSchematic =
        angularJson.schematics?.['@schematics/angular:component'];
      expect(componentSchematic?.standalone).toBeUndefined();
    });

    it('should remove standalone: false from @schematics/angular:directive', () => {
      const directiveSchematic =
        angularJson.schematics?.['@schematics/angular:directive'];
      expect(directiveSchematic?.standalone).toBeUndefined();
    });

    it('should remove standalone: false from @schematics/angular:pipe', () => {
      const pipeSchematic =
        angularJson.schematics?.['@schematics/angular:pipe'];
      expect(pipeSchematic?.standalone).toBeUndefined();
    });

    it('should preserve other schematic properties', () => {
      // Component should still have other properties but not standalone
      expect(
        angularJson.schematics?.['@schematics/angular:component']
      ).toBeDefined();
    });

    it('should remove project-level standalone: false from component schematic', () => {
      const projectSchematics = angularJson.projects?.mystore?.schematics;
      if (projectSchematics) {
        expect(
          projectSchematics['@schematics/angular:component']?.standalone
        ).toBeUndefined();
      }
    });

    it('should remove project-level standalone: false from directive schematic', () => {
      const projectSchematics = angularJson.projects?.mystore?.schematics;
      if (projectSchematics) {
        expect(
          projectSchematics['@schematics/angular:directive']?.standalone
        ).toBeUndefined();
      }
    });

    it('should remove project-level standalone: false from pipe schematic', () => {
      const projectSchematics = angularJson.projects?.mystore?.schematics;
      if (projectSchematics) {
        expect(
          projectSchematics['@schematics/angular:pipe']?.standalone
        ).toBeUndefined();
      }
    });
  });
});
