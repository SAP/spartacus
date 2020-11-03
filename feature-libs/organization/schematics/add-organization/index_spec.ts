import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { SpartacusOptions, UTF_8 } from '@spartacus/schematics';
import * as path from 'path';
import { Schema as SpartacusOrganizationOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Organization schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
    projectRoot: '',
  };

  const defaultOptions: SpartacusOrganizationOptions = {
    project: 'schematics-test',
    lazy: true,
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      '@spartacus/schematics',
      '../../projects/schematics/src/collection.json'
    );
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
      .runExternalSchematicAsync(
        '@spartacus/schematics',
        'ng-add',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('styling', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();
    });

    it('should add style import to /src/styles/spartacus/organization.scss', async () => {
      const buffer = appTree.read('/src/styles/spartacus/organization.scss');
      expect(buffer).toBeTruthy();
      const content = buffer?.toString(UTF_8);
      expect(content).toEqual(`@import "@spartacus/organization";`);
    });

    it('should add update angular.json with spartacus/organization.scss', async () => {
      const buffer = appTree.read('/angular.json');
      expect(buffer).toBeTruthy();
      if (!buffer) {
        throw new Error('angular.json missing?');
      }

      const angularJson = JSON.parse(buffer.toString(UTF_8));
      const buildStyles: string[] =
        angularJson.projects['schematics-test'].architect.build.options.styles;
      expect(buildStyles).toEqual([
        'src/styles.scss',
        'src/styles/spartacus/organization.scss',
      ]);

      const testStyles: string[] =
        angularJson.projects['schematics-test'].architect.test.options.styles;
      expect(testStyles).toEqual([
        'src/styles.scss',
        'src/styles/spartacus/organization.scss',
      ]);
    });
  });

  describe('Administration feature', () => {
    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should add organization deps', async () => {
        const packageJson = appTree.readContent('/package.json');
        const packageObj = JSON.parse(packageJson);
        const depPackageList = Object.keys(packageObj.dependencies);
        expect(depPackageList.includes('@spartacus/organization')).toBe(true);
        expect(depPackageList.includes('@spartacus/setup')).toBe(true);
      });

      it('should import appropriate modules', async () => {
        const appServerModuleBuffer = appTree.read('src/app/app.module.ts');
        expect(appServerModuleBuffer).toBeTruthy();
        const appModule = appServerModuleBuffer?.toString(UTF_8);
        expect(appModule).toContain(
          `import { AdministrationRootModule } from '@spartacus/organization/administration/root';`
        );
        expect(appModule).toContain(
          `import { AdministrationModule } from '@spartacus/organization/administration';`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const appServerModuleBuffer = appTree.read('src/app/app.module.ts');
        expect(appServerModuleBuffer).toBeTruthy();
        const appModule = appServerModuleBuffer?.toString(UTF_8);
        expect(appModule).not.toContain(
          `import('@spartacus/organization/administration').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import AdministrationRootModule and contain the lazy loading syntax', async () => {
        const appServerModuleBuffer = appTree.read('src/app/app.module.ts');
        expect(appServerModuleBuffer).toBeTruthy();
        const appModule = appServerModuleBuffer?.toString(UTF_8);
        expect(appModule).toContain(
          `import { AdministrationRootModule } from '@spartacus/organization/administration/root';`
        );
        expect(appModule).toContain(
          `import('@spartacus/organization/administration').then(`
        );
      });

      it('should not contain the AdministrationModule import', () => {
        const appServerModuleBuffer = appTree.read('src/app/app.module.ts');
        expect(appServerModuleBuffer).toBeTruthy();
        const appModule = appServerModuleBuffer?.toString(UTF_8);
        expect(appModule).not.toContain(
          `import { AdministrationModule } from '@spartacus/organization/administration';`
        );
      });
    });
  });

  describe('Order approval feature', () => {
    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const appServerModuleBuffer = appTree.read('src/app/app.module.ts');
        expect(appServerModuleBuffer).toBeTruthy();
        const appModule = appServerModuleBuffer?.toString(UTF_8);
        expect(appModule).toContain(
          `import { OrderApprovalRootModule } from '@spartacus/organization/order-approval/root';`
        );
        expect(appModule).toContain(
          `import { OrderApprovalModule } from '@spartacus/organization/order-approval';`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const appServerModuleBuffer = appTree.read('src/app/app.module.ts');
        expect(appServerModuleBuffer).toBeTruthy();
        const appModule = appServerModuleBuffer?.toString(UTF_8);
        expect(appModule).not.toContain(
          `import('@spartacus/organization/order-approval').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import OrderApprovalRootModule and contain the lazy loading syntax', async () => {
        const appServerModuleBuffer = appTree.read('src/app/app.module.ts');
        expect(appServerModuleBuffer).toBeTruthy();
        const appModule = appServerModuleBuffer?.toString(UTF_8);
        expect(appModule).toContain(
          `import { OrderApprovalRootModule } from '@spartacus/organization/order-approval/root';`
        );
        expect(appModule).toContain(
          `import('@spartacus/organization/order-approval').then(`
        );
      });

      it('should not contain the OrderApprovalModule import', () => {
        const appServerModuleBuffer = appTree.read('src/app/app.module.ts');
        expect(appServerModuleBuffer).toBeTruthy();
        const appModule = appServerModuleBuffer?.toString(UTF_8);
        expect(appModule).not.toContain(
          `import { OrderApprovalModule } from '@spartacus/organization/order-approval';`
        );
      });
    });
  });
});
