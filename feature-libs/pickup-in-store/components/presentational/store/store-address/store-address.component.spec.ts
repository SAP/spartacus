import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, PointOfService } from '@spartacus/core';
import { StoreAddressComponent } from './store-address.component';

describe('StoreAddressComponent', () => {
  let component: StoreAddressComponent;
  let fixture: ComponentFixture<StoreAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreAddressComponent],
      imports: [I18nTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

/**
 * This is a stub of the StoreAddressComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-store-address',
  template: '',
})
export class StoreAddressStubComponent {
  @Input() storeDetails: PointOfService;
}
