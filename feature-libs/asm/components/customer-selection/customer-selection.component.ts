/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  inject,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AsmService } from '@spartacus/asm/core';
import {
  AsmConfig,
  AsmDeepLinkParameters,
  CustomerSearchPage,
} from '@spartacus/asm/root';

import { FeatureConfigService, User, useFeatureStyles } from '@spartacus/core';
import {
  DirectionMode,
  DirectionService,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
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
  searchByCustomer: boolean = false;
  searchByOrder: boolean = false;
  isLoading: boolean = false;

  activeFocusedButtonIndex = -1;

  protected featureConfig = inject(FeatureConfigService);
  isShowSearchingCustomerByOrderInASM = this.featureConfig.isEnabled(
    'showSearchingCustomerByOrderInASM'
  );

  @Output()
  submitEvent = new EventEmitter<{
    customerId?: string;
    parameters?: AsmDeepLinkParameters;
  }>();

  @ViewChild('resultList') resultList: ElementRef;
  @ViewChild('searchTerm') searchTerm: ElementRef;
  @ViewChild('searchOrder') searchOrder: ElementRef;

  @ViewChild('createCustomerLink') createCustomerLink: ElementRef;
  @ViewChildren('searchResultItem') searchResultItems: QueryList<
    ElementRef<HTMLElement>
  >;

  constructor(
    protected fb: UntypedFormBuilder,
    protected asmService: AsmService,
    protected config: AsmConfig,
    protected directionService: DirectionService,
    protected launchDialogService: LaunchDialogService
  ) {
    useFeatureStyles('showSearchingCustomerByOrderInASM');
  }

  ngOnInit(): void {
    if (this.isShowSearchingCustomerByOrderInASM) {
      this.customerSelectionForm = this.fb.group({
        searchTerm: '',
        searchOrder: '',
      });

      this.subscription.add(
        this.customerSelectionForm.controls.searchOrder.valueChanges
          .pipe(debounceTime(300))
          .subscribe((searchTermValue) => {
            this.searchByCustomer = false;
            this.searchByOrder = true;
            this.handleSearchByOrder(searchTermValue);
          })
      );
    } else {
      this.customerSelectionForm = this.fb.group({
        searchTerm: ['', Validators.required],
      });
    }

    this.asmService.customerSearchReset();
    this.searchResultsLoading$ =
      this.asmService.getCustomerSearchResultsLoading();
    this.searchResults = this.asmService.getCustomerSearchResults();

    this.subscription.add(
      this.customerSelectionForm.controls.searchTerm.valueChanges
        .pipe(debounceTime(300))
        .subscribe((searchTermValue) => {
          if (this.isShowSearchingCustomerByOrderInASM) {
            this.searchByCustomer = true;
            this.searchByOrder = false;
            this.handleSearchByCustomer(searchTermValue);
          } else {
            this.handleSearchTerm(searchTermValue);
          }
        })
    );

    this.subscription.add(
      this.searchResultsLoading$.subscribe((loading) => {
        this.isLoading = loading;
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
    this.activeFocusedButtonIndex = -1;
    if (searchTermValue.trim().length >= 3) {
      this.asmService.customerSearch({
        query: searchTermValue,
        pageSize: this.config.asm?.customerSearch?.maxResults,
      });
    }
  }

  protected handleSearchByCustomer(searchTermValue: string) {
    if (!!this.selectedCustomer) {
      this.selectedCustomer = undefined;
    }
    if (!!this.customerSelectionForm.controls.searchOrder.value) {
      this.customerSelectionForm.controls.searchOrder.setValue(undefined, {
        emitEvent: false,
      });
    }

    this.asmService.customerSearchReset();
    this.activeFocusedButtonIndex = -1;
    if (searchTermValue.trim().length >= 3) {
      this.asmService.customerSearch({
        query: searchTermValue,
        pageSize: this.config.asm?.customerSearch?.maxResults,
      });
    }
  }

  protected handleSearchByOrder(searchOrderValue: string) {
    if (!!this.selectedCustomer) {
      this.selectedCustomer = undefined;
    }
    if (!!this.customerSelectionForm.controls.searchTerm.value) {
      this.customerSelectionForm.controls.searchTerm.setValue(undefined, {
        emitEvent: false,
      });
    }

    this.asmService.customerSearchReset();
    this.activeFocusedButtonIndex = -1;
    if (searchOrderValue.trim().length >= 3) {
      this.asmService.customerSearch({
        orderId: searchOrderValue,
        pageSize: this.config.asm?.customerSearch?.maxResults,
      });
    }
  }

  isNoResultMessageInfoVisible(
    results: any,
    searchFlag: boolean,
    searchElement: HTMLInputElement
  ): boolean {
    const searchTermValid = searchElement.value.length >= 3;
    const hasEntries = !!results.entries && results.entries.length > 0;
    return !this.isLoading && searchTermValid && searchFlag && !hasEntries;
  }

  isSearchResultsVisible(results: any, searchFlag: boolean): boolean {
    return !!results.entries && searchFlag && results.entries.length > 0;
  }

  selectCustomerFromList(event: UIEvent, customer: User) {
    this.selectedCustomer = customer;
    if (this.isShowSearchingCustomerByOrderInASM) {
      this.customerSelectionForm.controls.searchTerm.setValue(
        this.selectedCustomer.name,
        {
          emitEvent: false,
        }
      );
    } else {
      this.customerSelectionForm.controls.searchTerm.setValue(
        this.selectedCustomer.name
      );
    }
    this.asmService.customerSearchReset();
    if (!this.isShowSearchingCustomerByOrderInASM) {
      this.searchTerm.nativeElement.focus();
    }
    event.preventDefault();
    event.stopPropagation();
  }

  onSubmit(): void {
    if (this.isShowSearchingCustomerByOrderInASM) {
      if (!!this.selectedCustomer) {
        this.submitEvent.emit({
          customerId: this.selectedCustomer.customerId,
          parameters: {
            orderId: this.customerSelectionForm.controls.searchOrder.value,
          },
        });
      } else {
        this.customerSelectionForm.markAllAsTouched();
      }
    } else {
      if (this.customerSelectionForm.valid && !!this.selectedCustomer) {
        this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
      } else {
        this.customerSelectionForm.markAllAsTouched();
      }
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

  closeResults(event: UIEvent) {
    this.asmService.customerSearchReset();
    this.searchTerm.nativeElement.focus();
    event.preventDefault();
    event.stopPropagation();
  }

  closeOrderSearchResults(event: UIEvent) {
    this.asmService.customerSearchReset();
    this.searchOrder.nativeElement.focus();
    event.preventDefault();
    event.stopPropagation();
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
    this.activeFocusedButtonIndex = 0;
    this.updateItemIndex(this.activeFocusedButtonIndex);
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
   * set mouse cursor to the end of search order text
   * @param event keyboard event
   */
  setOrderSearchSelectionEnd(event: UIEvent): void {
    event.preventDefault();
    if (this.searchOrder.nativeElement.value?.length) {
      const selectionStart = this.searchOrder.nativeElement.value.length;
      this.searchOrder.nativeElement.selectionStart = selectionStart;
      this.searchOrder.nativeElement.selectionEnd = selectionStart;
    }
  }
  /**
   * set focus on previous searh result item.  If no previous item then go to end of item.
   * @param event keyboard event
   */
  focusPreviousChild(event: UIEvent): void {
    event.preventDefault();
    this.activeFocusedButtonIndex--;
    if (this.activeFocusedButtonIndex < 0) {
      this.activeFocusedButtonIndex = this.searchResultItems.length - 1;
    }
    this.updateItemIndex(this.activeFocusedButtonIndex);
  }
  /**
   * set focus on next searh result item.  if no next item then go to the first item
   * @param event keyboard event
   */
  focusNextChild(event: UIEvent): void {
    event.preventDefault();
    this.activeFocusedButtonIndex++;
    if (this.activeFocusedButtonIndex > this.searchResultItems.length - 1) {
      this.activeFocusedButtonIndex = 0;
    }
    this.updateItemIndex(this.activeFocusedButtonIndex);
  }
  /**
   * set focus to input search text
   * @param event keyboard event
   */
  focusInputText(event: KeyboardEvent): void {
    event.preventDefault();
    this.activeFocusedButtonIndex = -1;
    this.searchTerm.nativeElement.focus();
    if (this.searchTerm.nativeElement.value?.length) {
      let selectionPos = this.searchTerm.nativeElement.selectionEnd;
      const searchTermLength = this.searchTerm.nativeElement.value.length;

      if (this.isBackNavigation(event)) {
        selectionPos = selectionPos <= 0 ? 0 : selectionPos - 1;
      } else if (this.isForwardsNavigation(event)) {
        selectionPos =
          selectionPos >= searchTermLength
            ? searchTermLength
            : selectionPos + 1;
      } else if (event.code === 'Home') {
        selectionPos = 0;
      } else if (event.code === 'End') {
        selectionPos = searchTermLength;
      }
      this.searchTerm.nativeElement.selectionStart = selectionPos;
      this.searchTerm.nativeElement.selectionEnd = selectionPos;
    }
  }

  /**
   * set focus to order search input search text
   * @param event keyboard event
   */
  focusOrderSearchInputText(event: KeyboardEvent): void {
    event.preventDefault();
    this.activeFocusedButtonIndex = -1;
    this.searchOrder.nativeElement.focus();
    if (this.searchOrder.nativeElement.value?.length) {
      let selectionPos = this.searchOrder.nativeElement.selectionEnd;
      const searchTermLength = this.searchOrder.nativeElement.value.length;

      if (this.isBackNavigation(event)) {
        selectionPos = selectionPos <= 0 ? 0 : selectionPos - 1;
      } else if (this.isForwardsNavigation(event)) {
        selectionPos =
          selectionPos >= searchTermLength
            ? searchTermLength
            : selectionPos + 1;
      } else if (event.code === 'Home') {
        selectionPos = 0;
      } else if (event.code === 'End') {
        selectionPos = searchTermLength;
      }
      this.searchOrder.nativeElement.selectionStart = selectionPos;
      this.searchOrder.nativeElement.selectionEnd = selectionPos;
    }
  }
  /**
   * set focus to selected item
   * @param {number} selectedIndex - current selected item index
   */
  updateItemIndex(selectedIndex: number): void {
    this.searchResultItems.toArray()?.[selectedIndex]?.nativeElement.focus();
  }

  createCustomer(): void {
    this.asmService.customerSearchReset();
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM,
      this.createCustomerLink
    );

    if (this.isShowSearchingCustomerByOrderInASM) {
      setTimeout(() => {
        this.searchTerm.nativeElement.blur();
      });
    }
  }
  /**
   * Verifies whether the user navigates into a subgroup of the main group menu.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
   * @protected
   */
  protected isForwardsNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === 'ArrowRight' && this.isLTRDirection()) ||
      (event.code === 'ArrowLeft' && this.isRTLDirection())
    );
  }

  /**
   * Verifies whether the user navigates from a subgroup back to the main group menu.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
   * @protected
   */
  protected isBackNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === 'ArrowLeft' && this.isLTRDirection()) ||
      (event.code === 'ArrowRight' && this.isRTLDirection())
    );
  }
  protected isLTRDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.LTR;
  }

  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }
}
