import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { UnitLevelOrdersViewerGuard } from '../../core/guards';
import { UnitLevelOrderHistoryComponent } from './unit-level-order-history.component';
import {UnitLevelOrderHistoryFilterModule} from "./filter/unit-level-order-history-filter.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    UnitLevelOrderHistoryFilterModule,
  ],
  declarations: [UnitLevelOrderHistoryComponent],
  exports: [UnitLevelOrderHistoryComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UnitLevelOrderHistoryComponent: {
          component: UnitLevelOrderHistoryComponent,
          guards: [AuthGuard, UnitLevelOrdersViewerGuard],
        },
      },
    }),
  ],
})
export class UnitLevelOrderHistoryModule {}
