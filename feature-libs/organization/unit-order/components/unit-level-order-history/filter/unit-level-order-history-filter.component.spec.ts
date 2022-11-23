import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UnitLevelOrderHistoryFilterComponent} from './unit-level-order-history-filter.component';
import {Component, EventEmitter, Input, Output, Pipe, PipeTransform} from '@angular/core';
import {OrderHistoryQueryParams} from "../../../core/model/augmented-core.model";
import {PaginationModel} from "@spartacus/core";
import {ICON_TYPE} from "@spartacus/storefront";
import {By} from "@angular/platform-browser";

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {
  }
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
      declarations: [UnitLevelOrderHistoryFilterComponent,
        MockTranslatePipe,
        MockPaginationComponent,
        MockCxIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitLevelOrderHistoryFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitting a form emits a buyer', () => {
    component.filterForm.get('buyerFilter').setValue("mark");
    component.filterForm.get('unitFilter').setValue("");
    expect(component.filterForm.valid).toBeTruthy();

    let orderHistoryQueryParams: OrderHistoryQueryParams;
    // Subscribe to the Observable and store the orderHistoryQueryParams in a local variable.
    component.filterListEvent.subscribe((value) => orderHistoryQueryParams = value);

    // Trigger the search function
    component.searchUnitLevelOrders();

    // Now we can check to make sure the emitted value is correct
    expect(orderHistoryQueryParams.filters).toBe("::user:mark");
  });
  it('submitting a form emits a unit', () => {
    component.filterForm.get('buyerFilter').setValue("");
    component.filterForm.get('unitFilter').setValue("services");
    expect(component.filterForm.valid).toBeTruthy();

    let orderHistoryQueryParams: OrderHistoryQueryParams;
    // Subscribe to the Observable and store the orderHistoryQueryParams in a local variable.
    component.filterListEvent.subscribe((value) => orderHistoryQueryParams = value);

    // Trigger the search function
    component.searchUnitLevelOrders();

    // Now we can check to make sure the emitted value is correct
    expect(orderHistoryQueryParams.filters).toBe("::unit:services")
  });

  it('submitting a form emits a buyer and a unit', () => {
    component.filterForm.get('buyerFilter').setValue("gi");
    component.filterForm.get('unitFilter').setValue("services");
    expect(component.filterForm.valid).toBeTruthy();

    let orderHistoryQueryParams: OrderHistoryQueryParams;
    // Subscribe to the Observable and store the orderHistoryQueryParams in a local variable.
    component.filterListEvent.subscribe((value) => orderHistoryQueryParams = value);

    // Trigger the search function
    component.searchUnitLevelOrders();

    // Now we can check to make sure the emitted value is correct
    expect(orderHistoryQueryParams.filters).toBe("::user:gi:unit:services");
  });

  it('clearAll clears all the filtered values', () => {
    fixture.detectChanges();
    const spy = spyOn(component, 'clearAll').and.callThrough();
    const clearbtn = fixture.debugElement.query(By.css("button#clearAllBtn"));
    const form = component.filterForm;
    form.patchValue({
      'buyerFilter': 'gi',
      'unitFilter': 'services'
    });
    clearbtn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(form.get('buyerFilter').value).toBeNull();
    expect(form.get('unitFilter').value).toBeNull();
  });
  it('click on Remove Applied Filters removes all the filtered values', () => {
    fixture.detectChanges();
    const spy = spyOn(component, 'clearAll').and.callThrough();
    const clearbtn = fixture.debugElement.query(By.css("button#removeAppliedFiltersbtn"));
    const form = component.filterFormMobile;
    form.patchValue({
      'buyerFilterMobile': 'gi',
      'unitFilterMobile': 'services'
    });
    clearbtn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.buyerFilterMobileId.nativeElement.value).toBe('');
    expect(component.unitFilterMobileId.nativeElement.value).toBe('');
  });
});
