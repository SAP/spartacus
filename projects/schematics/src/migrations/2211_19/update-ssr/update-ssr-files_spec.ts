import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics/src/tree/host-tree';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import path from 'path';
import {
  EXPRESS_TOKENS,
  NEW_ZONE_IMPORT,
  NGUNIVERSAL_IMPORT,
  OLD_ZONE_IMPORT,
  SERVER_BAK_FILENAME,
  SERVER_FILENAME,
  SSR_SETUP_IMPORT,
} from '../../../shared/constants';

const updateSsrCollectionPath = path.join(
  __dirname,
  './update-ssr.collection.json'
);

const serverFilePath = './server.ts';

describe('Update SSR', () => {
  const updateSsrSchematicRunner = new SchematicTestRunner(
    'test',
    updateSsrCollectionPath
  );
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;

  beforeEach(() => {
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));
  });

  describe('updateServerFile', () => {
    it('should change nguniversal import in server.ts', async () => {
      const serverFileContent = `import { ngExpressEngine as engine } from '@nguniversal/express-engine'`;
      tree.create(serverFilePath, serverFileContent);
      tree = await updateSsrSchematicRunner.runSchematic(
        'update-ssr',
        { name: 'schematics-test' },
        tree
      );

      const updatedContent = tree.read(serverFilePath)?.toString();
      expect(updatedContent).toContain(SSR_SETUP_IMPORT);
      expect(updatedContent).not.toContain(NGUNIVERSAL_IMPORT);
    });

    it('should change zone.js import in server.ts', async () => {
      let serverFileContent = `
      import "${OLD_ZONE_IMPORT}"
      import { NgExpressEngineDecorator, ngExpressEngine as engine } from '@spartacus/setup/ssr';
      `;

      tree.create(serverFilePath, serverFileContent);

      tree = await updateSsrSchematicRunner.runSchematic(
        'update-ssr',
        { name: 'schematics-test' },
        tree
      );

      const updatedServerContent = tree.read(serverFilePath)?.toString();
      expect(updatedServerContent).toContain(NEW_ZONE_IMPORT);
      expect(updatedServerContent).not.toContain(OLD_ZONE_IMPORT);
    });

    it('should restore server.ts based on the server.ts.bak and remove server.ts.bak file', async () => {
      const serverFileContent = `import { NgExpressEngineDecorator, ngExpressEngine as engine } from '@spartacus/setup/ssr';`;
      tree.create(serverFilePath, serverFileContent);

      const serverBakPath = `./${SERVER_BAK_FILENAME}`;
      const serverBakFileContent = 'testing';
      tree.create(serverBakPath, serverBakFileContent);
      expect(tree.exists(serverBakPath)).toBeTruthy();
      tree = await updateSsrSchematicRunner.runSchematic(
        'update-ssr',
        { name: 'schematics-test' },
        tree
      );

      const restoredServerFileContent = tree.read(SERVER_FILENAME)?.toString();

      expect(restoredServerFileContent).toEqual(serverBakFileContent);
      expect(tree.exists(serverBakPath)).toBeFalsy();
      expect(tree.exists(SERVER_FILENAME)).toBeTruthy();
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

      const updatedContent = tree.read(filePath)?.toString();
      expect(updatedContent).toContain(
        `import { REQUEST, RESPONSE } from '${SSR_SETUP_IMPORT}';`
      );
    });
  });
});
