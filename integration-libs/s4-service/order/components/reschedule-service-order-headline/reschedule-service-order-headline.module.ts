import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RescheduleServiceOrderHeadlineComponent } from './reschedule-service-order-headline.component';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig, CmsConfig, AuthGuard } from '@spartacus/core';



@NgModule({
  declarations: [
    RescheduleServiceOrderHeadlineComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        RescheduleServiceOrderHeadline: {
          component: RescheduleServiceOrderHeadlineComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  exports: [RescheduleServiceOrderHeadlineComponent]
})
export class RescheduleServiceOrderHeadlineModule { }
