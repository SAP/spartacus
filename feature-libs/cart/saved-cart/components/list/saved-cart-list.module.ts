import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImportExportComponentModule } from '@spartacus/cart/import-export/components';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule, SpinnerModule } from '@spartacus/storefront';
import { SavedCartListComponent } from './saved-cart-list.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    RouterModule,
    ListNavigationModule,
    I18nModule,
    SpinnerModule,
    ImportExportComponentModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountSavedCartHistoryComponent: {
          component: SavedCartListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [SavedCartListComponent],
  exports: [SavedCartListComponent],
})
export class SavedCartListModule {}
