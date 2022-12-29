import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import { PickupInStoreDetailsReviewComponent } from './review-pickup-in-store-details.component';

describe('PickupInStoreDetailsReviewComponent', () => {
  let component: PickupInStoreDetailsReviewComponent;
  let fixture: ComponentFixture<PickupInStoreDetailsReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickupInStoreDetailsReviewComponent],
      imports: [CommonModule, I18nTestingModule, IconTestingModule],
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
