import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { StoreFinderGridComponent } from './store-finder-grid.component';
import { StoreFinderListItemComponent } from '../store-finder-list/store-finder-list-item/store-finder-list-item.component';

import { StoreFinderService } from '../../services/store-finder.service';

import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';
import { services } from '../../services';

class StoreFinderServiceMock {
  viewAllStoresForCountry(countryIsoCode: string) {}
  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string) {}
}

const mockStores = {
  findStoresEntities: {
    pointOfServices: [
      {
        displayName: 'testName',
        address: {
          line1: 'testAddressLine1',
          town: 'testTown',
          postalCode: 'testPostalCode'
        }
      },
      {
        displayName: 'testName2',
        address: {
          line1: 'testAddressLine1',
          town: 'testTown',
          postalCode: 'testPostalCode'
        }
      }
    ]
  }
};

const countryIsoCode: string = 'CA';
const regionIsoCode: string = 'CA-QC';

fdescribe('StoreFinderGridComponent', () => {
  let component: StoreFinderGridComponent;
  let fixture: ComponentFixture<StoreFinderGridComponent>;
  let storeFinderServiceMock: StoreFinderServiceMock;
  let store: Store<fromReducers.StoresState>;

  beforeEach(async(() => {
    const bed = TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        }),
        RouterTestingModule
      ],
      declarations: [StoreFinderGridComponent, StoreFinderListItemComponent],
      providers: [
        ...services,
        StoreFinderServiceMock,
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
        { provide: Location,  }
      ]
    });
    bed.compileComponents();

    this.storeFinderServiceMock = bed.get(StoreFinderService);
    this.store = bed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call storeFinderService with country', () => {
    spyOn(
      this.storeFinderServiceMock,
      'viewAllStoresForCountry'
    ).and.callThrough();

    component.viewAllStoresForCountry(countryIsoCode);
    expect(
      this.storeFinderServiceMock.viewAllStoresForCountry
    ).toHaveBeenCalledWith(countryIsoCode);
  });

  it('should call storeFinderService with country and region', () => {
    spyOn(
      this.storeFinderServiceMock,
      'viewAllStoresForRegion'
    ).and.callThrough();

    component.viewAllStoresForRegion(countryIsoCode, regionIsoCode);
    expect(
      this.storeFinderServiceMock.viewAllStoresForRegion
    ).toHaveBeenCalledWith(countryIsoCode, regionIsoCode);
  });

  it('should call viewStore when a button is clicked', () => {
    expect(component).toBeTruthy();
    spyOn(this.store, 'select').and.returnValues(of(mockStores));
    spyOn(component, 'viewStore').and.stub;
    console.log(fixture.debugElement.nativeElement);
    let button = fixture.debugElement.nativeElement.querySelector('button');

    fixture.whenStable().then(() => {
      expect(component.viewStore).toHaveBeenCalled();
    });
  });
});
