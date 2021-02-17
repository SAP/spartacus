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
import { ListNavigationModule } from '@spartacus/storefront';
import { SavedCartListComponent } from './saved-cart-list.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    RouterModule,
    ListNavigationModule,
    I18nModule,
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
