import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCartDetailOverviewComponent } from './saved-cart-detail-overview.component';

describe('SavedCartDetailOverviewComponent', () => {
  let component: SavedCartDetailOverviewComponent;
  let fixture: ComponentFixture<SavedCartDetailOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCartDetailOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCartDetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
