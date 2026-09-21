import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { CancelServiceOrderFacade } from '@spartacus/s4-service/root';
import { of, throwError } from 'rxjs';
import { CancelServiceOrderComponent } from './cancel-service-order.component';

// Mock classes
class MockOrderDetailsService {
  getOrderDetails = vi.fn().mockReturnValue(
    of({
      entries: [
        { entryNumber: 1, quantity: 2 },
        { entryNumber: 2, quantity: 1 },
      ],
      code: 'orderCode',
    })
  );
}

class MockCancelServiceOrderFacade {
  cancelService = vi.fn().mockReturnValue(of({}));
}

class MockGlobalMessageService {
  add = vi.fn();
}

class MockRoutingService {
  go = vi.fn();
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {
    return '';
  }
}

describe('CancelServiceOrderComponent', () => {
  let component: CancelServiceOrderComponent;
  let fixture: ComponentFixture<CancelServiceOrderComponent>;
  let mockCancelServiceOrderFacade: MockCancelServiceOrderFacade;
  let mockGlobalMessageService: MockGlobalMessageService;
  let mockRoutingService: MockRoutingService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        I18nTestingModule,
        CancelServiceOrderComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        {
          provide: CancelServiceOrderFacade,
          useClass: MockCancelServiceOrderFacade,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: RoutingService, useClass: MockRoutingService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })
      .overrideComponent(CancelServiceOrderComponent, {
        remove: {
          imports: [TranslatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelServiceOrderComponent);
    component = fixture.componentInstance;
    mockCancelServiceOrderFacade = TestBed.inject(
      CancelServiceOrderFacade
    ) as any;
    mockGlobalMessageService = TestBed.inject(GlobalMessageService) as any;
    mockRoutingService = TestBed.inject(RoutingService) as any;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with a cancelReason control', () => {
    expect(component.form.contains('cancelReason')).toBeTruthy();
    expect(component.form.get('cancelReason')?.validator).toBeTruthy();
  });

  it('should update character count correctly', () => {
    const textarea = fixture.debugElement.query(
      By.css('textarea')
    ).nativeElement;
    textarea.value = 'Test';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.characterLeft).toBe(255 - 'Test'.length);
  });

  it('should navigate to order details on successful submission', () => {
    component.form.get('cancelReason')?.setValue('Valid reason');
    component.cancelServiceOrder();
    fixture.detectChanges();
    expect(mockCancelServiceOrderFacade.cancelService).toHaveBeenCalledWith(
      'orderCode',
      expect.any(Object)
    );
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderDetails',
      params: { code: 'orderCode' },
    });
  });

  it('should display success message on successful submission', () => {
    component.form.get('cancelReason')?.setValue('Valid reason');
    mockCancelServiceOrderFacade.cancelService.mockReturnValue(of({}));
    component.cancelServiceOrder();
    fixture.detectChanges();
    expect(mockGlobalMessageService.add).toHaveBeenCalled();
  });

  it('should handle error when order details are not available', () => {
    // Mock OrderDetailsService to throw an error
    const mockOrderDetailsService = TestBed.inject(
      OrderDetailsService
    ) as any;
    mockOrderDetailsService.getOrderDetails.mockReturnValue(
      throwError(() => new Error('Order details are not available'))
    );

    component.form.get('cancelReason')?.setValue('Valid reason');
    component.cancelServiceOrder();
    fixture.detectChanges();

    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { key: 'cancelService.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
  it('should handle form submission error', () => {
    component.form.get('cancelReason')?.setValue('Valid reason');
    mockCancelServiceOrderFacade.cancelService.mockReturnValue(
      throwError(() => new Error('Error'))
    );
    component.cancelServiceOrder();
    fixture.detectChanges();
    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { key: 'cancelService.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should display the back button when order details are available', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const backButton = fixture.debugElement.query(By.css('.back-button'));
    expect(backButton).not.toBeNull();
  });
  it('should handle error when order details are not available', async () => {
    const mockOrderDetailsService = TestBed.inject(
      OrderDetailsService
    ) as any;

    mockOrderDetailsService.getOrderDetails.mockReturnValue(
      throwError(() => new Error('Order details are not available'))
    );

    component.form.get('cancelReason')?.setValue('Valid reason');

    component.cancelServiceOrder();

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { key: 'cancelService.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
