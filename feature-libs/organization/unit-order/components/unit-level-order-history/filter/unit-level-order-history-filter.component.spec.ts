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

describe('UnitLevelOrderHistoryFilterComponent', () => {
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

  describe('desktop view', () => {
    let orderHistoryQueryParams: OrderHistoryQueryParams;
    beforeEach(() => {
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );
      fixture.detectChanges();
    });
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

      searchBtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(form.get('buyerFilter').value).toBe('mark');
      expect(form.get('unitFilter').value).toBe('');
      expect(component.filterFormMobile.get('buyerFilterMobile').value).toBe(
        'mark'
      );
      expect(component.filterFormMobile.get('unitFilterMobile').value).toBe('');
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

      searchBtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(form.get('buyerFilter').value).toBe('');
      expect(form.get('unitFilter').value).toBe('services');
      expect(component.filterFormMobile.get('buyerFilterMobile').value).toBe(
        ''
      );
      expect(component.filterFormMobile.get('unitFilterMobile').value).toBe(
        'services'
      );
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

      searchBtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(form.get('buyerFilter').value).toBe('gi');
      expect(form.get('unitFilter').value).toBe('services');
      expect(component.filterFormMobile.get('buyerFilterMobile').value).toBe(
        'gi'
      );
      expect(component.filterFormMobile.get('unitFilterMobile').value).toBe(
        'services'
      );
      expect(orderHistoryQueryParams.filters).toBe('::user:gi:unit:services');
    });

    it('should clear all of the filtered values when clearAll button is clicked', () => {
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

    it('should clear the unit value when x button in the unit-input field is clicked', () => {
      const spy = spyOn(component, 'clearUnit').and.callThrough();
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: 'gi',
        unitFilter: 'services',
      });

      let buttonElement = fixture.debugElement.query(
        By.css('button#clearUnitBtn')
      );
      buttonElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get('buyerFilter').value).toBe('gi');
        expect(form.get('unitFilter').value).toBeNull();
        expect(orderHistoryQueryParams.filters).toBe('::user:gi');
      });
    });
    it('should clear the buyer value when x button in the buyer-input field is clicked', () => {
      const spy = spyOn(component, 'clearBuyer').and.callThrough();
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: 'gi',
        unitFilter: 'services',
      });

      let buttonElement = fixture.debugElement.query(
        By.css('button#clearBuyerBtn')
      );
      buttonElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get('buyerFilter').value).toBeNull();
        expect(form.get('unitFilter').value).toBe('services');
        expect(
          component.filterFormMobile.get('buyerFilterMobile').value
        ).toBeNull();
        expect(component.filterFormMobile.get('unitFilterMobile').value).toBe(
          'services'
        );
        expect(orderHistoryQueryParams.filters).toBe('::unit:services');
      });
    });
  });

  describe('mobile view', () => {
    let mobileFormElement;
    beforeEach(() => {
      mobileFormElement = fixture.debugElement.query(
        By.css('#filterFormMobileId')
      );
    });

    it('should emit a buyer view when filtered by a buyer for mobile view', () => {
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

    it('should emit a unit when filtered by a unit  for mobile view', () => {
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

    it('should emit a buyer and a unit when filtered by buyer and unit for mobile view', () => {
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

    it('should remove all of the filtered values when clicked on Remove Applied Filter button', () => {
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

    it('should clear unit value when clicked on x button in the searchByUnit field', () => {
      const spy = spyOn(component, 'clearUnitMobile').and.callThrough();
      const form = component.filterForm;
      form.patchValue({
        buyerFilterMobile: 'gi',
        unitFilterMobile: 'services',
      });

      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );

      let buttonElement = fixture.debugElement.query(
        By.css('button#clearUnitMobileBtn')
      );
      buttonElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get('buyerFilterMobile').value).toBe('gi');
        expect(form.get('unitFilterMobile').value).toBeNull();
        expect(orderHistoryQueryParams.filters).toBe('::user:gi');
      });
    });

    it('should clear buyer value when clicked on x button in the searchByBuyer field', () => {
      const spy = spyOn(component, 'clearBuyerMobile').and.callThrough();
      const form = component.filterForm;
      form.patchValue({
        buyerFilterMobile: 'gi',
        unitFilterMobile: 'services',
      });

      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );

      let buttonElement = fixture.debugElement.query(
        By.css('button#clearBuyerMobileBtn')
      );
      buttonElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get('buyerFilterMobile').value).toBeNull();
        expect(form.get('unitFilterMobile').value).toBe('services');
        expect(orderHistoryQueryParams.filters).toBe('::unit:services');
      });
    });

    it('should call launchMobileFilters when filterBy button is clicked', () => {
      const spy = spyOn(component, 'launchMobileFilters').and.callThrough();
      fixture.detectChanges();
      const filterByBtn = fixture.debugElement.query(
        By.css('button#filterByBtn')
      );
      filterByBtn.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });

    it('should call closeFilterNav when close button is clicked on nav', () => {
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
