import { Component } from '@angular/core';
import { CmsPDFDocumentComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { MediaService } from '../../../shared/components/media/media.service';

@Component({
  selector: 'cx-pdf',
  templateUrl: './pdf.component.html',
})
export class PDFComponent {
  url?: string;
  data$: Observable<CmsPDFDocumentComponent> = this.component.data$.pipe(
    tap((data) => {
      if (data?.pdfFile?.url)
        this.url = this.mediaService.getMedia(data.pdfFile)?.src;
    })
  );

  constructor(
    protected component: CmsComponentData<CmsPDFDocumentComponent>,
    protected mediaService: MediaService
  ) {}
}
