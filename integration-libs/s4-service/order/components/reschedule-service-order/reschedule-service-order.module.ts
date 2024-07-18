import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RescheduleServiceOrderComponent } from './reschedule-service-order.component';
import { AuthGuard, CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule, DatePickerModule } from '@spartacus/storefront';
import { ServiceOrderGuard } from '../guards';



@NgModule({
  declarations: [
    RescheduleServiceOrderComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    DatePickerModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        RescheduleServiceOrder: {
          component: RescheduleServiceOrderComponent,
          guards: [AuthGuard, ServiceOrderGuard],
        },
      },
    }),
  ],
  exports: [RescheduleServiceOrderComponent]
})
export class RescheduleServiceOrderModule { }
