import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { SPARTACUS_SCHEMATICS } from '../../../shared/libs-constants';
import path from 'path';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as SpartacusOptions } from '../../../add-spartacus/schema';
import {
  EXPRESS_TOKENS,
  SERVER_BAK_FILENAME,
  SERVER_FILENAME,
  SSR_SETUP_IMPORT,
} from '../../../shared';

const updateSsrCollectionPath = path.join(
  __dirname,
  './update-ssr.collection.json'
);
const collectionPath = path.join(__dirname, '../../../collection.json');

describe('Update SSR', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );
  const updateSsrSchematicRunner = new SchematicTestRunner(
    'test',
    updateSsrCollectionPath
  );

  let tree: UnitTestTree;

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
    standalone: false,
  };
  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
  };
  beforeEach(async () => {
    tree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    tree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      tree
    );

    tree = await schematicRunner.runSchematic(
      'add-spartacus',
      { ...defaultOptions, name: 'schematics-test' },
      tree
    );

    tree = await schematicRunner.runSchematic(
      'add-ssr',
      { ...defaultOptions, name: 'schematics-test' },
      tree
    );
  });

  describe('updateServerFile', () => {
    it('should restore server.ts based on the server.ts.bak and remove server.ts.bak file', async () => {
      const serverBakPath = `./${SERVER_BAK_FILENAME}`;
      const serverBakFileContent = 'testing';
      tree.create(serverBakPath, serverBakFileContent);
      expect(tree.exists(serverBakPath)).toBeTruthy();
    });
  });

  describe('updateTokensSchematic', () => {
    it('should remove express.tokens.ts file', async () => {
      const tokensPath = `./${EXPRESS_TOKENS}.ts`;
      tree.create(tokensPath, 'request response');
      expect(tree.exists(tokensPath)).toBeTruthy();

      tree = await updateSsrSchematicRunner.runSchematic(
        'update-ssr',
        { name: 'schematics-test' },
        tree
      );

      const restoredServerFileContent = tree.read(SERVER_FILENAME)?.toString();

      expect(restoredServerFileContent).toEqual(serverBakFileContent);
      expect(tree.exists(serverBakPath)).toBeFalsy();
      expect(tree.exists(SERVER_FILENAME)).toBeTruthy();
      expect(tree.exists(tokensPath)).toBeFalsy();
    });

    it('should update token import paths in .ts files', async () => {
      const filePath = './src/test-tokens.ts';

      tree.create(
        filePath,
        `import { REQUEST, RESPONSE } from './${EXPRESS_TOKENS}';`
      );
      tree = await updateSsrSchematicRunner.runSchematic(
        'update-ssr',
        { name: 'schematics-test' },
        tree
      );

      const updatedContent = tree.read(filePath)!.toString();
      expect(updatedContent).toContain(
        `import { REQUEST, RESPONSE } from '${SSR_SETUP_IMPORT}';`
      );
    });
  });
});
