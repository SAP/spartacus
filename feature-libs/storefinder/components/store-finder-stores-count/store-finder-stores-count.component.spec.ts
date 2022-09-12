import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@commerce-storefront-toolset/core';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count.component';
import { SpinnerModule } from '@commerce-storefront-toolset/storefront';
import { StoreFinderService } from '@commerce-storefront-toolset/storefinder/core';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

class MockStoreFinderService implements Partial<StoreFinderService> {
  viewAllStores = createSpy('viewAllStores');
  getViewAllStoresEntities = createSpy(
    'getViewAllStoresEntities'
  ).and.returnValue(of());
  getViewAllStoresLoading = createSpy('getViewAllStoresLoading');
}

describe('StoreFinderStoresCountComponent', () => {
  let component: StoreFinderStoresCountComponent;
  let fixture: ComponentFixture<StoreFinderStoresCountComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SpinnerModule, RouterTestingModule, I18nTestingModule],
        declarations: [StoreFinderStoresCountComponent],
        providers: [
          {
            provide: StoreFinderService,
            useClass: MockStoreFinderService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderStoresCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
