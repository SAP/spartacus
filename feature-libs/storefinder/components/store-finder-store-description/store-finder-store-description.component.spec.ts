import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { ScheduleComponent } from '../schedule-component/schedule.component';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';
import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description.component';

class StoreFinderServiceMock {
  getStoreLatitude() {}
  getStoreLongitude() {}
}

@Component({
  selector: 'cx-schedule',
  template: '',
})
class MockScheduleComponent {
  @Input() location;
}

@Component({
  selector: 'cx-store-finder-map',
  template: '',
})
class MockStoreFinderMapComponent {
  @Input() locations;
}

describe('StoreFinderStoreDescriptionComponent', () => {
  let component: StoreFinderStoreDescriptionComponent;
  let fixture: ComponentFixture<StoreFinderStoreDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StoreFinderStoreDescriptionComponent],
      providers: [
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
      ],
    })
      .overrideComponent(StoreFinderStoreDescriptionComponent, {
        remove: {
          imports: [TranslatePipe, ScheduleComponent, StoreFinderMapComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockScheduleComponent,
            MockStoreFinderMapComponent,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderStoreDescriptionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
