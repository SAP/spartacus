import {
  Component,
  DebugElement,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ArgsPipe } from '@spartacus/asm/core';
import {
  Customer360ActivityList,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import {
  DirectionMode,
  DirectionService,
  FocusConfig,
  ICON_TYPE,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { AsmCustomerTableComponent } from '../../asm-customer-table/asm-customer-table.component';
import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerActivityComponent } from './asm-customer-activity.component';

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('AsmCustomerActivityComponent', () => {
  @Pipe({
    name: 'cxTranslate',
  })
  class MockTranslatePipe implements PipeTransform {
    transform(): any {}
  }
  @Component({
    selector: 'cx-icon',
    template: '',
  })
  class MockCxIconComponent {
    @Input() type: ICON_TYPE;
  }

  class MockTranslationService {
    translate(): Observable<string> {
      return of('test');
    }
  }

  class MockDirectionService {
    getDirection() {
      return DirectionMode.LTR;
    }
  }

  let component: AsmCustomerActivityComponent;
  let fixture: ComponentFixture<AsmCustomerActivityComponent>;
  let el: DebugElement;
  let context: Customer360SectionContextSource<Customer360ActivityList>;

  const mockActivityList: Customer360ActivityList = {
    type: Customer360Type.ACTIVITY_LIST,
    activities: [
      {
        type: {
          code: 'SAVED CART',
          name: 'Saved Cart',
        },
        associatedTypeId: '0001',
        description: 'A saved cart',
        status: {
          code: 'new',
          name: 'New',
        },
        createdAt: '2022-07-07T18:25:43+0000',
        updatedAt: '2022-07-07T18:25:43+0000',
      },
      {
        type: {
          code: 'CART',
          name: 'Cart',
        },
        associatedTypeId: '0002',
        description: 'An active cart',
        createdAt: '2022-07-07T18:25:43+0000',
        updatedAt: '2022-07-07T18:25:43+0000',
      },
      {
        type: {
          code: 'TICKET',
          name: 'Ticket',
        },
        associatedTypeId: '0003',
        description: 'Where are my products?',
        status: {
          code: 'NEW',
          name: 'new',
        },
        createdAt: '2022-07-07T18:25:43+0000',
        updatedAt: '2022-07-07T18:25:43+0000',
      },
      {
        type: {
          code: 'ORDER',
          name: 'Order',
        },
        associatedTypeId: '0004',
        description: 'Ordered items',
        status: {
          code: 'READY',
          name: 'Ready',
        },
        createdAt: '2022-07-07T18:25:43+0000',
        updatedAt: '2022-07-07T18:25:43+0000',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerActivityComponent,
        MockTranslatePipe,
        MockCxIconComponent,
        AsmCustomerTableComponent,
        ArgsPipe,
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
        {
          provide: DirectionService,
          useClass: MockDirectionService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    context = TestBed.inject(Customer360SectionContextSource);
    context.data$.next(mockActivityList);
    context.config$.next({
      pageSize: 5,
    });

    fixture = TestBed.createComponent(AsmCustomerActivityComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from services', () => {
    expect(component.columns.length).toBe(6);
  });

  describe('table', () => {
    it('should display the column headers', () => {
      const headers = el.queryAll(By.css('.cx-asm-customer-table-header'));
      expect(headers.length).toBe(component.columns.length);
    });

    it('should display table', () => {
      const tableBody = el.query(By.css('.cx-asm-customer-table tbody'));
      const tableRows = tableBody?.queryAll(By.css('tr'));
      expect(tableRows.length).toBe(4);
    });

    it('should navigate to cart, order detail, saved cart detail, and support ticket detail', () => {
      spyOn(context.navigate$, 'next').and.stub();
      const tableBody = el.query(By.css('.cx-asm-customer-table tbody'));
      const tableRows = tableBody.queryAll(By.css('tr'));
      const linkCell = tableRows[0].query(
        By.css('.cx-asm-customer-table-link')
      );
      linkCell.nativeElement.click();

      expect(context.navigate$.next).toHaveBeenCalledWith({
        cxRoute: 'savedCartsDetails',
        params: { savedCartId: '0001' },
      });

      const linkCell2 = tableRows[1].query(
        By.css('.cx-asm-customer-table-link')
      );
      linkCell2.nativeElement.click();
      expect(context.navigate$.next).toHaveBeenCalledWith({
        cxRoute: 'cart',
      });

      const linkCell3 = tableRows[2].query(
        By.css('.cx-asm-customer-table-link')
      );
      linkCell3.nativeElement.click();
      expect(context.navigate$.next).toHaveBeenCalledWith({
        cxRoute: 'supportTicketDetails',
        params: { ticketCode: '0003' },
      });

      const linkCell4 = tableRows[3].query(
        By.css('.cx-asm-customer-table-link')
      );
      linkCell4.nativeElement.click();
      expect(context.navigate$.next).toHaveBeenCalledWith({
        cxRoute: 'orderDetails',
        params: { code: '0004' },
      });
    });
  });
});
