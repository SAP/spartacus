import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { Style } from '@angular/cli/lib/config/schema';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';
import * as path from 'path';
import { DELETE_ME } from '.';
import { ANGULAR_SCHEMATICS, UTF_8 } from '../shared/constants';
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

function checkPathDoesNotExists(appTree: UnitTestTree, filePath: string): void {
  const buffer = appTree.read(filePath);
  expect(buffer).toBeFalsy();
  if (buffer) {
    if (DELETE_ME) {
      console.log('path: ', filePath);
      console.log('content: ', buffer.toString(UTF_8));
    }
  }
}

function checkPathExists(appTree: UnitTestTree, filePath: string): void {
  const buffer = appTree.read(filePath);
  expect(buffer).toBeTruthy();
  if (buffer) {
    if (DELETE_ME) {
      console.log('path: ', filePath);
      console.log('content: ', buffer.toString(UTF_8));
    }
  }
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

function asserContentDoesntExist(
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

  const workspaceOptions: any = {
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

  const defaultOptions = {
    project: 'schematics-test',
    target: 'build',
    configuration: 'production',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
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

  describe('simple use case', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('add-cms-component', commonCmsOptions, appTree)
        .toPromise();
    });

    it('should just generate the specified component and its module', () => {
      checkPathExists(appTree, GENERATED_MODULE_PATH);
      checkPathExists(appTree, GENERATED_SCSS_PATH);
      checkPathExists(appTree, GENERATED_HTML_PATH);
      checkPathExists(appTree, GENERATED_SPEC_PATH);
      checkPathExists(appTree, GENERATED_TS_PATH);
      checkPathExists(appTree, APP_MODULE_PATH);

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
      assertContentExists(
        appTree,
        [
          `<ng-container *ngIf="componentData$ | async as data">`,
          `{{data | json}}`,
          `</ng-container>`,
        ],
        GENERATED_HTML_PATH
      );
      assertContentExists(
        appTree,
        [
          `componentData$: Observable<MyModel> = this.componentData.data$;`,
          `constructor(private componentData: CmsComponentData<MyModel>) { }`,
        ],
        GENERATED_TS_PATH
      );
      asserContentDoesntExist(
        appTree,
        [
          `import { MyAwesomeCmsComponent } from './my-awesome-cms/my-awesome-cms.component';`,
          `MyAwesomeCmsComponent`,
          `exports: [MyAwesomeCmsComponent],`,
          `entryComponents: [MyAwesomeCmsComponent]`,
        ],
        APP_MODULE_PATH
      );
    });
  });

  describe('when a cms module already exists', () => {
    beforeEach(async () => {
      const moduleName = 'existing-cms';
      const moduleOptions = {
        name: moduleName,
        project: defaultOptions.project,
      };
      const modifiedOptions: CxCmsComponentSchema = {
        ...commonCmsOptions,
        declaringCmsModule: moduleName,
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

    it('should generate a component and add it to the specified module', () => {
      console.log('\n***', appTree.files);

      const existingModulePath = '/src/app/existing-cms/existing-cms.module.ts';
      checkPathExists(appTree, existingModulePath);
      checkPathDoesNotExists(appTree, GENERATED_MODULE_PATH);
      checkPathExists(appTree, GENERATED_SCSS_PATH);
      checkPathExists(appTree, GENERATED_HTML_PATH);
      checkPathExists(appTree, GENERATED_SPEC_PATH);
      checkPathExists(appTree, GENERATED_TS_PATH);
      checkPathExists(appTree, APP_MODULE_PATH);

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
      assertContentExists(
        appTree,
        [
          `<ng-container *ngIf="componentData$ | async as data">`,
          `{{data | json}}`,
          `</ng-container>`,
        ],
        GENERATED_HTML_PATH
      );
      assertContentExists(
        appTree,
        [
          `componentData$: Observable<MyModel> = this.componentData.data$;`,
          `constructor(private componentData: CmsComponentData<MyModel>) { }`,
        ],
        GENERATED_TS_PATH
      );
      asserContentDoesntExist(
        appTree,
        [
          `import { MyAwesomeCmsComponent } from './my-awesome-cms/my-awesome-cms.component';`,
          `MyAwesomeCmsComponent`,
          `exports: [MyAwesomeCmsComponent],`,
          `entryComponents: [MyAwesomeCmsComponent]`,
        ],
        APP_MODULE_PATH
      );
    });
  });
});
