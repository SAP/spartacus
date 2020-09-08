import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';

describe('ReplenishmentOrderCancellationDialogComponent', () => {
  let component: ReplenishmentOrderCancellationDialogComponent;
  let fixture: ComponentFixture<ReplenishmentOrderCancellationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReplenishmentOrderCancellationDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ReplenishmentOrderCancellationDialogComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
