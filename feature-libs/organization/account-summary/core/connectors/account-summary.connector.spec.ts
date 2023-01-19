import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentQueryParams,
  DocumentStatus,
  FilterByOptions,
} from '../../root/model';
import { AccountSummaryAdapter } from './account-summary.adapter';
import { AccountSummaryConnector } from './account-summary.connector';
import createSpy = jasmine.createSpy;

const userId = 'userId';
const orgUnitId = 'orgUnit';
const orgDocumentId = 'document-test-id';
const orgDocumentAttachmentId = 'attachment-test-id';

const queryParams: DocumentQueryParams = {
  status: DocumentStatus.ALL,
  filterByKey: FilterByOptions.DOCUMENT_NUMBER,
  page: 0,
  pageSize: 10,
  sort: 'byDocumentDateAsc',
};

const accountSummaryResult: AccountSummaryDetails = {
  orgUnit: {
    uid: '1234',
    name: 'Custom Retail',
  },
};

const accountSummaryDocumentsResult: AccountSummaryList = {
  orgDocumentTypes: [
    {
      code: 'Purchase Order',
      name: 'Purchase Order',
    },
    {
      code: 'Invoice',
      name: 'Invoice',
    },
    {
      code: 'Credit Note',
      name: 'Credit Note',
    },
    {
      code: 'Debit Note',
      name: 'Debit Note',
    },
    {
      code: 'Statement',
      name: 'Statement',
    },
  ],
  orgDocuments: [
    {
      id: 'POCR-0000001',
    },
  ],
};

const accountSummaryAttachmentFile = new Blob();
class MockAccountSummaryAdapter implements AccountSummaryAdapter {
  getDocumentAttachment = createSpy('getDocumentAttachment').and.returnValue(
    accountSummaryAttachmentFile
  );

  getAccountSummary = createSpy('getAccountSummary').and.returnValue(
    of(accountSummaryResult)
  );
  getDocumentList = createSpy('getDocumentList').and.returnValue(
    of(accountSummaryDocumentsResult)
  );
}

describe('AccountSummaryConnector', () => {
  let service: AccountSummaryConnector;
  let adapter: AccountSummaryAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountSummaryConnector,
        { provide: AccountSummaryAdapter, useClass: MockAccountSummaryAdapter },
      ],
    });

    service = TestBed.inject(AccountSummaryConnector);
    adapter = TestBed.inject(AccountSummaryAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should load account summary', () => {
    service.getAccountSummary(userId, orgUnitId);
    expect(adapter.getAccountSummary).toHaveBeenCalledWith(userId, orgUnitId);
  });

  it('it should load account summary documents', () => {
    service.getDocumentList(userId, orgUnitId, queryParams);
    expect(adapter.getDocumentList).toHaveBeenCalledWith(
      userId,
      orgUnitId,
      queryParams
    );
  });

  it('it should load account summary document attachments', () => {
    service.getDocumentAttachment(
      userId,
      orgUnitId,
      orgDocumentId,
      orgDocumentAttachmentId
    );
    expect(adapter.getDocumentAttachment).toHaveBeenCalledWith(
      userId,
      orgUnitId,
      orgDocumentId,
      orgDocumentAttachmentId
    );
  });
});
