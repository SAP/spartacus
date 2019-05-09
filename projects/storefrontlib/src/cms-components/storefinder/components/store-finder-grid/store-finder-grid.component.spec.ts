import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService, StoreFinderService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { StoreFinderGridComponent } from './store-finder-grid.component';
const countryIsoCode = 'CA';
const regionIsoCode = 'CA-QC';

@Component({
  selector: 'cx-store-finder-list-item',
  template: '',
})
export class MockStoreFinderListItemComponent {
  @Input()
  location;
}

const location = {
  name: 'testName',
};

const mockActivatedRoute = {
  snapshot: {
    params: {},
  },
};

const mockStoreFinderService = {
  getStoresLoading: jasmine.createSpy(),
  getFindStoresEntities: jasmine.createSpy().and.returnValue(of(Observable)),
  getViewAllStoresEntities: jasmine.createSpy().and.returnValue(of(Observable)),
  findStoresAction: jasmine.createSpy().and.returnValue(of(Observable)),
  getViewAllStoresLoading: jasmine.createSpy(),
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('StoreFinderGridComponent', () => {
  let component: StoreFinderGridComponent;
  let fixture: ComponentFixture<StoreFinderGridComponent>;
  let storeFinderService: StoreFinderService;
  let route: ActivatedRoute;

  const mockRoutingService = {
    go: jasmine.createSpy('go'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SpinnerModule],
      declarations: [
        StoreFinderGridComponent,
        MockStoreFinderListItemComponent,
        MockUrlPipe,
      ],
      providers: [
        { provide: StoreFinderService, useValue: mockStoreFinderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
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
        pageSize: -1,
      },
      countryIsoCode
    );
  });

  it('should create with country and region routing parameters', () => {
    route.snapshot.params = {
      country: countryIsoCode,
      region: regionIsoCode,
    };
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should route when viewStore is called without region', () => {
    route.snapshot.params = {
      country: countryIsoCode,
    };
    fixture.detectChanges();

    component.viewStore(location);

    expect(mockRoutingService.go).toHaveBeenCalledWith(
      ['region', '', location.name],
      undefined,
      { relativeTo: { snapshot: { params: { country: countryIsoCode } } } }
    );
  });
});
