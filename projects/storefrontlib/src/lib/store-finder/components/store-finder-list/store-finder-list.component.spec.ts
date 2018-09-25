import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StoreFinderListComponent } from './store-finder-list.component';
import { StoreFinderPagingComponent } from '../store-finder-paging/store-finder-paging.component';
import { StoreFinderListItemComponent } from './store-finder-list-item/store-finder-list-item.component';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';
import { services } from '../../services';

import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';
import { OccModuleConfig } from '../../../occ/occ-module-config';

describe('StoreFinderListComponent', () => {
  let component: StoreFinderListComponent;
  let fixture: ComponentFixture<StoreFinderListComponent>;
  let store: Store<fromReducers.StoresState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      declarations: [
        StoreFinderListComponent,
        StoreFinderPagingComponent,
        StoreFinderListItemComponent,
        StoreFinderMapComponent
      ],
      providers: [...services, OccE2eConfigurationService, OccModuleConfig]
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
