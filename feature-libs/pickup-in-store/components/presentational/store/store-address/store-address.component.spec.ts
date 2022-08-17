import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import { StoreAddressComponent } from './store-address.component';

describe('StoreAddressComponent', () => {
  let component: StoreAddressComponent;
  let fixture: ComponentFixture<StoreAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconTestingModule],
      declarations: [StoreAddressComponent],
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
