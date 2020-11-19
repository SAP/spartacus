import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count.component';
import { SpinnerModule } from '@spartacus/storefront';
import { StoreFinderService } from '@spartacus/misc/storefinder/core';

const mockStoreFinderService = {
  viewAllStores: jasmine.createSpy(),
  getViewAllStoresEntities: jasmine.createSpy(),
  getViewAllStoresLoading: jasmine.createSpy(),
};

describe('StoreFinderStoresCountComponent', () => {
  let component: StoreFinderStoresCountComponent;
  let fixture: ComponentFixture<StoreFinderStoresCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, RouterTestingModule, I18nTestingModule],
      declarations: [StoreFinderStoresCountComponent],
      providers: [
        {
          provide: StoreFinderService,
          useValue: mockStoreFinderService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderStoresCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
