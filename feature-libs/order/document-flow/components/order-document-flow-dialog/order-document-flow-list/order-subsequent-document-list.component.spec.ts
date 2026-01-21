import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { I18nTestingModule } from '@spartacus/core';
import { OrderSubsequentDocument } from '@spartacus/order/document-flow/root';
import { OrderSubsequentDocumentListComponent } from './order-subsequent-document-list.component';

const subsequentDocumentsData: OrderSubsequentDocument[] = [
  {
    sapDocumentId: 'doc_id1',
    sapDocumentCategory: 'category1',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [],
    sapCreatedAt: new Date(),
    sapStatus: 'open',
  },
  {
    sapDocumentId: 'doc_id2',
    sapDocumentCategory: 'category1',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [],
    sapCreatedAt: new Date(),
    sapStatus: 'open',
  },
  {
    sapDocumentId: 'doc_id3',
    sapDocumentCategory: 'category2',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [],
    sapCreatedAt: new Date(),
    sapStatus: 'open',
  },
];

describe('OrderSubsequentDocumentListComponent', () => {
  let component: OrderSubsequentDocumentListComponent;
  let fixture: ComponentFixture<OrderSubsequentDocumentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, OrderSubsequentDocumentListComponent],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSubsequentDocumentListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected document', () => {
    spyOn(component.documentSelected, 'emit').and.callThrough();
    component.onDocumentSelection(subsequentDocumentsData[0]);

    expect(component.documentSelected.emit).toHaveBeenCalledTimes(1);
    expect(component.documentSelected.emit).toHaveBeenCalledWith(
      subsequentDocumentsData[0]
    );
  });
});
