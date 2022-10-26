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

import { I18nTestingModule } from '@spartacus/core';
import { FocusConfig, ICON_TYPE } from '@spartacus/storefront';
import { GeneralEntry } from '../../sections/asm-customer-activity/asm-customer-activity.model';

import { AsmCustomerTableComponent } from './asm-customer-table.component';
import { CustomerTableColumn, TableEntry } from './asm-customer-table.model';

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('AsmCustomerTableComponent', () => {
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
  const mockColumns: Array<CustomerTableColumn> = [
    {
      property: 'type',
      text: 'type',
    },
    { property: 'id', text: 'id' },
    {
      property: 'description',
      text: 'description',
    },
    {
      property: 'category',
      text: 'status',
    },
    {
      property: 'created',
      text: 'created',
      isDate: true,
    },
    {
      property: 'updated',
      text: 'updated',
      isDate: true,
    },
  ];
  const mockEntries: Array<GeneralEntry> = [
    {
      type: 'Ticket',
      id: '00000001',
      description: 'Thing not work good',
      created: new Date('2022-07-07T18:25:43+0000').getTime(),
      updated: new Date('2022-07-07T18:25:43+0000').getTime(),
      category: 'New',
    },
    {
      type: 'Cart',
      id: '00002001',
      description: 'Cart with 1 item',
      created: new Date('2022-07-01T18:25:43+0000').getTime(),
      updated: new Date('2022-07-02T18:25:43+0000').getTime(),
    },
    {
      type: 'Cart',
      id: '00002007',
      description: 'Cart with 0 items',
      created: new Date('2022-06-15T18:25:43+0000').getTime(),
      updated: new Date('2022-06-20T18:25:43+0000').getTime(),
    },
    {
      type: 'Saved Cart',
      id: '00002002',
      description: 'Cart with 2 items',
      created: new Date('2022-07-02T18:25:43+0000').getTime(),
      updated: new Date('2022-07-04T18:25:43+0000').getTime(),
    },
    {
      type: 'Saved Cart',
      id: '00002005',
      description: 'Cart with 3 items',
      created: new Date('2022-06-09T18:25:43+0000').getTime(),
      updated: new Date('2022-06-12T18:25:43+0000').getTime(),
    },
    {
      type: 'Saved Cart',
      id: '00002008',
      description: 'Cart with 4 items',
      created: new Date('2022-06-22T18:25:43+0000').getTime(),
      updated: new Date('2022-06-22T18:25:43+0000').getTime(),
    },
    {
      type: 'Order',
      id: '00002003',
      description: 'Cart with 1 item',
      created: new Date('2022-05-30T18:25:43+0000').getTime(),
      updated: new Date('2022-05-31T18:25:43+0000').getTime(),
      category: 'Draft',
    },
    {
      type: 'Order',
      id: '00002006',
      description: 'Cart with 2 items',
      created: new Date('2022-06-05T18:25:43+0000').getTime(),
      updated: new Date('2022-06-06T18:25:43+0000').getTime(),
      category: 'Completed',
    },
  ];

  const mockEmptyText = 'empty list';
  const mockHeaderText = 'Header Text';

  @Component({
    selector: 'cx-test-host',
    template: `
      <cx-asm-customer-table
        [columns]="columns"
        [emptyStateText]="emptyStateText"
        [entries]="entries"
        [headerText]="headerText"
        [pageSize]="pageSize"
        [sortProperty]="sortProperty"
        (selectItem)="itemSelected($event)"
      ></cx-asm-customer-table>
    `,
  })
  class TestHostComponent {
    @Input() columns: Array<CustomerTableColumn>;
    @Input() emptyStateText: string;
    @Input() entries: Array<TableEntry>;
    @Input() headerText: string;
    @Input() pageSize: number;
    @Input() sortProperty: keyof TableEntry;
    itemSelected(): void {}
  }

  let component: AsmCustomerTableComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        TestHostComponent,
        AsmCustomerTableComponent,
        MockTranslatePipe,
        MockCxIconComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    component = fixture.debugElement.query(
      By.directive(AsmCustomerTableComponent)
    ).componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display header text', () => {
    testHost.headerText = mockHeaderText;
    fixture.detectChanges();

    const header = el.query(By.css('.cx-asm-customer-table-heading-text'));
    expect(header.nativeElement.innerText).toBe(mockHeaderText);
  });

  it('should display table', () => {
    testHost.columns = mockColumns;
    testHost.pageSize = 5;
    testHost.emptyStateText = mockEmptyText;
    testHost.sortProperty = mockColumns[0].property;
    testHost.headerText = mockHeaderText;
    testHost.entries = mockEntries;
    fixture.detectChanges();

    const table = el.query(By.css('.cx-asm-customer-table'));
    expect(table).toBeTruthy();

    const tableHeaders = table.queryAll(By.css('th'));
    expect(tableHeaders.length).toBe(mockColumns.length);

    const tableBody = el.query(By.css('tbody'));

    const tableRows = tableBody.queryAll(By.css('tr'));
    expect(tableRows.length).toBe(component.pageSize);
  });

  describe('table pagination', () => {
    beforeEach(() => {
      testHost.columns = mockColumns;
      testHost.pageSize = 5;
      testHost.emptyStateText = mockEmptyText;
      testHost.sortProperty = mockColumns[0].property;
      testHost.headerText = mockHeaderText;
      testHost.entries = mockEntries;

      fixture.autoDetectChanges(true);
    });
    afterEach(() => {
      fixture.autoDetectChanges(false);
    });

    it('should display the list of pages', () => {
      const pages = el.queryAll(
        By.css(
          '.cx-asm-customer-table-heading-pages .cx-asm-customer-table-heading-page'
        )
      );
      expect(pages.length).toBe(component.entryPages.length);
    });

    it('should change the table to the selected page', () => {
      const pages = el.queryAll(
        By.css(
          '.cx-asm-customer-table-heading-pages .cx-asm-customer-table-heading-page'
        )
      );

      pages[1].nativeElement.click();

      const tableBody = el.query(By.css('.cx-asm-customer-table tbody'));
      const tableRows = tableBody.queryAll(By.css('tr'));
      expect(component.currentPageNumber).toBe(1);
      expect(tableRows.length).toBe(3);
    });
  });

  describe('table sort', () => {
    beforeEach(() => {
      testHost.columns = mockColumns;
      testHost.pageSize = 5;
      testHost.emptyStateText = mockEmptyText;
      testHost.sortProperty = mockColumns[0].property;
      testHost.headerText = mockHeaderText;
      testHost.entries = mockEntries;

      fixture.autoDetectChanges(true);
    });
    afterEach(() => {
      fixture.autoDetectChanges(false);
    });

    it('should display the column headers', () => {
      const headers = el.queryAll(By.css('.cx-asm-customer-table-header'));
      expect(headers.length).toBe(component.columns.length);
    });

    it('should sort when click a column header', () => {
      const headers = el.queryAll(By.css('.cx-asm-customer-table-header'));
      const tableRows = el.queryAll(By.css('tbody tr'));
      const cells = tableRows[0].queryAll(By.css('td'));

      expect(cells[0].nativeElement.innerText).toBe('Cart');

      headers[0].nativeElement.click();
      const newTableRows = el.queryAll(By.css('tbody tr'));
      const newCells = newTableRows[0].queryAll(By.css('td'));
      expect(newCells[0].nativeElement.innerText).toBe('Ticket');
    });
  });
});
