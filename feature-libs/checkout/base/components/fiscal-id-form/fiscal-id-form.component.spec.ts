import { ComponentFixture, TestBed } from '@angular/core/testing';
import { translationChunksConfig, translationsEn } from '@spartacus/assets';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CheckoutFiscalIdConfiguration,
  CheckoutFiscalIdFacade,
} from '@spartacus/checkout/base/root';
import {
  GlobalMessageService,
  I18NEXT_INSTANCE,
  I18nConfig,
  I18nextTranslationService,
  TranslationService,
} from '@spartacus/core';
import { provideMockFeatureToggles } from '@spartacus/core/testing/mock-feature-toggles';
import { createInstance, i18n } from 'i18next';
import { BehaviorSubject, firstValueFrom, of, Subject, throwError } from 'rxjs';
import { FiscalIdFormComponent } from './fiscal-id-form.component';

describe('FiscalIdFormComponent', () => {
  let fixture: ComponentFixture<FiscalIdFormComponent>;
  let component: FiscalIdFormComponent;
  let host: HTMLElement;
  let configuration: BehaviorSubject<CheckoutFiscalIdConfiguration>;
  let cart: BehaviorSubject<Cart>;
  let setFiscalId: ReturnType<typeof vi.fn>;
  let addMessage: ReturnType<typeof vi.fn>;
  let i18next: i18n;

  beforeEach(async () => {
    i18next = createInstance();
    await i18next.init({
      lng: 'en',
      fallbackLng: 'en',
      resources: { en: translationsEn },
    });
    configuration = new BehaviorSubject<CheckoutFiscalIdConfiguration>({
      enabled: true,
      required: true,
      sapCountry: 'PT',
    });
    cart = new BehaviorSubject<Cart>({
      code: 'cart',
      sapCustomerFiscalId: { sapFiscalIdEntries: [{ sapValue: '123456789' }] },
    });
    setFiscalId = vi.fn().mockReturnValue(of(undefined));
    addMessage = vi.fn();
    await TestBed.configureTestingModule({
      imports: [FiscalIdFormComponent],
      providers: [
        { provide: I18NEXT_INSTANCE, useValue: i18next },
        { provide: TranslationService, useClass: I18nextTranslationService },
        {
          provide: I18nConfig,
          useValue: { i18n: { chunks: translationChunksConfig } },
        },
        provideMockFeatureToggles({ a11yImproveCheckoutFocus: false }),
        {
          provide: CheckoutFiscalIdFacade,
          useValue: { getConfiguration: () => configuration, setFiscalId },
        },
        { provide: ActiveCartFacade, useValue: { getActive: () => cart } },
        { provide: GlobalMessageService, useValue: { add: addMessage } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(FiscalIdFormComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('prefills the full saved value and renders a single input without an information icon', () => {
    const input = host.querySelector('input');
    if (!input) {
      throw new Error('Expected Fiscal ID input');
    }
    expect(input.value).toBe('123456789');
    expect(input.maxLength).toBe(255);
    expect(input.required).toBe(true);
    expect(host.querySelector('cx-icon')).toBeNull();
  });

  it('hides the field when disabled', () => {
    configuration.next({ enabled: false, required: false });
    fixture.detectChanges();
    expect(host.querySelector('input')).toBeNull();
    expect(component.validate()).toBe(true);
  });

  it('blocks required empty input using existing form validation', async () => {
    component.control.setValue('');
    expect(await firstValueFrom(component.submit())).toBe(false);
    expect(component.control.hasError('required')).toBe(true);
    expect(component.control.touched).toBe(true);
    expect(addMessage).toHaveBeenCalledTimes(1);
    expect(setFiscalId).not.toHaveBeenCalled();
  });

  it('accepts optional empty input', async () => {
    configuration.next({ enabled: true, required: false });
    component.control.setValue('');
    expect(await firstValueFrom(component.submit())).toBe(true);
    expect(setFiscalId).toHaveBeenCalledWith('');
  });

  it('preserves an edited value when unrelated Cart changes arrive', () => {
    component.control.setValue('987654321');
    component.control.markAsDirty();
    cart.next({ ...cart.value, totalItems: 4 });
    expect(component.control.value).toBe('987654321');
    cart.next({
      code: 'another-cart',
      sapCustomerFiscalId: { sapFiscalIdEntries: [{ sapValue: '55555' }] },
    });
    expect(component.control.value).toBe('55555');
    expect(component.control.pristine).toBe(true);
  });

  it('blocks duplicate submissions while saving and releases the form afterward', async () => {
    const request = new Subject<void>();
    setFiscalId.mockReturnValue(request);
    const first = firstValueFrom(component.submit());
    fixture.detectChanges();
    expect(host.querySelector('input')?.readOnly).toBe(true);
    expect(await firstValueFrom(component.submit())).toBe(false);
    expect(setFiscalId).toHaveBeenCalledTimes(1);
    request.next();
    expect(await first).toBe(true);
    expect(component.saving).toBe(false);
  });

  it('translates the backend error code and lets the HTTP handler own the global message', async () => {
    component.control.setValue('incorrect');
    setFiscalId.mockReturnValue(
      throwError(() => ({
        details: [
          {
            type: 'FiscalIdValidationError',
            errorCode: 'fiscal.id.checksum.invalid',
            message: 'Checksum failed',
          },
        ],
      }))
    );
    expect(await firstValueFrom(component.submit())).toBe(false);
    expect(component.control.value).toBe('incorrect');
    expect(component.control.errors).toEqual({
      checksumInvalid: true,
    });
    fixture.detectChanges();
    expect(host.querySelector('cx-form-errors')?.textContent).toContain(
      translationsEn.payment.fiscalId.errors.checksumInvalid
    );
    expect(host.textContent).not.toContain('Checksum failed');
    expect(addMessage).not.toHaveBeenCalled();

    i18next.addResourceBundle('de', 'payment', {
      fiscalId: { errors: { checksumInvalid: 'Translated Fiscal ID error' } },
    });
    await i18next.changeLanguage('de');
    fixture.detectChanges();
    expect(host.querySelector('cx-form-errors')?.textContent).toContain(
      'Translated Fiscal ID error'
    );

    component.control.setValue('123456789');
    setFiscalId.mockReturnValue(of(undefined));
    expect(await firstValueFrom(component.submit())).toBe(true);
  });

  it.each([
    undefined,
    'fiscal.id.new.validation',
    'custom.validation.error',
    'fiscal.id.value.required',
    'fiscal.id.value.too.long',
    'fiscal.id.entries.required',
    'fiscal.id.entries.too.many',
  ])(
    'uses frontend fallback text for an unmapped code %s',
    async (errorCode) => {
      setFiscalId.mockReturnValue(
        throwError(() => ({
          details: [
            {
              type: 'FiscalIdValidationError',
              errorCode,
              message: 'Unlocalized backend message',
            },
          ],
        }))
      );
      expect(await firstValueFrom(component.submit())).toBe(false);
      fixture.detectChanges();
      expect(component.control.errors).toEqual({ unknown: true });
      expect(host.querySelector('cx-form-errors')?.textContent).toContain(
        translationsEn.payment.fiscalId.errors.unknown
      );
      expect(host.textContent).not.toContain('Unlocalized backend message');
    }
  );

  it('renders each error code only once and supports errors without backend messages', async () => {
    setFiscalId.mockReturnValue(
      throwError(() => ({
        details: [
          { errorCode: 'fiscal.id.invalid.format' },
          { errorCode: 'fiscal.id.invalid.format', message: 'Different text' },
          { errorCode: 'fiscal.id.checksum.invalid' },
        ],
      }))
    );
    expect(await firstValueFrom(component.submit())).toBe(false);
    fixture.detectChanges();
    const messages = Array.from(host.querySelectorAll('cx-form-errors p')).map(
      (element) => element.textContent?.trim()
    );
    expect(messages).toEqual([
      'Fiscal ID format is invalid for country PT',
      translationsEn.payment.fiscalId.errors.checksumInvalid,
    ]);
    expect(addMessage).not.toHaveBeenCalled();
  });

  it.each([
    ['fiscal.id.invalid.format', 'Fiscal ID format is invalid for country PT'],
    ['fiscal.id.checksum.invalid', 'Fiscal ID checksum validation failed'],
    ['fiscal.id.custom.validation.failed', 'Fiscal ID validation failed'],
    [
      'fiscal.id.rules.not.configured',
      'Fiscal ID validation is not configured for country PT',
    ],
    [
      'fiscal.id.country.required',
      'Country code is required for fiscal ID validation',
    ],
    ['fiscal.id.store.disabled', 'Fiscal ID is not enabled for this store'],
  ])(
    'renders the exact Wiki message for %s using the submitted country',
    async (errorCode, expectedMessage) => {
      const request = new Subject<void>();
      setFiscalId.mockReturnValue(request);
      const submission = firstValueFrom(component.submit());
      configuration.next({ ...configuration.value, sapCountry: 'ES' });
      request.error({
        details: [
          {
            type: 'FiscalIdValidationError',
            errorCode,
            message: 'Unlocalized backend text with a different country',
          },
        ],
      });

      expect(await submission).toBe(false);
      fixture.detectChanges();
      expect(host.querySelector('cx-form-errors p')?.textContent?.trim()).toBe(
        expectedMessage
      );
      expect(host.textContent).not.toContain('Unlocalized backend text');
    }
  );

  it('rejects values longer than the API limit', () => {
    component.control.setValue('1'.repeat(256));
    expect(component.validate()).toBe(false);
    expect(component.control.hasError('maxlength')).toBe(true);
  });

  it('preserves edited input after a cart refresh failure and allows retry', async () => {
    component.control.setValue('987654321');
    component.control.markAsDirty();
    setFiscalId.mockReturnValueOnce(
      throwError(() => new Error('Failed to refresh the cart.'))
    );

    expect(await firstValueFrom(component.submit())).toBe(false);
    expect(component.control.dirty).toBe(true);
    expect(component.saving).toBe(false);
    cart.next({ ...cart.value, totalItems: 4 });
    expect(component.control.value).toBe('987654321');

    expect(await firstValueFrom(component.submit())).toBe(true);
    expect(setFiscalId).toHaveBeenCalledTimes(2);
    expect(setFiscalId).toHaveBeenLastCalledWith('987654321');
    expect(component.control.pristine).toBe(true);
  });
});
