import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { CostCenterDetailsComponent } from './cost-center-details.component';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { suffixUrlMatcher } from '../../../../cms-structure/routing/suffix-routes/suffix-url-matcher';
import { TableModule } from '../../../../shared/components/table/table.module';

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
      {
        matcher: suffixUrlMatcher,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxSuffixUrlMatcher: {
            paramName: 'costCenterCode',
          },
        },
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
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    TableModule,
  ],
  declarations: [CostCenterDetailsComponent],
  exports: [CostCenterDetailsComponent],
  providers: [UserService, CxDatePipe],
  entryComponents: [CostCenterDetailsComponent],
})
export class CostCenterDetailsModule {}
