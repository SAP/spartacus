import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import ts from 'typescript';
import { UTF_8 } from '../constants';
import { getPathResultsForFile } from './file-utils';
import {
  addImport,
  addToModuleDeclarations,
  addToModuleExports,
  addToModuleImports,
  getTemplateInfo,
  stripTsFromImport,
} from './module-file-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

const TEMPLATE_NAME = 'template.html';
const COMPONENT_TEMPLATE_URL = `
import { Component } from '@angular/core';
@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './${TEMPLATE_NAME}',
})
export class Test {}
`;
const TEMPLATE = '<div>test</div>';
const COMPONENT_INLINE_TEMPLATE = `
import { Component } from '@angular/core';
@Component({
  selector: 'cx-consent-management-form',
  template: \`${TEMPLATE}\`,
})
export class Test {}
`;

describe('Module file utils', () => {
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
  const defaultOptions = {
    project: 'schematics-test',
  };

  beforeEach(async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
  });

  describe('stripTsFromImport', () => {
    it('should strip the .ts when present', () => {
      const test1 = '../../components.ts';
      expect(stripTsFromImport(test1)).toEqual('../../components');

      const test2 = '../../ts.ts.ts';
      expect(stripTsFromImport(test2)).toEqual('../../ts.ts');
    });
    it('should NOT strip the .ts when the import path does not end with it', () => {
      const test = '../ts.tsts';
      expect(stripTsFromImport(test)).toEqual(test);
    });
  });

  describe('addImport', () => {
    it('should add passed import', async () => {
      const appModulePath = getPathResultsForFile(
        appTree,
        'app.module.ts',
        'src'
      )[0];
      expect(appModulePath).toBeTruthy();
      addImport(appTree, appModulePath, 'MockUnitTestModule', '@test');

      const buffer = appTree.read(appModulePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const fileContent = buffer.toString(UTF_8);
        expect(
          fileContent.includes("import { MockUnitTestModule } from '@test';")
        ).toBeTruthy();
      }
    });
  });

  describe('add metadata to ng module', () => {
    describe('addToModuleImports', () => {
      it('should add passed position to imports array', async () => {
        const appModulePath = getPathResultsForFile(
          appTree,
          'app.module.ts',
          'src'
        )[0];
        expect(appModulePath).toBeTruthy();
        const resultChange = addToModuleImports(
          appTree,
          appModulePath,
          'MockUnitTestModule'
        );

        expect(resultChange).toBeTruthy();
        expect(resultChange.length).toEqual(1);
        expect(resultChange[0].toAdd).toContain('MockUnitTestModule');
      });
    });
    describe('addToModuleDeclarations', () => {
      it('should add passed position to declarations array', async () => {
        const appModulePath = getPathResultsForFile(
          appTree,
          'app.module.ts',
          'src'
        )[0];
        expect(appModulePath).toBeTruthy();
        const resultChange = addToModuleDeclarations(
          appTree,
          appModulePath,
          'MockUnitTestModule'
        );

        expect(resultChange).toBeTruthy();
        expect(resultChange.length).toEqual(1);
        expect(resultChange[0].toAdd).toContain('MockUnitTestModule');
      });
    });

    describe('addToModuleExports', () => {
      it('should add passed position to exports array', async () => {
        const appModulePath = getPathResultsForFile(
          appTree,
          'app.module.ts',
          'src'
        )[0];
        expect(appModulePath).toBeTruthy();
        const resultChange = addToModuleExports(
          appTree,
          appModulePath,
          'MockUnitTestModule'
        );

        expect(resultChange).toBeTruthy();
        expect(resultChange.length).toEqual(1);
        expect(resultChange[0].toAdd).toContain('MockUnitTestModule');
      });
    });
  });

  describe('getTemplateInfo', () => {
    describe('when the templateUrl is specified', () => {
      it('should return the template path', () => {
        const source = ts.createSourceFile(
          'component.ts',
          COMPONENT_TEMPLATE_URL,
          ts.ScriptTarget.Latest,
          true
        );
        const result = getTemplateInfo(source);
        expect(result).toBeTruthy();
        if (result) {
          expect(result.templateUrl).toEqual(TEMPLATE_NAME);
          expect(result.inlineTemplateContent).toBeUndefined();
          expect(result.inlineTemplateStart).toBeUndefined();
        }
      });
    });

    describe('when the inline template is defined', () => {
      it('should return the template path', () => {
        const source = ts.createSourceFile(
          'component.ts',
          COMPONENT_INLINE_TEMPLATE,
          ts.ScriptTarget.Latest,
          true
        );
        const result = getTemplateInfo(source);
        expect(result).toBeTruthy();
        if (result) {
          expect(result.inlineTemplateContent).toEqual(TEMPLATE);
          expect(result.inlineTemplateStart).toEqual(112);
          expect(result.templateUrl).toBeUndefined();
        }
      });
    });
  });
});
