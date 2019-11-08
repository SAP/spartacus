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
const MODULE_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.module.ts`;
const SCSS_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.component.scss`;
const HTML_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.component.html`;
const SPEC_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.component.spec.ts`;
const TS_PATH = `${DEFAULT_PATH}/${DEFAULT_BASE_NAME}.component.ts`;
const APP_MODULE_PATH = '/src/app/app.module.ts';

function checkPath(appTree: UnitTestTree, filePath: string): void {
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
      console.log('\n***', appTree.files);

      checkPath(appTree, MODULE_PATH);
      checkPath(appTree, SCSS_PATH);
      checkPath(appTree, HTML_PATH);
      checkPath(appTree, SPEC_PATH);
      checkPath(appTree, TS_PATH);
      checkPath(appTree, APP_MODULE_PATH);

      assertContentExists(
        appTree,
        [
          `ConfigModule.withConfig(<CmsConfig>{`,
          `cmsComponents: {`,
          `MyAwesomeCmsComponent: {`,
          `component: MyAwesomeCmsComponent,`,
        ],
        MODULE_PATH
      );
      assertContentExists(
        appTree,
        [
          `<ng-container *ngIf="componentData$ | async as data">`,
          `{{data | json}}`,
          `</ng-container>`,
        ],
        HTML_PATH
      );
      assertContentExists(
        appTree,
        [
          `componentData$: Observable<MyModel> = this.componentData.data$;`,
          `constructor(private componentData: CmsComponentData<MyModel>) { }`,
        ],
        TS_PATH
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
