import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { OrderHistoryControlsComponent } from './order-history-controls.component';

describe('OrderHistoryControlsComponent', () => {
  let component: OrderHistoryControlsComponent;
  let fixture: ComponentFixture<OrderHistoryControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [OrderHistoryControlsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryControlsComponent);
    component = fixture.componentInstance;
    component.pagination = { totalPages: 5 };
    component.sort = [{ code: 'byDate' }, { code: 'byOrderNumber' }];
    component.paginationBoundaries = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit viewPageEvent', () => {
    spyOn(component.viewPageEvent, 'emit');
    component.viewPage(0);
    expect(component.viewPageEvent.emit).toHaveBeenCalled();
  });

  it('should adjust pagination boundaries on viewPage', () => {
    component.viewPage(0);
    expect(component.paginationBoundaries).toBe(1);
    component.viewPage(1);
    expect(component.paginationBoundaries).toBe(1);
    component.viewPage(2);
    expect(component.paginationBoundaries).toBe(2);
    component.viewPage(3);
    expect(component.paginationBoundaries).toBe(3);
    component.viewPage(4);
    expect(component.paginationBoundaries).toBe(3);
  });

  it('should emit the sortPageEvent', () => {
    spyOn(component.sortOrderEvent, 'emit');
    component.sortOrders();
    expect(component.sortOrderEvent.emit).toHaveBeenCalled();
  });
});
