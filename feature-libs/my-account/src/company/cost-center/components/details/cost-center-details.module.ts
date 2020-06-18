import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CmsPageGuard,
  ConfirmModalModule,
  FakeTabsModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { CostCenterDetailsComponent } from './cost-center-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'costCenterDetails' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CostCenterDetailsComponent: {
          component: CostCenterDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    ConfirmModalModule,
    FakeTabsModule,
  ],
  declarations: [CostCenterDetailsComponent],
  exports: [CostCenterDetailsComponent],
  entryComponents: [CostCenterDetailsComponent],
})
export class CostCenterDetailsModule {}
