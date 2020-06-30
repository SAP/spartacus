import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ConfirmModalModule, FakeTabsModule } from '@spartacus/storefront';
import { CostCenterDetailsComponent } from './cost-center-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
