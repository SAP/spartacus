import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { OrderReturnRequestsComponent } from './order-return-requests.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderReturnRequestListComponent: {
          component: OrderReturnRequestsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [OrderReturnRequestsComponent],
  exports: [OrderReturnRequestsComponent],
  providers: [UserService],
  entryComponents: [OrderReturnRequestsComponent],
})
export class OrderReturnRequestsModule {}
