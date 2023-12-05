import { OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssociatedObject, Category, TicketStarter } from '@spartacus/customer-ticketing/root';
import { Observable, Subscription } from 'rxjs';
import { CustomerTicketingDialogComponent } from '../../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';
import { GlobalMessageService, TranslationService } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class CustomerTicketingCreateDialogComponent extends CustomerTicketingDialogComponent implements OnInit, OnDestroy {
    ticketCategories$: Observable<Category[]>;
    ticketAssociatedObjects$: Observable<AssociatedObject[]>;
    subscription: Subscription;
    selectedCategory: Category;
    selectedAssociatedObject: AssociatedObject;
    attachment: File;
    protected globalMessage: GlobalMessageService;
    protected translationService: TranslationService;
    protected getCreateTicketPayload(form: FormGroup): TicketStarter;
    ngOnInit(): void;
    protected buildForm(): void;
    createTicketRequest(): void;
    protected handleError(error: any): void;
    protected onComplete(): void;
    protected onError(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingCreateDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerTicketingCreateDialogComponent, "cx-customer-ticketing-create-dialog", never, { "selectedCategory": "selectedCategory"; "selectedAssociatedObject": "selectedAssociatedObject"; }, {}, never, never, false, never>;
}
