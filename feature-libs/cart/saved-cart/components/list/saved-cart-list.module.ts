import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule, SpinnerModule } from '@spartacus/storefront';
import { SavedCartListComponent } from './saved-cart-list.component';
import { TestGuard } from './test.guard';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    RouterModule,
    ListNavigationModule,
    I18nModule,
    SpinnerModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountSavedCartHistoryComponent: {
          component: SavedCartListComponent,
          guards: [AuthGuard, TestGuard],
        },
      },
    }),
  ],
  declarations: [SavedCartListComponent],
  exports: [SavedCartListComponent],
})
export class SavedCartListModule {}
