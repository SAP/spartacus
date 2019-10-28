import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  AsmService,
  CustomerSearchPage,
  GlobalMessageService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { FormUtils } from '../../../shared/utils/forms/form-utils';

@Component({
  selector: 'cx-customer-selection',
  templateUrl: './customer-selection.component.html',
})
export class CustomerSelectionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private submitClicked = false;
  private subscription = new Subscription();
  searchResultsLoading$: Observable<boolean>;
  searchResults: any;
  selectedCustomer: any;

  @Output()
  submitEvent = new EventEmitter<{ customerId: string }>();

  constructor(
    private fb: FormBuilder,
    private asmService: AsmService,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      searchTerm: [''],
    });
    this.searchResultsLoading$ = this.asmService.getCustomerSearchResultsLoading();
    this.asmService.customerSearchReset();
    this.subscription.add(
      this.asmService.getCustomerSearchResults().subscribe(results => {
        this.handleSearchResults(results);
      })
    );

    this.form.controls.searchTerm.valueChanges.subscribe(value => {
      if (!!this.selectedCustomer && value !== this.selectedCustomer.name) {
        this.selectedCustomer = undefined;
      }
      if (value.trim().length >= 3) {
        this.asmService.customerSearch({
          query: value,
        });
      } else {
        this.asmService.customerSearchReset();
      }
    });
  }

  private handleSearchResults(results: CustomerSearchPage): void {
    if (!!results && results.entries) {
      this.searchResults = results.entries;
    } else {
      this.searchResults = [];
    }
  }

  selectCustomerFromList(customer: any) {
    this.selectedCustomer = customer;
    this.form.controls.searchTerm.setValue(this.selectedCustomer.name);
  }

  onSubmit(): void {
    if (!!this.selectedCustomer) {
      this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
    }
  }

  isNotValid(formControlName: string): boolean {
    return FormUtils.isNotValidField(
      this.form,
      formControlName,
      this.submitClicked
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
