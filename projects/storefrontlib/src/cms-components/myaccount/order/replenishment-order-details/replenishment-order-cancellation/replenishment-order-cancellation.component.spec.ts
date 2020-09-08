import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplenishmentOrderCancellationComponent } from './replenishment-order-cancellation.component';

describe('ReplenishmentOrderCancellationComponent', () => {
  let component: ReplenishmentOrderCancellationComponent;
  let fixture: ComponentFixture<ReplenishmentOrderCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReplenishmentOrderCancellationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentOrderCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
