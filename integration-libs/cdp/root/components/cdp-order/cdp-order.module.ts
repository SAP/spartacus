import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigModule, RoutingModule, UrlModule} from '@spartacus/core';
import { I18nModule} from '@spartacus/core';
//import { OrderHistoryModule } from '@spartacus/order/components';
import { OrderComponent } from './cdp-order.component';

@NgModule({
  imports: [
    CommonModule,BrowserModule,I18nModule,UrlModule,RoutingModule,
    ConfigModule.withConfig({
      cmsComponents: {
        AccountOrderHistoryComponent: {
          component: OrderComponent,
        },
      },
    }),
  ],
  declarations:[OrderComponent]
})
export class OrderModule {}