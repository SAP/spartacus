import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CheckoutB2BComponentsModule } from '@spartacus/checkout/b2b/components';
import { CheckoutB2BCoreModule } from '@spartacus/checkout/b2b/core';
import { CheckoutB2BOccModule } from '@spartacus/checkout/b2b/occ';
import { BadCostCenterRequestHandler } from "./core/http-interceptors/bad-request/bad-cost-center-request.handler";

@NgModule({
  imports: [
    CheckoutB2BComponentsModule,
    CheckoutB2BCoreModule,
    CheckoutB2BOccModule,
  ],
  providers: [
    {
      provide: HttpErrorHandler,
      useExisting: BadCostCenterRequestHandler,
      multi: true,
    },
  ]
})
export class CheckoutB2BModule {}
