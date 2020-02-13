import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UserService,
} from '@spartacus/core';
import { CostCenterEditComponent } from './cost-center-edit.component';
import { CostCenterFormModule } from '../cost-center-form/cost-center-form.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { suffixUrlMatcher } from '../../../../cms-structure/routing/suffix-routes/suffix-url-matcher';

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
      {
        matcher: suffixUrlMatcher,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxSuffixUrlMatcher: {
            marker: 'p',
            paramName: 'costCenterCode',
          },
        },
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
  providers: [UserService, CxDatePipe],
  entryComponents: [CostCenterEditComponent],
})
export class CostCenterEditModule {}
