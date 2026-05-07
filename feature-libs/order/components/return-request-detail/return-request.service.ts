/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OrderEntryGroup } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import {
  OrderReturnRequestFacade,
  ReturnRequest,
  ReturnRequestEntry,
} from '@spartacus/order/root';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReturnRequestService {
  constructor(
    protected routingService: RoutingService,
    protected returnRequestService: OrderReturnRequestFacade,
    protected globalMessageService: GlobalMessageService
  ) {}

  get isCancelling$(): Observable<boolean> {
    return this.returnRequestService.getCancelReturnRequestLoading();
  }

  get isCancelSuccess$(): Observable<boolean> {
    return this.returnRequestService.getCancelReturnRequestSuccess();
  }

  /**
   * Returns EntryGroups
   */
  getOrderEntryGroups(): Observable<OrderEntryGroup[]> {
    return this.getReturnRequest().pipe(
      map((returnRequest) => returnRequest.order),
      pluck('entryGroups'),
      filter((entryGroups: any) => entryGroups.length)
    );
  }

  /**
   * Extracts return entry numbers from a given entries array using a specified extraction function.
   * @param entries The array of entries to process.
   * @param extractEntryNumber Optional function to extract the entryNumber from an entry.
   * @returns An array of entry numbers.
   */
  private getEntryNumbers<T>(
    entries: T[] | undefined,
    extractEntryNumber?: (entry: T) => number | undefined
  ): number[] {
    if (!entries) return [];
    return entries
      .map(
        (entry) =>
          extractEntryNumber?.(entry) || (entry as any)?.orderEntry?.entryNumber
      )
      .filter((num): num is number => num !== undefined);
  }

  /**
   * Recursively finds matching entry groups based on entry numbers.
   * @param group The current entry group to check.
   * @param entryNumbers A list of entry numbers to match.
   * @returns A new entry group object with matched children, or null if no match is found.
   */
  private findMatchingEntryGroups(
    group: OrderEntryGroup,
    entryNumbers: number[],
    returnEntries: ReturnRequestEntry[] | undefined
  ): OrderEntryGroup | null {
    // Check if the current group matches the entry numbers
    const matches = group.entries?.some((entry) =>
      entryNumbers.includes(entry.entryNumber || 0)
    );
    if (returnEntries?.length)
      if (matches) {
        const entries: any = group.entries?.map((groupItem) => {
          for (let entry of returnEntries) {
            if (entry.orderEntry?.entryNumber === groupItem.entryNumber) {
              groupItem = { ...entry.orderEntry };
              // creat Return Quantity and total price
              groupItem.expectedQuantity = entry.expectedQuantity;
              groupItem.refundAmount = {
                formattedValue: entry.refundAmount?.formattedValue,
              };
              return {
                ...groupItem,
              };
            }
          }
        });

        return {
          ...group,
          entries: entries,
          entryGroups: group.entryGroups
            ?.map((childGroup) =>
              this.findMatchingEntryGroups(
                childGroup,
                entryNumbers,
                returnEntries
              )
            )
            .filter(Boolean) as OrderEntryGroup[],
        };
      }

    // Check if any child groups match the entry numbers
    if (group.entryGroups?.length) {
      const matchedChildren = group.entryGroups
        .map((childGroup) =>
          this.findMatchingEntryGroups(childGroup, entryNumbers, returnEntries)
        )
        .filter(Boolean) as OrderEntryGroup[];

      if (matchedChildren.length) {
        return { ...group, entryGroups: matchedChildren };
      }
    }

    return null; // Return null if no match is found
  }

  getRequestOrderEntryGroups(
    returnRequest: Observable<ReturnRequest>,
    entryGroups: Observable<OrderEntryGroup[]>
  ): Observable<OrderEntryGroup[]> {
    return combineLatest([returnRequest, entryGroups]).pipe(
      map(([request, entrys]) => {
        const returnEntriesNumbers = this.getEntryNumbers(
          request.returnEntries,
          (entry) => entry.orderEntry?.entryNumber
        );
        const filterEntryBindGroups = entrys
          ?.map((group) =>
            this.findMatchingEntryGroups(
              group,
              returnEntriesNumbers,
              request.returnEntries
            )
          )
          .filter(Boolean) as OrderEntryGroup[];

        return filterEntryBindGroups;
      })
    );
  }
  getReturnRequest(): Observable<ReturnRequest> {
    return combineLatest([
      this.routingService.getRouterState(),
      this.returnRequestService.getOrderReturnRequest(),
      this.returnRequestService.getReturnRequestLoading(),
    ]).pipe(
      map(([routingState, returnRequest, isLoading]) => [
        routingState.state.params['returnCode'],
        returnRequest,
        isLoading,
      ]),
      filter(([returnCode]) => Boolean(returnCode)),
      tap(([returnCode, returnRequest, isLoading]) => {
        if (
          (returnRequest === undefined || returnRequest.rma !== returnCode) &&
          !isLoading
        ) {
          this.returnRequestService.loadOrderReturnRequestDetail(returnCode);
        }
      }),
      map(([_, returnRequest]) => returnRequest),
      filter((returnRequest) => Boolean(returnRequest)),
      distinctUntilChanged()
    );
  }

  clearReturnRequest(): void {
    this.returnRequestService.clearOrderReturnRequestDetail();
  }

  cancelReturnRequest(returnRequestCode: string): void {
    this.returnRequestService.cancelOrderReturnRequest(returnRequestCode, {
      status: 'CANCELLING',
    });
  }

  cancelSuccess(rma: string): void {
    this.returnRequestService.resetCancelReturnRequestProcessState();
    this.globalMessageService.add(
      {
        key: 'returnRequest.cancelSuccess',
        params: { rma },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routingService.go({
      cxRoute: 'orders',
    });
  }

  backToList(): void {
    this.routingService.go(
      { cxRoute: 'orders' },
      {
        state: {
          activeTab: 1,
        },
      }
    );
  }
}
