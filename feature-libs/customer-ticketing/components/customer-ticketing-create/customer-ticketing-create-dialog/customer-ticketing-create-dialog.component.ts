import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AssociatedObject,
  Category,
  Ticket,
} from '@spartacus/customer-ticketing/root';
import { FormUtils } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { CustomerTicketingDialogComponent } from '../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';
@Component({
  selector: 'cx-customer-ticketing-create-dialog',
  templateUrl: './customer-ticketing-create-dialog.component.html',
})
export class CustomerTicketingCreateDialogComponent
  extends CustomerTicketingDialogComponent
  implements OnInit, OnDestroy
{
  ticketCategories$: Observable<Category[]> =
    this.customerTicketingFacade.getTicketCategories();
  ticketAssociatedObjects$: Observable<AssociatedObject[]> =
    this.customerTicketingFacade.getTicketAssociatedObjects();
  subscription: Subscription;

  @Input()
  selectedCategory: Category;

  @Input()
  selectedAssociatedTo: AssociatedObject;

  protected getCreateTicketPayload(): Ticket {
    return {
      message: this.form?.get('message')?.value,
      subject: this.form?.get('subject')?.value,
      associatedTo: this.selectedAssociatedTo,
      ticketCategory: this.selectedCategory,
    };
  }

  ngOnInit(): void {
    this.buildForm();
  }

  getSelectedAssociatedObject(code: string, modifiedAt: string, type: string) {
    this.selectedAssociatedTo = {
      code: code,
      modifiedAt: modifiedAt,
      type: type,
    };
  }

  getSelectedCategory(id: string, name: string): void {
    if (id) {
      this.selectedCategory = {
        id: id,
        name: name,
      };
    }
  }

  createTicketRequest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    } else {
      this.subscription = this.customerTicketingFacade
        .createTicket(this.getCreateTicketPayload())
        .subscribe({
          complete: () => {
            this.close('Ticket created successfully');
          },
          error: () => {
            this.close('Something went wrong');
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
