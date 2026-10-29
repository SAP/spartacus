/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Provider } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '../../../common/components/service/configurator-router-extractor.service';
import { ConfiguratorRouter } from '../../../common/components/service/configurator-router-data';
import { BreakpointService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorStorefrontUtilsService } from '../../components/service/configurator-storefront-utils.service';
import { ConfiguratorCartService } from '../../core/facade/configurator-cart.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import { ConfiguratorQuantityService } from '../../core/services/configurator-quantity.service';
import { Configurator } from '../../core/model/configurator.model';
import { MockConfiguratorProductService } from '../../../common/testing/services/mock-configurator-product.service';
import { ConfiguratorTestUtils } from '../configurator-test-utils';
import { MockConfiguratorBreakpointService } from './mock-configurator-breakpoint.service';
import { MockConfiguratorCartService } from './mock-configurator-cart.service';
import { MockConfiguratorCommonsService } from './mock-configurator-commons.service';
import { MockConfiguratorExpertModeService } from './mock-configurator-expert-mode.service';
import { MockConfiguratorGroupsService } from './mock-configurator-groups.service';
import { MockConfiguratorQuantityService } from './mock-configurator-quantity.service';
import { MockConfiguratorRouterExtractorService } from './mock-configurator-router-extractor.service';
import { MockConfiguratorStorefrontUtilsService } from './mock-configurator-storefront-utils.service';

const defaultConfiguration = ConfiguratorTestUtils.createConfiguration('test');

type ConfiguratorMockCommonsServiceOptions = {
  configurationSource?: () => Observable<Configurator.Configuration>;
  isConfigurationLoadingSource?: () => Observable<boolean>;
  hasPendingChangesSource?: () => Observable<boolean>;
  hasConflictsSource?: () => Observable<boolean>;
  getOrCreateConfigurationSource?: () =>
    | Observable<Configurator.Configuration>
    | null
    | undefined;
  getOrCreateConfigurationFallback?: () => Observable<Configurator.Configuration>;
  getConfigurationWithOverviewSource?: () =>
    | Observable<Configurator.Configuration>
    | null
    | undefined;
  beforeGetOrCreateConfiguration?: (productCode: string) => void;
  stubRemoveConfiguration?: boolean;
};

function wireConfiguratorMockCommonsConfigurationSource(
  mock: MockConfiguratorCommonsService,
  opts: ConfiguratorMockCommonsServiceOptions,
  configurationSource: () => Observable<Configurator.Configuration>
): void {
  mock.getConfiguration.mockImplementation(() => configurationSource());
  if (!opts.getOrCreateConfigurationSource) {
    mock.getOrCreateConfiguration.mockImplementation(() =>
      configurationSource()
    );
  }
  if (!opts.getConfigurationWithOverviewSource) {
    mock.getConfigurationWithOverview.mockImplementation(() =>
      configurationSource()
    );
  }
  mock.readConfiguration.mockImplementation(() => configurationSource());
}

function wireConfiguratorMockCommonsGetOrCreate(
  mock: MockConfiguratorCommonsService,
  opts: ConfiguratorMockCommonsServiceOptions
): void {
  if (!opts.getOrCreateConfigurationSource) {
    return;
  }
  mock.getOrCreateConfiguration.mockImplementation((productCode: string) => {
    opts.beforeGetOrCreateConfiguration?.(productCode);
    const source = opts.getOrCreateConfigurationSource?.();
    return (
      source ??
      opts.getOrCreateConfigurationFallback?.() ??
      of(defaultConfiguration)
    );
  });
}

