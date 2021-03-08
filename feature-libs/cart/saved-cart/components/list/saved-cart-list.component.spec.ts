import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCartListComponent } from './saved-cart-list.component';

xdescribe('SavedCartListComponent', () => {
  let component: SavedCartListComponent;
  let fixture: ComponentFixture<SavedCartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedCartListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
