import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-component-deprecations-05';

const SINGLE_USAGE_EXAMPLE = `<div>test</div>
<cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>
<div *ngIf="isAnonymousConsentsEnabled">Using a removed property</div>`;
const SINGLE_USAGE_EXAMPLE_EXPECTED = `<div>test</div>
<!-- 'isLevel13' property has been removed. --><cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>
<!-- 'isAnonymousConsentsEnabled' property has been removed. --><div *ngIf="isAnonymousConsentsEnabled">Using a removed property</div>`;
const MULTI_USAGE_EXAMPLE = `<cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>
<div>test</div>
<cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>`;
const MULTI_USAGE_EXAMPLE_EXPECTED = `<!-- 'isLevel13' property has been removed. --><cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>
<div>test</div>
<!-- 'isLevel13' property has been removed. --><cx-consent-management-form isLevel13="xxx"></cx-consent-management-form>`;

const PRODUCT_IMAGES_SINGLE_USAGE_EXAMPLE = `<div *ngIf="isThumbsEmpty">test</div>`;
const PRODUCT_IMAGES_SINGLE_USAGE_EXAMPLE_EXPECTED = `<!-- 'isThumbsEmpty' property has been removed. --><div *ngIf="isThumbsEmpty">test</div>`;
const PRODUCT_IMAGES_MULTIPLE_USAGE_EXAMPLE = `<div *ngIf="isThumbsEmpty">test</div>Custom content
<div class="bottom" *ngIf="isThumbsEmpty">test</div>`;
const PRODUCT_IMAGES_MULTIPLE_USAGE_EXAMPLE_EXPECTED = `<!-- 'isThumbsEmpty' property has been removed. --><div *ngIf="isThumbsEmpty">test</div>Custom content
<!-- 'isThumbsEmpty' property has been removed. --><div class="bottom" *ngIf="isThumbsEmpty">test</div>`;

const COMPONENT_INHERITANCE_TEST_CLASS = `
import { ConsentManagementFormComponent } from '@spartacus/core';
import { Component } from '@angular/core';
@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './test.html',
})
export class Test extends ConsentManagementFormComponent {
  usingRemovedProperties(): void {
    console.log(this.isLevel13);
    console.log(this.isAnonymousConsentsEnabled);
  }
}
`;
const COMPONENT_INHERITANCE_EXPECTED_CLASS = `
import { ConsentManagementFormComponent } from '@spartacus/core';
import { Component } from '@angular/core';
@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './test.html',
})
export class Test extends ConsentManagementFormComponent {
  usingRemovedProperties(): void {
// TODO:Spartacus - 'isLevel13' property has been removed.
    console.log(this.isLevel13);
// TODO:Spartacus - 'isAnonymousConsentsEnabled' property has been removed.
    console.log(this.isAnonymousConsentsEnabled);
  }
}
`;
const COMPONENT_INHERITANCE_INLINE_TEMPLATE_TEST_CLASS = `
import { ConsentManagementFormComponent } from '@spartacus/core';
import { Component } from '@angular/core';
@Component({
  selector: 'cx-consent-management-form',
  template: \`${SINGLE_USAGE_EXAMPLE}\`,
})
export class Test extends ConsentManagementFormComponent {
  usingIsLevel13(): void {
    console.log(this.isLevel13);
  }
}
`;
const COMPONENT_INHERITANCE_INLINE_TEMPLATE_EXPECTED_CLASS = `
import { ConsentManagementFormComponent } from '@spartacus/core';
import { Component } from '@angular/core';
@Component({
  selector: 'cx-consent-management-form',
  template: \`${SINGLE_USAGE_EXAMPLE_EXPECTED}\`,
})
export class Test extends ConsentManagementFormComponent {
  usingIsLevel13(): void {
// TODO:Spartacus - 'isLevel13' property has been removed.
    console.log(this.isLevel13);
  }
}
`;
const PRODUCT_IMAGES_COMPONENT_INHERITANCE_TEST_CLASS = `
import { ProductImagesComponent } from '@spartacus/core';
import { Component } from '@angular/core';
@Component({
  selector: 'cx-product-images',
  templateUrl: './test.html',
})
export class Test extends ProductImagesComponent {
  constructor() {
    const test = this.isThumbsEmpty;
  }
}
`;
const PRODUCT_IMAGES_COMPONENT_INHERITANCE_EXPECTED_CLASS = `
import { ProductImagesComponent } from '@spartacus/core';
import { Component } from '@angular/core';
@Component({
  selector: 'cx-product-images',
  templateUrl: './test.html',
})
export class Test extends ProductImagesComponent {
  constructor() {
// TODO:Spartacus - 'isThumbsEmpty' property has been removed.
    const test = this.isThumbsEmpty;
  }
}
`;

