import { TestBed } from '@angular/core/testing';
import { CSRFResponse } from '../models/csrf-response';
import { CsrfStateService } from './csrf-state.service';

describe('CsrfStateService', () => {
  let service: CsrfStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(CsrfStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get csrf value', () => {
    const csrfValue: CSRFResponse = { token: 'test-token' } as CSRFResponse;
    service.set(csrfValue);
    expect(service.get()).toBe(csrfValue);
  });

  it('should return undefined if csrf not set', () => {
    expect(service.get()).toBeUndefined();
  });
});