function wireConfiguratorMockCommonsOptionalSources(
  mock: MockConfiguratorCommonsService,
  opts: ConfiguratorMockCommonsServiceOptions
): void {
  if (opts.getConfigurationWithOverviewSource) {
    mock.getConfigurationWithOverview.mockImplementation(
      (configuration: Configurator.Configuration) => {
        const source = opts.getConfigurationWithOverviewSource?.();
        return source ?? of(configuration);
      }
    );
  }
  if (opts.stubRemoveConfiguration) {
    mock.removeConfiguration.mockImplementation(() => {});
  }
  if (opts.isConfigurationLoadingSource) {
    mock.isConfigurationLoading.mockImplementation(() =>
      opts.isConfigurationLoadingSource?.()
    );
  }
  if (opts.hasPendingChangesSource) {
    mock.hasPendingChanges.mockImplementation(() =>
      opts.hasPendingChangesSource?.()
    );
  }
  if (opts.hasConflictsSource) {
    mock.hasConflicts.mockImplementation(() => opts.hasConflictsSource?.());
  }
}

function configureMockConfiguratorCommonsService(
  mock: MockConfiguratorCommonsService,
  options?: ConfiguratorMockCommonsServiceOptions
): void {
  const opts = options ?? {};
  if (opts.configurationSource) {
    wireConfiguratorMockCommonsConfigurationSource(
      mock,
      opts,
      opts.configurationSource
    );
  }
  wireConfiguratorMockCommonsGetOrCreate(mock, opts);
  wireConfiguratorMockCommonsOptionalSources(mock, opts);
}

/**
 * Provides a ProductService mock that reads the product stream from a closure.
 */
export function provideConfiguratorMockProductService(
  productSource: () => Observable<unknown>
): Provider {
  return {
    provide: ProductService,
    useFactory: () => {
      const mock = new MockConfiguratorProductService();
      mock.get.mockImplementation(() => productSource());
      return mock;
    },
  };
}

/**
 * Provides a ConfiguratorCommonsService mock that reads configuration streams from closures.
 */
export function provideConfiguratorMockCommonsService(
  options?: ConfiguratorMockCommonsServiceOptions
): Provider {
  return {
    provide: ConfiguratorCommonsService,
    useFactory: () => {
      const mock = new MockConfiguratorCommonsService();
      configureMockConfiguratorCommonsService(mock, options);
      return mock;
    },
  };
}

/** Provides a BreakpointService mock with optional dynamic breakpoint streams. */
export function provideConfiguratorMockBreakpointService(options?: {
  isUpSource?: () => Observable<boolean>;
  isDownSource?: () => Observable<boolean>;
}): Provider {
  return {
    provide: BreakpointService,
    useFactory: () => {
      const mock = new MockConfiguratorBreakpointService();
      if (options?.isUpSource) {
        mock.isUp.mockImplementation(() => options.isUpSource?.());
      }
      if (options?.isDownSource) {
        mock.isDown.mockImplementation(() => options.isDownSource?.());
      }
      return mock;
    },
  };
}

/** Provides a ConfiguratorQuantityService mock with a fixed or dynamic quantity stream. */
export function provideConfiguratorMockQuantityService(options?: {
  quantity?: number;
  getQuantitySource?: () => Observable<number>;
}): Provider {
  return {
    provide: ConfiguratorQuantityService,
    useFactory: () => {
      const mock = new MockConfiguratorQuantityService();
      if (options?.getQuantitySource) {
        mock.getQuantity.mockImplementation(() =>
          options.getQuantitySource?.()
        );
      } else if (options?.quantity !== undefined) {
        mock.getQuantity.mockReturnValue(of(options.quantity));
      }
      return mock;
    },
  };
}

/** Provides the default ConfiguratorExpertModeService mock. */
export function provideConfiguratorMockExpertModeService(): Provider {
  return {
    provide: ConfiguratorExpertModeService,
    useFactory: () => new MockConfiguratorExpertModeService(),
  };
}

export function provideConfiguratorMockCartService(options?: {
  getEntrySource?: () => Observable<unknown>;
  configurationSource?: () => Observable<Configurator.Configuration>;
}): Provider {
  return {
    provide: ConfiguratorCartService,
    useFactory: () => {
      const mock = new MockConfiguratorCartService();
      if (options?.getEntrySource) {
        mock.getEntry.mockImplementation(() => options.getEntrySource?.());
      }
      if (options?.configurationSource) {
        mock.readConfigurationForCartEntry.mockImplementation(() =>
          options.configurationSource?.()
        );
        mock.readConfigurationForOrderEntry.mockImplementation(() =>
          options.configurationSource?.()
        );
      }
      return mock;
    },
  };
}

