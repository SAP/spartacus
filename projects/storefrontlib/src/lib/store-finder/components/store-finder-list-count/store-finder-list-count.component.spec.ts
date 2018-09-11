import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { StoreFinderListCountComponent } from './store-finder-list-count.component';

import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';

describe('StoreFinderListCountComponent', () => {
  let component: StoreFinderListCountComponent;
  let fixture: ComponentFixture<StoreFinderListCountComponent>;
  let store: Store<fromReducers.StoresState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      declarations: [StoreFinderListCountComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListCountComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
