import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
  StoreFinderService,
} from '@spartacus/core';
import { SpinnerModule } from '../../../../shared';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

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
      declarations: [StoreFinderStoresCountComponent, MockUrlPipe],
      providers: [
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() },
        },
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
