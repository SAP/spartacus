import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { CostCenterAssignBudgetsComponent } from './cost-center-assign-budgets.component';
import { TableModule } from '../../../../shared/components/table/table.module';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { suffixUrlMatcher } from '../../../../cms-structure/routing/suffix-routes/suffix-url-matcher';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'costCenterAssignBudgets' },
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
        CostCenterAssignBudgetsComponent: {
          component: CostCenterAssignBudgetsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    TableModule,
    ReactiveFormsModule,
  ],
  declarations: [CostCenterAssignBudgetsComponent],
  exports: [CostCenterAssignBudgetsComponent],
  providers: [UserService, CxDatePipe],
  entryComponents: [CostCenterAssignBudgetsComponent],
})
export class CostCenterAssignBudgetsModule {}
