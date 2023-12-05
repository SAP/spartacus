import { CmsPDFDocumentComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { MediaService } from '../../../shared/components/media/media.service';
import * as i0 from "@angular/core";
export declare class PDFComponent {
    protected component: CmsComponentData<CmsPDFDocumentComponent>;
    protected mediaService: MediaService;
    url?: string;
    data$: Observable<CmsPDFDocumentComponent>;
    constructor(component: CmsComponentData<CmsPDFDocumentComponent>, mediaService: MediaService);
    addPdfExtension(title?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PDFComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PDFComponent, "cx-pdf", never, {}, {}, never, never, false, never>;
}