describe('component selectors migration', () => {
  let host = new TempScopedNodeJsSyncHost();
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../migrations.json')
    );
    host = new TempScopedNodeJsSyncHost();
    appTree = new UnitTestTree(new HostTree(host));

    writeFile(
      host,
      '/tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          lib: ['es2015'],
        },
      })
    );
    writeFile(
      host,
      '/angular.json',
      JSON.stringify({
        projects: {
          'schematics-test': {
            projectType: 'application',
            sourceRoot: 'src',
          },
        },
      })
    );

    previousWorkingDir = shx.pwd();
    tmpDirPath = getSystemPath(host.root);

    // Switch into the temporary directory path. This allows us to run
    // the schematic against our custom unit test tree.
    shx.cd(tmpDirPath);
  });

  afterEach(() => {
    shx.cd(previousWorkingDir);
    shx.rm('-r', tmpDirPath);
  });

  const htmlFileName = '/src/test.html';
  const tsFileName = '/src/inherited.ts';

  describe('when the html file contains a single usage', () => {
    it('should add a comment', async () => {
      writeFile(host, tsFileName, COMPONENT_INHERITANCE_TEST_CLASS);
      writeFile(host, htmlFileName, SINGLE_USAGE_EXAMPLE);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(htmlFileName);
      expect(content).toEqual(SINGLE_USAGE_EXAMPLE_EXPECTED);
    });
  });

  describe('when the html file contains multiple usages', () => {
    it('should add comments', async () => {
      writeFile(host, tsFileName, COMPONENT_INHERITANCE_TEST_CLASS);
      writeFile(host, htmlFileName, MULTI_USAGE_EXAMPLE);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(htmlFileName);
      expect(content).toEqual(MULTI_USAGE_EXAMPLE_EXPECTED);
    });
  });

  describe('when the component is extended', () => {
    it('should add comments', async () => {
      writeFile(host, tsFileName, COMPONENT_INHERITANCE_TEST_CLASS);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(tsFileName);
      expect(content).toEqual(COMPONENT_INHERITANCE_EXPECTED_CLASS);
    });
  });

  describe('when the component is extended and has an inline template', () => {
    it('should add comments to both component and inline template', async () => {
      writeFile(
        host,
        tsFileName,
        COMPONENT_INHERITANCE_INLINE_TEMPLATE_TEST_CLASS
      );

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(tsFileName);
      expect(content).toEqual(
        COMPONENT_INHERITANCE_INLINE_TEMPLATE_EXPECTED_CLASS
      );
    });
  });

  describe('ProductImagesComponent', () => {
    describe('when the html file contains a single usage', () => {
      it('should add a comment', async () => {
        writeFile(
          host,
          tsFileName,
          PRODUCT_IMAGES_COMPONENT_INHERITANCE_TEST_CLASS
        );
        writeFile(host, htmlFileName, PRODUCT_IMAGES_SINGLE_USAGE_EXAMPLE);

        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const content = appTree.readContent(htmlFileName);
        expect(content).toEqual(PRODUCT_IMAGES_SINGLE_USAGE_EXAMPLE_EXPECTED);
      });
    });
    describe('when the html file contains a multiple usage', () => {
      it('should add a comment', async () => {
        writeFile(
          host,
          tsFileName,
          PRODUCT_IMAGES_COMPONENT_INHERITANCE_TEST_CLASS
        );
        writeFile(host, htmlFileName, PRODUCT_IMAGES_MULTIPLE_USAGE_EXAMPLE);

        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const content = appTree.readContent(htmlFileName);
        expect(content).toEqual(PRODUCT_IMAGES_MULTIPLE_USAGE_EXAMPLE_EXPECTED);
      });
    });
    describe('when the component is extended', () => {
      it('should add comments', async () => {
        writeFile(
          host,
          tsFileName,
          PRODUCT_IMAGES_COMPONENT_INHERITANCE_TEST_CLASS
        );

        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const content = appTree.readContent(tsFileName);
        expect(content).toEqual(
          PRODUCT_IMAGES_COMPONENT_INHERITANCE_EXPECTED_CLASS
        );
      });
    });
  });
});
