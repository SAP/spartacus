import { TestBed } from '@angular/core/testing';
import { CpqQuoteService } from './cpq-qute.service';

describe('CpqQuoteService', () => {
  let service: CpqQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpqQuoteService],
    });
    service = TestBed.inject(CpqQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default value of true for isFlag$', () => {
    let isFlagValue: boolean | undefined;
    service.isFlag$.subscribe((value) => (isFlagValue = value));
    expect(isFlagValue).toBeTruthy();
  });

  it('should allow setting isFlag$', () => {
    service.setFlag(false);
    let isFlagValue: boolean | undefined;
    service.isFlag$.subscribe((value) => (isFlagValue = value));
    expect(isFlagValue).toBeFalsy();
  });

  it('should return the current value of isFlag$', () => {
    expect(service.getFlag$()).toBeTruthy();
    service.setFlag(false);
    expect(service.getFlag$()).toBeFalsy();
  });
});
