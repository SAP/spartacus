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
    component.sort = [{ code: 'byDate' }, { code: 'byOrderNumber' }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
