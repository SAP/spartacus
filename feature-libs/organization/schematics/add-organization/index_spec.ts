import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import {
  LibraryOptions as SpartacusOrganizationOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import {
  CLI_ADMINISTRATION_FEATURE,
  CLI_ORDER_APPROVAL_FEATURE,
} from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const administrationFeatureModulePath =
  'src/app/spartacus/features/organization-administration-feature.module.ts';
const orderApprovalFeatureModulePath =
  'src/app/spartacus/features/organization-order-approval-feature.module.ts';

// TODO: Improve tests after lib-util test update
describe('Spartacus Organization schematics: ng-add', () => {
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

  const defaultOptions: SpartacusOrganizationOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_ADMINISTRATION_FEATURE, CLI_ORDER_APPROVAL_FEATURE],
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    configuration: 'b2c',
    lazy: true,
    features: [],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      '@spartacus/schematics',
      '../../projects/schematics/src/collection.json'
    );
    schematicRunner.registerCollection(
      '@spartacus/storefinder',
      '../../feature-libs/storefinder/schematics/collection.json'
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

  describe('when no features are selected', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          { ...defaultOptions, features: [] },
          appTree
        )
        .toPromise();
    });

    it('should not install administration nor order-approval features', () => {
      expect(appTree.exists(administrationFeatureModulePath)).toBeFalsy();
      expect(appTree.exists(orderApprovalFeatureModulePath)).toBeFalsy();
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

      it('should import appropriate modules', async () => {
        const administrationModule = appTree.readContent(
          administrationFeatureModulePath
        );
        expect(administrationModule).toContain(
          `import { AdministrationRootModule } from "@spartacus/organization/administration/root";`
        );
        expect(administrationModule).toContain(
          `import { AdministrationModule } from "@spartacus/organization/administration";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const administrationModule = appTree.readContent(
          administrationFeatureModulePath
        );
        expect(administrationModule).not.toContain(
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
        const administrationModule = appTree.readContent(
          administrationFeatureModulePath
        );
        expect(administrationModule).toContain(
          `import { AdministrationRootModule } from "@spartacus/organization/administration/root";`
        );
        expect(administrationModule).toContain(
          `import('@spartacus/organization/administration').then(`
        );
      });

      it('should not contain the AdministrationModule import', () => {
        const administrationModule = appTree.readContent(
          administrationFeatureModulePath
        );
        expect(administrationModule).not.toContain(
          `import { AdministrationModule } from "@spartacus/organization/administration";`
        );
      });
    });

    describe('i18n', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import the i18n resource and chunk from assets', async () => {
        const administrationModule = appTree.readContent(
          administrationFeatureModulePath
        );
        expect(administrationModule).toContain(
          `import { organizationTranslationChunksConfig, organizationTranslations } from "@spartacus/organization/administration/assets";`
        );
      });
      it('should provideConfig', async () => {
        const administrationModule = appTree.readContent(
          administrationFeatureModulePath
        );
        expect(administrationModule).toContain(
          `resources: organizationTranslations,`
        );
        expect(administrationModule).toContain(
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
        const orderApprovalModule = appTree.readContent(
          orderApprovalFeatureModulePath
        );
        expect(orderApprovalModule).toContain(
          `import { OrderApprovalRootModule } from "@spartacus/organization/order-approval/root";`
        );
        expect(orderApprovalModule).toContain(
          `import { OrderApprovalModule } from "@spartacus/organization/order-approval";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const orderApprovalModule = appTree.readContent(
          orderApprovalFeatureModulePath
        );
        expect(orderApprovalModule).not.toContain(
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
        const orderApprovalModule = appTree.readContent(
          orderApprovalFeatureModulePath
        );
        expect(orderApprovalModule).toContain(
          `import { OrderApprovalRootModule } from "@spartacus/organization/order-approval/root";`
        );
        expect(orderApprovalModule).toContain(
          `import('@spartacus/organization/order-approval').then(`
        );
      });

      it('should not contain the OrderApprovalModule import', () => {
        const orderApprovalModule = appTree.readContent(
          orderApprovalFeatureModulePath
        );
        expect(orderApprovalModule).not.toContain(
          `import { OrderApprovalModule } from "@spartacus/organization/order-approval";`
        );
      });
    });
    describe('i18n', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import the i18n resource and chunk from assets', async () => {
        const orderApprovalModule = appTree.readContent(
          orderApprovalFeatureModulePath
        );
        expect(orderApprovalModule).toContain(
          `import { orderApprovalTranslationChunksConfig, orderApprovalTranslations } from "@spartacus/organization/order-approval/assets";`
        );
      });
      it('should provideConfig', async () => {
        const orderApprovalModule = appTree.readContent(
          orderApprovalFeatureModulePath
        );
        expect(orderApprovalModule).toContain(
          `resources: orderApprovalTranslations,`
        );
        expect(orderApprovalModule).toContain(
          `chunks: orderApprovalTranslationChunksConfig,`
        );
      });
    });
  });
});
