import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StateWithAsm } from '../asm-state';
import * as fromReducers from '../reducers/index';

describe('Customer Search Results Selectors', () => {
  let store: Store<StateWithAsm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('asm', fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithAsm>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('get Customer Search Results', () => {
    it('should pass', () => {});
  });
});
