import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  MockIconComponent,
} from '@spartacus/storefront';
import { SetPreferredStoreComponent } from '../../container/set-preferred-store/set-preferred-store.component';
import { SetPreferredStoreStubComponent } from '../../container/set-preferred-store/set-preferred-store.component.spec';
import { StoreAddressComponent } from './store-address';
import { StoreAddressStubComponent } from './store-address/store-address.component.spec';
import { StoreScheduleComponent } from './store-schedule';
import { StoreScheduleStubComponent } from './store-schedule/store-schedule.component.spec';
import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreComponent],
    })
      .overrideComponent(StoreComponent, {
        remove: {
          imports: [
            StoreAddressComponent,
            StoreScheduleComponent,
            SetPreferredStoreComponent,
            TranslatePipe,
            IconComponent,
          ],
        },
        add: {
          imports: [
            StoreAddressStubComponent,
            StoreScheduleStubComponent,
            SetPreferredStoreStubComponent,
            MockTranslatePipe,
            MockIconComponent,
          ],
        },
      })
      .compileComponents();
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
    let iconDebugElement = fixture.debugElement.query(
      By.css('.cx-store-opening-hours-icon cx-icon')
    );
    expect(iconDebugElement.componentInstance.type).toEqual(
      ICON_TYPE.CARET_DOWN
    );

    component.toggleOpenHours();
    fixture.detectChanges();
    expect(component.openHoursOpen).toEqual(true);
    expect(element.querySelector('cx-store-schedule')).not.toBeNull();
    iconDebugElement = fixture.debugElement.query(
      By.css('.cx-store-opening-hours-icon cx-icon')
    );
    expect(iconDebugElement.componentInstance.type).toEqual(ICON_TYPE.CARET_UP);

    component.toggleOpenHours();
    fixture.detectChanges();
    expect(component.openHoursOpen).toEqual(false);
    expect(element.querySelector('cx-store-schedule')).toBeNull();
    iconDebugElement = fixture.debugElement.query(
      By.css('.cx-store-opening-hours-icon cx-icon')
    );
    expect(iconDebugElement.componentInstance.type).toEqual(
      ICON_TYPE.CARET_DOWN
    );
  });
});
