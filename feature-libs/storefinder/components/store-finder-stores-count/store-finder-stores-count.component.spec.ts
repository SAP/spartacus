import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { SpinnerModule } from '@spartacus/storefront';
import { EMPTY } from 'rxjs';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count.component';
import createSpy = jasmine.createSpy;

class MockStoreFinderService implements Partial<StoreFinderService> {
  viewAllStores = createSpy('viewAllStores');
  getViewAllStoresEntities = createSpy(
    'getViewAllStoresEntities'
  ).and.returnValue(EMPTY);
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
