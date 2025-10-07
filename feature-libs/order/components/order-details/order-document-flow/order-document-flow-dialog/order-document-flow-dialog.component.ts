/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import {
  GlobalMessageType,
  TranslationService,
  isNotNullable,
} from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  OrderDocumentFlowFacade,
  SapOrderSubsequentDocument,
  SapOrderSubsequentDocumentEntry,
} from '@spartacus/order/root';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cx-order-document-flow-dialog',
  templateUrl: './order-document-flow-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderDocumentFlowDialogComponent {
  protected launchDialogService = inject(LaunchDialogService);
  protected orderDocumentFlowFacade = inject(OrderDocumentFlowFacade);
  protected translation = inject(TranslationService);
  protected cd = inject(ChangeDetectorRef);
  protected destroyRef = inject(DestroyRef);
  @ViewChild('scrollContainer') scrollContainerRef: ElementRef;
  protected savedScrollPosition = 0;

  globalMessageType = GlobalMessageType;
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  displayDocumentEntries = signal(false);

  orderCode$: Observable<string> = this.launchDialogService.data$.pipe(
    map((data) => data.orderCode)
  );

  documents$: Observable<SapOrderSubsequentDocument[]> = this.orderCode$.pipe(
    switchMap((orderId) =>
      this.orderDocumentFlowFacade.getOrderSubsequentDocuments(orderId)
    ),
    catchError(() => {
      this.loadError.set(true);
      return of([]);
    }),
    takeUntilDestroyed(this.destroyRef),
    shareReplay()
  );
  loadError = signal(false);

  protected selectedDocumentSubject = new BehaviorSubject<
    SapOrderSubsequentDocument | undefined
  >(undefined);
  selectedDocument$: Observable<SapOrderSubsequentDocument | undefined> =
    this.selectedDocumentSubject.asObservable();

  protected documentEntriesCache = new Map<
    string,
    SapOrderSubsequentDocumentEntry[]
  >();
  selectedDocumentEntries$: Observable<SapOrderSubsequentDocumentEntry[]> =
    this.selectedDocument$.pipe(
      filter(isNotNullable),
      withLatestFrom(this.orderCode$),
      switchMap(([document, orderCode]) => {
        const cachedEntries = this.documentEntriesCache.get(
          document.sapDocumentId ?? ''
        );
        if (cachedEntries) {
          return of(cachedEntries);
        }

        return this.orderDocumentFlowFacade
          .getOrderSubsequentDocumentEntries(
            orderCode,
            document.sapDocumentCategory ?? '',
            document.sapDocumentId ?? ''
          )
          .pipe(
            tap((entries) =>
              this.cacheDocumentEntries(document.sapDocumentId ?? '', entries)
            )
          );
      }),
      catchError(() => {
        this.loadError.set(true);
        return of([]);
      })
    );

  onDocumentSelection(document: SapOrderSubsequentDocument): void {
    this.saveScrollPosition();
    this.selectedDocumentSubject.next(document);
    this.displayDocumentEntries.set(true);
  }

  goBack(): void {
    this.displayDocumentEntries.set(false);
    this.loadError.set(false);
    this.restoreScrollPosition();
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  protected cacheDocumentEntries(
    documentId: string,
    entries: SapOrderSubsequentDocumentEntry[]
  ): void {
    if (entries.length > 0) {
      this.documentEntriesCache.set(documentId, entries);
    }
  }

  protected saveScrollPosition(): void {
    this.savedScrollPosition = this.scrollContainerRef.nativeElement.scrollTop;
  }

  protected restoreScrollPosition(): void {
    setTimeout(() => {
      this.scrollContainerRef.nativeElement.scrollTop =
        this.savedScrollPosition;
    }, 0);
  }
}
