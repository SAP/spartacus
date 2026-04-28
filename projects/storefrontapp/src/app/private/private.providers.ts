/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideConfig, TestConfigModule, WindowRef } from '@spartacus/core';
import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import {
  CartAbandonmentTrackerService,
  initializeCartAbandonmentTracker,
} from '@spartacus/storefront';
import { AssistantWidgetService } from '../assistant-widget.service';
import { initializeAssistantWidget } from '../assistant-widget.initializer';
import { environment } from '../../environments/environment';
import { TestOutletModule } from '../../test-outlets/test-outlet.module';

/**
 * Private providers used only in our example Storefrontapp for testing purposes.
 *
 * CAUTION: IT IS NOT MEANT FOR CUSTOMERS' APPLICATIONS!
 */
export const privateProviders = makeEnvironmentProviders([
  provideConfig({
    // Custom routing configuration for e2e testing:
    routing: {
      routes: {
        product: {
          paths: ['product/:productCode/:name', 'product/:productCode'],
          paramsMapping: { name: 'slug' },
        },
      },
    },

    // For the development environment and CI, feature level is always the highest:
    features: { level: '*' },

    // For security compliance, by default, google maps does not display.
    // Using special key value 'cx-development' allows google maps to display
    // without a key, for development or demo purposes:
    googleMaps: { apiKey: GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG },
  }),

  importProvidersFrom(
    TestOutletModule, // Custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.
    ...(environment.production ? [] : [StoreDevtoolsModule.instrument()]) // Enable Redux devtools only in non-production build
  ),

  // Assistant widget initialization
  {
    provide: APP_INITIALIZER,
    useFactory: initializeAssistantWidget,
    deps: [AssistantWidgetService, WindowRef],
    multi: true,
  },
]);
