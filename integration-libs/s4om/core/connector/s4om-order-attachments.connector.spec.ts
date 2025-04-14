/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { S4omOrderAttachments } from '@spartacus/s4om/root';
import { S4omOrderAttachmentsAdapter } from './s4om-order-attachments.adapter';
import { S4omOrderAttachmentsConnector } from './s4om-order-attachments-connector.service';

const userId = '123';
const orderCode = '00001004';
const attachmentId = 'a_123';
const attachmentsData: S4omOrderAttachments = {
  attachments: [
    {
      attachmentId: attachmentId,
      fileName: 'a123',
    },
  ],
};
const blobData: Blob = new Blob(['mock content'], { type: 'application/pdf' });

class MockOrderAttachmentsAdapter implements Partial<S4omOrderAttachmentsAdapter> {
  getOrderAttachments() {
    return of(attachmentsData);
  }

  downloadOrderAttachment() {
    return of(blobData);
  }
}

describe('OrderAttachmentsConnector', () => {
  let service: S4omOrderAttachmentsConnector;
  let adapter: S4omOrderAttachmentsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        S4omOrderAttachmentsConnector,
        {
          provide: S4omOrderAttachmentsAdapter,
          useClass: MockOrderAttachmentsAdapter,
        },
      ],
    });

    service = TestBed.inject(S4omOrderAttachmentsConnector);
    adapter = TestBed.inject(S4omOrderAttachmentsAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getOrderAttachments call adapter', (done) => {
    spyOn(adapter, 'getOrderAttachments').and.callThrough();
    service.getOrderAttachments(userId, orderCode).subscribe((result) => {
        expect(result).toBe(attachmentsData);
        done();
      }
    ).unsubscribe();
    expect(adapter.getOrderAttachments).toHaveBeenCalled();
  });

  it('should getOrderAttachment call adapter', (done) => {
    spyOn(adapter, 'downloadOrderAttachment').and.callThrough();
    service.downloadOrderAttachment(userId, orderCode, attachmentId).subscribe((result) => {
        expect(result).toEqual(blobData);
        done();
      }
    ).unsubscribe();
    expect(adapter.downloadOrderAttachment).toHaveBeenCalled();
  });
});
