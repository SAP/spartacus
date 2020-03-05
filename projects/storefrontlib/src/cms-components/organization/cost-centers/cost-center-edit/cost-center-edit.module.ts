import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CostCenterEditComponent } from './cost-center-edit.component';
import { CostCenterFormModule } from '../cost-center-form/cost-center-form.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';

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
  ],
  declarations: [CostCenterEditComponent],
  exports: [CostCenterEditComponent],
  entryComponents: [CostCenterEditComponent],
})
export class CostCenterEditModule {}
