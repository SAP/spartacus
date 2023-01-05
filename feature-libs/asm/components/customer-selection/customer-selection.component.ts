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
  Injectable,
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

  /** Queue to defer action until result list has opened */
  actionQueue: (() => void)[] = [];

  items: User[] = [];
  expanded = false;
  focusIndex = -1;
  activeDescendant: string = '';
  listboxId = 'customerSearchResults';
  selectedIndex = -1;

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.asmService.customerSearchReset();
  }

  selectCustomerFromList(customer: User) {
    this.selectedCustomer = customer;
    this.customerSelectionForm.controls.searchTerm.setValue(
      this.selectedCustomer.name as string
    );
    this.asmService.customerSearchReset();
    this.searchTerm.nativeElement.focus();
  }

  optionId(optionIndex: number): string {
    return `${this.listboxId}-opt-${optionIndex}`;
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

  blur(event: FocusEvent) {
    if (this.expanded) {
      if (
        event.relatedTarget &&
        this.resultList.nativeElement.contains(event.relatedTarget as Node)
      ) {
        // user is clicking on option
      } else {
        this.closeResults();
      }
    }
  }

  keydownArrowdown(event: Event) {
    // opens menu
    // if item selected, focus selected item
    // else focus first item
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
    if (this.expanded) {
      event.preventDefault();
      this.selectItem(this.focusIndex);
      this.closeResults();
    }
  }

  keydownEscape(event: Event) {
    // Dismisses the popup if visible.
    // (optional) if the popup is hidden, clear selection
    if (this.expanded) {
      // event.preventDefault();
      event.stopPropagation();
      this.closeResults();
    }
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
        this.closeResults();
      }
    }
  }

  open() {
    this.expanded = true;
  }

  closeResults() {
    this.expanded = false;
    this.activeDescendant = '';
    this.asmService.customerSearchReset();
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
}

@Injectable({ providedIn: 'root' })
export class ScrollIntoViewService {
  constructor(protected windowRef: WindowRef) {}

  scrollIntoView(element: HTMLElement, containerElement?: HTMLElement) {
    let containerHeight: number;
    let containerWidth: number;

    if (!this.windowRef.nativeWindow) {
      return;
    }

    if (containerElement) {
      let containerBounding = containerElement.getBoundingClientRect();
      containerHeight = containerElement.clientHeight + containerBounding.top;
      containerWidth = containerElement.clientWidth + containerBounding.left;
    } else {
      // use window properties with fallback to document
      containerHeight =
        this.windowRef.nativeWindow?.innerHeight ??
        this.windowRef.document.documentElement.clientHeight;
      containerWidth =
        this.windowRef.nativeWindow?.innerWidth ??
        this.windowRef.document.documentElement.clientWidth;
    }

    var elementBounding = element.getBoundingClientRect();
    const topIn = elementBounding.top >= 0;
    const leftIn = elementBounding.left >= 0;
    const bottomIn = elementBounding.bottom <= containerHeight;
    const rightIn = elementBounding.right <= containerWidth;

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
    if (!topIn && !leftIn && !bottomIn && !rightIn) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
}

@Directive({
  selector: '[cxScrollIntoView]',
})
export class ScrollIntoViewDirective implements OnChanges {
  constructor(
    protected scrollIntoViewService: ScrollIntoViewService,
    protected host: ElementRef<HTMLElement>
  ) {}

  @Input() cxScrollIntoView = false;
  @Input() cxScrollIntoViewContainer: HTMLElement;

  ngOnChanges(changes: SimpleChanges) {
    if ('cxScrollIntoView' in changes) {
      const change = changes.cxScrollIntoView;
      if (!change.previousValue && change.currentValue) {
        console.log(this.cxScrollIntoViewContainer);
        this.scrollIntoView(
          this.host.nativeElement,
          this.cxScrollIntoViewContainer
        );
      }
    }
  }

  scrollIntoView(element: HTMLElement, _container: HTMLElement) {
    this.scrollIntoViewService.scrollIntoView(element /* _container */);
  }
}
