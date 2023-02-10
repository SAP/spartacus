/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  Optional,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AsmConfig, AsmService, CustomerSearchPage } from '@spartacus/asm/core';
import { User } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { CreatedCustomer } from '../asm-create-customer-form/asm-create-customer-form.model'

@Component({
  selector: 'cx-customer-selection',
  templateUrl: './customer-selection.component.html',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class CustomerSelectionComponent implements OnInit, OnDestroy {
  customerSelectionForm: UntypedFormGroup;
  protected subscription = new Subscription();
  searchResultsLoading$: Observable<boolean>;
  searchResults: Observable<CustomerSearchPage>;
  selectedCustomer: User | undefined;

  @Output()
  submitEvent = new EventEmitter<{ customerId?: string }>();

  @ViewChild('resultList') resultList: ElementRef;
  @ViewChild('searchTerm') searchTerm: ElementRef;

  @ViewChild('createCustomerLink') createCustomerLink: ElementRef;

  constructor(
    protected fb: UntypedFormBuilder,
    protected asmService: AsmService,
    protected config: AsmConfig,
    @Optional() protected launchDialogService?: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.customerSelectionForm = this.fb.group({
      searchTerm: ['', Validators.required],
    });
    this.asmService.customerSearchReset();
    this.searchResultsLoading$ =
      this.asmService.getCustomerSearchResultsLoading();
    this.searchResults = this.asmService.getCustomerSearchResults();

    this.subscription.add(
      this.customerSelectionForm.controls.searchTerm.valueChanges
        .pipe(debounceTime(300))
        .subscribe((searchTermValue) => {
          console.log(searchTermValue);
          this.handleSearchTerm(searchTermValue);
        })
    );
  }

  protected handleSearchTerm(searchTermValue: string) {
    if (
      !!this.selectedCustomer &&
      searchTermValue !== this.selectedCustomer.name
    ) {
      this.selectedCustomer = undefined;
    }
    if (Boolean(this.selectedCustomer)) {
      return;
    }
    this.asmService.customerSearchReset();
    if (searchTermValue.trim().length >= 3) {
      this.asmService.customerSearch({
        query: searchTermValue,
        pageSize: this.config.asm?.customerSearch?.maxResults,
      });
    }
  }

  selectCustomerFromList(customer: User) {
    this.selectedCustomer = customer;
    this.customerSelectionForm.controls.searchTerm.setValue(
      this.selectedCustomer.name
    );
    this.asmService.customerSearchReset();
  }

  onSubmit(): void {
    if (this.customerSelectionForm.valid && !!this.selectedCustomer) {
      this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
    } else {
      this.customerSelectionForm.markAllAsTouched();
    }
  }

  onDocumentClick(event: Event) {
    if (Boolean(this.resultList)) {
      if (
        this.resultList.nativeElement.contains(event.target) ||
        this.searchTerm.nativeElement.contains(event.target)
      ) {
        return;
      } else {
        this.asmService.customerSearchReset();
      }
    }
  }

  closeResults() {
    this.asmService.customerSearchReset();
  }

  createCustomer(): void {
    this.launchDialogService?.openDialogAndSubscribe(
      LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM,
      this.createCustomerLink
    );

    this.subscription.add(
      this.launchDialogService?.dialogClose
        .pipe(filter((result) => Boolean(result)))
        .subscribe((result: CreatedCustomer) => {
          if (result.email) {
            this.submitEvent.emit({ customerId: result.email });
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.asmService.customerSearchReset();
  }
}
