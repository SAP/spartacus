import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFinderSearchComponent } from './store-finder-search.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreFinderService } from '../../services';
import * as fromReducers from '../../store/reducers';
import * as fromRoot from '../../../routing/store';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as fromStore from '../../store';

fdescribe('StoreFinderSearchComponent', () => {
  let component: StoreFinderSearchComponent;
  let fixture: ComponentFixture<StoreFinderSearchComponent>;
  let service: StoreFinderService;
  let store: Store<fromStore.StoresState>;
  const keyEvent = {
    key: 'Enter'
  };
  const badKeyEvent = {
    key: 'Enter95'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      declarations: [StoreFinderSearchComponent],
      providers: [StoreFinderService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderSearchComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StoreFinderService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(component, 'findStores').and.callThrough();
    spyOn(service, 'findStores').and.callThrough();
    spyOn(component, 'onKey').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch new query', () => {
    component.searchBox.setValue('query');
    expect(component.searchBox.value).toEqual('query');
    component.findStores(component.searchBox.value);
    expect(component.findStores).toHaveBeenCalled();
    expect(service.findStores).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.FindStores({
        queryText: 'query'
      })
    );
  });

  it('should call onKey and dispatch query', () => {
    component.onKey(keyEvent);
    expect(component.onKey).toHaveBeenCalled();
    expect(component.findStores).toHaveBeenCalled();
    expect(service.findStores).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should only call onKey', () => {
    component.onKey(badKeyEvent);
    expect(component.onKey).toHaveBeenCalled();
    expect(component.findStores).not.toHaveBeenCalled();
  });
});
