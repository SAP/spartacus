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
  let MARK = 'mark';
  const GI = 'gi';
  const SERVICES = 'services';
  const EMPTY_STRING = '';
  const BUYER_FILTER = 'buyerFilter';
  const UNIT_FILTER = 'unitFilter';
  const BUYER_FILTER_MOBILE = 'buyerFilterMobile';
  const UNIT_FILTER_MOBILE = 'unitFilterMobile';

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
    fixture.autoDetectChanges();
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
        By.css('#searchUnitLevelOrdersBtn')
      );
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: MARK,
        unitFilter: EMPTY_STRING,
      });

      searchBtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(form.get(BUYER_FILTER).value).toBe(MARK);
      expect(form.get(UNIT_FILTER).value).toBe(EMPTY_STRING);
      expect(component.filterFormMobile.get(BUYER_FILTER_MOBILE).value).toBe(
        MARK
      );
      expect(component.filterFormMobile.get(UNIT_FILTER_MOBILE).value).toBe(
        EMPTY_STRING
      );
      expect(orderHistoryQueryParams.filters).toBe('::user:mark');
    });

    it('should emit unit when filtered by unit', () => {
      const spy = spyOn(component, 'searchUnitLevelOrders').and.callThrough();
      const searchBtn = fixture.debugElement.query(
        By.css('#searchUnitLevelOrdersBtn')
      );
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: EMPTY_STRING,
        unitFilter: SERVICES,
      });

      searchBtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(form.get(BUYER_FILTER).value).toBe(EMPTY_STRING);
      expect(form.get(UNIT_FILTER).value).toBe(SERVICES);
      expect(component.filterFormMobile.get(BUYER_FILTER_MOBILE).value).toBe(
        EMPTY_STRING
      );
      expect(component.filterFormMobile.get(UNIT_FILTER_MOBILE).value).toBe(
        SERVICES
      );
      expect(orderHistoryQueryParams.filters).toBe('::unit:services');
    });

    it('should emit a buyer and a unit when filtered by buyer and unit', () => {
      const spy = spyOn(component, 'searchUnitLevelOrders').and.callThrough();
      const searchBtn = fixture.debugElement.query(
        By.css('#searchUnitLevelOrdersBtn')
      );
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: GI,
        unitFilter: SERVICES,
      });

      searchBtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(form.get(BUYER_FILTER).value).toBe(GI);
      expect(form.get(UNIT_FILTER).value).toBe(SERVICES);
      expect(component.filterFormMobile.get(BUYER_FILTER_MOBILE).value).toBe(
        GI
      );
      expect(component.filterFormMobile.get(UNIT_FILTER_MOBILE).value).toBe(
        SERVICES
      );
      expect(orderHistoryQueryParams.filters).toBe('::user:gi:unit:services');
    });

    it('should clear all of the filtered values when clearAll button is clicked', () => {
      fixture.detectChanges();
      const spy = spyOn(component, 'clearAll').and.callThrough();
      const clearbtn = fixture.debugElement.query(By.css('#clearAllBtn'));
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: GI,
        unitFilter: SERVICES,
      });
      clearbtn.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(form.get(BUYER_FILTER).value).toBeNull();
      expect(form.get(UNIT_FILTER).value).toBeNull();
    });

    it('should clear the unit value when x button in the unit-input field is clicked', () => {
      const spy = spyOn(component, 'clearUnit').and.callThrough();
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: GI,
        unitFilter: SERVICES,
      });

      let buttonElement = fixture.debugElement.query(By.css('#clearUnitBtn'));
      buttonElement.nativeElement.dispatchEvent(new Event('mousedown'));

      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      expect(form.get(BUYER_FILTER).value).toBe(GI);
      expect(form.get(UNIT_FILTER).value).toBeNull();
      expect(component.filterFormMobile.get(BUYER_FILTER_MOBILE).value).toBe(
        GI
      );
      expect(
        component.filterFormMobile.get(UNIT_FILTER_MOBILE).value
      ).toBeNull();
      expect(orderHistoryQueryParams.filters).toBe('::user:gi');
    });
    it('should clear the buyer value when x button in the buyer-input field is clicked', () => {
      const spy = spyOn(component, 'clearBuyer').and.callThrough();
      const form = component.filterForm;
      form.patchValue({
        buyerFilter: GI,
        unitFilter: SERVICES,
      });

      let buttonElement = fixture.debugElement.query(By.css('#clearBuyerBtn'));
      buttonElement.nativeElement.dispatchEvent(new Event('mousedown'));

      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      expect(form.get(BUYER_FILTER).value).toBeNull();
      expect(form.get(UNIT_FILTER).value).toBe(SERVICES);
      expect(
        component.filterFormMobile.get(BUYER_FILTER_MOBILE).value
      ).toBeNull();
      expect(component.filterFormMobile.get(UNIT_FILTER_MOBILE).value).toBe(
        SERVICES
      );
      expect(orderHistoryQueryParams.filters).toBe('::unit:services');
    });
  });

  describe('mobile view', () => {
    it('should emit a buyer view when filtered by a buyer for mobile view', () => {
      const spy = spyOn(
        component,
        'searchUnitLevelOrdersForMobile'
      ).and.callThrough();
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: MARK,
        unitFilterMobile: EMPTY_STRING,
      });
      expect(form.valid).toBeTruthy();
      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );
      fixture.debugElement
        .query(By.css('#filterFormMobileId'))
        .triggerEventHandler('ngSubmit', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get(BUYER_FILTER_MOBILE).value).toBe(MARK);
        expect(form.get(UNIT_FILTER_MOBILE).value).toBe(EMPTY_STRING);
        expect(component.filterForm.get(BUYER_FILTER).value).toBe(MARK);
        expect(component.filterForm.get(UNIT_FILTER).value).toBe(EMPTY_STRING);

        expect(orderHistoryQueryParams.filters).toBe('::user:mark');
      });
    });

    it('should emit a unit when filtered by a unit  for mobile view', () => {
      const spy = spyOn(
        component,
        'searchUnitLevelOrdersForMobile'
      ).and.callThrough();
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: EMPTY_STRING,
        unitFilterMobile: SERVICES,
      });

      expect(form.valid).toBeTruthy();

      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );

      fixture.debugElement
        .query(By.css('#filterFormMobileId'))
        .triggerEventHandler('ngSubmit', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(form.get(BUYER_FILTER_MOBILE).value).toBe(EMPTY_STRING);
        expect(form.get(UNIT_FILTER_MOBILE).value).toBe(SERVICES);
        expect(component.filterForm.get(BUYER_FILTER).value).toBe(EMPTY_STRING);
        expect(component.filterForm.get(UNIT_FILTER).value).toBe(SERVICES);
        expect(orderHistoryQueryParams.filters).toBe('::unit:services');
      });
    });

    it('should emit a buyer and a unit when filtered by buyer and unit for mobile view', () => {
      const spy = spyOn(
        component,
        'searchUnitLevelOrdersForMobile'
      ).and.callThrough();
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: GI,
        unitFilterMobile: SERVICES,
      });
      expect(form.valid).toBeTruthy();
      let orderHistoryQueryParams: OrderHistoryQueryParams;
      component.filterListEvent.subscribe(
        (value) => (orderHistoryQueryParams = value)
      );
      fixture.debugElement
        .query(By.css('#filterFormMobileId'))
        .triggerEventHandler('ngSubmit', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get(BUYER_FILTER_MOBILE).value).toBe(GI);
        expect(form.get(UNIT_FILTER_MOBILE).value).toBe(SERVICES);
        expect(component.filterForm.get(BUYER_FILTER).value).toBe(GI);
        expect(component.filterForm.get(UNIT_FILTER).value).toBe(SERVICES);
        expect(orderHistoryQueryParams.filters).toBe('::user:gi:unit:services');
      });
    });

    it('should remove all of the filtered values when clicked on Remove Applied Filter button', () => {
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: GI,
        unitFilterMobile: SERVICES,
      });
      spyOn(component, 'searchUnitLevelOrdersForMobile').and.callThrough();
      component.searchUnitLevelOrdersForMobile();
      fixture.detectChanges();

      const spy = spyOn(component, 'clearAll').and.callThrough();
      fixture.debugElement
        .query(By.css('#removeAppliedFiltersbtn'))
        .nativeElement.click();

      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.buyerFilterMobileId.nativeElement.value).toBe(
        EMPTY_STRING
      );
      expect(component.unitFilterMobileId.nativeElement.value).toBe(
        EMPTY_STRING
      );
    });

    it('should clear unit value when clicked on x button in the searchByUnit field', async () => {
      const spy = spyOn(component, 'clearUnitMobile').and.callThrough();
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: GI,
        unitFilterMobile: SERVICES,
      });

      let buttonElement = fixture.debugElement.query(
        By.css('#clearUnitMobileBtn')
      );
      buttonElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get(BUYER_FILTER_MOBILE).value).toBe(GI);
        expect(form.get(UNIT_FILTER_MOBILE).value).toBeNull();
      });
    });

    it('should clear buyer value when clicked on x button in the searchByBuyer field', async () => {
      const spy = spyOn(component, 'clearBuyerMobile').and.callThrough();
      const form = component.filterFormMobile;
      form.patchValue({
        buyerFilterMobile: GI,
        unitFilterMobile: SERVICES,
      });

      let buttonElement = fixture.debugElement.query(
        By.css('#clearBuyerMobileBtn')
      );
      buttonElement.nativeElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
        expect(form.get(BUYER_FILTER_MOBILE).value).toBeNull();
        expect(form.get(UNIT_FILTER_MOBILE).value).toBe(SERVICES);
      });
    });

    it('should call launchMobileFilters when filterBy button is clicked', () => {
      const spy = spyOn(component, 'launchMobileFilters').and.callThrough();
      fixture.detectChanges();
      const filterByBtn = fixture.debugElement.query(By.css('#filterByBtn'));
      filterByBtn.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });

    it('should call closeFilterNav when close button is clicked on nav', () => {
      const spy = spyOn(component, 'closeFilterNav').and.callThrough();
      fixture.detectChanges();
      const closeFilterNavBtn = fixture.debugElement.query(
        By.css('#closeFilterNavBtn')
      );
      closeFilterNavBtn.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });
  });
});
