/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpClient,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
} from '@spartacus/core';
import { delay, Observable, of } from 'rxjs';
import { OrderDocumentFlowAdapter } from '@spartacus/order/core';
import { SapOrderSubsequentDocuments } from '@spartacus/order/root';
import { SapOrderSubsequentDocument, SapOrderSubsequentDocumentEntry } from '../../root/model';

@Injectable()
export class OccOrderDocumentFlowAdapter implements OrderDocumentFlowAdapter {
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  protected converter = inject(ConverterService);

  getOrderSubsequentDocuments(
    userId: string,
    orderId: string,
  ): Observable<SapOrderSubsequentDocuments> {
    console.log(userId, orderId);

    const hugeTestObject: SapOrderSubsequentDocuments = {
      sapOrderSubsequentDocuments: generateTestData(5)
    };

    return of(hugeTestObject).pipe(
      delay(2000)
    );;

    //const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // return this.http
    //   .get(this.getOrderAttachmentsUrl(orderId, userId), { headers })
    //   .pipe(
    //     catchError((error) => {
    //       throw tryNormalizeHttpError(error, this.logger);
    //     })
    //   );
  }

  getOrderSubsequentDocumentEntries(
    userId: string,
    orderId: string,
    documentId: string,
  ): Observable<SapOrderSubsequentDocumentEntry[]> {
    console.log(userId, orderId, documentId);

    const sapOrderSubsequentDocumentEntries: SapOrderSubsequentDocumentEntry[] = [];

    for (let i = 1; i <= 1; i++) {
      sapOrderSubsequentDocumentEntries.push({
        sapSubsequentDocumentEntryNumber: `Entry${i}`,
        sapOrderEntryNumber: `Order${i}`,
        sapCreatedAt: new Date(),
        sapStatus: i % 2 === 0 ? "Active" : "Pending"
      });
    }


    return of(sapOrderSubsequentDocumentEntries).pipe(
      delay(1000)
    );
  }

  // protected getOrderAttachmentsUrl(orderId: string, userId: string): string {
  //   return this.occEndpoints.buildUrl('orderAttachments', {
  //     urlParams: {
  //       userId,
  //       orderId,
  //     },
  //   });
  // }
}


const generateTestData = (depth: number, currentDepth: number = 0): SapOrderSubsequentDocument[] => {
  const testData: SapOrderSubsequentDocument[] = [];
  const numEntries = currentDepth === 0 ? 2 : 1;

  for (let i = 1; i <= numEntries; i++) {
    const entry: SapOrderSubsequentDocument = {
      sapDocumentId: `${currentDepth}-${i}`,
      sapDocumentCategory: `Category `,
      sapDocumentEntryIdColumnName: `Entry-${currentDepth}-${i}`,
      sapCreatedAt: new Date(),
      sapStatus: i % 2 === 0 ? 'Active' : 'Pending',
    };

    if (currentDepth < depth) {
      entry.sapSubsequentDocuments = generateTestData(depth, currentDepth + 1);
    }

    testData.push(entry);
  }

  return testData;
};
