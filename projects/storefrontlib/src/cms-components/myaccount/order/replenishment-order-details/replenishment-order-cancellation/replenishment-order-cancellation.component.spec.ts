import {
  DebugElement,
  ElementRef,
  Pipe,
  PipeTransform,
  ViewContainerRef,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  ReplenishmentOrder,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReplenishmentOrderCancellationLaunchDialogService } from './replenishment-order-cancellation-launch-dialog.service';
import { ReplenishmentOrderCancellationComponent } from './replenishment-order-cancellation.component';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

const mockReplenishmentOrder$ = new BehaviorSubject<ReplenishmentOrder>(
  mockReplenishmentOrder
);

class MockUserReplenishmentOrderService {
  getReplenishmentOrderDetails(): Observable<ReplenishmentOrder> {
    return mockReplenishmentOrder$.asObservable();
  }
}

class MockReplenishmentOrderCancellationLaunchDialogService {
  openDialog(_openElement?: ElementRef, _vcr?: ViewContainerRef) {}
}
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('ReplenishmentOrderCancellationComponent', () => {
  let component: ReplenishmentOrderCancellationComponent;
  let userReplenishmentOrderService: UserReplenishmentOrderService;
  let replenishmentOrderCancellationLaunchDialogService: ReplenishmentOrderCancellationLaunchDialogService;
  let fixture: ComponentFixture<ReplenishmentOrderCancellationComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ReplenishmentOrderCancellationComponent, MockUrlPipe],
      providers: [
        {
          provide: UserReplenishmentOrderService,
          useClass: MockUserReplenishmentOrderService,
        },
        {
          provide: ReplenishmentOrderCancellationLaunchDialogService,
          useClass: MockReplenishmentOrderCancellationLaunchDialogService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentOrderCancellationComponent);
    userReplenishmentOrderService = TestBed.inject(
      UserReplenishmentOrderService
    );
    replenishmentOrderCancellationLaunchDialogService = TestBed.inject(
      ReplenishmentOrderCancellationLaunchDialogService
    );

    component = fixture.componentInstance;
    el = fixture.debugElement;
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

  it('should be able to call the open dialog', () => {
    spyOn(
      replenishmentOrderCancellationLaunchDialogService,
      'openDialog'
    ).and.stub();

    el.query(By.css('button.btn-primary')).nativeElement.click();

    expect(
      replenishmentOrderCancellationLaunchDialogService.openDialog
    ).toHaveBeenCalledWith(component.element, component['vcr']);
  });

  it('should show two action button', () => {
    const button = el.queryAll(By.css('.btn'));

    expect(button.length).toEqual(2);
  });

  it('should show one action button', () => {
    mockReplenishmentOrder$.next({ active: false });

    fixture.detectChanges();

    const button = el.queryAll(By.css('.btn'));

    expect(button.length).toEqual(1);
  });
});
