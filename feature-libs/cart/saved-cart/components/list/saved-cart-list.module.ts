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
import { ImportToCartModule } from 'feature-libs/cart/import-export/components/import-to-cart/import-to-cart.module';
import { SavedCartListComponent } from './saved-cart-list.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    RouterModule,
    ListNavigationModule,
    I18nModule,
    SpinnerModule,
    ImportToCartModule,
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
  entryComponents: [SavedCartListComponent],
})
export class SavedCartListModule {}
