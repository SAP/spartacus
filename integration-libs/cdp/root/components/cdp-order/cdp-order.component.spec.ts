import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cdpOrderComponent } from './cdp-order.component';

describe('OrderComponent', () => {
  let component: cdpOrderComponent;
  let fixture: ComponentFixture<cdpOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [cdpOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(cdpOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
