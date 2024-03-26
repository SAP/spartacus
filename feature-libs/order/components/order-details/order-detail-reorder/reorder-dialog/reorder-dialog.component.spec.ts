import { Component, DebugElement, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CartModificationList,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { ReorderOrderFacade } from '@spartacus/order/root';
import {
  ICON_TYPE,
  LaunchDialogService,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
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

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

describe('ReorderDialogComponent', () => {
  let component: ReorderDialogComponent;
  let fixture: ComponentFixture<ReorderDialogComponent>;
  let el: DebugElement;
  let reorderOrderFacade: ReorderOrderFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
          SpinnerModule,
          I18nTestingModule,
          PromotionsModule,
        ],
        declarations: [
          ReorderDialogComponent,
          MockCxIconComponent,
          MockSpinnerComponent,
          MockFocusDirective,
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
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    reorderOrderFacade = TestBed.inject(ReorderOrderFacade);
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
      spyOn(reorderOrderFacade, 'reorder').and.returnValue(
        of({ cartModifications: [] })
      );
      fixture.detectChanges();
      el.queryAll(
        By.css('.cx-reorder-dialog-footer div button')
      )[1].nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(el.query(By.css('.success')).nativeElement).toBeDefined();
    });
  });
});
