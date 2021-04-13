import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickOrderListComponent } from './quick-order-list.component';

describe('QuickOrderListComponent', () => {
  let component: QuickOrderListComponent;
  let fixture: ComponentFixture<QuickOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickOrderListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
