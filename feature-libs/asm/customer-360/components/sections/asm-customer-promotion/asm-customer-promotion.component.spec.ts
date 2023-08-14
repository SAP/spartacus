import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Customer360PromotionList,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { I18nTestingModule, UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerPromotionComponent } from './asm-customer-promotion.component';
import { AsmCustomerPromotionListingComponent } from '../../asm-customer-promotion-listing/asm-customer-promotion-listing.component';

describe('AsmCustomerPromotionComponent', () => {
  let component: AsmCustomerPromotionComponent;
  let fixture: ComponentFixture<AsmCustomerPromotionComponent>;
  let context: Customer360SectionContextSource<Customer360PromotionList>;

  const mockUserId = 'userId';
  const mockPromotionList: Customer360PromotionList = {
    type: Customer360Type.PROMOTION_LIST,
    promotions: [
      {
        code: 'PROMOTION_1',
        name: 'NAME OF PROMOTION_1',
        message: 'MESSAGE OF PROMOTION_1',
        applied: true,
      },
      {
        code: 'PROMOTION_2',
        name: 'NAME OF PROMOTION_2',
        message: 'MESSAGE OF PROMOTION_2',
        applied: true,
      },
      {
        code: 'PROMOTION_3',
        name: 'NAME OF PROMOTION_3',
        message: 'MESSAGE OF PROMOTION_3',
        applied: true,
      },
    ],
  };

  class MockUserIdService implements Partial<UserIdService> {
    getUserId(): Observable<string> {
      return of(mockUserId);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerPromotionComponent,
        AsmCustomerPromotionListingComponent,
      ],
      providers: [
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerPromotionComponent);
    component = fixture.componentInstance;
    context = TestBed.inject(Customer360SectionContextSource);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display error message alert at init', () => {
    component.showErrorAlert$.subscribe((value) => {
      expect(value).toBe(false);
    });
    component.showErrorAlertForApplyAction$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should be able to fetch promotion list from context data', () => {
    context.data$.next(mockPromotionList);
    component.fetchPromotions();
    component.entries$.subscribe((entries) => {
      expect(entries[0].name).toEqual(mockPromotionList.promotions[0].message);
      expect(entries[1].name).toEqual(mockPromotionList.promotions[1].message);
      expect(entries[2].name).toEqual(mockPromotionList.promotions[2].message);
      expect(entries[0].code).toEqual(mockPromotionList.promotions[0].name);
      expect(entries[1].code).toEqual(mockPromotionList.promotions[1].name);
      expect(entries[2].code).toEqual(mockPromotionList.promotions[2].name);
      expect(component.showErrorAlert$.getValue()).toBe(false);
    });
  });

  it('should close error message alert of loading data when click close button', () => {
    component.showErrorAlert$.next(true);
    component.closeErrorAlert();
    component.showErrorAlert$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });
});
