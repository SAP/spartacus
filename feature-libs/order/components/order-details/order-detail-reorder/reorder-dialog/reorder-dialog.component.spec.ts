import { Component, DebugElement, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  CartModificationList,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { ReorderOrderFacade } from '@spartacus/order/root';
import {
  FocusDirective,
  IconComponent,
  ICON_TYPE,
  LaunchDialogService,
  PromotionsModule,
  SpinnerComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { Observable, of, throwError } from 'rxjs';
import { ReorderDialogComponent } from './reorder-dialog.component';

const mockData = {
  orderCode: 'test',
};

const mockCartModificationList = {
  cartModifications: [
    {
      entry: {
        product: {
          availableForPickup: true,
          code: '325414',
          name: 'EASYSHARE Z730 Zoom Digital Camera',
          purchasable: true,
          stock: {
            isValueRounded: false,
            stockLevel: 1,
            stockLevelStatus: 'lowStock',
          },
        },
        quantity: 1,
      },
      quantity: 2,
      quantityAdded: 1,
      statusCode: 'lowStock',
    },
    {
      entry: {
        product: {
          availableForPickup: false,
          code: '325414',
          name: 'EASYSHARE Z730 Zoom Digital Camera',
          purchasable: true,
          stock: {
            isValueRounded: false,
            stockLevel: 0,
            stockLevelStatus: 'outOfStock',
          },
          url: '/Open-Catalogue/Cameras/Digital-Cameras/Digital-Compacts/EASYSHARE-Z730-Zoom-Digital-Camera/p/325414',
        },
        quantity: 0,
      },
      quantity: 2,
      quantityAdded: 0,
      statusCode: 'noStock',
    },
  ],
};

class MockMultiCartService {
  reloadCart(_cartId: string, _extraData?: { active: boolean }): void {}
}

class MockReorderOrderFacade implements Partial<ReorderOrderFacade> {
  reorder(_orderId: string): Observable<CartModificationList> {
    return of(mockCartModificationList);
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of(mockData);
  }

  closeDialog(_reason: string): void {}

  emitData(_data: any): void {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(_text: any, _type: GlobalMessageType): void {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

@Directive({ selector: '[cxFocus]' })
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

describe('ReorderDialogComponent', () => {
  let component: ReorderDialogComponent;
  let fixture: ComponentFixture<ReorderDialogComponent>;
  let el: DebugElement;
  let reorderOrderFacade: ReorderOrderFacade;
  let launchDialogService: LaunchDialogService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        PromotionsModule,
        ReorderDialogComponent,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: ReorderOrderFacade,
          useClass: MockReorderOrderFacade,
        },
        {
          provide: MultiCartFacade,
          useClass: MockMultiCartService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    })
      .overrideComponent(ReorderDialogComponent, {
        remove: {
          imports: [
            TranslatePipe,
            IconComponent,
            SpinnerComponent,
            FocusDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockCxIconComponent,
            MockSpinnerComponent,
            MockFocusDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    reorderOrderFacade = TestBed.inject(ReorderOrderFacade);
    launchDialogService = TestBed.inject(LaunchDialogService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Dialog', () => {
    it('should display decision prompt when opened', () => {
      fixture.detectChanges();
      expect(
        el.query(By.css('.cx-reorder-dialog-areyousure-section')).nativeElement
      ).toBeDefined();
    });
    it('should display error and warning messages when there are cart modifications ', () => {
      fixture.detectChanges();
      el.queryAll(
        By.css('.cx-reorder-dialog-footer div button')
      )[1].nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(el.query(By.css('.warning')).nativeElement).toBeDefined();
      expect(el.query(By.css('.error')).nativeElement).toBeDefined();
    });
    it('should success message when there are no cart modifications ', () => {
      component.showDecisionPrompt$.next(true);
      vi.spyOn(reorderOrderFacade, 'reorder').mockReturnValue(
        of({ cartModifications: [] })
      );
      fixture.detectChanges();
      el.queryAll(
        By.css('.cx-reorder-dialog-footer div button')
      )[1].nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(el.query(By.css('.success')).nativeElement).toBeDefined();
    });
    it('should restore focus after content updates', () => {
      fixture.detectChanges();
      const closeEl = el.query(By.css('.close')).nativeElement;
      closeEl.focus = vi.fn();
      vi.spyOn(
        component.selectFocusUtility,
        'findFirstFocusable'
      ).mockReturnValue(closeEl);
      el.queryAll(
        By.css('.cx-reorder-dialog-footer div button')
      )[1].nativeElement.dispatchEvent(new MouseEvent('click'));
      expect(closeEl.focus).toHaveBeenCalled();
    });

    describe('on reorder HTTP error', () => {
      beforeEach(() => {
        vi.spyOn(reorderOrderFacade, 'reorder').mockReturnValue(
          throwError(() => new Error('403 Forbidden'))
        );
        fixture.detectChanges();
        el.queryAll(
          By.css('.cx-reorder-dialog-footer div button')
        )[1].nativeElement.dispatchEvent(new MouseEvent('click'));
      });

      it('should add an error global message', () => {
        vi.spyOn(globalMessageService, 'add');
        component.createCartFromOrder('test');
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'reorder.dialog.error' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });

      it('should stop the loading spinner', () => {
        expect(component.loading$.getValue()).toBe(false);
      });

      it('should close the dialog', () => {
        vi.spyOn(launchDialogService, 'closeDialog');
        component.createCartFromOrder('test');
        expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
          'Error creating cart from order'
        );
      });
    });
  });
});
