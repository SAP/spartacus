import { of } from 'rxjs';
import { vi } from 'vitest';
import { UserConsentConnector } from './user-consent.connector';

describe('UserConsentConnector', () => {
  let service: UserConsentConnector;
  let adapter: {
    loadConsents: ReturnType<typeof vi.fn>;
    giveConsent: ReturnType<typeof vi.fn>;
    withdrawConsent: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      loadConsents: vi.fn().mockReturnValue(of({})),
      giveConsent: vi.fn().mockReturnValue(of({})),
      withdrawConsent: vi.fn().mockReturnValue(of({})),
    };
    service = new UserConsentConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadConsents should call adapter', () => {
    let result: any;
    service.loadConsents('userId').subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.loadConsents).toHaveBeenCalledWith('userId');
  });

  it('giveConsent should call adapter', () => {
    let result: any;
    service
      .giveConsent('userId', 'templateId', 0)
      .subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.giveConsent).toHaveBeenCalledWith('userId', 'templateId', 0);
  });

  it('withdrawConsent should call adapter', () => {
    let result: any;
    service
      .withdrawConsent('userId', 'consentCode', 'consentId')
      .subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.withdrawConsent).toHaveBeenCalledWith(
      'userId',
      'consentCode',
      'consentId'
    );
  });
});
