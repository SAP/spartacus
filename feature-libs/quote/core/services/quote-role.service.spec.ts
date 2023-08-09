import { TestBed } from '@angular/core/testing';
import { QuoteRoleService } from './quote-role.service';
import { QuoteRoleType, QuoteState } from '@spartacus/quote/root';

describe('QuoteRoleService', () => {
  let serviceUnderTest: QuoteRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();

    serviceUnderTest = TestBed.inject(QuoteRoleService);
  });

  it('should be created', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  describe('statusToRole', () => {
    it('should return buyer-role', () => {
      expect(serviceUnderTest.stateToRole(QuoteState.BUYER_DRAFT)).toBe(
        QuoteRoleType.BUYER
      );
    });
    it('should return seller-role', () => {
      expect(serviceUnderTest.stateToRole(QuoteState.SELLER_SUBMITTED)).toBe(
        QuoteRoleType.SELLER
      );
    });
    it('should return seller-approver-role', () => {
      expect(
        serviceUnderTest.stateToRole(QuoteState.SELLERAPPROVER_APPROVED)
      ).toBe(QuoteRoleType.SELLERAPPROVER);
    });
    it('should return sate if no role matches', () => {
      expect(serviceUnderTest.stateToRole(QuoteState.CANCELLED)).toBe(
        QuoteRoleType.NOT_AVAILABLE
      );
    });
  });
});
