import { Component, OnInit } from '@angular/core';
import { AssociatedObject, Category } from '@spartacus/customer-ticketing/root';
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
  ticketAssociatedObjects: Array<AssociatedObject>;

  ngOnInit(): void {
    this.customerTicketingFacade
      .getTicketCategories()
      .subscribe((categories) => {
        this.ticketCategories = categories;
      });
    this.customerTicketingFacade
      .getTicketAssociatedObjects()
      .subscribe((associatedObjects) => {
        this.ticketAssociatedObjects = associatedObjects;
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
