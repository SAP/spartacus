import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AssociatedObject,
  Category,
  TicketCreatedEvent,
  TicketStarter,
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
  ticketStarter: TicketStarter;
  ticketCategories: Array<Category>;
  ticketAssociatedObjects: Array<AssociatedObject>;

  @Input()
  selectedCategory: Category;

  @Input()
  selectedAssociatedObject: AssociatedObject;
  attachment: any;

  protected getCreateTicketPayload(form: FormGroup): TicketStarter {
    return {
      message: form?.get('message')?.value,
      subject: form?.get('subject')?.value,
      associatedTo: this.selectedAssociatedObject,
      ticketCategory: this.selectedCategory,
    };
  }

  ngOnInit(): void {
    this.buildForm();
  }

  protected buildForm(): void {
    const form = new FormGroup({});
    form.setControl(
      'subject',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.inputCharactersForSubject),
      ])
    );
    form.setControl(
      'ticketCategory',
      new FormControl('', [Validators.required])
    );
    form.setControl('associatedTo', new FormControl());
    form.setControl(
      'message',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.inputCharactersLimit),
      ])
    );
    form.setControl(
      'file',
      new FormControl('', [
        this.filesFormValidators.maxSize(this.maxSize),
        this.filesFormValidators.maxEntries(this.maxEntries),
      ])
    );
    this.form = form;
  }

  setSelectedAssociatedObject(selectedAssociatedObjectIndex: number) {
    this.ticketAssociatedObjects$.subscribe((associatedObjects) => {
      this.ticketAssociatedObjects = associatedObjects;
    });
    this.selectedAssociatedObject =
      this.ticketAssociatedObjects[selectedAssociatedObjectIndex - 1];
    this.form.controls.associatedTo.setValue(
      this.selectedAssociatedObject.code
    );
  }

  setSelectedCategory(selectedCategoryIndex: number): void {
    this.ticketCategories$.subscribe((categories) => {
      this.ticketCategories = categories;
    });

    this.selectedCategory = this.ticketCategories[selectedCategoryIndex - 1];
    this.form.controls.ticketCategory.setValue(this.selectedCategory.id);
  }

  createTicketRequest(): void {
    this.attachment = this.form.get('file')?.value;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    } else {
      this.subscription = this.customerTicketingFacade
        .createTicket(this.getCreateTicketPayload(this.form))
        .subscribe((response: any) => {
          if (
            response.id &&
            this.attachment[0] &&
            response.ticketEvents[0].code
          )
            this.customerTicketingFacade
              .uploadAttachment(
                this.attachment[0],
                response.ticketEvents[0].code,
                response.id
              )
              .subscribe({
                complete: () => {
                  this.close('Ticket created successfully');
                  this.eventService.dispatch({}, TicketCreatedEvent);
                },
                error: () => {
                  this.close('Something went wrong');
                },
              });
          else {
            this.close('Ticket created successfully');
            this.eventService.dispatch({}, TicketCreatedEvent);
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
