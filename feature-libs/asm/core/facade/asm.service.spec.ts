import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { User } from '@spartacus/core';
import {
  AsmUi,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { AsmActions } from '../store/actions/index';
import { AsmState, ASM_FEATURE } from '../store/asm-state';
import * as fromReducers from '../store/reducers/index';
import { AsmService } from './asm.service';

const mockUser: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'user@test.com',
  customerId: '123456',
};

const mockCustomerSearchPage: CustomerSearchPage = {
  entries: [mockUser],
};

describe('AsmService', () => {
  let service: AsmService;
  let store: Store<AsmState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromReducers.getReducers()),
      ],
      providers: [AsmService],
    });

    service = TestBed.inject(AsmService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch proper action for customer search', () => {
    spyOn(store, 'dispatch').and.stub();
    const searchOptions: CustomerSearchOptions = { query: 'search term' };
    service.customerSearch(searchOptions);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.CustomerSearch(searchOptions)
    );
  });

  it('should return search result', () => {
    store.dispatch(
      new AsmActions.CustomerSearchSuccess(mockCustomerSearchPage)
    );

    let result: CustomerSearchPage;
    service
      .getCustomerSearchResults()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockCustomerSearchPage);
  });

  it('should return search result loading status', () => {
    let result: boolean;
    service
      .getCustomerSearchResultsLoading()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(false);
  });

  it('should dispatch proper action for customer search reset', () => {
    spyOn(store, 'dispatch').and.stub();
    service.customerSearchReset();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.CustomerSearchReset()
    );
  });

  it('should dispatch proper action for update asm UI', () => {
    spyOn(store, 'dispatch').and.stub();
    const asmUi: AsmUi = {};
    service.updateAsmUiState(asmUi);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.AsmUiUpdate(asmUi)
    );
  });

  it('should get the AsmUi state', () => {
    const asmUi: AsmUi = { collapsed: false };
    store.dispatch(new AsmActions.AsmUiUpdate(asmUi));

    let result: AsmUi;
    service
      .getAsmUiState()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(asmUi);
  });
});
