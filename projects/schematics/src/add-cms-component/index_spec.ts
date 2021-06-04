import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { addSymbolToNgModuleMetadata } from '@schematics/angular/utility/ast-utils';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import {
  ANGULAR_SCHEMATICS,
  CMS_CONFIG,
  CONFIG_MODULE_CLASS,
  UTF_8,
} from '../shared/constants';
import {
  commitChanges,
  getTsSourceFile,
  InsertDirection,
} from '../shared/utils/file-utils';
import { CxCmsComponentSchema } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');

const DEFAULT_BASE_NAME = 'my-awesome-cms';
const DEFAULT_PATH = '/src/app/my-awesome-cms';
const GENERATED_MODULE_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.module.ts`;
const GENERATED_SCSS_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.component.scss`;
const GENERATED_HTML_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.component.html`;
const GENERATED_SPEC_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.component.spec.ts`;
const GENERATED_TS_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.component.ts`;
const APP_MODULE_PATH = '/src/app/app.module.ts';

function assertPathDoesNotExists(
  appTree: UnitTestTree,
  filePath: string
): void {
  const buffer = appTree.read(filePath);
  expect(buffer).toBeFalsy();
}

function assertPathExists(appTree: UnitTestTree, filePath: string): void {
  const buffer = appTree.read(filePath);
  expect(buffer).toBeTruthy();
}

function assertContentExists(
  appTree: UnitTestTree,
  textToContain: string[],
  filePath: string
): void {
  const buffer = appTree.read(filePath);
  expect(buffer).toBeTruthy();
  if (buffer) {
    const content = buffer.toString(UTF_8);
    for (const expected of textToContain) {
      expect(content).toContain(expected);
    }
  }
}

function assertContentDoesNotExist(
  appTree: UnitTestTree,
  textToContain: string[],
  filePath: string
): void {
  const buffer = appTree.read(filePath);
  expect(buffer).toBeTruthy();
  if (buffer) {
    const content = buffer.toString(UTF_8);
    for (const expected of textToContain) {
      expect(content).not.toContain(expected);
    }
  }
}

describe('add-cms-component', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
  };

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
  };

  const commonCmsOptions: CxCmsComponentSchema = {
    name: 'myAwesomeCms',
    cmsComponentDataModel: 'MyModel',
    project: defaultOptions.project,
  } as CxCmsComponentSchema;

  beforeEach(async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        ANGULAR_SCHEMATICS,
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        ANGULAR_SCHEMATICS,
        'application',
        appOptions,
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
  });

  describe('when generating a cms module and a component', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('add-cms-component', commonCmsOptions, appTree)
        .toPromise();
    });

    it('should generate the specified component and cms module', async () => {
      assertPathExists(appTree, GENERATED_MODULE_PATH);
      assertPathExists(appTree, GENERATED_SCSS_PATH);
      assertPathExists(appTree, GENERATED_HTML_PATH);
      assertPathExists(appTree, GENERATED_SPEC_PATH);
      assertPathExists(appTree, GENERATED_TS_PATH);
      assertPathExists(appTree, APP_MODULE_PATH);

      // generated cms module assertions
      assertContentExists(
        appTree,
        [`import { MyAwesomeCmsComponent } from './my-awesome-cms.component';`],
        GENERATED_MODULE_PATH
      );
      assertContentExists(
        appTree,
        [`declarations: [MyAwesomeCmsComponent],`],
        GENERATED_MODULE_PATH
      );
      assertContentExists(appTree, [], GENERATED_MODULE_PATH);
      assertContentExists(
        appTree,
        [`exports: [MyAwesomeCmsComponent]`],
        GENERATED_MODULE_PATH
      );
      assertContentExists(
        appTree,
        [
          `ConfigModule.withConfig(<CmsConfig>{`,
          `cmsComponents: {`,
          `MyAwesomeCmsComponent: {`,
          `component: MyAwesomeCmsComponent,`,
        ],
        GENERATED_MODULE_PATH
      );

      // generated html assertions
      assertContentExists(
        appTree,
        [
          `<ng-container *ngIf="componentData$ | async as data">`,
          `{{data | json}}`,
          `</ng-container>`,
        ],
        GENERATED_HTML_PATH
      );

      // generated component assertions
      assertContentExists(
        appTree,
        [
          `componentData$: Observable<MyModel> = this.componentData.data$;`,
          `constructor(private componentData: CmsComponentData<MyModel>) { }`,
        ],
        GENERATED_TS_PATH
      );

      // app.module.ts assertions
      assertContentDoesNotExist(
        appTree,
        [
          `import { MyAwesomeCmsComponent } from './my-awesome-cms/my-awesome-cms.component';`,
          `MyAwesomeCmsComponent`,
          `exports: [MyAwesomeCmsComponent],`,
        ],
        APP_MODULE_PATH
      );
    });
  });

  describe('when a cms module already exists', () => {
    const existingModulePath = '/src/app/existing-cms/existing-cms.module.ts';

    beforeEach(async () => {
      const moduleName = 'existing-cms';
      const moduleOptions = {
        name: moduleName,
        project: defaultOptions.project,
      };
      const dummyComponentOptions = {
        project: defaultOptions.project,
        name: 'dummy',
        module: moduleName,
        export: true,
      };
      const modifiedOptions: CxCmsComponentSchema = {
        ...commonCmsOptions,
        declareCmsModule: moduleName,
      };

      appTree = await schematicRunner
        .runExternalSchematicAsync(
          ANGULAR_SCHEMATICS,
          'module',
          moduleOptions,
          appTree
        )
        .toPromise();

      appTree = await schematicRunner
        .runExternalSchematicAsync(
          ANGULAR_SCHEMATICS,
          'component',
          dummyComponentOptions,
          appTree
        )
        .toPromise();

      appTree = await schematicRunner
        .runSchematicAsync('add-cms-component', modifiedOptions, appTree)
        .toPromise();
    });

    it('should generate a component and add it to the specified module', async () => {
      assertPathExists(appTree, existingModulePath);
      assertPathDoesNotExists(appTree, GENERATED_MODULE_PATH);
      assertPathExists(appTree, GENERATED_SCSS_PATH);
      assertPathExists(appTree, GENERATED_HTML_PATH);
      assertPathExists(appTree, GENERATED_SPEC_PATH);
      assertPathExists(appTree, GENERATED_TS_PATH);
      assertPathExists(appTree, APP_MODULE_PATH);

      // generated cms module assertions
      assertContentExists(
        appTree,
        [
          `import { MyAwesomeCmsComponent } from '../my-awesome-cms/my-awesome-cms.component';`,
        ],
        existingModulePath
      );
      assertContentExists(
        appTree,
        [`declarations: [DummyComponent, MyAwesomeCmsComponent],`],
        existingModulePath
      );
      assertContentExists(appTree, [], existingModulePath);
      assertContentExists(
        appTree,
        [`exports: [DummyComponent, MyAwesomeCmsComponent]`],
        existingModulePath
      );
      assertContentExists(
        appTree,
        [
          `ConfigModule.withConfig(<CmsConfig>{`,
          `cmsComponents: {`,
          `MyAwesomeCmsComponent: {`,
          `component: MyAwesomeCmsComponent,`,
        ],
        existingModulePath
      );

      // generated html assertions
      assertContentExists(
        appTree,
        [
          `<ng-container *ngIf="componentData$ | async as data">`,
          `{{data | json}}`,
          `</ng-container>`,
        ],
        GENERATED_HTML_PATH
      );

      // generated component assertions
      assertContentExists(
        appTree,
        [
          `componentData$: Observable<MyModel> = this.componentData.data$;`,
          `constructor(private componentData: CmsComponentData<MyModel>) { }`,
        ],
        GENERATED_TS_PATH
      );

      // app.module.ts assertions
      assertContentDoesNotExist(
        appTree,
        [
          `import { MyAwesomeCmsComponent } from './my-awesome-cms/my-awesome-cms.component';`,
          `MyAwesomeCmsComponent`,
          `exports: [MyAwesomeCmsComponent],`,
        ],
        APP_MODULE_PATH
      );
    });

    describe('when the ConfigModule.withConfig() already contains some CMS mappings', () => {
      beforeEach(async () => {
        const moduleSource = getTsSourceFile(appTree, existingModulePath);
        const changes = addSymbolToNgModuleMetadata(
          moduleSource,
          existingModulePath,
          'imports',
          `${CONFIG_MODULE_CLASS}.withConfig(<${CMS_CONFIG}>{
            cmsComponents: {
              TestComponent: {
                component: TestComponent,
              },
            },
          }),`
        );
        commitChanges(
          appTree,
          existingModulePath,
          changes,
          InsertDirection.RIGHT
        );
      });

      it('should append the import', async () => {
        assertPathExists(appTree, existingModulePath);
        assertPathDoesNotExists(appTree, GENERATED_MODULE_PATH);
        assertPathExists(appTree, GENERATED_SCSS_PATH);
        assertPathExists(appTree, GENERATED_HTML_PATH);
        assertPathExists(appTree, GENERATED_SPEC_PATH);
        assertPathExists(appTree, GENERATED_TS_PATH);
        assertPathExists(appTree, APP_MODULE_PATH);

        // generated cms module assertions
        assertContentExists(
          appTree,
          [
            `import { MyAwesomeCmsComponent } from '../my-awesome-cms/my-awesome-cms.component';`,
          ],
          existingModulePath
        );
        assertContentExists(
          appTree,
          [`declarations: [DummyComponent, MyAwesomeCmsComponent],`],
          existingModulePath
        );
        assertContentExists(appTree, [], existingModulePath);
        assertContentExists(
          appTree,
          [`exports: [DummyComponent, MyAwesomeCmsComponent]`],
          existingModulePath
        );
        assertContentExists(
          appTree,
          [
            `ConfigModule.withConfig(<CmsConfig>{`,
            `cmsComponents: {`,
            `MyAwesomeCmsComponent: {`,
            `component: MyAwesomeCmsComponent,`,
            `TestComponent: {`,
            `component: TestComponent,`,
          ],
          existingModulePath
        );

        // generated html assertions
        assertContentExists(
          appTree,
          [
            `<ng-container *ngIf="componentData$ | async as data">`,
            `{{data | json}}`,
            `</ng-container>`,
          ],
          GENERATED_HTML_PATH
        );

        // generated component assertions
        assertContentExists(
          appTree,
          [
            `componentData$: Observable<MyModel> = this.componentData.data$;`,
            `constructor(private componentData: CmsComponentData<MyModel>) { }`,
          ],
          GENERATED_TS_PATH
        );

        // app.module.ts assertions
        assertContentDoesNotExist(
          appTree,
          [
            `import { MyAwesomeCmsComponent } from './my-awesome-cms/my-awesome-cms.component';`,
            `MyAwesomeCmsComponent`,
            `exports: [MyAwesomeCmsComponent],`,
          ],
          APP_MODULE_PATH
        );
      });
    });
  });

  describe('when generating a new cms module and declaring it in app.module.ts', () => {
    beforeEach(async () => {
      const modifiedOptions: CxCmsComponentSchema = {
        ...commonCmsOptions,
        module: 'app',
      };

      appTree = await schematicRunner
        .runSchematicAsync('add-cms-component', modifiedOptions, appTree)
        .toPromise();
    });

    it('should generate the cms module, the component and declare the cms module to app.module.ts', async () => {
      assertPathExists(appTree, GENERATED_MODULE_PATH);
      assertPathExists(appTree, GENERATED_SCSS_PATH);
      assertPathExists(appTree, GENERATED_HTML_PATH);
      assertPathExists(appTree, GENERATED_SPEC_PATH);
      assertPathExists(appTree, GENERATED_TS_PATH);
      assertPathExists(appTree, APP_MODULE_PATH);

      // generated cms module assertions
      assertContentExists(
        appTree,
        [`import { MyAwesomeCmsComponent } from './my-awesome-cms.component';`],
        GENERATED_MODULE_PATH
      );
      assertContentExists(
        appTree,
        [`declarations: [MyAwesomeCmsComponent],`],
        GENERATED_MODULE_PATH
      );
      assertContentExists(appTree, [], GENERATED_MODULE_PATH);
      assertContentExists(
        appTree,
        [`exports: [MyAwesomeCmsComponent]`],
        GENERATED_MODULE_PATH
      );
      assertContentExists(
        appTree,
        [
          `ConfigModule.withConfig(<CmsConfig>{`,
          `cmsComponents: {`,
          `MyAwesomeCmsComponent: {`,
          `component: MyAwesomeCmsComponent,`,
        ],
        GENERATED_MODULE_PATH
      );

      // generated html template assertions
      assertContentExists(
        appTree,
        [
          `<ng-container *ngIf="componentData$ | async as data">`,
          `{{data | json}}`,
          `</ng-container>`,
        ],
        GENERATED_HTML_PATH
      );

      // generated component assertions
      assertContentExists(
        appTree,
        [
          `componentData$: Observable<MyModel> = this.componentData.data$;`,
          `constructor(private componentData: CmsComponentData<MyModel>) { }`,
        ],
        GENERATED_TS_PATH
      );

      // app.module.ts assertions
      assertContentDoesNotExist(
        appTree,
        [`exports: [MyAwesomeCmsComponent],`],
        APP_MODULE_PATH
      );
      assertContentExists(
        appTree,
        [
          `import { MyAwesomeCmsModule } from './my-awesome-cms/my-awesome-cms.module';`,
        ],
        APP_MODULE_PATH
      );
    });
  });

  describe('when a cms module already exists and when module option is specified', () => {
    beforeEach(async () => {
      const moduleName = 'existing-cms';
      const moduleOptions = {
        name: moduleName,
        project: defaultOptions.project,
      };
      const modifiedOptions: CxCmsComponentSchema = {
        ...commonCmsOptions,
        module: 'app',
        declareCmsModule: moduleName,
      };

      appTree = await schematicRunner
        .runExternalSchematicAsync(
          ANGULAR_SCHEMATICS,
          'module',
          moduleOptions,
          appTree
        )
        .toPromise();

      appTree = await schematicRunner
        .runSchematicAsync('add-cms-component', modifiedOptions, appTree)
        .toPromise();
    });

    it('should generate the component and declare it to the cms module, and declare the cms module to the app.module.ts', async () => {
      const existingModulePath = '/src/app/existing-cms/existing-cms.module.ts';
      assertPathDoesNotExists(appTree, GENERATED_MODULE_PATH);
      assertPathExists(appTree, existingModulePath);
      assertPathExists(appTree, GENERATED_SCSS_PATH);
      assertPathExists(appTree, GENERATED_HTML_PATH);
      assertPathExists(appTree, GENERATED_SPEC_PATH);
      assertPathExists(appTree, GENERATED_TS_PATH);
      assertPathExists(appTree, APP_MODULE_PATH);

      // generated cms module assertions
      assertContentExists(
        appTree,
        [
          `import { MyAwesomeCmsComponent } from '../my-awesome-cms/my-awesome-cms.component';`,
        ],
        existingModulePath
      );
      assertContentExists(
        appTree,
        [`declarations: [MyAwesomeCmsComponent],`],
        existingModulePath
      );
      assertContentExists(appTree, [], existingModulePath);
      assertContentExists(
        appTree,
        [`exports: [MyAwesomeCmsComponent]`],
        existingModulePath
      );
      assertContentExists(
        appTree,
        [
          `ConfigModule.withConfig(<CmsConfig>{`,
          `cmsComponents: {`,
          `MyAwesomeCmsComponent: {`,
          `component: MyAwesomeCmsComponent,`,
        ],
        existingModulePath
      );

      // generated html template assertions
      assertContentExists(
        appTree,
        [
          `<ng-container *ngIf="componentData$ | async as data">`,
          `{{data | json}}`,
          `</ng-container>`,
        ],
        GENERATED_HTML_PATH
      );

      // generated component assertions
      assertContentExists(
        appTree,
        [
          `componentData$: Observable<MyModel> = this.componentData.data$;`,
          `constructor(private componentData: CmsComponentData<MyModel>) { }`,
        ],
        GENERATED_TS_PATH
      );

      // app.module.ts assertions
      assertContentDoesNotExist(
        appTree,
        [
          `import { MyAwesomeCmsComponent } from './my-awesome-cms/my-awesome-cms.component';`,
          `MyAwesomeCmsComponent`,
          `exports: [MyAwesomeCmsComponent],`,
        ],
        APP_MODULE_PATH
      );
      assertContentExists(appTree, [`ExistingCms`], APP_MODULE_PATH);
    });
  });
});
