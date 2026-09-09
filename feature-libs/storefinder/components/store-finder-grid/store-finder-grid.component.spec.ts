import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';
import {
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { EMPTY, Observable } from 'rxjs';
import { StoreFinderGridComponent } from './store-finder-grid.component';
import { StoreFinderListItemComponent } from '../store-finder-list-item/store-finder-list-item.component';

const countryIsoCode = 'CA';
const regionIsoCode = 'CA-QC';

@Component({
  selector: 'cx-store-finder-list-item',
  template: '',
})
class MockStoreFinderListItemComponent {
  @Input()
  location: any;
}

class MockTranslationService implements Partial<TranslationService> {
  translate(): Observable<string> {
    return EMPTY;
  }
}

const mockActivatedRoute = {
  snapshot: {
    params: {},
  },
};

class MockStoreFinderService implements Partial<StoreFinderService> {
  getFindStoresEntities = vi.fn().mockReturnValue(EMPTY);
  getStoresLoading = vi.fn();
  callFindStoresAction = vi.fn();
}

const mockRoutingService = {
  go: vi.fn(),
};

describe('StoreFinderGridComponent', () => {
  let component: StoreFinderGridComponent;
  let fixture: ComponentFixture<StoreFinderGridComponent>;
  let storeFinderService: StoreFinderService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreFinderGridComponent],
      providers: [
        { provide: StoreFinderService, useClass: MockStoreFinderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    })
      .overrideComponent(StoreFinderGridComponent, {
        remove: {
          imports: [StoreFinderListItemComponent, TranslatePipe],
        },
        add: {
          imports: [MockStoreFinderListItemComponent, MockTranslatePipe],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderGridComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    storeFinderService = TestBed.inject(StoreFinderService);
  });

  it('should create with country routing parameter', () => {
    route.snapshot.params = { country: countryIsoCode };
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(storeFinderService.callFindStoresAction).toHaveBeenCalledWith(
      route.snapshot.params
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
});
