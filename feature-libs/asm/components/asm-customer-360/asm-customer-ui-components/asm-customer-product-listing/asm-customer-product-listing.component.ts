import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from '@spartacus/core';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-asm-customer-product-listing',
  templateUrl: './asm-customer-product-listing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsmCustomerProductListingComponent implements OnInit {
  @Input()
  emptyResultDescription: string;

  @Input()
  headerText: string;

  @Input()
  products: Array<Product>;

  @Output()
  clickHeader: EventEmitter<void> = new EventEmitter();

  @Output()
  selectProduct: EventEmitter<Product> = new EventEmitter();

  numberofColumns$: Observable<number>;

  showMore: boolean;

  constructor(protected breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.numberofColumns$ = this.getNumberofColumns();
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  protected getNumberofColumns(): Observable<number> {
    return this.breakpointService.breakpoint$.pipe(
      map((breakpoint) => {
        switch (breakpoint) {
          case BREAKPOINT.xl:
            return 3;
          case BREAKPOINT.lg:
            return 2;
          default:
            return 1;
        }
      })
    );
  }
}
