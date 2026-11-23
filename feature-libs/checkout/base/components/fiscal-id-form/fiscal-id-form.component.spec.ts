import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CheckoutFiscalIdConfiguration,
  CheckoutFiscalIdFacade,
} from '@spartacus/checkout/base/root';
import { GlobalMessageService, I18nTestingModule } from '@spartacus/core';
import { provideMockFeatureToggles } from '@spartacus/core/testing/mock-feature-toggles';
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

  beforeEach(async () => {
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
      imports: [FiscalIdFormComponent, I18nTestingModule],
      providers: [
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

  it('shows the server message in the field and lets the shared HTTP handler own the global message', async () => {
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
      fiscalId: { message: 'Checksum failed' },
    });
    expect(addMessage).not.toHaveBeenCalled();
    component.control.setValue('123456789');
    setFiscalId.mockReturnValue(of(undefined));
    expect(await firstValueFrom(component.submit())).toBe(true);
  });

  it('rejects values longer than the API limit', () => {
    component.control.setValue('1'.repeat(256));
    expect(component.validate()).toBe(false);
    expect(component.control.hasError('maxlength')).toBe(true);
  });
});
