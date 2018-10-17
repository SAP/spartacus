import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { StoreFinderListComponent } from './store-finder-list.component';
import { PaginationComponent } from '../../../ui/components/pagination-and-sorting/pagination/pagination.component';

import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';
import * as fromServices from '../../services';

fdescribe('StoreFinderListComponent', () => {
  let component: StoreFinderListComponent;
  let fixture: ComponentFixture<StoreFinderListComponent>;
  let store: Store<fromReducers.StoresState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StoreFinderListComponent],
      providers: [...fromServices.services]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change pages', done => {
    const pagination = new PaginationComponent();
    pagination.viewPageEvent.subscribe(event => {
      expect(event).toEqual(3);
      component.viewPage(event);
      expect(store.dispatch).toHaveBeenCalled();
      expect(component.searchConfig.currentPage).toBe(event);
      done();
    });
    pagination.pageChange(4);
  });
});
