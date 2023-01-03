/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AsmConfig, AsmService, CustomerSearchPage } from '@spartacus/asm/core';
import { User, WindowRef } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-selection',
  templateUrl: './customer-selection.component.html',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class CustomerSelectionComponent implements OnInit, OnDestroy {
  customerSelectionForm: FormGroup<{ searchTerm: FormControl<string | null> }>;
  protected subscription = new Subscription();
  searchResultsLoading$: Observable<boolean>;
  searchResults: Observable<CustomerSearchPage>;
  selectedCustomer: User | undefined;

  actionQueue: (() => void)[] = [];

  items: User[] = [];
  expanded = false;
  focusIndex = -1;
  activeDescendant: string = '';
  listboxId = 'customerSearchResults';
  selectedIndex = -1;
  optionId(optionIndex: number): string {
    return `${this.listboxId}-opt-${optionIndex}`;
  }
  open() {
    this.expanded = true;
  }

  close() {
    this.expanded = false;
    this.activeDescendant = '';
    this.closeResults();
  }

  moveFocus(newIndex: number) {
    if (newIndex >= this.items.length) {
      newIndex = 0;
    }
    if (newIndex < 0) {
      newIndex = this.items.length - 1;
    }
    this.focusIndex = newIndex;
    this.activeDescendant = this.optionId(this.focusIndex);
  }

  selectItem(index: number) {
    this.selectedIndex = index;
    this.selectCustomerFromList(this.items[this.selectedIndex]);
  }

  focus(event: Event) {
    console.log('focus', event);
  }
  blur(event: FocusEvent) {
    console.log('blur', event);

    if (this.expanded) {
      if (
        event.relatedTarget &&
        this.resultList.nativeElement.contains(event.relatedTarget as Node)
      ) {
        // user is clicking on option
      } else {
        this.close();
      }
    }
  }

  keydownArrowdown(event: Event) {
    // opens menu
    // if item selected, focus selected item
    // else focus first item
    console.log('keydownArrowdown', event);
    if (this.expanded) {
      event.stopPropagation();
      event.preventDefault();
      this.moveFocus(this.focusIndex + 1);
    } else {
      this.handleSearchTerm(
        this.customerSelectionForm.controls.searchTerm.value
      );
      this.actionQueue.push(() => {
        this.moveFocus(this.selectedCustomer ? this.selectedIndex : 0);
      });
    }
  }
  keydownArrowup(event: Event) {
    // if popup closed, opens popup with focus on last element
    console.log('keydownArrowup', event);
    if (this.expanded) {
      event.stopPropagation();
      event.preventDefault();
      this.moveFocus(this.focusIndex - 1);
    } else {
      this.handleSearchTerm(
        this.customerSelectionForm.controls.searchTerm.value
      );
      this.actionQueue.push(() => {
        this.moveFocus(this.items.length - 1);
      });
    }
  }
  keydownEnter(event: Event) {
    console.log('keydownEnter', event);
    if (this.expanded) {
      event.preventDefault();
      this.selectItem(this.focusIndex);
      this.close();
    }
  }

  keydownEscape(event: Event) {
    // Dismisses the popup if visible.
    // (optional) if the popup is hidden, clear selection
    console.log('keydownEscape', event);
    if (this.expanded) {
      // event.preventDefault();
      event.stopPropagation();
      this.close();
    }
  }

  @Output()
  submitEvent = new EventEmitter<{ customerId?: string }>();

  @ViewChild('resultList') resultList: ElementRef<HTMLElement>;
  @ViewChild('searchTerm') searchTerm: ElementRef<HTMLInputElement>;

  constructor(
    protected fb: FormBuilder,
    protected asmService: AsmService,
    protected config: AsmConfig,
    protected windowRef: WindowRef
  ) {}

  ngOnInit(): void {
    this.customerSelectionForm = this.fb.group({
      searchTerm: ['', Validators.required],
    });
    this.asmService.customerSearchReset();
    this.searchResultsLoading$ =
      this.asmService.getCustomerSearchResultsLoading();
    this.searchResults = this.asmService.getCustomerSearchResults().pipe(
      tap((searchResults: CustomerSearchPage) => {
        this.items = searchResults?.entries ?? [];
        if (this.items.length) {
          this.open();
        }
        if (this.actionQueue.length) {
          this.actionQueue.forEach((fn) => fn());
          this.actionQueue = [];
        }
      })
    );

    this.subscription.add(
      this.customerSelectionForm.controls.searchTerm.valueChanges
        .pipe(debounceTime(300))
        .subscribe((searchTermValue) => {
          this.handleSearchTerm(searchTermValue);
        })
    );
  }

  protected handleSearchTerm(searchTermValue: string | null) {
    if (this.customerSelectionForm.invalid) {
      this.customerSelectionForm.markAllAsTouched();
    }
    if (!searchTermValue) {
      searchTermValue = '';
    }
    if (
      this.selectedCustomer &&
      searchTermValue !== this.selectedCustomer.name
    ) {
      this.selectedCustomer = undefined;
    }
    if (this.selectedCustomer) {
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
      this.selectedCustomer.name as string
    );
    this.asmService.customerSearchReset();
    this.searchTerm.nativeElement.focus();
  }

  onSubmit(): void {
    if (this.customerSelectionForm.valid && this.selectedCustomer) {
      this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
    } else {
      this.customerSelectionForm.markAllAsTouched();
    }
  }

  onDocumentClick(event: Event) {
    if (this.resultList) {
      if (
        this.resultList.nativeElement.contains(event.target as Node) ||
        this.searchTerm.nativeElement.contains(event.target as Node)
      ) {
        return;
      } else {
        this.close();
      }
    }
  }
  closeResults() {
    this.asmService.customerSearchReset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.asmService.customerSearchReset();
  }
}

@Directive({
  selector: '[cxScrollIntoView]',
})
export class ScrollIntoViewDirective implements OnChanges {
  constructor(
    protected windowRef: WindowRef,
    protected host: ElementRef<HTMLElement>
  ) {}

  @Input() cxScrollIntoView = false;

  ngOnChanges(changes: SimpleChanges) {
    if ('cxScrollIntoView' in changes) {
      const change = changes.cxScrollIntoView;
      if (!change.previousValue && change.currentValue) {
        if (this.windowRef.nativeWindow) {
          this.scrollIntoView(this.host.nativeElement);
        }
      }
    }
  }

  scrollIntoView(element: HTMLElement) {
    var bounding = element.getBoundingClientRect();
    const topIn = bounding.top >= 0;
    const leftIn = bounding.left >= 0;
    const bottomIn =
      bounding.bottom <=
      (this.windowRef.nativeWindow?.innerHeight ??
        this.windowRef.document.documentElement.clientHeight);
    const rightIn =
      bounding.right <=
      (this.windowRef.nativeWindow?.innerWidth ??
        this.windowRef.document.documentElement.clientWidth);

    console.log(
      'topIn',
      topIn,
      'leftIn',
      leftIn,
      'bottomIn',
      bottomIn,
      'rightIn',
      rightIn
    );
    if (topIn && leftIn && bottomIn && rightIn) {
      return;
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
