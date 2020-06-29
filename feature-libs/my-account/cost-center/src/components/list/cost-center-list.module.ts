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
  InteractiveTableModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { CostCenterListComponent } from './cost-center-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'costCenters' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ManageCostCentersListComponent: {
          component: CostCenterListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
  ],
  declarations: [CostCenterListComponent],
  exports: [CostCenterListComponent],
  entryComponents: [CostCenterListComponent],
})
export class CostCenterListModule {}
