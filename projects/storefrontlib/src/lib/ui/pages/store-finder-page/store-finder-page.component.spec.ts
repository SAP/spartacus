import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { combineReducers, StoreModule } from '@ngrx/store';

import { StoreFinderPageComponent } from './store-finder-page.component';
import { StoreFinderPageLayoutComponent } from '../../layout/store-finder-page-layout/store-finder-page-layout.component';
import { StoreFinderPagingComponent } from '../../../store-finder/components/store-finder-paging/store-finder-paging.component';
import { StoreFinderSearchComponent } from '../../../store-finder/components/store-finder-search/store-finder-search.component';
import { StoreFinderListComponent } from '../../../store-finder/components/store-finder-list/store-finder-list.component';
import { StoreFinderListCountComponent } from '../../../store-finder/components/store-finder-list-count/store-finder-list-count.component';
import { MaterialModule } from '../../../material.module';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';
import { services } from '../../../store-finder/services';
import { StoreFinderMapComponent } from '../../../store-finder/components/store-finder-map/store-finder-map.component';
import { ConfigService } from '../../../occ/config.service';
/* tslint:disable */
import { StoreFinderListItemComponent } from '../../../store-finder/components/store-finder-list/store-finder-list-item/store-finder-list-item.component';
/* tslint:enable */

import * as fromStore from '../../../store-finder/store';
import * as fromRoot from '../../../routing/store';

describe('StoreFinderPageComponent', () => {
  let component: StoreFinderPageComponent;
  let fixture: ComponentFixture<StoreFinderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromStore.reducers)
        })
      ],
      declarations: [
        StoreFinderPageComponent,
        StoreFinderPageLayoutComponent,
        StoreFinderPagingComponent,
        StoreFinderSearchComponent,
        StoreFinderListComponent,
        StoreFinderListItemComponent,
        StoreFinderMapComponent,
        StoreFinderListCountComponent
      ],
      providers: [...services, OccE2eConfigurationService, ConfigService]
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
