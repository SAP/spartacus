import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { BranchOrderHistoryComponent } from './unit-level-order-history.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [BranchOrderHistoryComponent],
  exports: [BranchOrderHistoryComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UnitLevelOrderHistoryComponent: {
          component: BranchOrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class OrderHistoryModule {}
