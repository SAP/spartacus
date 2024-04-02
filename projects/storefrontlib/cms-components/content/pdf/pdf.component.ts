/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsPDFDocumentComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { MediaService } from '../../../shared/components/media/media.service';

@Component({
  selector: 'cx-pdf',
  templateUrl: './pdf.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PDFComponent {
  url?: string;
  data$: Observable<CmsPDFDocumentComponent> = this.component.data$.pipe(
    tap((data) => {
      if (data?.pdfFile?.url) {
        this.url = this.mediaService.getMedia(data.pdfFile)?.src;
      }
    })
  );

  constructor(
    protected component: CmsComponentData<CmsPDFDocumentComponent>,
    protected mediaService: MediaService
  ) {}

  addPdfExtension(title?: string) {
    if (!title) {
      return '';
    }
    const trimTitle = title.trim();
    return trimTitle.endsWith('.pdf') ? trimTitle : `${trimTitle}.pdf`;
  }
}
