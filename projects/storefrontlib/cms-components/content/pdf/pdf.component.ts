import { Component } from '@angular/core';
import {
  CmsBannerComponentMedia,
  CmsPDFDocumentComponent,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { MediaContainer } from '../../../shared/components/media/media.model';
import { MediaService } from '../../../shared/components/media/media.service';
import { FileDownloadService } from '../../../shared/services/file/file-download.service';

@Component({
  selector: 'cx-pdf',
  templateUrl: './pdf.component.html',
})
export class PDFComponent {
  data$: Observable<CmsPDFDocumentComponent> = this.component.data$;

  constructor(
    protected component: CmsComponentData<CmsPDFDocumentComponent>,
    protected fileDownloadService: FileDownloadService,
    protected mediaService: MediaService
  ) {}

  download(file?: CmsBannerComponentMedia) {
    const url = this.mediaService.getMedia(file as MediaContainer)?.src;

    if (url) this.fileDownloadService.download(url, undefined, true);
  }
}
