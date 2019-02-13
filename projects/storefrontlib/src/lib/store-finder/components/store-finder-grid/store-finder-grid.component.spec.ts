import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreFinderGridComponent } from './store-finder-grid.component';
import { SpinnerModule } from '../../../ui/components/spinner/spinner.module';

import { StoreFinderService, RoutingService } from '@spartacus/core';
import { Pipe, PipeTransform, Component, Input } from '@angular/core';
import { of, Observable } from 'rxjs';

const countryIsoCode = 'CA';
const regionIsoCode = 'CA-QC';

@Component({
  selector: 'cx-store-finder-list-item',
  template: ''
})
export class MockStoreFinderListItemComponent {
  @Input()
  location;
}

const location = {
  name: 'testName'
};

const mockActivatedRoute = {
  snapshot: {
    params: {}
  }
};

const mockStoreFinderService = {
  getStoresLoading: jasmine.createSpy(),
  getFindStoresEntities: jasmine.createSpy().and.returnValue(of(Observable)),
  getViewAllStoresEntities: jasmine.createSpy().and.returnValue(of(Observable)),
  findStoresAction: jasmine.createSpy().and.returnValue(of(Observable)),
  getViewAllStoresLoading: jasmine.createSpy()
};

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

describe('StoreFinderGridComponent', () => {
  let component: StoreFinderGridComponent;
  let fixture: ComponentFixture<StoreFinderGridComponent>;
  let storeFinderService: StoreFinderService;
  let route: ActivatedRoute;

  const mockRoutingService = {
    go: jasmine.createSpy('go')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SpinnerModule],
      declarations: [
        StoreFinderGridComponent,
        MockStoreFinderListItemComponent,
        MockTranslateUrlPipe
      ],
      providers: [
        { provide: StoreFinderService, useValue: mockStoreFinderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RoutingService, useValue: mockRoutingService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderGridComponent);
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
    storeFinderService = TestBed.get(StoreFinderService);
  });

  it('should create with country routing parameter', () => {
    route.snapshot.params = { country: countryIsoCode };
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(storeFinderService.findStoresAction).toHaveBeenCalledWith(
      '',
      undefined,
      {
        pageSize: -1
      },
      countryIsoCode
    );
  });

  it('should create with country and region routing parameters', () => {
    route.snapshot.params = {
      country: countryIsoCode,
      region: regionIsoCode
    };
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should route when viewStore is called without region', () => {
    route.snapshot.params = {
      country: countryIsoCode
    };
    fixture.detectChanges();

    component.viewStore(location);

    expect(mockRoutingService.go).toHaveBeenCalledWith({
      route: [
        'storeFinder',
        {
          name: 'storeDescription',
          params: {
            region: '',
            country: countryIsoCode,
            store: location.name
          }
        }
      ]
    });
  });
});
