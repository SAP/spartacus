import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ORGANIZATION_ADMINISTRATION_FEATURE } from '@spartacus/organization/administration/root';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultAccountSummaryRoutingConfig } from './config';
import { ACCOUNT_SUMMARY_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultAccountSummaryComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ACCOUNT_SUMMARY_FEATURE]: {
        cmsComponents: [
          'ManageAccountSummaryListComponent',
          'AccountSummaryHeaderComponent',
          'AccountSummaryDocumentComponent',
        ],
        dependencies: [ORGANIZATION_ADMINISTRATION_FEATURE],
      },
    },
  };

  return config;
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, AdminGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orgAccountSummaryDetails' },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(defaultAccountSummaryRoutingConfig),
    provideDefaultConfigFactory(defaultAccountSummaryComponentsConfig),
  ],
})
export class AccountSummaryRootModule {}
