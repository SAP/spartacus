/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  GlobalMessageType,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  OrderAttachment,
  OrderAttachmentsFacade,
  OrderConfig,
} from '@spartacus/order/root';
import {
  FocusConfig,
  FocusDirective,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
  MessageComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import { EMPTY, Observable, of, share } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-attachments-dialog',
  templateUrl: './order-attachments-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FocusDirective,
    NgIf,
    IconComponent,
    NgFor,
    MessageComponent,
    NgClass,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class OrderAttachmentsDialogComponent {
  protected config = inject(OrderConfig);
  protected launchDialogService = inject(LaunchDialogService);
  protected orderAttachmentsFacade = inject(OrderAttachmentsFacade);
  protected translation = inject(TranslationService);
  protected cd = inject(ChangeDetectorRef);
  protected destroyRef = inject(DestroyRef);

  globalMessageType = GlobalMessageType;
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  orderCode$: Observable<string> = this.launchDialogService.data$.pipe(
    map((data) => data.orderCode)
  );
  attachments$: Observable<OrderAttachment[]> = this.orderCode$.pipe(
    switchMap((orderId) =>
      this.orderAttachmentsFacade.getOrderAttachments(orderId)
    ),
    map((attachments) => attachments.sapAttachments ?? []),
    catchError(() => {
      this.loadError.set(true);
      return of([]);
    }),
    share()
  );
  loadError = signal(false);
  attachmentsCount = toSignal(
    this.attachments$.pipe(map((attachments) => attachments.length)),
    { initialValue: 0 }
  );
  loadingAttachments: string[] = [];
  erroredAttachments: string[] = [];
  errorCounter = 0;

  openOrderAttachment(attachmentId: string, fileName?: string): void {
    this.orderCode$
      .pipe(
        filter(() => !this.loadingAttachments.includes(attachmentId)),
        tap(() => this.setAttachmentLoadingState(attachmentId, true)),
        switchMap((orderId) =>
          this.orderAttachmentsFacade.downloadOrderAttachment(
            orderId,
            attachmentId
          )
        ),
        tap((blob) => {
          if (
            blob.type &&
            this.config.orderAttachments?.previewMimeTypes.includes(
              blob.type.split(';')[0]
            )
          ) {
            this.previewFile(blob);
            return;
          }

          this.downloadFile(blob, fileName as string);
        }),
        tap(() => this.setAttachmentLoadingState(attachmentId, false)),
        catchError(() => {
          this.setAttachmentLoadingState(attachmentId, false);
          this.addErrorMessage(attachmentId);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  previewFile(blob: Blob): void {
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank', 'noopener,noreferrer');
  }

  downloadFile(blob: Blob, fileName: string): void {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onMouseDown(
    event: MouseEvent,
    attachmentId: string,
    fileName?: string
  ): void {
    const leftMouseButton = 0;
    const middleMouseButton = 1;
    if (
      event.button === leftMouseButton ||
      event.button === middleMouseButton
    ) {
      this.openOrderAttachment(attachmentId, fileName);
    }
  }

  setAttachmentLoadingState(attachmentId: string, state: boolean): void {
    if (state) {
      this.loadingAttachments.push(attachmentId);
    } else {
      this.loadingAttachments = this.loadingAttachments.filter(
        (id) => id !== attachmentId
      );
    }
    this.cd.detectChanges();
  }

  addErrorMessage(attachmentId: string): void {
    this.erroredAttachments.push(`${attachmentId}_${this.errorCounter}`);
    this.errorCounter++;
    this.cd.detectChanges();
  }

  closeErrorMessage(attachmentId: string): void {
    this.erroredAttachments = this.erroredAttachments.filter(
      (id) => id !== attachmentId
    );
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
