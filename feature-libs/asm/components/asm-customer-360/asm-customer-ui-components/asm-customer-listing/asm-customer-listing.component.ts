import { Component, Input } from '@angular/core';
import { ListingFragmentType } from './asm-customer-listing.model';

@Component({
  selector: 'cx-asm-customer-listing',
  templateUrl: './asm-customer-listing.component.html',
})
export class AsmCustomerListingComponent {
  @Input() fragment: ListingFragmentType;
}
