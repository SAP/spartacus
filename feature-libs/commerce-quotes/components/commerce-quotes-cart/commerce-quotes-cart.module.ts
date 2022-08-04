import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommerceQuotesCartComponent } from './commerce-quotes-cart.component';
import { provideDefaultConfig, CmsConfig, AuthGuard } from '@spartacus/core';
import { CartSharedModule } from '@spartacus/cart/base/components';

@NgModule({
  declarations: [CommerceQuotesCartComponent],
  exports: [CommerceQuotesCartComponent],
  imports: [CommonModule, CartSharedModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CommerceQuotesCartComponent: {
          component: CommerceQuotesCartComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class CommerceQuotesCartModule {}
