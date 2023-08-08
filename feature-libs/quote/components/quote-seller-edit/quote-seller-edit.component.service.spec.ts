import { TestBed } from '@angular/core/testing';

import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';
import { CurrencyService, LanguageService } from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';

class MockCurrencyService {
  getAll = () => of(EMPTY);
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('QuoteSellerEditComponentService', () => {
  let service: QuoteSellerEditComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(QuoteSellerEditComponentService);
  });

  it('should create component', () => {
    expect(service).toBeDefined();
  });
});
