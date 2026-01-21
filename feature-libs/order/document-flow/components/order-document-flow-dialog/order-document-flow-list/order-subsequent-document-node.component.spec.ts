import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { OrderSubsequentDocument } from '@spartacus/order/document-flow/root';
import { IconModule } from '@spartacus/storefront';
import { OrderSubsequentDocumentNodeComponent } from './order-subsequent-document-node.component';

const subsequentDocumentsData: OrderSubsequentDocument[] = [
  {
    sapDocumentId: 'doc_id1',
    sapDocumentCategory: 'category1',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [
      {
        sapDocumentId: 'doc_id11',
        sapDocumentCategory: 'category1',
        sapDocumentEntryIdColumnName: 'Outbound delivery',
        sapSubsequentDocuments: [
          {
            sapDocumentId: 'doc_id111',
            sapDocumentCategory: 'category1',
            sapDocumentEntryIdColumnName: 'Picking Request',
            sapSubsequentDocuments: [],
            sapCreatedAt: new Date(),
            sapStatus: 'open',
          },
        ],
        sapCreatedAt: new Date(),
        sapStatus: 'open',
      },
    ],
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

describe('OrderSubsequentDocumentNodeComponent', () => {
  let component: OrderSubsequentDocumentNodeComponent;
  let fixture: ComponentFixture<OrderSubsequentDocumentNodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconModule,
        OrderSubsequentDocumentNodeComponent,
      ],
      providers: [],
    })
      .overrideComponent(OrderSubsequentDocumentNodeComponent, {
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
    fixture = TestBed.createComponent(OrderSubsequentDocumentNodeComponent);
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

  it('should return true if document have subsequent documents', () => {
    expect(component.haveSubNodes(subsequentDocumentsData[0])).toBeTruthy();
  });

  it('should return false if document does not have subsequent documents', () => {
    expect(component.haveSubNodes(subsequentDocumentsData[1])).toBeFalsy();
    expect(component.haveSubNodes(subsequentDocumentsData[2])).toBeFalsy();
  });

  it('should return false if document does not have subsequent documents', () => {
    expect(component.haveSubNodes(subsequentDocumentsData[1])).toBeFalsy();
    expect(component.haveSubNodes(subsequentDocumentsData[2])).toBeFalsy();
  });

  it('should display button for document rows with subsequent documents', () => {
    component.documents = subsequentDocumentsData;
    fixture.detectChanges();

    const buttonEls = fixture.debugElement.queryAll(By.css('td button'));
    expect(buttonEls.length).toBe(2);
  });

  it('should not display button for document rows without subsequent documents', () => {
    component.documents = subsequentDocumentsData.slice(1);
    fixture.detectChanges();

    const buttonEls = fixture.debugElement.queryAll(By.css('td button'));
    expect(buttonEls.length).toBe(0);
  });

  it('should add class to selected document row', () => {
    component.documents = subsequentDocumentsData;
    component.selectedDocument = subsequentDocumentsData[0];
    fixture.detectChanges();

    const selectedRowEls = fixture.debugElement.queryAll(By.css('tr.selected'));
    expect(selectedRowEls.length).toBe(1);
  });

  it('should display all document tree nodes', () => {
    component.documents = subsequentDocumentsData;
    fixture.detectChanges();

    const documentRowEls = fixture.debugElement.queryAll(By.css('tr'));
    const documentTreeNodeEls = fixture.debugElement.queryAll(
      By.css('cx-order-subsequent-document-node')
    );
    expect(documentRowEls.length).toBe(5);
    expect(documentTreeNodeEls.length).toBe(2);
  });
});
