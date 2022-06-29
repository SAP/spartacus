import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory
} from '@spartacus/core';
import { ORGANIZATION_ADMINISTRATION_FEATURE } from '@spartacus/organization/administration/root';
import { defaultAccountSummaryRoutingConfig } from './config/default-account-summary-routing.config';
import { ACCOUNT_SUMMARY_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultAccountSummaryComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ACCOUNT_SUMMARY_FEATURE]: {
        cmsComponents: [
          'AccountSummaryListComponent',
          'AccountSummaryHeaderComponent',
          'AccountSummaryDocumentComponent'
        ],
        dependencies: [
          ORGANIZATION_ADMINISTRATION_FEATURE
        ]
      },
    },
  };

  return config;
}

@NgModule({
  providers: [
    // provideDefaultConfig(defaultOrganizationLayoutConfig),
    provideDefaultConfig(defaultAccountSummaryRoutingConfig),
    provideDefaultConfigFactory(
      defaultAccountSummaryComponentsConfig
    ),
  ],
})
export class AccountSummaryRootModule { }
