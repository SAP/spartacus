/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderAttachments } from '@spartacus/s4om/root';
import { OrderAttachmentsAdapter } from './order-attachments.adapter';
import { OrderAttachmentsConnector } from './order-attachments.connector';

const userId = '123';
const orderCode = '00001004';
const attachmentId = 'a_123';
const attachmentsData: OrderAttachments = {
  attachments: [
    {
      attachmentId: attachmentId,
      fileName: 'a123',
    },
  ],
};
const blobData: Blob = new Blob(['mock content'], { type: 'application/pdf' });

class MockOrderAttachmentsAdapter implements Partial<OrderAttachmentsAdapter> {
  getOrderAttachments() {
    return of(attachmentsData);
  }

  getOrderAttachment() {
    return of(blobData);
  }
}

describe('OrderAttachmentsConnector', () => {
  let service: OrderAttachmentsConnector;
  let adapter: OrderAttachmentsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderAttachmentsConnector,
        {
          provide: OrderAttachmentsAdapter,
          useClass: MockOrderAttachmentsAdapter,
        },
      ],
    });

    service = TestBed.inject(OrderAttachmentsConnector);
    adapter = TestBed.inject(OrderAttachmentsAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getOrderAttachments call adapter', () => {
    spyOn(adapter, 'getOrderAttachments').and.callThrough();
    service.getOrderAttachments(userId, orderCode).subscribe((result) =>
      expect(result).toBe(attachmentsData),
    ).unsubscribe();
    expect(adapter.getOrderAttachments).toHaveBeenCalled();
  });

  it('should getOrderAttachment call adapter', () => {
    spyOn(adapter, 'getOrderAttachment').and.callThrough();
    service.getOrderAttachment(userId, orderCode, attachmentId).subscribe((result) =>
      expect(result).toEqual(blobData),
    ).unsubscribe();
    expect(adapter.getOrderAttachment).toHaveBeenCalled();
  });
});
