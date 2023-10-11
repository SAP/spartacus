import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AsmCustomer360PromotionList,
  AsmCustomer360Type,
  AsmCustomer360Facade,
  AsmCustomer360Response,
} from '@spartacus/asm/customer-360/root';
import { I18nTestingModule } from '@spartacus/core';
import { AsmCustomer360SectionContextSource } from '../asm-customer-360-section-context-source.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { AsmCustomer360PromotionComponent } from './asm-customer-360-promotion.component';
import { AsmCustomer360PromotionListingComponent } from '../../asm-customer-360-promotion-listing/asm-customer-360-promotion-listing.component';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';

describe('AsmCustomer360PromotionComponent', () => {
  let component: AsmCustomer360PromotionComponent;
  let fixture: ComponentFixture<AsmCustomer360PromotionComponent>;
  let context: AsmCustomer360SectionContextSource<AsmCustomer360PromotionList>;
  const activeCartId = '12345';

  const mockPromotionList: AsmCustomer360PromotionList = {
    type: AsmCustomer360Type.PROMOTION_LIST,
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

  const mockReloadedPromotionList: AsmCustomer360PromotionList = {
    type: AsmCustomer360Type.PROMOTION_LIST,
    promotions: [
      {
        code: 'RELOAD_PROMOTION_1',
        name: 'NAME OF PROMOTION_1',
        message: 'MESSAGE OF PROMOTION_1',
        applied: false,
      },
      {
        code: 'RELOAD_PROMOTION_2',
        name: 'NAME OF PROMOTION_2',
        message: 'MESSAGE OF PROMOTION_2',
        applied: true,
      },
      {
        code: 'RELOAD_PROMOTION_3',
        name: 'NAME OF PROMOTION_3',
        message: 'MESSAGE OF PROMOTION_3',
        applied: false,
      },
    ],
  };

  const mockReloadedAsmCustomer360Response: AsmCustomer360Response = {
    value: [mockReloadedPromotionList],
  };

  class MockAsmCustomer360Facade implements Partial<AsmCustomer360Facade> {
    get360Data(): Observable<AsmCustomer360Response> {
      return of(mockReloadedAsmCustomer360Response);
    }
  }
  class MockActiveCartFacade implements Partial<ActiveCartFacade> {
    getActiveCartId(): Observable<string> {
      return of(activeCartId);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomer360PromotionComponent,
        AsmCustomer360PromotionListingComponent,
      ],
      providers: [
        AsmCustomer360SectionContextSource,
        {
          provide: AsmCustomer360SectionContext,
          useExisting: AsmCustomer360SectionContextSource,
        },
        {
          provide: AsmCustomer360Facade,
          useClass: MockAsmCustomer360Facade,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomer360PromotionComponent);
    component = fixture.componentInstance;
    context = TestBed.inject(AsmCustomer360SectionContextSource);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display error message alert at init', () => {
    component.showErrorAlert$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should be able to reload promotion list', () => {
    component.refreshPromotions();
    component.entries$.subscribe((entries) => {
      expect(entries[0].name).toEqual(
        mockReloadedPromotionList.promotions[0].message
      );
      expect(entries[1].name).toEqual(
        mockReloadedPromotionList.promotions[1].message
      );
      expect(entries[2].name).toEqual(
        mockReloadedPromotionList.promotions[2].message
      );
      expect(entries[0].code).toEqual(
        mockReloadedPromotionList.promotions[0].name
      );
      expect(entries[1].code).toEqual(
        mockReloadedPromotionList.promotions[1].name
      );
      expect(entries[2].code).toEqual(
        mockReloadedPromotionList.promotions[2].name
      );
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
