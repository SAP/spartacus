import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCartDetailActionComponent } from './saved-cart-detail-action.component';

xdescribe('SavedCartDetailActionComponent', () => {
  let component: SavedCartDetailActionComponent;
  let fixture: ComponentFixture<SavedCartDetailActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedCartDetailActionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCartDetailActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
