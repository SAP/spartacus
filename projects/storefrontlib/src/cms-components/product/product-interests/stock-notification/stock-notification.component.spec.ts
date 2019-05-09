import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNotificationComponent } from './stock-notification.component';

describe('StockNotificationComponent', () => {
  let component: StockNotificationComponent;
  let fixture: ComponentFixture<StockNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockNotificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
