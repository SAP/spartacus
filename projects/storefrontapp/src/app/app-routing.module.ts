import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*import { HomePageComponent } from 'storefrontlib';
import { CartPageComponent } from 'storefrontlib';
import { ProductPageComponent } from 'storefrontlib';
import { CategoryPageComponent } from 'storefrontlib';
import { MultiStepCheckoutPageComponent } from 'storefrontlib';
import { OrderConfirmationPageComponent } from 'storefrontlib';*/
import { OrderHistoryPageComponent } from 'storefrontlib';
/*import { OrderDetailsPageComponent } from 'storefrontlib';
import { RegisterComponent } from 'storefrontlib';*/

import { PageNotFoundComponent } from 'storefrontlib';

/*import { CmsPageGuards } from 'storefrontlib';
import { ProductGuard } from 'storefrontlib';
import { AuthGuard } from 'storefrontlib';
import { NotAuthGuard } from 'storefrontlib';*/

// TODO: provide URL mappings for site specific routings
export const appRoutes: Routes = [
  {
    path: 'my-account/orders',
    //canActivate: [AuthGuard, CmsPageGuards],
    component: OrderHistoryPageComponent
    //data: { pageLabel: 'orders' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
