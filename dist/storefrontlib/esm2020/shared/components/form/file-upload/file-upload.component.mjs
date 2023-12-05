/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
/**
 * Component that adds a file upload control.
 */
export class FileUploadComponent {
    constructor() {
        /**
         * Allowed file types. It's setting attribute used for OS window for choosing files.
         */
        this.accept = '*';
        /**
         * Allows selecting multiple files.
         */
        this.multiple = false;
        // TODO: remove this event. Now it's used only to trigger some logic in the parent component.
        // Prerequisites (changes in the parent component):
        // - use an async validator that "opens file" using the value of the form control
        // - "open file" on form submit, but not on the form control change
        this.update = new EventEmitter();
        // ControlValueAccessor START
        this.onChangeCallback = () => {
            // Intentional empty arrow function
        };
        this.onTouchedCallback = () => {
            // Intentional empty arrow function
        };
    }
    selectFile($event) {
        const files = $event.target?.files;
        this.onChangeCallback(files);
        this.update.emit(files);
    }
    removeFile() {
        this.fileInput.nativeElement.value = '';
    }
    get selectedFiles() {
        if (this.fileInput.nativeElement.files) {
            return Array.from(this.fileInput.nativeElement.files);
        }
        return undefined;
    }
    registerOnChange(callback) {
        this.onChangeCallback = callback;
    }
    registerOnTouched(callback) {
        this.onTouchedCallback = callback;
    }
    setDisabledState(disabled) {
        this.fileInput.nativeElement.disabled = disabled;
    }
    writeValue(value) {
        if (value instanceof FileList) {
            this.fileInput.nativeElement.files = value;
        }
    }
}
FileUploadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FileUploadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: FileUploadComponent, selector: "cx-file-upload", inputs: { accept: "accept", multiple: "multiple" }, outputs: { update: "update" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi: true,
        },
    ], queries: [{ propertyName: "customButton", first: true, predicate: TemplateRef, descendants: true }], viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true, static: true }], ngImport: i0, template: "<input\n  type=\"file\"\n  aria-hidden=\"true\"\n  [accept]=\"accept\"\n  [multiple]=\"multiple\"\n  (change)=\"selectFile($event)\"\n  #fileInput\n/>\n<button\n  *ngIf=\"!customButton\"\n  [attr.aria-label]=\"'common.selectFile' | cxTranslate\"\n  class=\"btn btn-secondary\"\n  type=\"button\"\n  (click)=\"fileInput.click()\"\n>\n  <ng-content></ng-content>\n</button>\n<!-- TODO(Brian-Parth): CXEC-17196 -->\n<button\n  class=\"link cx-action-link\"\n  *ngIf=\"customButton\"\n  (click)=\"fileInput.click()\"\n>\n  <ng-container *ngTemplateOutlet=\"customButton\"> </ng-container>\n</button>\n<p *ngFor=\"let file of selectedFiles\">\n  {{ file?.name }}\n</p>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-file-upload', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => FileUploadComponent),
                            multi: true,
                        },
                    ], template: "<input\n  type=\"file\"\n  aria-hidden=\"true\"\n  [accept]=\"accept\"\n  [multiple]=\"multiple\"\n  (change)=\"selectFile($event)\"\n  #fileInput\n/>\n<button\n  *ngIf=\"!customButton\"\n  [attr.aria-label]=\"'common.selectFile' | cxTranslate\"\n  class=\"btn btn-secondary\"\n  type=\"button\"\n  (click)=\"fileInput.click()\"\n>\n  <ng-content></ng-content>\n</button>\n<!-- TODO(Brian-Parth): CXEC-17196 -->\n<button\n  class=\"link cx-action-link\"\n  *ngIf=\"customButton\"\n  (click)=\"fileInput.click()\"\n>\n  <ng-container *ngTemplateOutlet=\"customButton\"> </ng-container>\n</button>\n<p *ngFor=\"let file of selectedFiles\">\n  {{ file?.name }}\n</p>\n" }]
        }], propDecorators: { accept: [{
                type: Input
            }], multiple: [{
                type: Input
            }], customButton: [{
                type: ContentChild,
                args: [TemplateRef]
            }], update: [{
                type: Output
            }], fileInput: [{
                type: ViewChild,
                args: ['fileInput', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9mb3JtL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvZm9ybS9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBRVosWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRXpFOztHQUVHO0FBY0gsTUFBTSxPQUFPLG1CQUFtQjtJQWJoQztRQWNFOztXQUVHO1FBQ00sV0FBTSxHQUF1QixHQUFHLENBQUM7UUFDMUM7O1dBRUc7UUFDTSxhQUFRLEdBQWEsS0FBSyxDQUFDO1FBTXBDLDZGQUE2RjtRQUM3RixtREFBbUQ7UUFDbkQsaUZBQWlGO1FBQ2pGLG1FQUFtRTtRQUVuRSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFzQjdDLDZCQUE2QjtRQUNuQixxQkFBZ0IsR0FBYSxHQUFHLEVBQUU7WUFDMUMsbUNBQW1DO1FBQ3JDLENBQUMsQ0FBQztRQUNRLHNCQUFpQixHQUFhLEdBQUcsRUFBRTtZQUMzQyxtQ0FBbUM7UUFDckMsQ0FBQyxDQUFDO0tBZ0JIO0lBdkNDLFVBQVUsQ0FBQyxNQUFhO1FBQ3RCLE1BQU0sS0FBSyxHQUFJLE1BQU0sQ0FBQyxNQUEyQixFQUFFLEtBQUssQ0FBQztRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRTtZQUN0QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkQ7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBU0QsZ0JBQWdCLENBQUMsUUFBa0I7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsaUJBQWlCLENBQUMsUUFBa0I7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsUUFBaUI7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxLQUFLLFlBQVksUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDNUM7SUFDSCxDQUFDOztnSEE3RFUsbUJBQW1CO29HQUFuQixtQkFBbUIsNEhBVm5CO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDbEQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLG9FQWdCYSxXQUFXLHNLQy9DM0IsMnBCQTRCQTsyRkRPYSxtQkFBbUI7a0JBYi9CLFNBQVM7K0JBQ0UsZ0JBQWdCLGFBRWY7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUM7NEJBQ2xELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGOzhCQVFRLE1BQU07c0JBQWQsS0FBSztnQkFJRyxRQUFRO3NCQUFoQixLQUFLO2dCQUlxQixZQUFZO3NCQUF0QyxZQUFZO3VCQUFDLFdBQVc7Z0JBT3pCLE1BQU07c0JBREwsTUFBTTtnQkFJRyxTQUFTO3NCQURsQixTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBhZGRzIGEgZmlsZSB1cGxvYWQgY29udHJvbC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtZmlsZS11cGxvYWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsZS11cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpbGVVcGxvYWRDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgLy8gd2UgY2Fubm90IHVzZSBvblB1c2ggY2hhbmdlIGRldGVjdGlvbiBhcyB0aGUgZm9ybSBzdGF0ZSBpc24ndCB1cGRhdGVkIHdpdGhvdXQgZXhwbGljaXRcbiAgLy8gY2hhbmdlIGRldGVjdGlvbiwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEwODE2XG59KVxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKlxuICAgKiBBbGxvd2VkIGZpbGUgdHlwZXMuIEl0J3Mgc2V0dGluZyBhdHRyaWJ1dGUgdXNlZCBmb3IgT1Mgd2luZG93IGZvciBjaG9vc2luZyBmaWxlcy5cbiAgICovXG4gIEBJbnB1dCgpIGFjY2VwdD86IHN0cmluZyB8IHN0cmluZ1tdID0gJyonO1xuICAvKipcbiAgICogQWxsb3dzIHNlbGVjdGluZyBtdWx0aXBsZSBmaWxlcy5cbiAgICovXG4gIEBJbnB1dCgpIG11bHRpcGxlPzogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogVXNlIGN1c3RvbSBidXR0b24gaHRtbCBwYXNzZWQgZnJvbSBwYXJlbnQuXG4gICAqL1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBjdXN0b21CdXR0b246IGFueTtcblxuICAvLyBUT0RPOiByZW1vdmUgdGhpcyBldmVudC4gTm93IGl0J3MgdXNlZCBvbmx5IHRvIHRyaWdnZXIgc29tZSBsb2dpYyBpbiB0aGUgcGFyZW50IGNvbXBvbmVudC5cbiAgLy8gUHJlcmVxdWlzaXRlcyAoY2hhbmdlcyBpbiB0aGUgcGFyZW50IGNvbXBvbmVudCk6XG4gIC8vIC0gdXNlIGFuIGFzeW5jIHZhbGlkYXRvciB0aGF0IFwib3BlbnMgZmlsZVwiIHVzaW5nIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBjb250cm9sXG4gIC8vIC0gXCJvcGVuIGZpbGVcIiBvbiBmb3JtIHN1Ym1pdCwgYnV0IG5vdCBvbiB0aGUgZm9ybSBjb250cm9sIGNoYW5nZVxuICBAT3V0cHV0KClcbiAgdXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlTGlzdCB8IG51bGw+KCk7XG5cbiAgQFZpZXdDaGlsZCgnZmlsZUlucHV0JywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHJvdGVjdGVkIGZpbGVJbnB1dDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBzZWxlY3RGaWxlKCRldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBmaWxlcyA9ICgkZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5maWxlcztcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soZmlsZXMpO1xuICAgIHRoaXMudXBkYXRlLmVtaXQoZmlsZXMpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRGaWxlcygpOiBGaWxlW10gfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LmZpbGVzKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LmZpbGVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIENvbnRyb2xWYWx1ZUFjY2Vzc29yIFNUQVJUXG4gIHByb3RlY3RlZCBvbkNoYW5nZUNhbGxiYWNrOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBhcnJvdyBmdW5jdGlvblxuICB9O1xuICBwcm90ZWN0ZWQgb25Ub3VjaGVkQ2FsbGJhY2s6IEZ1bmN0aW9uID0gKCkgPT4ge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGFycm93IGZ1bmN0aW9uXG4gIH07XG4gIHJlZ2lzdGVyT25DaGFuZ2UoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gY2FsbGJhY2s7XG4gIH1cbiAgcmVnaXN0ZXJPblRvdWNoZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGNhbGxiYWNrO1xuICB9XG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZUxpc3QpIHtcbiAgICAgIHRoaXMuZmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZmlsZXMgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgLy8gQ29udHJvbFZhbHVlQWNjZXNzb3IgRU5EXG59XG4iLCI8aW5wdXRcbiAgdHlwZT1cImZpbGVcIlxuICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICBbYWNjZXB0XT1cImFjY2VwdFwiXG4gIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiXG4gIChjaGFuZ2UpPVwic2VsZWN0RmlsZSgkZXZlbnQpXCJcbiAgI2ZpbGVJbnB1dFxuLz5cbjxidXR0b25cbiAgKm5nSWY9XCIhY3VzdG9tQnV0dG9uXCJcbiAgW2F0dHIuYXJpYS1sYWJlbF09XCInY29tbW9uLnNlbGVjdEZpbGUnIHwgY3hUcmFuc2xhdGVcIlxuICBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCJcbiAgdHlwZT1cImJ1dHRvblwiXG4gIChjbGljayk9XCJmaWxlSW5wdXQuY2xpY2soKVwiXG4+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvYnV0dG9uPlxuPCEtLSBUT0RPKEJyaWFuLVBhcnRoKTogQ1hFQy0xNzE5NiAtLT5cbjxidXR0b25cbiAgY2xhc3M9XCJsaW5rIGN4LWFjdGlvbi1saW5rXCJcbiAgKm5nSWY9XCJjdXN0b21CdXR0b25cIlxuICAoY2xpY2spPVwiZmlsZUlucHV0LmNsaWNrKClcIlxuPlxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY3VzdG9tQnV0dG9uXCI+IDwvbmctY29udGFpbmVyPlxuPC9idXR0b24+XG48cCAqbmdGb3I9XCJsZXQgZmlsZSBvZiBzZWxlY3RlZEZpbGVzXCI+XG4gIHt7IGZpbGU/Lm5hbWUgfX1cbjwvcD5cbiJdfQ==