import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickOrderItemComponent } from './quick-order-item.component';

describe('QuickOrderItemComponent', () => {
  let component: QuickOrderItemComponent;
  let fixture: ComponentFixture<QuickOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickOrderItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
