import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCartDetailItemsComponent } from './saved-cart-detail-items.component';

xdescribe('SavedCartDetailItemsComponent', () => {
  let component: SavedCartDetailItemsComponent;
  let fixture: ComponentFixture<SavedCartDetailItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedCartDetailItemsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCartDetailItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
