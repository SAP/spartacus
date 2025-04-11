/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DestroyRef, inject,
  Inject,
  OnInit,
} from '@angular/core';
import {
  GlobalMessageType,
  TranslationService,
} from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of, share } from 'rxjs';
import { catchError, map, switchMap, tap, filter } from 'rxjs/operators';
import {
  S4OM_ORDER_ATTACHMENTS_PREVIEW_MIME_TYPES,
  S4OMOrderAttachmentsPreviewMimeTypesConfig,
} from '../../config/order-attachments-mime-types.config';
import { OrderAttachment } from '../../../root/model';
import { OrderAttachmentsFacade } from '../../../core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cx-order-attachments-dialog',
  templateUrl: './attachments-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AttachmentsDialogComponent implements OnInit {
  protected destroyRef = inject(DestroyRef);
  globalMessageType = GlobalMessageType;
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  orderCode$: Observable<string>;
  attachments$: Observable<OrderAttachment[]>;
  attachmentsCount$: Observable<number>;
  error$ = new BehaviorSubject(false);

  loadingAttachments: string[] = [];
  erroredAttachments: string[] = [];
  errorCounter = 0;

  constructor(
    @Inject(S4OM_ORDER_ATTACHMENTS_PREVIEW_MIME_TYPES) public config: S4OMOrderAttachmentsPreviewMimeTypesConfig,
    protected launchDialogService: LaunchDialogService,
    protected orderAttachmentsFacade: OrderAttachmentsFacade,
    protected translation: TranslationService,
    protected cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.initializeOrderCode();
    this.initializeAttachments();
    this.initializeAttachmentsCount();
  }

  initializeOrderCode(): void {
    this.orderCode$ = this.launchDialogService.data$.pipe(
      map(data => data.orderCode),
    );
  }

  initializeAttachments(): void {
    this.attachments$ = this.orderCode$.pipe(
      switchMap((orderId) => this.orderAttachmentsFacade.getOrderAttachments(orderId)),
      map((attachments) => attachments.attachments ?? []),
      catchError(() => {
        this.error$.next(true);
        return of([]);
      }),
      share(),
    );
  }

  initializeAttachmentsCount(): void {
    this.attachmentsCount$ = this.attachments$.pipe(
      map(attachments => attachments.length),
    );
  }

  openOrderAttachment(attachmentId: string, fileName?: string): void {
    this.orderCode$.pipe(
      filter(() => !this.loadingAttachments.includes(attachmentId)),
      tap(() => this.setAttachmentLoadingState(attachmentId, true)),
      switchMap((orderId) => this.orderAttachmentsFacade.getOrderAttachment(orderId, attachmentId)),
      tap((blob) => {
        if (blob.type && this.config.previewMimeTypes.includes(blob.type.split(';')[0])) {
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
    ).subscribe();
  }

  previewFile(blob: Blob): void {
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }

  downloadFile(blob: Blob, fileName: string): void {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = fileName as string;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onMouseDown(event: MouseEvent, attachmentId: string, fileName?: string): void {
    const leftMouseButton = 0;
    const middleMouseButton = 1;
    if (event.button === leftMouseButton || event.button === middleMouseButton) {
      this.openOrderAttachment(attachmentId, fileName);
    }
  }

  setAttachmentLoadingState(attachmentId: string, state: boolean): void {
    if (state) {
      this.loadingAttachments.push(attachmentId);
    } else {
      this.loadingAttachments = this.loadingAttachments.filter(id => id !== attachmentId);
    }
    this.cd.detectChanges();
  }

  addErrorMessage(attachmentId: string): void {
    this.erroredAttachments.push(`${attachmentId}_${this.errorCounter++}`);
    this.cd.detectChanges();
  }

  closeErrorMessage(attachmentId: string): void {
    this.erroredAttachments = this.erroredAttachments.filter(id => id !== attachmentId);
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
