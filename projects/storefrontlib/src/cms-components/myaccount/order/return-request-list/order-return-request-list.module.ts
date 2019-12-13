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
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { OrderReturnRequestListComponent } from './order-return-request-list.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderReturnRequestListComponent: {
          component: OrderReturnRequestListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [OrderReturnRequestListComponent],
  exports: [OrderReturnRequestListComponent],
  entryComponents: [OrderReturnRequestListComponent],
})
export class ReturnRequestListModule {}
