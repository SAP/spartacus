import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  B2B_STOREFRONT_MODULE,
  B2C_STOREFRONT_MODULE,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import {
  CLI_ADMINISTRATION_FEATURE,
  CLI_ORDER_APPROVAL_FEATURE,
} from '../constants';
import { Schema as SpartacusOrganizationOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');
const appModulePath = 'src/app/app.module.ts';

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
    features: [CLI_ADMINISTRATION_FEATURE, CLI_ORDER_APPROVAL_FEATURE],
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

  describe('in app module', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();
    });
    it(`should remove 'B2cStorefrontModule' `, () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule).not.toContain(B2C_STOREFRONT_MODULE);
    });

    it(`should replace it with 'B2bStorefrontModule'`, () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule).toContain(B2B_STOREFRONT_MODULE);
    });
  });

  describe('Administration feature', () => {
    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should add style import to /src/styles/spartacus/organization.scss', async () => {
        const content = appTree.readContent(
          '/src/styles/spartacus/organization.scss'
        );
        expect(content).toEqual(`@import "@spartacus/organization";`);
      });

      it('should add update angular.json with spartacus/organization.scss', async () => {
        const content = appTree.readContent('/angular.json');
        const angularJson = JSON.parse(content);
        const buildStyles: string[] =
          angularJson.projects['schematics-test'].architect.build.options
            .styles;
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
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { AdministrationRootModule } from '@spartacus/organization/administration/root';`
        );
        expect(appModule).toContain(
          `import { AdministrationModule } from '@spartacus/organization/administration';`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const appModule = appTree.readContent(appModulePath);
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
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { AdministrationRootModule } from '@spartacus/organization/administration/root';`
        );
        expect(appModule).toContain(
          `import('@spartacus/organization/administration').then(`
        );
      });

      it('should not contain the AdministrationModule import', () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).not.toContain(
          `import { AdministrationModule } from '@spartacus/organization/administration';`
        );
      });
    });

    describe('i18n', () => {
      it('should import the i18n resource and chunk from assets', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { organizationTranslations } from '@spartacus/organization/administration/assets';`
        );
        expect(appModule).toContain(
          `import { organizationTranslationChunksConfig } from '@spartacus/organization/administration/assets';`
        );
      });
      it('should provideConfig', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(`resources: organizationTranslations,`);
        expect(appModule).toContain(
          `chunks: organizationTranslationChunksConfig,`
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
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { OrderApprovalRootModule } from '@spartacus/organization/order-approval/root';`
        );
        expect(appModule).toContain(
          `import { OrderApprovalModule } from '@spartacus/organization/order-approval';`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const appModule = appTree.readContent(appModulePath);
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
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { OrderApprovalRootModule } from '@spartacus/organization/order-approval/root';`
        );
        expect(appModule).toContain(
          `import('@spartacus/organization/order-approval').then(`
        );
      });

      it('should not contain the OrderApprovalModule import', () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).not.toContain(
          `import { OrderApprovalModule } from '@spartacus/organization/order-approval';`
        );
      });
    });
    describe('i18n', () => {
      it('should import the i18n resource and chunk from assets', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { orderApprovalTranslations } from '@spartacus/organization/order-approval/assets';`
        );
        expect(appModule).toContain(
          `import { orderApprovalTranslationChunksConfig } from '@spartacus/organization/order-approval/assets';`
        );
      });
      it('should provideConfig', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(`resources: orderApprovalTranslations,`);
        expect(appModule).toContain(
          `chunks: orderApprovalTranslationChunksConfig,`
        );
      });
    });
  });
});
