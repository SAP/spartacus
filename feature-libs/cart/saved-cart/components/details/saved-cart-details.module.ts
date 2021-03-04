import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  AddToCartModule,
  CardModule,
  CartSharedModule,
  IconModule,
  MediaModule,
} from '@spartacus/storefront';
import { SavedCartDetailActionComponent } from './saved-cart-detail-action/saved-cart-detail-action.component';
import { SavedCartDetailItemsComponent } from './saved-cart-detail-items/saved-cart-detail-items.component';
import { SavedCartDetailOverviewComponent } from './saved-cart-detail-overview/saved-cart-detail-overview.component';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
    CardModule,
    MediaModule,
    AddToCartModule,
    IconModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SavedCartDetailsOverviewComponent: {
          component: SavedCartDetailOverviewComponent,
          guards: [AuthGuard],
        },
        SavedCartDetailsItemsComponent: {
          component: SavedCartDetailItemsComponent,
          guards: [AuthGuard],
        },
        SavedCartDetailsActionComponent: {
          component: SavedCartDetailActionComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    SavedCartDetailOverviewComponent,
    SavedCartDetailActionComponent,
    SavedCartDetailItemsComponent,
  ],
  exports: [
    SavedCartDetailOverviewComponent,
    SavedCartDetailActionComponent,
    SavedCartDetailItemsComponent,
  ],
})
export class SavedCartDetailsModule {}
