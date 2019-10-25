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

  selectCustomer(customer: any) {
    console.log('selectCustomer', customer);
    this.submitEvent.emit({ customerId: customer.customerId });
  }

  onSubmit(): void {
    console.log('onSumbmit');
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }
    this.asmService.customerSearch({
      query: this.form.controls.searchTerm.value,
    });
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
