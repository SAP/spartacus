/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/model/cms-component-data";
import * as i2 from "../../../shared/components/media/media.service";
import * as i3 from "@angular/common";
import * as i4 from "../../misc/icon/icon.component";
import * as i5 from "@spartacus/core";
export class PDFComponent {
    constructor(component, mediaService) {
        this.component = component;
        this.mediaService = mediaService;
        this.data$ = this.component.data$.pipe(tap((data) => {
            if (data?.pdfFile?.url) {
                this.url = this.mediaService.getMedia(data.pdfFile)?.src;
            }
        }));
    }
    addPdfExtension(title) {
        if (!title) {
            return '';
        }
        const trimTitle = title.trim();
        return trimTitle.endsWith('.pdf') ? trimTitle : `${trimTitle}.pdf`;
    }
}
PDFComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.MediaService }], target: i0.ɵɵFactoryTarget.Component });
PDFComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PDFComponent, selector: "cx-pdf", ngImport: i0, template: "<ng-container *ngIf=\"data$ | async as data\">\n  <div class=\"pdf-container\">\n    <a [href]=\"url\" target=\"_blank\" rel=\"noopener noreferrer\">\n      <span>{{\n        addPdfExtension(\n          data?.title ||\n            data?.pdfFile?.altText ||\n            ('pdf.defaultTitle' | cxTranslate)\n        )\n      }}</span>\n      <span aria-hidden=\"true\">\n        <cx-icon [type]=\"'PDF_FILE'\"></cx-icon>\n      </span>\n    </a>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pdf', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"data$ | async as data\">\n  <div class=\"pdf-container\">\n    <a [href]=\"url\" target=\"_blank\" rel=\"noopener noreferrer\">\n      <span>{{\n        addPdfExtension(\n          data?.title ||\n            data?.pdfFile?.altText ||\n            ('pdf.defaultTitle' | cxTranslate)\n        )\n      }}</span>\n      <span aria-hidden=\"true\">\n        <cx-icon [type]=\"'PDF_FILE'\"></cx-icon>\n      </span>\n    </a>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.MediaService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wZGYvcGRmLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wZGYvcGRmLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25FLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQVNyQyxNQUFNLE9BQU8sWUFBWTtJQVV2QixZQUNZLFNBQW9ELEVBQ3BELFlBQTBCO1FBRDFCLGNBQVMsR0FBVCxTQUFTLENBQTJDO1FBQ3BELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBVnRDLFVBQUssR0FBd0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNwRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNYLElBQUksSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQzthQUMxRDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFLQyxDQUFDO0lBRUosZUFBZSxDQUFDLEtBQWM7UUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxNQUFNLENBQUM7SUFDckUsQ0FBQzs7eUdBckJVLFlBQVk7NkZBQVosWUFBWSw4Q0NsQnpCLDBkQWdCQTsyRkRFYSxZQUFZO2tCQUx4QixTQUFTOytCQUNFLFFBQVEsbUJBRUQsdUJBQXVCLENBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc1BERkRvY3VtZW50Q29tcG9uZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENtc0NvbXBvbmVudERhdGEgfSBmcm9tICcuLi8uLi8uLi9jbXMtc3RydWN0dXJlL3BhZ2UvbW9kZWwvY21zLWNvbXBvbmVudC1kYXRhJztcbmltcG9ydCB7IE1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL21lZGlhL21lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1wZGYnLFxuICB0ZW1wbGF0ZVVybDogJy4vcGRmLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBERkNvbXBvbmVudCB7XG4gIHVybD86IHN0cmluZztcbiAgZGF0YSQ6IE9ic2VydmFibGU8Q21zUERGRG9jdW1lbnRDb21wb25lbnQ+ID0gdGhpcy5jb21wb25lbnQuZGF0YSQucGlwZShcbiAgICB0YXAoKGRhdGEpID0+IHtcbiAgICAgIGlmIChkYXRhPy5wZGZGaWxlPy51cmwpIHtcbiAgICAgICAgdGhpcy51cmwgPSB0aGlzLm1lZGlhU2VydmljZS5nZXRNZWRpYShkYXRhLnBkZkZpbGUpPy5zcmM7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29tcG9uZW50OiBDbXNDb21wb25lbnREYXRhPENtc1BERkRvY3VtZW50Q29tcG9uZW50PixcbiAgICBwcm90ZWN0ZWQgbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2VcbiAgKSB7fVxuXG4gIGFkZFBkZkV4dGVuc2lvbih0aXRsZT86IHN0cmluZykge1xuICAgIGlmICghdGl0bGUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgdHJpbVRpdGxlID0gdGl0bGUudHJpbSgpO1xuICAgIHJldHVybiB0cmltVGl0bGUuZW5kc1dpdGgoJy5wZGYnKSA/IHRyaW1UaXRsZSA6IGAke3RyaW1UaXRsZX0ucGRmYDtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEkIHwgYXN5bmMgYXMgZGF0YVwiPlxuICA8ZGl2IGNsYXNzPVwicGRmLWNvbnRhaW5lclwiPlxuICAgIDxhIFtocmVmXT1cInVybFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgIDxzcGFuPnt7XG4gICAgICAgIGFkZFBkZkV4dGVuc2lvbihcbiAgICAgICAgICBkYXRhPy50aXRsZSB8fFxuICAgICAgICAgICAgZGF0YT8ucGRmRmlsZT8uYWx0VGV4dCB8fFxuICAgICAgICAgICAgKCdwZGYuZGVmYXVsdFRpdGxlJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgICApXG4gICAgICB9fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICA8Y3gtaWNvbiBbdHlwZV09XCInUERGX0ZJTEUnXCI+PC9jeC1pY29uPlxuICAgICAgPC9zcGFuPlxuICAgIDwvYT5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==