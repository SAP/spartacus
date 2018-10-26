import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { combineReducers, StoreModule } from '@ngrx/store';

import { StoreListPageLayoutComponent } from './store-list-page-layout.component';
import { StoreFinderSearchComponent } from '../../../store-finder/components/store-finder-search/store-finder-search.component';
import { StoreFinderGridComponent } from '../../../store-finder/components/store-finder-grid/store-finder-grid.component';
import { StoreFinderListComponent } from '../../../store-finder/components/store-finder-list/store-finder-list.component';
import { StoreFinderMapComponent } from '../../../store-finder/components/store-finder-map/store-finder-map.component';
import { services } from '../../../store-finder/services';
import * as fromStore from '../../../store-finder/store';

/* tslint:disable */
import { StoreFinderListItemComponent } from '../../../store-finder/components/store-finder-list/store-finder-list-item/store-finder-list-item.component';
/* tslint:enable */

describe('StoreListPageLayoutComponent', () => {
  let component: StoreListPageLayoutComponent;
  let fixture: ComponentFixture<StoreListPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          stores: combineReducers(fromStore.reducers)
        }),
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StoreFinderSearchComponent,
        StoreFinderGridComponent,
        StoreFinderListComponent,
        StoreFinderListItemComponent,
        StoreFinderMapComponent,
        StoreListPageLayoutComponent
      ],
      providers: [...services]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
