import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * Component that adds a file upload control.
 */
export declare class FileUploadComponent implements ControlValueAccessor {
    /**
     * Allowed file types. It's setting attribute used for OS window for choosing files.
     */
    accept?: string | string[];
    /**
     * Allows selecting multiple files.
     */
    multiple?: boolean;
    /**
     * Use custom button html passed from parent.
     */
    customButton: any;
    update: EventEmitter<FileList | null>;
    protected fileInput: ElementRef<HTMLInputElement>;
    selectFile($event: Event): void;
    removeFile(): void;
    get selectedFiles(): File[] | undefined;
    protected onChangeCallback: Function;
    protected onTouchedCallback: Function;
    registerOnChange(callback: Function): void;
    registerOnTouched(callback: Function): void;
    setDisabledState(disabled: boolean): void;
    writeValue(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileUploadComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FileUploadComponent, "cx-file-upload", never, { "accept": "accept"; "multiple": "multiple"; }, { "update": "update"; }, ["customButton"], ["*"], false, never>;
}
