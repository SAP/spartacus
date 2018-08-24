import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFinderPageComponent } from './store-finder-page.component';
import { StoreFinderPageLayoutComponent } from '../../layout/store-finder-page-layout/store-finder-page-layout.component';
import { StoreFinderPagingComponent } from '../../../store-finder/components/store-finder-paging/store-finder-paging.component';
import { StoreFinderSearchComponent } from '../../../store-finder/components/store-finder-search/store-finder-search.component';
import { StoreFinderListComponent } from '../../../store-finder/components/store-finder-list/store-finder-list.component';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';
import { StoreFinderService } from '../../../store-finder/services/store-finder.service';
import * as fromStore from '../../../store-finder/store';
import * as fromRoot from '../../../routing/store';
import { combineReducers, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* tslint:disable */
import { StoreFinderListItemComponent } from '../../../store-finder/components/store-finder-list/store-finder-list-item/store-finder-list-item.component';
import { StoreFinderMapComponent } from '../../../store-finder/components/store-finder-map/store-finder-map.component';
/* tslint:enable */

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
        StoreFinderMapComponent
      ],
      providers: [StoreFinderService, OccE2eConfigurationService]
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
