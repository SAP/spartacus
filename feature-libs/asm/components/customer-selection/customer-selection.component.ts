import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsmConfig, AsmService } from '@spartacus/asm/core';
import { CustomerSearchPage } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { ICON_TYPE, ModalRef, ModalService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomerListComponent } from '../customer-list/customer-list.component';

@Component({
  selector: 'cx-customer-selection',
  templateUrl: './customer-selection.component.html',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class CustomerSelectionComponent implements OnInit, OnDestroy {
  customerSelectionForm: FormGroup;
  protected subscription = new Subscription();
  searchResultsLoading$: Observable<boolean>;
  searchResults: Observable<CustomerSearchPage>;
  selectedCustomer: User | undefined;

  hakwooTest = 'test hakwoo';

  iconTypes = ICON_TYPE;

  @Output()
  submitEvent = new EventEmitter<{ customerId?: string }>();

  @ViewChild('resultList') resultList: ElementRef;
  @ViewChild('searchTerm') searchTerm: ElementRef;

  protected modalRef: ModalRef;

  constructor(
    protected fb: FormBuilder,
    protected asmService: AsmService,
    protected config: AsmConfig,
    protected modalService: ModalService
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
    if (searchTermValue.trim().length >= 3) {
      this.asmService.customerSearch({
        query: searchTermValue,
        pageSize: this.config.asm?.customerSearch?.maxResults,
      });
    }
  }

  showCustomList(): void {
    // this.asmService.getCustomerLists();

    this.modalRef = this.modalService.open(CustomerListComponent, {
      centered: true,
      size: 'mf',
      windowClass: 'classTestHak',
    });

    this.modalRef.result
      .then((selectedUser) => {
        if (selectedUser) {
          this.selectCustomerFromList(selectedUser);
        }
      })
      .catch(() => {
        // this  callback is called when modal is closed with Esc key or clicking backdrop
      });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.asmService.customerSearchReset();
  }
}