/** Provides a ConfiguratorRouterExtractorService mock with dynamic router data. */
export function provideConfiguratorMockRouterExtractorService(options: {
  routerDataSource: () => Observable<ConfiguratorRouter.Data>;
}): Provider {
  return {
    provide: ConfiguratorRouterExtractorService,
    useFactory: () => {
      const mock = new MockConfiguratorRouterExtractorService();
      mock.extractRouterData.mockImplementation(() =>
        options.routerDataSource()
      );
      return mock;
    },
  };
}

/**
 * Provides a ConfiguratorStorefrontUtilsService mock with optional dynamic streams and overview-form helpers.
 */
export function provideConfiguratorMockStorefrontUtilsService(options?: {
  isCartEntryOrGroupVisitedSource?: () => Observable<boolean>;
  isDisplayOnlyVariantSource?: () => Observable<boolean>;
  overviewFormBehavior?: boolean;
  /** Sets `createGroupId` suffix used by group-menu specs. */
  groupMenuBehavior?: boolean;
}): Provider {
  return {
    provide: ConfiguratorStorefrontUtilsService,
    useFactory: () => {
      const mock = new MockConfiguratorStorefrontUtilsService();
      if (options?.isCartEntryOrGroupVisitedSource) {
        mock.isCartEntryOrGroupVisited.mockImplementation(() =>
          options.isCartEntryOrGroupVisitedSource?.()
        );
      }
      if (options?.isDisplayOnlyVariantSource) {
        mock.isDisplayOnlyVariant.mockImplementation(() =>
          options.isDisplayOnlyVariantSource?.()
        );
      }
      if (options?.groupMenuBehavior) {
        mock.createGroupId.mockImplementation((groupId?: string) =>
          groupId ? groupId + '-group' : undefined
        );
      }
      if (options?.overviewFormBehavior) {
        mock.createOvGroupId.mockImplementation(
          (prefix: string, groupId: string) => `${prefix}--${groupId}-ovGroup`
        );
        mock.getPrefixId.mockImplementation(
          (idPrefix: string | undefined, groupId: string) =>
            idPrefix ? idPrefix + '--' + groupId : `cx--${groupId}`
        );
        mock.idSelector.mockImplementation((id: string) => `#${id}`);
        mock.navigateToOverviewGroup.mockImplementation(
          (idPrefix: string, groupId: string) => {
            mock.scrollToConfigurationElement(
              mock.idSelector(mock.createOvGroupId(idPrefix, groupId)) + ' h2'
            );
          }
        );
      }
      return mock;
    },
  };
}

/** Provides a ConfiguratorGroupsService mock with optional dynamic group streams. */
export function provideConfiguratorMockGroupsService(options?: {
  isGroupVisitedSource?: () => Observable<boolean>;
  getCurrentGroupSource?: () => Observable<Configurator.Group | undefined>;
  conflictGroupSource?: () => Observable<Configurator.Group | undefined>;
}): Provider {
  return {
    provide: ConfiguratorGroupsService,
    useFactory: () => {
      const mock = new MockConfiguratorGroupsService();
      const opts = options ?? {};
      if (opts.isGroupVisitedSource) {
        mock.isGroupVisited.mockImplementation(() =>
          opts.isGroupVisitedSource?.()
        );
      }
      if (opts.getCurrentGroupSource) {
        mock.getCurrentGroup.mockImplementation(() =>
          opts.getCurrentGroupSource?.()
        );
      }
      if (opts.conflictGroupSource) {
        mock.getConflictGroupForImmediateConflictResolution.mockImplementation(
          () => opts.conflictGroupSource?.()
        );
      }
      return mock;
    },
  };
}
