import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      searchTerm: ['', [Validators.required]],
    });
    this.searchResultsLoading$ = this.asmService.getCustomerSearchResultsLoading();
    this.asmService.customerSearchReset();
    this.subscription.add(
      this.asmService.getCustomerSearchResults().subscribe(results => {
        this.handleSearchResults(results);
      })
    );

    this.form.controls.searchTerm.valueChanges.subscribe(value => {
      if (
        !!this.selectedCustomer &&
        value !==
          this.selectedCustomer.firstName + this.selectedCustomer.lastName
      ) {
        this.selectedCustomer = undefined;
      }
      //this.selectedCustomer = undefined;
      console.log(`Search term: value: ${value}, lenght: ${value.length}`);
      if (value.trim().length >= 3) {
        console.log('value length >= 3');
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
      results.entries.forEach(result => {
        console.log(`${result.firstName} ${result.lastName}, ${result.uid}`);
      });
    } else {
      this.searchResults = [];
      console.log('No results');
    }
  }

  selectCustomerFromList(customer: any) {
    console.log('selectCustomerFromList', customer);
    this.selectedCustomer = customer;
    this.form.controls.searchTerm.setValue(
      this.selectedCustomer.firstName + this.selectedCustomer.lastName
    );
    //this.submitEvent.emit({ customerId: customer.customerId });
  }

  onSubmit(): void {
    console.log('onSumbmit:', this.selectedCustomer);

    if (!!this.selectedCustomer) {
      console.log('emit submit event', {
        customerId: this.selectedCustomer.customerId,
      });
      this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
    } else {
      console.log('No selected cuastomer.  No emit.');
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
