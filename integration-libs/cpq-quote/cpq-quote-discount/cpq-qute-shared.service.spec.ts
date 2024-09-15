import { TestBed } from '@angular/core/testing';
import { CpqQuoteService } from './cpq-qute.service';
import { CpqQuoteSharedService } from './cpq-qute-shared.service';

describe('CpqQuoteSharedService', () => {
  let sharedService: CpqQuoteSharedService;
  let mockCpqQuoteService: Partial<CpqQuoteService>;

  beforeEach(() => {
    mockCpqQuoteService = {
      getFlag$: () => true, // Mock implementation returning synchronous boolean
    };

    TestBed.configureTestingModule({
      providers: [
        CpqQuoteSharedService,
        { provide: CpqQuoteService, useValue: mockCpqQuoteService },
      ],
    });
    sharedService = TestBed.inject(CpqQuoteSharedService);
  });

  it('should be created', () => {
    expect(sharedService).toBeTruthy();
  });

  it('should delegate to CpqQuoteService and return the value of getFlag$', () => {
    const result = sharedService.showBasePriceWithDiscount();
    expect(result).toBe(true); // Assuming the default value of getFlag$ is true
  });
});
