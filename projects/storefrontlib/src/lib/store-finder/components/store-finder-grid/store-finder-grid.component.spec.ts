import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, StoreModule } from '@ngrx/store';


import { StoreFinderGridComponent } from './store-finder-grid.component';
import { StoreFinderListItemComponent } from '../store-finder-list/store-finder-list-item/store-finder-list-item.component';4

import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';
import { services } from '../../services';

describe('StoreFinderGridComponent', () => {
  let component: StoreFinderGridComponent;
  let fixture: ComponentFixture<StoreFinderGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot({
                ...fromRoot.getReducers(),
                stores: combineReducers(fromReducers.reducers)
            }),
            RouterTestingModule
        ],
        declarations: [
            StoreFinderGridComponent,
            StoreFinderListItemComponent
        ],
        providers: [...services]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
