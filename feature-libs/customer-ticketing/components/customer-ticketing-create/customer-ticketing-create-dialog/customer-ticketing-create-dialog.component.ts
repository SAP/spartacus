import { Component, OnInit } from '@angular/core';
import {
  AssociatedObjects,
  Category,
} from '@spartacus/customer-ticketing/root';
import { FormUtils } from '@spartacus/storefront';
import { CustomerTicketingDialogComponent } from '../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';
@Component({
  selector: 'cx-customer-ticketing-create-dialog',
  templateUrl: './customer-ticketing-create-dialog.component.html',
})
export class CustomerTicketingCreateDialogComponent
  extends CustomerTicketingDialogComponent
  implements OnInit
{
  ticketCategories: Array<Category>;
  ticketAssociatedObjects: Array<AssociatedObjects>;

  ngOnInit(): void {
    this.customerTicketingFacade.getTicketCategories().subscribe((category) => {
      this.ticketCategories = category;
    });
    this.customerTicketingFacade
      .getTicketAssociatedObjects()
      .subscribe((associatedObject) => {
        this.ticketAssociatedObjects = associatedObject;
      });
    this.buildForm();
  }

  createTicketRequest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    }
  }
}
