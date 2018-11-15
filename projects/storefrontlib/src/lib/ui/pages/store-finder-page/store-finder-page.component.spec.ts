import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreFinderPageComponent } from './store-finder-page.component';
import { StoreFinderPageLayoutComponent } from '../../layout/store-finder-page-layout/store-finder-page-layout.component';
import { StoreFinderSearchComponent } from '../../../store-finder/components/store-finder-search/store-finder-search.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoresCountComponent } from '../../../store-finder/components/store-finder-stores-count/store-finder-stores-count.component';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';
import { services } from '../../../store-finder/services';
import { StoreFinderMapComponent } from '../../../store-finder/components/store-finder-map/store-finder-map.component';
import { OccConfig } from '@spartacus/core';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoreDescriptionComponent } from '../../../store-finder/components/store-finder-store-description/store-finder-store-description.component';
import { StoreFinderListItemComponent } from '../../../store-finder/components/store-finder-list-item/store-finder-list-item.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderDisplayListComponent } from '../../../store-finder/components/store-finder-search-result/store-finder-display-list/store-finder-display-list.component';

import * as fromStore from '../../../store-finder/store';

describe('StoreFinderPageComponent', () => {
  let component: StoreFinderPageComponent;
  let fixture: ComponentFixture<StoreFinderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        NgbTabsetModule,
        PaginationAndSortingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromStore.reducers),
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StoreFinderPageComponent,
        StoreFinderPageLayoutComponent,
        StoreFinderSearchComponent,
        StoreFinderDisplayListComponent,
        StoreFinderListItemComponent,
        StoreFinderMapComponent,
        StoreFinderStoreDescriptionComponent,
        StoreFinderStoresCountComponent
      ],
      providers: [...services, OccE2eConfigurationService, OccConfig]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
