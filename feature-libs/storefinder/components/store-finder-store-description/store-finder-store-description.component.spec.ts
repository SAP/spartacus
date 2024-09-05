import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description.component';
import { StoreFinderService } from '@spartacus/storefinder/core';

class StoreFinderServiceMock {
  getStoreLatitude() {}
  getStoreLongitude() {}
}

@Component({
    selector: 'cx-schedule', template: '',
    standalone: true,
    imports: [RouterTestingModule, I18nTestingModule]
})
class MockScheduleComponent {
  @Input() location;
}

@Component({
    selector: 'cx-store-finder-map', template: '',
    standalone: true,
    imports: [RouterTestingModule, I18nTestingModule]
})
class MockStoreFinderMapComponent {
  @Input() locations;
}

describe('StoreFinderStoreDescriptionComponent', () => {
  let component: StoreFinderStoreDescriptionComponent;
  let fixture: ComponentFixture<StoreFinderStoreDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, I18nTestingModule, MockScheduleComponent,
        MockStoreFinderMapComponent],
    declarations: [StoreFinderStoreDescriptionComponent],
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
