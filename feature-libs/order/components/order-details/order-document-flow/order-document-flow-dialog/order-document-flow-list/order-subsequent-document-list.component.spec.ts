import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SapOrderSubsequentDocument } from '@spartacus/order/root';

import { OrderSubsequentDocumentList } from '@spartacus/order/components';
import { I18nTestingModule } from '@spartacus/core';

const subsequentDocumentsData: SapOrderSubsequentDocument[] = [
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

describe('OrderSubsequentDocumentList', () => {
  let component: OrderSubsequentDocumentList;
  let fixture: ComponentFixture<OrderSubsequentDocumentList>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [OrderSubsequentDocumentList],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSubsequentDocumentList);
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
