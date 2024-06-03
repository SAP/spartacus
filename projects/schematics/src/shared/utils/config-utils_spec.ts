/// <reference types="jest" />

import {
  InMemoryFileSystemHost,
  Project,
  SourceFile,
  SyntaxKind,
} from 'ts-morph';
import {
  getSpartacusProviders,
  isSpartacusConfigDuplicate,
  removeProperty,
} from './config-utils';
import { getModulePropertyInitializer } from './new-module-utils';

describe('Storefront config utils', () => {
  let project: Project;
  let sourceFile: SourceFile;
  beforeEach(() => {
    project = new Project({
      fileSystem: new InMemoryFileSystemHost(),
    });
  });

  describe('ts-morph config utils', () => {
    const configFileContent = `
import { NgModule } from '@angular/core';
import {
CartAddEntrySuccessEvent,
CartRemoveEntrySuccessEvent,
provideConfig,
} from '@spartacus/core';
import { NavigationEvent, defaultCmsContentProviders } from '@spartacus/storefront';
import { PersonalizationRootModule } from '@spartacus/tracking/personalization/root';
import { AepModule } from '@spartacus/tracking/tms/aep';
import { BaseTmsModule, TmsConfig } from '@spartacus/tracking/tms/core';
import { GtmModule } from '@spartacus/tracking/tms/gtm';
import { someFunction, someSpread } from '@some/package';

@NgModule({
imports: [
BaseTmsModule.forRoot(),
GtmModule,
AepModule,
PersonalizationRootModule,
],
providers: [
someFunction(),
...someSpread,
...defaultCmsContentProviders,
provideConfig(<TmsConfig>{
  tagManager: {
    gtm: {
      events: [NavigationEvent, CartAddEntrySuccessEvent],
    },
    aep: {
      events: [NavigationEvent, CartRemoveEntrySuccessEvent],
    },
  },
}),
provideConfig({
  featureModules: {
    personalization: {
      module: () =>
        import('@spartacus/tracking/personalization').then(
          (m) => m.PersonalizationModule
        ),
    },
  },
}),
],
})
export class TrackingFeatureModule {}
`;

    beforeEach(() => {
      sourceFile = project.createSourceFile('test.ts', configFileContent);
    });

    describe('getSpartacusProviders', () => {
      it('should return all providers from spartacus in file', () => {
        const providers = getSpartacusProviders(sourceFile);
        expect(providers.length).toEqual(3);
        expect(providers[0].getText()).toMatchSnapshot();
        expect(providers[1].getText()).toMatchSnapshot();
        expect(providers[2].getText()).toMatchSnapshot();
      });
    });
  });

  describe('isSpartacusConfigDuplicate', () => {
    const featureModule = `
    import { NgModule } from '@angular/core';
    import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
    import {
      orderTranslationChunksConfig,
      orderTranslations,
    } from '@spartacus/order/assets';
    import { OrderRootModule, ORDER_FEATURE } from '@spartacus/order/root';
    
    @NgModule({
      declarations: [],
      imports: [OrderRootModule],
      providers: [
        provideConfig(<CmsConfig>{
          featureModules: {
            [ORDER_FEATURE]: {
              module: () => import('@spartacus/order').then((m) => m.OrderModule),
            }
          },
        }),
        provideConfig(<I18nConfig>{
          i18n: {
            resources: orderTranslations,
            chunks: orderTranslationChunksConfig,
          },
        }),
      ],
    })
    export class OrderFeatureModule {}
    `;
    let sourceFile: SourceFile;

    beforeEach(() => {
      sourceFile = project.createSourceFile('feature-module.ts', featureModule);
    });

    it('should return true despite the formatting and trailing commas', () => {
      const newContent = `
provideConfig(<CmsConfig>{
featureModules: {[ORDER_FEATURE]: {module: () => import('@spartacus/order').then((m) => m.OrderModule),}}}),`;

      const initializer =
        getModulePropertyInitializer(sourceFile, 'providers') ?? ({} as any);
      const result = isSpartacusConfigDuplicate(newContent, initializer);
      expect(result).toBeTruthy();
    });
  });

  describe('removeProperty', () => {
    describe('when the property is not present', () => {
      beforeEach(() => {
        sourceFile = project.createSourceFile(
          'feature-module.ts',
          `const x = {a: 1}`
        );
      });

      it('should not change the object', () => {
        const objectLiteral = sourceFile.getDescendantsOfKind(
          SyntaxKind.ObjectLiteralExpression
        )[0];

        removeProperty(objectLiteral, 'b');
        expect(objectLiteral.print()).toEqual(`{ a: 1 }`);
      });
    });
    describe('when multiple properties are present', () => {
      beforeEach(() => {
        sourceFile = project.createSourceFile(
          'feature-module.ts',
          `const x = {a: 1, b: 2}`
        );
      });

      it('should remove the property, but keep the object', () => {
        const objectLiteral = sourceFile.getDescendantsOfKind(
          SyntaxKind.ObjectLiteralExpression
        )[0];

        removeProperty(objectLiteral, 'a');
        expect(objectLiteral.print()).toEqual(`{ b: 2 }`);
      });
    });
    describe('when single property is present', () => {
      beforeEach(() => {
        sourceFile = project.createSourceFile(
          'feature-module.ts',
          `const x = {a: 1}`
        );
      });

      it('should remove the property, but keep the object', () => {
        const objectLiteral = sourceFile.getDescendantsOfKind(
          SyntaxKind.ObjectLiteralExpression
        )[0];

        removeProperty(objectLiteral, 'a');
        expect(objectLiteral.print()).toEqual(`{}`);
      });
    });
    describe('when the property is nested in the object', () => {
      beforeEach(() => {
        sourceFile = project.createSourceFile(
          'feature-module.ts',
          `const x = {a: {b: {c: 1}}}`
        );
      });

      it('should remove the property, but keep the object', () => {
        const objectLiteral = sourceFile.getDescendantsOfKind(
          SyntaxKind.ObjectLiteralExpression
        )[0];

        removeProperty(objectLiteral, 'c');
        expect(objectLiteral.print()).toEqual(`{}`);
      });
    });
  });
});
