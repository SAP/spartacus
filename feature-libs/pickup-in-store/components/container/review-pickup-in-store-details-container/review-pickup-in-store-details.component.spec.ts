import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickUpItemsDetailsModule } from '../../presentational';
import { PickupInStoreDetailsReviewComponent } from './review-pickup-in-store-details.component';

describe('PickupInStoreDetailsReviewComponent', () => {
  let component: PickupInStoreDetailsReviewComponent;
  let fixture: ComponentFixture<PickupInStoreDetailsReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickupInStoreDetailsReviewComponent],
      imports: [CommonModule, PickUpItemsDetailsModule],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(PickupInStoreDetailsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
