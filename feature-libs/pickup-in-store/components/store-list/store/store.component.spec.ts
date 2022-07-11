import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconTestingModule],
      declarations: [StoreComponent],
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

  it('toggleOpenHours toggles the value of openHoursOpen', () => {
    expect(component.openHoursOpen).toEqual(false);
    component.toggleOpenHours();
    expect(component.openHoursOpen).toEqual(true);
    component.toggleOpenHours();
    expect(component.openHoursOpen).toEqual(false);
  });
});
