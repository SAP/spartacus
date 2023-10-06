import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ArgsPipe } from '@spartacus/asm/core';
import {
  Customer360SupportTicketList,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import {
  I18nTestingModule,
  LanguageService,
  TranslationService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { AsmCustomer360TableComponent } from '../../asm-customer-360-table/asm-customer-360-table.component';

import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';

import { AsmCustomer360SupportTicketsComponent } from './asm-customer-360-support-tickets.component';

describe('Customer360SupportTicketsComponent', () => {
  class MockLanguageService {
    getActive(): Observable<string> {
      return of('en-US');
    }
  }
  class MockTranslationService {
    translate(): Observable<string> {
      return of('test');
    }
  }
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

  let component: AsmCustomer360SupportTicketsComponent;
  let fixture: ComponentFixture<AsmCustomer360SupportTicketsComponent>;
  let el: DebugElement;
  let contextSource: Customer360SectionContextSource<Customer360SupportTicketList>;

  const supportTicketList: Customer360SupportTicketList = {
    type: Customer360Type.SUPPORT_TICKET_LIST,
    tickets: [
      {
        id: '00000001',
        subject: 'Ticket Subject 00000001',
        category: {
          code: 'Enquiry',
          name: 'Enquiry',
        },
        status: {
          code: 'Open',
          name: 'Open',
        },
        createdAt: '2023-03-02T10:02:39+08:00',
        updatedAt: '2023-03-02T10:02:39+08:00',
      },
      {
        id: '00000002',
        subject: 'Ticket Subject 00000002',
        category: {
          code: 'Complaint',
          name: 'Complaint',
        },
        status: {
          code: 'Closed',
          name: 'Closed',
        },
        createdAt: '2023-03-02T10:02:39+08:00',
        updatedAt: '2023-03-02T10:02:39+08:00',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomer360SupportTicketsComponent,
        MockTranslatePipe,
        MockCxIconComponent,
        AsmCustomer360TableComponent,
        ArgsPipe,
      ],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    contextSource = TestBed.inject(Customer360SectionContextSource);
    contextSource.data$.next(supportTicketList);
    contextSource.config$.next({
      pageSize: 5,
    });

    fixture = TestBed.createComponent(AsmCustomer360SupportTicketsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have entries', () => {
    expect(component.supportTicketsColumns.length).toBe(6);
  });

  it('should display the column headers', () => {
    const headers = el.queryAll(By.css('.cx-asm-customer-360-table-header'));
    expect(headers.length).toBe(component.supportTicketsColumns.length);
  });

  it('should display table', () => {
    const tableBody = el.query(By.css('.cx-asm-customer-360-table tbody'));
    const tableRows = tableBody?.queryAll(By.css('tr'));
    expect(tableRows.length).toBe(2);
  });

  it('should navigate ticket', () => {
    spyOn(contextSource.navigate$, 'next').and.stub();
    const tableBody = el.query(By.css('.cx-asm-customer-360-table tbody'));
    const tableRows = tableBody.queryAll(By.css('tr'));
    const linkCell = tableRows[0].query(
      By.css('.cx-asm-customer-360-table-link')
    );
    linkCell.nativeElement.click();
    expect(contextSource.navigate$.next).toHaveBeenCalledWith({
      cxRoute: 'supportTicketDetails',
      params: { ticketCode: '00000001' },
    });
  });
});
