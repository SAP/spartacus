import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';

const MIGRATION_SCRIPT_NAME = '01-migration-v2212-update-styles';
const collectionPath = path.join(__dirname, '../../migrations.json');

describe('Update Styles Migration', () => {
  let host: TempScopedNodeJsSyncHost;
  let appTree: UnitTestTree;
  const schematicRunner = new SchematicTestRunner('test', collectionPath);

  beforeEach(() => {
    host = new TempScopedNodeJsSyncHost();
    appTree = new UnitTestTree(new HostTree(host));
  });

  describe('replaceImportsWithUse', () => {
    it('should preserve quote style when replacing @import with @use', async () => {
      const testContent = `
        @import 'foo';
        @import "bar";
        @import './path/to/file';
        @import "./another/path";
      `;
      appTree.create('/src/styles.scss', testContent);

      const tree = await schematicRunner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        appTree
      );

      const updatedContent = tree.readContent('/src/styles.scss');
      expect(updatedContent).toContain("@use 'foo'");
      expect(updatedContent).toContain('@use "bar"');
      expect(updatedContent).toContain("@use './path/to/file'");
      expect(updatedContent).toContain('@use "./another/path"');
      expect(updatedContent).not.toContain('@import');
    });

    it('should not modify content without @import statements', async () => {
      const testContent = `
        .some-class { color: red; }
        @use 'already-migrated';
        @use "also-migrated";
      `;
      appTree.create('/src/styles.scss', testContent);

      const tree = await schematicRunner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        appTree
      );

      const updatedContent = tree.readContent('/src/styles.scss');
      expect(updatedContent).toBe(testContent);
    });
  });

  describe('updateAppStyles', () => {
    it('should update all scss files in src/styles preserving quote style', async () => {
      const testFiles = {
        '/src/styles/one.scss': '@import "foo";',
        '/src/styles/nested/two.scss': "@import 'bar';",
        '/src/other/not-processed.scss': '@import "baz";',
      };

      Object.entries(testFiles).forEach(([path, content]) => {
        appTree.create(path, content);
      });

      const tree = await schematicRunner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        appTree
      );

      expect(tree.readContent('/src/styles/one.scss')).toContain('@use "foo"');
      expect(tree.readContent('/src/styles/nested/two.scss')).toContain(
        "@use 'bar'"
      );
      expect(tree.readContent('/src/other/not-processed.scss')).toContain(
        '@import "baz"'
      );
    });

    it('should handle complex directory structure in src/styles', async () => {
      const testFiles = {
        // Root level styles
        '/src/styles/main.scss': '@import "main-theme";',
        '/src/styles/variables.scss': '@import "variables";',
        // Feature modules styles
        '/src/styles/features/cart/cart.scss': '@import "cart-variables";',
        '/src/styles/features/cart/_variables.scss': '@import "./mixins";',
        '/src/styles/features/cart/_mixins.scss': '@import "../shared/mixins";',
        // Shared styles
        '/src/styles/shared/_colors.scss': '@import "brand-colors";',
        '/src/styles/shared/_mixins.scss': '@import "./colors";',
        '/src/styles/shared/components/_buttons.scss': '@import "../mixins";',
        // Files that should not be processed
        '/src/styles/README.md': '# Styles documentation',
        '/src/styles/features/cart/cart.component.ts':
          'export class CartComponent {}',
        '/src/other/styles/theme.scss': '@import "theme";',
      };

      Object.entries(testFiles).forEach(([filePath, content]) => {
        appTree.create(filePath, content);
      });

      const tree = await schematicRunner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        appTree
      );

      // Check if SCSS files in src/styles are processed
      expect(tree.readContent('/src/styles/main.scss')).toContain(
        '@use "main-theme"'
      );
      expect(tree.readContent('/src/styles/variables.scss')).toContain(
        '@use "variables"'
      );
      expect(tree.readContent('/src/styles/features/cart/cart.scss')).toContain(
        '@use "cart-variables"'
      );
      expect(
        tree.readContent('/src/styles/features/cart/_variables.scss')
      ).toContain('@use "./mixins"');
      expect(
        tree.readContent('/src/styles/features/cart/_mixins.scss')
      ).toContain('@use "../shared/mixins"');
      expect(tree.readContent('/src/styles/shared/_colors.scss')).toContain(
        '@use "brand-colors"'
      );
      expect(tree.readContent('/src/styles/shared/_mixins.scss')).toContain(
        '@use "./colors"'
      );
      expect(
        tree.readContent('/src/styles/shared/components/_buttons.scss')
      ).toContain('@use "../mixins"');

      // Check if non-SCSS files are untouched
      expect(tree.readContent('/src/styles/README.md')).toBe(
        '# Styles documentation'
      );
      expect(
        tree.readContent('/src/styles/features/cart/cart.component.ts')
      ).toBe('export class CartComponent {}');

      // Check if files outside src/styles are not processed
      expect(tree.readContent('/src/other/styles/theme.scss')).toContain(
        '@import "theme"'
      );
    });
  });

  describe('updateRootStyles', () => {
    it('should update root styles.scss file preserving quote style', async () => {
      appTree.create('/src/styles.scss', "@import 'theme';");

      const tree = await schematicRunner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        appTree
      );

      expect(tree.readContent('/src/styles.scss')).toContain("@use 'theme'");
    });

    it('should handle missing root styles file gracefully', async () => {
      const tree = await schematicRunner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        appTree
      );

      expect(tree.exists('/src/styles.scss')).toBeFalsy();
    });
  });

  describe('updateSpartacusStyleFiles', () => {
    it('should process both app and root styles preserving quote style', async () => {
      appTree.create('/src/styles.scss', "@import 'theme';");
      appTree.create('/src/styles/custom.scss', '@import "custom";');

      const tree = await schematicRunner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        appTree
      );

      expect(tree.readContent('/src/styles.scss')).toContain("@use 'theme'");
      expect(tree.readContent('/src/styles/custom.scss')).toContain(
        '@use "custom"'
      );
    });
  });
});
