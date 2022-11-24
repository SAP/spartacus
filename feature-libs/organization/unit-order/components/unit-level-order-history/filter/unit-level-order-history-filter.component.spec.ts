import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitLevelOrderHistoryFilterComponent } from './unit-level-order-history-filter.component';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { OrderHistoryQueryParams } from '../../../core/model/augmented-core.model';
import { PaginationModel } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination: PaginationModel;
  @Output() viewPageEvent = new EventEmitter<string>();
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('UnitLevelOrderHistoryFilterComponent: desktop', () => {
  let component: UnitLevelOrderHistoryFilterComponent;
  let fixture: ComponentFixture<UnitLevelOrderHistoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UnitLevelOrderHistoryFilterComponent,
        MockTranslatePipe,
        MockPaginationComponent,
        MockCxIconComponent,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitLevelOrderHistoryFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('desktop', () => {
    it('should emit buyer when filtered by buyer', () => {
      const spy = spyOn(component, 'searchUnitLevelOrders').and.callThrough();
      const searchBtn = fixture.debugElement.query(
        By.css('button#searchUnitLevelOrdersBtn')
      );
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: 'mark',
        unitFilter: '',
      });
      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );

      searchBtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(form.get('buyerFilter').value).toBe('mark');
      expect(form.get('unitFilter').value).toBe('');
      expect(orderHistoryQueryParams.filters).toBe('::user:mark');
    });
    it('should emit unit when filtered by unit', () => {
      const spy = spyOn(component, 'searchUnitLevelOrders').and.callThrough();
      const searchBtn = fixture.debugElement.query(
        By.css('button#searchUnitLevelOrdersBtn')
      );
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: '',
        unitFilter: 'services',
      });
      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );

      searchBtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(form.get('buyerFilter').value).toBe('');
      expect(form.get('unitFilter').value).toBe('services');
      expect(orderHistoryQueryParams.filters).toBe('::unit:services');
    });

    it('should emit a buyer and a unit when filtered by buyer and unit', () => {
      const spy = spyOn(component, 'searchUnitLevelOrders').and.callThrough();
      const searchBtn = fixture.debugElement.query(
        By.css('button#searchUnitLevelOrdersBtn')
      );
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: 'gi',
        unitFilter: 'services',
      });
      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );

      searchBtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(form.get('buyerFilter').value).toBe('gi');
      expect(form.get('unitFilter').value).toBe('services');
      expect(orderHistoryQueryParams.filters).toBe('::user:gi:unit:services');
    });

    it('clearAll clears all the filtered values', () => {
      fixture.detectChanges();
      const spy = spyOn(component, 'clearAll').and.callThrough();
      const clearbtn = fixture.debugElement.query(By.css('button#clearAllBtn'));
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: 'gi',
        unitFilter: 'services',
      });
      clearbtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(form.get('buyerFilter').value).toBeNull();
      expect(form.get('unitFilter').value).toBeNull();
    });
  });

  describe('mobile', () => {
    let mobileFormElement;
    beforeEach(() => {
      mobileFormElement = fixture.debugElement.query(
        By.css('#filterFormMobileId')
      );
    });

    it('should emit buyer when filtered by buyer for mobile', () => {
      const spy = spyOn(component, 'searchUnitLevelOrdersForMobile');
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: 'mark',
        unitFilterMobile: '',
      });
      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );
      mobileFormElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get('buyerFilterMobile').value).toBe('mark');
        expect(form.get('unitFilterMobile').value).toBe('');
        expect(orderHistoryQueryParams.filters).toBe('::user:mark');
      });
    });

    it('should emit unit when filtered by unit for mobile', () => {
      const spy = spyOn(component, 'searchUnitLevelOrdersForMobile');
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: '',
        unitFilterMobile: 'services',
      });
      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );
      mobileFormElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get('buyerFilterMobile').value).toBe('');
        expect(form.get('unitFilterMobile').value).toBe('services');
        expect(orderHistoryQueryParams.filters).toBe('::unit:services');
      });
    });

    it('should emit a buyer and a unit when filtered by buyer and unit for mobile', () => {
      const spy = spyOn(component, 'searchUnitLevelOrdersForMobile');
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: 'gi',
        unitFilterMobile: 'services',
      });
      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );
      mobileFormElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get('buyerFilterMobile').value).toBe('gi');
        expect(form.get('unitFilterMobile').value).toBe('services');
        expect(orderHistoryQueryParams.filters).toBe('::user:gi:unit:services');
      });
    });

    it('click on Remove Applied Filters removes all the filtered values', () => {
      fixture.detectChanges();
      const spy = spyOn(component, 'clearAll').and.callThrough();
      const clearbtn = fixture.debugElement.query(
        By.css('button#removeAppliedFiltersbtn')
      );
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: 'gi',
        unitFilterMobile: 'services',
      });
      clearbtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.buyerFilterMobileId.nativeElement.value).toBe('');
      expect(component.unitFilterMobileId.nativeElement.value).toBe('');
    });

    it('should invoke launchMobileFilters when filterBy button is clicked', () => {
      const spy = spyOn(component, 'launchMobileFilters').and.callThrough();
      fixture.detectChanges();
      const filterByBtn = fixture.debugElement.query(
        By.css('button#filterByBtn')
      );
      filterByBtn.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });
    it('should invoke closeFilterNav when close button is clicked on nav', () => {
      const spy = spyOn(component, 'closeFilterNav').and.callThrough();
      fixture.detectChanges();
      const closeFilterNavBtn = fixture.debugElement.query(
        By.css('button#closeFilterNavBtn')
      );
      closeFilterNavBtn.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });
  });
});
