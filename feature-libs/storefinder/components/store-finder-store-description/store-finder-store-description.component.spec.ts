import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description.component';

class StoreFinderServiceMock {
  getStoreLatitude() {}
  getStoreLongitude() {}
}

@Component({ selector: 'cx-schedule', template: '' })
class MockScheduleComponent {
  @Input() location;
}

@Component({ selector: 'cx-store-finder-map', template: '' })
class MockStoreFinderMapComponent {
  @Input() locations;
}

describe('StoreFinderStoreDescriptionComponent', () => {
  let component: StoreFinderStoreDescriptionComponent;
  let fixture: ComponentFixture<StoreFinderStoreDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        StoreFinderStoreDescriptionComponent,
        MockScheduleComponent,
        MockStoreFinderMapComponent,
      ],
      providers: [
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderStoreDescriptionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
