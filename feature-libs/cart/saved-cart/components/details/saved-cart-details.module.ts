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
  SpinnerModule,
} from '@spartacus/storefront';
import { SavedCartDetailsActionComponent } from './saved-cart-details-action/saved-cart-details-action.component';
import { SavedCartDetailsItemsComponent } from './saved-cart-details-items/saved-cart-details-items.component';
import { SavedCartDetailsOverviewComponent } from './saved-cart-details-overview/saved-cart-details-overview.component';

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
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SavedCartDetailsOverviewComponent: {
          component: SavedCartDetailsOverviewComponent,
          guards: [AuthGuard],
        },
        SavedCartDetailsItemsComponent: {
          component: SavedCartDetailsItemsComponent,
          guards: [AuthGuard],
        },
        SavedCartDetailsActionComponent: {
          component: SavedCartDetailsActionComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    SavedCartDetailsOverviewComponent,
    SavedCartDetailsActionComponent,
    SavedCartDetailsItemsComponent,
  ],
  exports: [
    SavedCartDetailsOverviewComponent,
    SavedCartDetailsActionComponent,
    SavedCartDetailsItemsComponent,
  ],
})
export class SavedCartDetailsModule {}
