import { Injectable } from '@angular/core';
import { Action, ActionsSubject } from '@ngrx/store';
import { CartActions, StateLoaderActions } from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

const CART_LOAD_ACTIONS = [
  CartActions.LOAD_CART,
  CartActions.LOAD_CART_SUCCESS,
  CartActions.LOAD_CART_FAIL,
];

const CART_CREATE_ACTIONS = [
  CartActions.CREATE_CART,
  CartActions.CREATE_CART_SUCCESS,
  CartActions.CREATE_CART_FAIL,
];

const CART_DELETE_ACTIONS = [
  CartActions.DELETE_CART,
  CartActions.DELETE_CART_FAIL,
];

const CART_MERGE_ACTIONS = [
  CartActions.MERGE_CART,
  CartActions.MERGE_CART_SUCCESS,
];

const CREATE_ENTRY = [
  CartActions.CART_ADD_ENTRY,
  CartActions.CART_ADD_ENTRY_SUCCESS,
  CartActions.CART_ADD_ENTRY_FAIL,
];

const UPDATE_ENTRY = [
  CartActions.CART_UPDATE_ENTRY,
  CartActions.CART_UPDATE_ENTRY_SUCCESS,
  CartActions.CART_UPDATE_ENTRY_FAIL,
];

const REMOVE_ENTRY = [
  CartActions.CART_REMOVE_ENTRY,
  CartActions.CART_REMOVE_ENTRY_SUCCESS,
  CartActions.CART_REMOVE_ENTRY_FAIL,
];

@Injectable({
  providedIn: 'root',
})
export class CartEventBuilder {
  constructor(protected actionsSubject: ActionsSubject) {}

  buildBusyEvent(): Observable<boolean> {
    return this.actions([
      ...CART_LOAD_ACTIONS,
      ...CART_CREATE_ACTIONS,
      ...CART_DELETE_ACTIONS,
      ...CART_MERGE_ACTIONS,
      ...CREATE_ENTRY,
      ...UPDATE_ENTRY,
      ...REMOVE_ENTRY,
    ]).pipe(
      map((payload: StateLoaderActions.LoaderLoadAction) =>
        payload.meta && payload.meta.loader ? !!payload.meta.loader.load : false
      ),
      distinctUntilChanged()
    );
  }

  buildErrorEvent(): Observable<any> {
    return this.create([
      CartActions.LOAD_CART_FAIL,
      CartActions.CREATE_CART_FAIL,
      CartActions.CART_ADD_ENTRY_FAIL,
      CartActions.CART_UPDATE_ENTRY_FAIL,
      CartActions.CART_REMOVE_ENTRY_FAIL,
      CartActions.ADD_EMAIL_TO_CART_FAIL,
      CartActions.DELETE_CART_FAIL,
    ]);
  }

  buildLoadEvent(): Observable<any> {
    return this.create([CartActions.LOAD_CART_SUCCESS]);
  }
  buildMergeEvent(): Observable<any> {
    return this.create([CartActions.MERGE_CART_SUCCESS]);
  }

  buildChangeEvent(): Observable<any> {
    return this.create([
      CartActions.CREATE_CART_SUCCESS,
      CartActions.MERGE_CART_SUCCESS,
      // there's no delete cart success
      CartActions.CART_ADD_ENTRY_SUCCESS,
      CartActions.CART_UPDATE_ENTRY_SUCCESS,
      CartActions.CART_REMOVE_ENTRY_SUCCESS,
    ]);
  }

  buildEntryCreateEvent(): Observable<any> {
    return this.create([CartActions.CART_ADD_ENTRY_SUCCESS]);
  }

  buildEntryUpdateEvent(): Observable<any> {
    return this.create([CartActions.CART_UPDATE_ENTRY_SUCCESS]);
  }

  buildEntryRemoveEvent(): Observable<any> {
    return this.create([CartActions.CART_REMOVE_ENTRY_SUCCESS]);
  }

  buildAddEvent(): Observable<any> {
    return this.create([CartActions.CART_ADD_ENTRY]);
  }

  private create<T>(actionTypes: string[]): Observable<T> {
    return this.actions(actionTypes).pipe(
      map((action: CartActions.CartAddEntry) => action.payload)
    );
  }

  private actions(actions: string[]): Observable<Action> {
    return this.actionsSubject.pipe(
      filter(data => actions.includes(data.type))
    );
  }
}
