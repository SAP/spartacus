import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { CartActions } from '@spartacus/core';
import { of } from 'rxjs';
import { CartEventBuilder } from './cart-event.builder';

class MockActionsSubject {
  pipe() {
    return of();
  }
}

describe('CartEventBuilder', () => {
  let service: CartEventBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CartEventBuilder,
        {
          provide: ActionsSubject,
          useClass: MockActionsSubject,
        },
      ],
    });

    service = TestBed.get(CartEventBuilder);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('map events to ngrx actions', () => {
    beforeEach(() => {
      spyOn(<any>service, 'create').and.callThrough();
      spyOn(<any>service, 'actions').and.callThrough();
    });

    it('should have mapped buildBusyEvent()', () => {
      service.buildBusyEvent();
      expect((<any>service).actions).toHaveBeenCalledWith([
        CartActions.LOAD_CART,
        CartActions.LOAD_CART_SUCCESS,
        CartActions.LOAD_CART_FAIL,
        CartActions.CREATE_CART,
        CartActions.CREATE_CART_SUCCESS,
        CartActions.CREATE_CART_FAIL,
        CartActions.DELETE_CART,
        CartActions.DELETE_CART_FAIL,
        CartActions.MERGE_CART,
        CartActions.MERGE_CART_SUCCESS,
        CartActions.CART_ADD_ENTRY,
        CartActions.CART_ADD_ENTRY_SUCCESS,
        CartActions.CART_ADD_ENTRY_FAIL,
        CartActions.CART_UPDATE_ENTRY,
        CartActions.CART_UPDATE_ENTRY_SUCCESS,
        CartActions.CART_UPDATE_ENTRY_FAIL,
        CartActions.CART_REMOVE_ENTRY,
        CartActions.CART_REMOVE_ENTRY_SUCCESS,
        CartActions.CART_REMOVE_ENTRY_FAIL,
      ]);
    });

    it('should have mapped buildErrorEvent()', () => {
      service.buildErrorEvent();
      expect((<any>service).create).toHaveBeenCalledWith([
        CartActions.LOAD_CART_FAIL,
        CartActions.CREATE_CART_FAIL,
        CartActions.CART_ADD_ENTRY_FAIL,
        CartActions.CART_UPDATE_ENTRY_FAIL,
        CartActions.CART_REMOVE_ENTRY_FAIL,
        CartActions.ADD_EMAIL_TO_CART_FAIL,
        CartActions.DELETE_CART_FAIL,
      ]);
    });

    it('should have mapped buildLoadEvent()', () => {
      service.buildLoadEvent();
      expect((<any>service).create).toHaveBeenCalledWith([
        CartActions.LOAD_CART_SUCCESS,
      ]);
    });

    it('should have mapped buildChangeEvent()', () => {
      service.buildChangeEvent();
      expect((<any>service).create).toHaveBeenCalledWith([
        CartActions.CREATE_CART_SUCCESS,
        CartActions.MERGE_CART_SUCCESS,
        CartActions.CART_ADD_ENTRY_SUCCESS,
        CartActions.CART_UPDATE_ENTRY_SUCCESS,
        CartActions.CART_REMOVE_ENTRY_SUCCESS,
      ]);
    });

    it('should have mapped buildMergeEvent()', () => {
      service.buildMergeEvent();
      expect((<any>service).create).toHaveBeenCalledWith([
        CartActions.MERGE_CART_SUCCESS,
      ]);
    });

    it('should have mapped buildAddEvent()', () => {
      service.buildAddEvent();
      expect((<any>service).create).toHaveBeenCalledWith([
        CartActions.CART_ADD_ENTRY,
      ]);
    });

    it('should have mapped buildEntryCreateEvent()', () => {
      service.buildEntryCreateEvent();
      expect((<any>service).create).toHaveBeenCalledWith([
        CartActions.CART_ADD_ENTRY_SUCCESS,
      ]);
    });

    it('should have mapped buildEntryUpdateEvent()', () => {
      service.buildEntryUpdateEvent();
      expect((<any>service).create).toHaveBeenCalledWith([
        CartActions.CART_UPDATE_ENTRY_SUCCESS,
      ]);
    });

    it('should have mapped buildEntryRemoveEvent()', () => {
      service.buildEntryRemoveEvent();
      expect((<any>service).create).toHaveBeenCalledWith([
        CartActions.CART_REMOVE_ENTRY_SUCCESS,
      ]);
    });
  });

  describe('map busy state', () => {
    it('should have return true value for busy state', () => {
      spyOn(<any>service, 'actions').and.returnValue(
        of({
          meta: {
            loader: {
              load: true,
            },
          },
        })
      );

      let result;
      service.buildBusyEvent().subscribe(value => (result = value));
      expect(result).toEqual(true);
    });

    it('should have return false value for busy state', () => {
      spyOn(<any>service, 'actions').and.returnValue(
        of({
          meta: {
            loader: {
              load: false,
            },
          },
        })
      );

      let result;
      service.buildBusyEvent().subscribe(value => (result = value));
      expect(result).toEqual(false);
    });
  });
});
