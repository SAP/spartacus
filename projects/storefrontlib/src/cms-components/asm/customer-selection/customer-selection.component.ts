import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  AsmConfig,
  AsmService,
  CustomerSearchPage,
  User,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-selection',
  templateUrl: './customer-selection.component.html',
  styleUrls: ['./customer-selection.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class CustomerSelectionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private subscription = new Subscription();
  searchResultsLoading$: Observable<boolean>;
  searchResults: Observable<CustomerSearchPage>;
  selectedCustomer: User;

  @Output()
  submitEvent = new EventEmitter<{ customerId: string }>();

  @ViewChild('resultList') resultList: ElementRef;
  @ViewChild('searchTerm') searchTerm: ElementRef;

  constructor(
    private fb: FormBuilder,
    private asmService: AsmService,
    private config: AsmConfig
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      searchTerm: [''],
    });
    this.asmService.customerSearchReset();
    this.searchResultsLoading$ = this.asmService.getCustomerSearchResultsLoading();
    this.searchResults = this.asmService.getCustomerSearchResults();

    this.subscription.add(
      this.form.controls.searchTerm.valueChanges
        .pipe(debounceTime(300))
        .subscribe(searchTermValue => {
          this.handleSearchTerm(searchTermValue);
        })
    );
  }

  private handleSearchTerm(searchTermValue: string) {
    if (
      Boolean(this.selectedCustomer) &&
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
        pageSize: this.config.asm.customerSearch.maxResults,
      });
    }
  }

  selectCustomerFromList(customer: User) {
    this.selectedCustomer = customer;
    this.form.controls.searchTerm.setValue(this.selectedCustomer.name);
    this.asmService.customerSearchReset();
  }

  onSubmit(): void {
    if (Boolean(this.selectedCustomer)) {
      this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
    }
  }

  onDocumentClick(event) {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.asmService.customerSearchReset();
  }
}
