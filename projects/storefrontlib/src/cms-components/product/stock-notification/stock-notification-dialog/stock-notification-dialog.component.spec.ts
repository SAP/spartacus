import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNotificationDialogComponent } from './stock-notification-dialog.component';

describe('StockNotificationDialogComponent', () => {
  let component: StockNotificationDialogComponent;
  let fixture: ComponentFixture<StockNotificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockNotificationDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
