import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  ReplenishmentOrder,
  RoutingService,
  Translatable,
  UrlCommands,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LaunchDialogService } from '../../../layout/launch-dialog/index';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

class MockUserReplenishmentOrderService {
  getReplenishmentOrderDetails(): Observable<ReplenishmentOrder> {
    return of(mockReplenishmentOrder);
  }

  getCancelReplenishmentOrderSuccess(): Observable<boolean> {
    return of(true);
  }

  cancelReplenishmentOrder(_replenishmentOrderCode: string): void {}
}

class MockGlobalMessageService {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

class MockLaunchDialogService {
  closeDialog(_reason: string): void {}
}

describe('ReplenishmentOrderCancellationDialogComponent', () => {
  let component: ReplenishmentOrderCancellationDialogComponent;
  let userReplenishmentOrderService: UserReplenishmentOrderService;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;
  let fixture: ComponentFixture<ReplenishmentOrderCancellationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ReplenishmentOrderCancellationDialogComponent],
      providers: [
        {
          provide: UserReplenishmentOrderService,
          useClass: MockUserReplenishmentOrderService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ReplenishmentOrderCancellationDialogComponent
    );
    userReplenishmentOrderService = TestBed.inject(
      UserReplenishmentOrderService
    );
    globalMessageService = TestBed.inject(GlobalMessageService);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get replenishment order details', () => {
    let result: ReplenishmentOrder;

    userReplenishmentOrderService
      .getReplenishmentOrderDetails()
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockReplenishmentOrder);
  });

  it('should redirect to same page and add global message on successful cancellation ', () => {
    spyOn(userReplenishmentOrderService, 'cancelReplenishmentOrder').and.stub();
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(routingService, 'go').and.callThrough();
    spyOn(launchDialogService, 'closeDialog').and.callThrough();

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
    expect(routingService.go).toHaveBeenCalledWith(
      {
        cxRoute: 'replenishmentDetails',
        params: mockReplenishmentOrder,
      },
      { forced: true }
    );

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Succesffully cancelled replenishment'
    );
  });

  it('should be able to call the close dialog', () => {
    spyOn(launchDialogService, 'closeDialog').and.callThrough();

    const mockCloseReason = 'test-close';

    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });

  it('should be able to call the cancel replenishment', () => {
    spyOn(
      userReplenishmentOrderService,
      'cancelReplenishmentOrder'
    ).and.callThrough();

    component.cancelReplenishment();

    expect(
      userReplenishmentOrderService.cancelReplenishmentOrder
    ).toHaveBeenCalledWith(mockReplenishmentOrder.replenishmentOrderCode);
  });
});
