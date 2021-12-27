import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CheckoutProgressComponent } from './checkout-progress.component';
import { MultiLinePipe } from './multiline-titles.pipe';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, RouterModule],
  declarations: [CheckoutProgressComponent, MultiLinePipe],
  exports: [CheckoutProgressComponent],
  providers: [
    //     // PART 3 -- test
    // provideDefaultConfig(<CmsConfig>{
    //   cmsComponents: {
    //     CheckoutProgress: {
    //       component: CheckoutProgressComponent,
    //       guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
    //     },
    //   },
    // }),
  ],
})
export class CheckoutProgressModule {}
