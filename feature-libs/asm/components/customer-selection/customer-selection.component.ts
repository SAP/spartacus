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
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AsmConfig, AsmService, CustomerSearchPage } from '@spartacus/asm/core';
import { User } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  @ViewChildren('resultItem') resultItems: QueryList<ElementRef<HTMLElement>>;

  activeIndex = -1;

  constructor(
    protected fb: UntypedFormBuilder,
    protected asmService: AsmService,
    protected config: AsmConfig
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
    this.activeIndex = -1;
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
    this.setFocusOnInput();
  }

  onSubmit(): void {
    if (this.customerSelectionForm.valid && !!this.selectedCustomer) {
      this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
    } else {
      this.customerSelectionForm.markAllAsTouched();
    }
  }

  onDocumentClick(event: UIEvent) {
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
    this.setFocusOnInput();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.asmService.customerSearchReset();
  }

  /**
   * set focus to the first searched item
   * @param event keyboard event
   */
  focusFirstItem(event: UIEvent): void {
    event.preventDefault();
    this.activeIndex = 0;
    this.updateItemIndex(this.activeIndex);
  }
  /**
   * set mouse cursor to the end of search text
   * @param event keyboard event
   */
  setSelectionEnd(event: UIEvent): void {
    event.preventDefault();
    if (this.searchTerm.nativeElement.value?.length) {
      const selectionStart = this.searchTerm.nativeElement.value.length;
      this.searchTerm.nativeElement.selectionStart = selectionStart;
      this.searchTerm.nativeElement.selectionEnd = selectionStart;
    }
  }
  /**
   * set focus on previous searh result item.  If no previous item then go to end of item.
   * @param event keyboard event
   */
  focusPreviousChild(event: UIEvent): void {
    event.preventDefault();
    this.activeIndex--;
    if (this.activeIndex < 0) {
      this.activeIndex = this.resultItems.length - 1;
    }
    this.updateItemIndex(this.activeIndex);
  }
  /**
   * set focus on next searh result item.  if no next item then go to the first item
   * @param event keyboard event
   */
  focusNextChild(event: UIEvent): void {
    event.preventDefault();
    this.activeIndex++;
    if (this.activeIndex > this.resultItems.length - 1) {
      this.activeIndex = 0;
    }
    this.updateItemIndex(this.activeIndex);
  }
  /**
   * set focus to input search text
   * @param event keyboard event
   * @param {boolean} moveOneLeft - flag to move cursor one left
   * @param {boolean} moveBegin - flag to move cursor to front
   */
  focusInputText(event: UIEvent, moveOneLeft = false, moveBegin = false): void {
    event.preventDefault();
    this.activeIndex = -1;
    this.searchTerm.nativeElement.focus();
    if (this.searchTerm.nativeElement.value?.length) {
      let selectionPos = this.searchTerm.nativeElement.value.length;
      if (moveOneLeft) {
        selectionPos--;
      }
      if (moveBegin) {
        selectionPos = 0;
      }
      this.searchTerm.nativeElement.selectionStart = selectionPos;
      this.searchTerm.nativeElement.selectionEnd = selectionPos;
    }
  }
  /**
   * set focus to selected item
   * @param {number} selectedIndex - current selected item index
   */
  updateItemIndex(selectedIndex: number): void {
    this.resultItems.toArray()?.[selectedIndex]?.nativeElement.focus();
  }

  setFocusOnInput(): void {
    setTimeout(() => {
      this.searchTerm.nativeElement.focus();
    });
  }
}
