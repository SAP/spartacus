import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  provideDefaultConfig,
  RoutingConfig,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'savedCartsDetails' },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig({
      featureModules: {
        cartSavedCart: {
          cmsComponents: [
            'AddToSavedCartsComponent',
            'AccountSavedCartHistoryComponent',
            'SavedCartDetailsOverviewComponent',
            'SavedCartDetailsItemsComponent',
            'SavedCartDetailsActionComponent',
          ],
        },
      },
    }),
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          savedCarts: {
            paths: ['my-account/saved-carts'],
          },
          savedCartsDetails: {
            paths: ['my-account/saved-cart/:savedCartId'],
            paramsMapping: { savedCartId: 'savedCartId' },
          },
        },
      },
    }),
  ],
})
export class SavedCartRootModule {}
