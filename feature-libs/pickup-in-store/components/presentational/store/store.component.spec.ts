import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import { SetPreferredStoreStubComponent } from '../../container/set-preferred-store/set-preferred-store.component.spec';
import { StoreAddressStubComponent } from './store-address/store-address.component.spec';
import { StoreScheduleStubComponent } from './store-schedule/store-schedule.component.spec';
import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StoreComponent,
        StoreAddressStubComponent,
        StoreScheduleStubComponent,
        SetPreferredStoreStubComponent,
      ],
      imports: [I18nTestingModule, IconTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('selectStore emits the storeDetails and returns false', () => {
    spyOn(component.storeSelected, 'emit');

    component.storeDetails = { name: 'storeName' };
    fixture.detectChanges();

    expect(component.selectStore()).toEqual(false);
    expect(component.storeSelected.emit).toHaveBeenCalledWith({
      name: 'storeName',
    });
  });

  it('should disable the select button if the store is out of stock', () => {
    component.storeDetails = {
      name: 'storeName',
      stockInfo: {
        stockLevelStatus: 'outOfStock',
      },
    };
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector(
      'button[data-pickup-in-store-button]'
    );
    expect(button.disabled).toEqual(true);
  });

  it('should disable the select button if the store is low on stock', () => {
    component.storeDetails = {
      name: 'storeName',
      stockInfo: {
        stockLevelStatus: 'lowStock',
      },
    };
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector(
      'button[data-pickup-in-store-button]'
    );
    expect(button.disabled).toEqual(true);
  });

  it('toggleOpenHours toggles the value of openHoursOpen', () => {
    const element = fixture.debugElement.nativeElement;

    expect(component.openHoursOpen).toEqual(false);
    expect(element.querySelector('cx-store-schedule')).toBeNull();
    let icon = element
      .querySelector('cx-icon')
      .attributes.getNamedItem('ng-reflect-type')?.value;
    expect(icon).toEqual('CARET_DOWN');

    component.toggleOpenHours();
    fixture.detectChanges();
    expect(component.openHoursOpen).toEqual(true);
    expect(element.querySelector('cx-store-schedule')).not.toBeNull();
    icon = element
      .querySelector('cx-icon')
      .attributes.getNamedItem('ng-reflect-type')?.value;
    expect(icon).toEqual('CARET_UP');

    component.toggleOpenHours();
    fixture.detectChanges();
    expect(component.openHoursOpen).toEqual(false);
    expect(element.querySelector('cx-store-schedule')).toBeNull();
    icon = element
      .querySelector('cx-icon')
      .attributes.getNamedItem('ng-reflect-type')?.value;
    expect(icon).toEqual('CARET_DOWN');
  });
});
