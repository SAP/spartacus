import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  GlobalMessageService,
  GlobalMessageType,
  MockTranslatePipe,
  Translatable,
  TranslatePipe,
} from '@spartacus/core';
import {
  ReplenishmentOrder,
  ReplenishmentOrderHistoryFacade,
} from '@spartacus/order/root';
import {
  FocusDirective,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
} from '@spartacus/storefront';
import { MockKeyboardFocusDirective } from '@spartacus/storefront/keyboard-focus/testing';
import { Observable, of } from 'rxjs';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockReplenishmentOrderHistoryFacade
  implements Partial<ReplenishmentOrderHistoryFacade>
{
  getReplenishmentOrderDetails(): Observable<ReplenishmentOrder> {
    return of(mockReplenishmentOrder);
  }

  getCancelReplenishmentOrderSuccess(): Observable<boolean> {
    return of(true);
  }

  cancelReplenishmentOrder(_replenishmentOrderCode: string): void {}

  clearCancelReplenishmentOrderProcessState(): void {}
}

class MockGlobalMessageService {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

class MockLaunchDialogService {
  get data$(): Observable<any> {
    return of(undefined);
  }

  closeDialog(_reason: string): void {}
}

describe('ReplenishmentOrderCancellationDialogComponent', () => {
  let component: ReplenishmentOrderCancellationDialogComponent;
  let replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade;
  let globalMessageService: GlobalMessageService;
  let launchDialogService: LaunchDialogService;
  let fixture: ComponentFixture<ReplenishmentOrderCancellationDialogComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReplenishmentOrderCancellationDialogComponent],
      providers: [
        {
          provide: ReplenishmentOrderHistoryFacade,
          useClass: MockReplenishmentOrderHistoryFacade,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(ReplenishmentOrderCancellationDialogComponent, {
        remove: { imports: [FocusDirective, TranslatePipe, IconComponent] },
        add: {
          imports: [
            MockKeyboardFocusDirective,
            MockTranslatePipe,
            MockCxIconComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ReplenishmentOrderCancellationDialogComponent
    );
    el = fixture.debugElement;
    replenishmentOrderHistoryFacade = TestBed.inject(
      ReplenishmentOrderHistoryFacade
    );
    globalMessageService = TestBed.inject(GlobalMessageService);
    launchDialogService = TestBed.inject(LaunchDialogService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get replenishment order details', () => {
    let result: ReplenishmentOrder;

    replenishmentOrderHistoryFacade
      .getReplenishmentOrderDetails()
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockReplenishmentOrder);
  });

  it('should redirect to same page and add global message on successful cancellation ', () => {
    vi.spyOn(
      replenishmentOrderHistoryFacade,
      'cancelReplenishmentOrder'
    ).mockImplementation(() => {});
    vi.spyOn(
      replenishmentOrderHistoryFacade,
      'clearCancelReplenishmentOrderProcessState'
    ).mockImplementation(() => {});
    vi.spyOn(globalMessageService, 'add').mockImplementation(() => {});
    vi.spyOn(launchDialogService, 'closeDialog').mockImplementation(() => {});

    component.onSuccess(true);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'orderDetails.cancelReplenishment.cancelSuccess',
        params: {
          replenishmentOrderCode: mockReplenishmentOrder.replenishmentOrderCode,
        },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Successffully cancelled replenishment'
    );

    expect(
      replenishmentOrderHistoryFacade.clearCancelReplenishmentOrderProcessState
    ).toHaveBeenCalled();
  });

  it('should be able to call the close dialog', () => {
    vi.spyOn(launchDialogService, 'closeDialog').mockImplementation(() => {});

    const mockCloseReason = 'test-close';

    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });

  it('should be able to call the cancel replenishment', () => {
    vi.spyOn(
      replenishmentOrderHistoryFacade,
      'cancelReplenishmentOrder'
    ).mockImplementation(() => {});

    component.cancelReplenishment();

    expect(
      replenishmentOrderHistoryFacade.cancelReplenishmentOrder
    ).toHaveBeenCalledWith(mockReplenishmentOrder.replenishmentOrderCode);
  });

  it('should be able to close dialog', () => {
    vi.spyOn(launchDialogService, 'closeDialog').mockImplementation(() => {});
    el.query(By.css('.close')).nativeElement.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('Cross click');
  });
});
