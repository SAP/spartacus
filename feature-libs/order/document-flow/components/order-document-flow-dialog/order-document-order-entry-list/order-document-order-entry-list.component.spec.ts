import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { OrderSubsequentDocumentEntry } from '@spartacus/order/document-flow/root';
import { OrderDocumentOrderEntryListComponent } from './order-document-order-entry-list.component';

const subsequentDocumentEntryData: OrderSubsequentDocumentEntry[] = [
  {
    sapSubsequentDocumentEntryNumber: '1',
    sapOrderEntryNumber: '1',
    sapCreatedAt: new Date(),
    sapStatus: 'completed',
  },
  {
    sapSubsequentDocumentEntryNumber: '2',
    sapOrderEntryNumber: '1',
    sapCreatedAt: new Date(),
    sapStatus: 'completed',
  },
  {
    sapSubsequentDocumentEntryNumber: '3',
    sapOrderEntryNumber: '1',
    sapCreatedAt: new Date(),
    sapStatus: 'completed',
  },
];

describe('OrderDocumentOrderEntryListComponent', () => {
  let component: OrderDocumentOrderEntryListComponent;
  let fixture: ComponentFixture<OrderDocumentOrderEntryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, OrderDocumentOrderEntryListComponent],
      providers: [],
    })
      .overrideComponent(OrderDocumentOrderEntryListComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDocumentOrderEntryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all document entries', () => {
    component.entries = subsequentDocumentEntryData;
    fixture.detectChanges();

    const documentRowEls = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(documentRowEls.length).toBe(3);
  });
});
