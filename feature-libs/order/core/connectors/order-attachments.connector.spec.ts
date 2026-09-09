/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import {
  OrderAttachmentsAdapter,
  OrderAttachmentsConnector,
} from '@spartacus/order/core';
import { OrderAttachments } from '@spartacus/order/root';

const userId = '123';
const orderCode = '00001004';
const attachmentId = 'a_123';
const attachmentsData: OrderAttachments = {
  sapAttachments: [
    {
      sapAttachmentId: attachmentId,
      sapFileName: 'a123',
    },
  ],
};
const blobData: Blob = new Blob(['mock content'], { type: 'application/pdf' });

class MockOrderAttachmentsAdapter implements Partial<OrderAttachmentsAdapter> {
  getOrderAttachments() {
    return of(attachmentsData);
  }

  downloadOrderAttachment() {
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

  it('should getOrderAttachments call adapter', async () => {
    vi.spyOn(adapter, 'getOrderAttachments');
    const result = await firstValueFrom(
      service.getOrderAttachments(userId, orderCode)
    );
    expect(result).toBe(attachmentsData);
    expect(adapter.getOrderAttachments).toHaveBeenCalled();
  });

  it('should getOrderAttachment call adapter', async () => {
    vi.spyOn(adapter, 'downloadOrderAttachment');
    const result = await firstValueFrom(
      service.downloadOrderAttachment(userId, orderCode, attachmentId)
    );
    expect(result).toEqual(blobData);
    expect(adapter.downloadOrderAttachment).toHaveBeenCalled();
  });
});
