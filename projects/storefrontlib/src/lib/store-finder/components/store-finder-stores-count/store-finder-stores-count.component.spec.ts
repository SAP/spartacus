import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SpinnerModule } from '../../../ui/components/spinner/spinner.module';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count.component';
import { RoutingService, StoreFinderService } from '@spartacus/core';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

const mockStoreFinderService = {
  viewAllStores: jasmine.createSpy(),
  getViewAllStoresEntities: jasmine.createSpy(),
  getViewAllStoresLoading: jasmine.createSpy()
};

describe('StoreFinderStoresCountComponent', () => {
  let component: StoreFinderStoresCountComponent;
  let fixture: ComponentFixture<StoreFinderStoresCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, RouterTestingModule],
      declarations: [StoreFinderStoresCountComponent, MockTranslateUrlPipe],
      providers: [
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() }
        },
        {
          provide: StoreFinderService,
          useValue: mockStoreFinderService
        }
      ]
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
