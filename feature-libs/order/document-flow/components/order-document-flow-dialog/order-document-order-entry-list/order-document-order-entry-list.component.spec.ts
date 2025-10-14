import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { I18nTestingModule } from '@spartacus/core';
import { OrderDocumentOrderEntryListComponent } from './order-document-order-entry-list.component';
import { By } from '@angular/platform-browser';
import { SapOrderSubsequentDocumentEntry } from '@spartacus/order/document-flow/root';

const subsequentDocumentEntryData: SapOrderSubsequentDocumentEntry[] = [
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
      imports: [I18nTestingModule],
      declarations: [OrderDocumentOrderEntryListComponent],
      providers: [],
    }).compileComponents();
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
