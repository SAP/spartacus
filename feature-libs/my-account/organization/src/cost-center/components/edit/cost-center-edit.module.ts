import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import {
  CmsPageGuard,
  FakeTabsModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { CostCenterFormModule } from '../form/cost-center-form.module';
import { CostCenterEditComponent } from './cost-center-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'costCenterEdit' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CostCenterEditComponent: {
          component: CostCenterEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
    CostCenterFormModule,
    I18nModule,
    FakeTabsModule,
  ],
  declarations: [CostCenterEditComponent],
  exports: [CostCenterEditComponent],
  entryComponents: [CostCenterEditComponent],
})
export class CostCenterEditModule {}
