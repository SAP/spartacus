/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CmsPDFDocumentComponent, TranslatePipe } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { MediaService } from '../../../shared/components/media/media.service';
import { IconComponent } from '../../misc/icon/icon.component';

@Component({
  selector: 'cx-pdf',
  templateUrl: './pdf.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, AsyncPipe, TranslatePipe],
})
export class PDFComponent {
  protected component =
    inject<CmsComponentData<CmsPDFDocumentComponent>>(CmsComponentData);
  protected mediaService = inject(MediaService);

  url?: string;
  data$: Observable<CmsPDFDocumentComponent> = this.component.data$.pipe(
    tap((data) => {
      if (data?.pdfFile?.url) {
        this.url = this.mediaService.getMedia(data.pdfFile)?.src;
      }
    })
  );

  addPdfExtension(title?: string) {
    if (!title) {
      return '';
    }
    const trimTitle = title.trim();
    return trimTitle.endsWith('.pdf') ? trimTitle : `${trimTitle}.pdf`;
  }
}
