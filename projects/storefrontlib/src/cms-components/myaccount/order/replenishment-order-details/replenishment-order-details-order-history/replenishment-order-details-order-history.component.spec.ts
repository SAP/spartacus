import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplenishmentOrderDetailsOrderHistoryComponent } from './replenishment-order-details-order-history.component';

describe('ReplenishmentOrderDetailsOrderHistoryComponent', () => {
  let component: ReplenishmentOrderDetailsOrderHistoryComponent;
  let fixture: ComponentFixture<ReplenishmentOrderDetailsOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplenishmentOrderDetailsOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentOrderDetailsOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
