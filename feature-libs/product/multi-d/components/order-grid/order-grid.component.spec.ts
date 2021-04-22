import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderGridComponent } from './order-grid.component';

describe('OrderGridComponent', () => {
  let component: OrderGridComponent;
  let fixture: ComponentFixture<OrderGridComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderGridComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
