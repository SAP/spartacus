import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NgbTabsetModule, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';

import { StoreFinderSearchComponent } from '../../../store-finder/components/store-finder-search/store-finder-search.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoresCountComponent } from '../../../store-finder/components/store-finder-stores-count/store-finder-stores-count.component';
import { StoreFinderMapComponent } from '../../../store-finder/components/store-finder-map/store-finder-map.component';
import { services } from '../../../store-finder/services';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';

import { OccConfig } from '@spartacus/core';
import * as fromCmsReducer from '../../../cms/store/reducers';
import * as fromStore from '../../../store-finder/store';

import { StoreFinderListItemComponent } from '../../../store-finder/components/store-finder-list-item/store-finder-list-item.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderDisplayListComponent } from '../../../store-finder/components/store-finder-search-result/store-finder-display-list/store-finder-display-list.component';

describe('StoreFinderPageLayoutComponent', () => {
  let component: StoreFinderPageLayoutComponent;
  let fixture: ComponentFixture<StoreFinderPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        PaginationAndSortingModule,
        NgbTabsetModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromStore.reducers),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StoreFinderPageLayoutComponent,
        StoreFinderListItemComponent,
        StoreFinderDisplayListComponent,
        StoreFinderSearchComponent,
        StoreFinderMapComponent,
        StoreFinderStoresCountComponent
      ],
      providers: [
        ...services,
        OccE2eConfigurationService,
        OccConfig,
        NgbTabsetConfig
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
