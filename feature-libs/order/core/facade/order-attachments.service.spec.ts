/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  OrderAttachmentsConnector,
  OrderAttachmentsService,
} from '@spartacus/order/core';
import { UserIdService } from '@spartacus/core';
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

class MockOrderAttachmentsConnector
  implements Partial<OrderAttachmentsConnector>
{
  getOrderAttachments() {
    return of(attachmentsData);
  }

  downloadOrderAttachment() {
    return of(blobData);
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(userId);
  }
}

describe('OrderAttachmentsService', () => {
  let service: OrderAttachmentsService;
  let connector: OrderAttachmentsConnector;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderAttachmentsService,
        {
          provide: OrderAttachmentsConnector,
          useClass: MockOrderAttachmentsConnector,
        },
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
      ],
    });

    service = TestBed.inject(OrderAttachmentsService);
    connector = TestBed.inject(OrderAttachmentsConnector);
    userIdService = TestBed.inject(UserIdService);
  });

  beforeEach(() => {
    spyOn(connector, 'getOrderAttachments').and.callThrough();
    spyOn(connector, 'downloadOrderAttachment').and.callThrough();
    spyOn(userIdService, 'takeUserId').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getOrderAttachments call connector', (done) => {
    service
      .getOrderAttachments(orderCode)
      .subscribe((result) => {
        expect(result).toEqual(attachmentsData);
        done();
      })
      .unsubscribe();
    expect(connector.getOrderAttachments).toHaveBeenCalled();
  });

  it('should getOrderAttachment call connector', (done) => {
    service
      .downloadOrderAttachment(orderCode, attachmentId)
      .subscribe((result) => {
        expect(result).toEqual(blobData);
        done();
      })
      .unsubscribe();
    expect(connector.downloadOrderAttachment).toHaveBeenCalled();
  });
});
