import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserConsentAdapter } from './user-consent.adapter';
import { UserConsentConnector } from './user-consent.connector';
import createSpy = jasmine.createSpy;

class MockUserAdapter implements UserConsentAdapter {
  loadConsents = createSpy('loadConsents').and.returnValue(of({}));
  giveConsent = createSpy('giveConsent').and.returnValue(of({}));
  withdrawConsent = createSpy('withdrawConsent').and.returnValue(of({}));
}

describe('UserConsentConnector', () => {
  let service: UserConsentConnector;
  let adapter: UserConsentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserConsentAdapter, useClass: MockUserAdapter }],
    });

    service = TestBed.inject(UserConsentConnector);
    adapter = TestBed.inject(UserConsentAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadConsents should call adapter', () => {
    let result;
    service.loadConsents('userId').subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.loadConsents).toHaveBeenCalledWith('userId');
  });

  it('giveConsent should call adapter', () => {
    let result;
    service
      .giveConsent('userId', 'templateId', 0)
      .subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.giveConsent).toHaveBeenCalledWith('userId', 'templateId', 0);
  });

  it('withdrawConsent should call adapter', () => {
    let result;
    service
      .withdrawConsent('userId', 'consentCode')
      .subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.withdrawConsent).toHaveBeenCalledWith(
      'userId',
      'consentCode'
    );
  });
});
