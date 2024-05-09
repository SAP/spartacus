// import { Component } from '@angular/core';

// @Component({
//   selector: 'cx-cpq-quote-heading',
//   templateUrl: './cpq-quote-heading.component.html',
// })
// export class CpqQuoteHeadingComponent {
//   constructor() {
//     console.log("hii heading");
//   }
// }




// import { Component, Optional, ChangeDetectorRef } from '@angular/core';
// import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
// import { EMPTY, Observable } from 'rxjs';

// @Component({
//   selector: 'cx-cpq-quote-heading',
//   templateUrl: './cpq-quote-heading.component.html',
// })
// export class CpqQuoteHeadingComponent {
//   quoteDiscountData: OrderEntry;

//   constructor(
//     @Optional() protected cartItemContext: CartItemContext,
//     private cdr: ChangeDetectorRef
//   ) {
//     console.log("hii heading");
//     // Subscribe to the orderEntry$ observable
//     this.orderEntry$.subscribe(data => {
//       this.quoteDiscountData = data;
//       console.log('Order Entry Data:', this.quoteDiscountData);
//       // Trigger change detection
//       this.cdr.detectChanges();
//     });
//   }

//   readonly orderEntry$: Observable<OrderEntry> =
//     this.cartItemContext?.item$ ?? EMPTY;
// }







import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import {OrderEntry } from '@spartacus/cart/base/root';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-cpq-quote-heading',
  templateUrl: './cpq-quote-heading.component.html',
})

export class CpqQuoteHeadingComponent implements OnInit, OnDestroy {
  @Input()
  quoteDiscountData: OrderEntry;
  protected subscription = new Subscription();

  constructor(@Optional() protected outlet?: OutletContextData<any>) {}
  dataAvailable: boolean = false;
  ngOnInit(): void {
    if (this.outlet?.context$) {
      this.subscription.add(
        this.outlet.context$.subscribe((context) => {
          if (context && context.length > 0) {
            // Check if any item in the context array has cpqDiscounts
            this.dataAvailable = context.some((item: { cpqDiscounts: string | any[]}) => item.cpqDiscounts && item.cpqDiscounts.length > 0);
          } else {
            this.dataAvailable = false;
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
