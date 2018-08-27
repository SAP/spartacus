import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFinderListComponent } from './store-finder-list.component';
import { MaterialModule } from '../../../material.module';
import * as fromRoot from '../../../routing/store';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromReducers from '../../store';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreFinderPagingComponent } from '../store-finder-paging/store-finder-paging.component';
import { StoreFinderListItemComponent } from './store-finder-list-item/store-finder-list-item.component';
import * as fromStore from '../../store';

describe('StoreFinderListComponent', () => {
  let component: StoreFinderListComponent;
  let fixture: ComponentFixture<StoreFinderListComponent>;
  let store: Store<fromStore.StoresState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      declarations: [
        StoreFinderListComponent,
        StoreFinderPagingComponent,
        StoreFinderListItemComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change pages', done => {
    const pagination = new StoreFinderPagingComponent();
    pagination.viewPageEvent.subscribe(event => {
      expect(event).toEqual(3);
      component.viewPage(event);
      expect(store.dispatch).toHaveBeenCalled();
      expect(component.searchConfig.currentPage).toBe(event);
      done();
    });
    pagination.next(3);
  });
});
