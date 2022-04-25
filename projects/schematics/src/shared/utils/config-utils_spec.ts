/// <reference types="jest" />

import { InMemoryFileSystemHost, Project, SourceFile } from 'ts-morph';
import {
  getSpartacusProviders,
  isSpartacusConfigDuplicate,
} from './config-utils';
import { getModulePropertyInitializer } from './new-module-utils';

describe('Storefront config utils', () => {
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
    let sourceFile: SourceFile;

    beforeAll(() => {
      const project = new Project({
        fileSystem: new InMemoryFileSystemHost(),
      });
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

    beforeAll(() => {
      const project = new Project({
        fileSystem: new InMemoryFileSystemHost(),
      });
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
});
