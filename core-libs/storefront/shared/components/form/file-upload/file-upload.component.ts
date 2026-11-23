/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  TemplateRef,
  output,
  input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@spartacus/core';

/**
 * Component that adds a file upload control.
 */
@Component({
  selector: 'cx-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
  imports: [NgTemplateOutlet, TranslatePipe],
})
export class FileUploadComponent implements ControlValueAccessor {
  /**
   * Allowed file types. It's setting attribute used for OS window for choosing files.
   */
  readonly accept = input<(string | string[]) | undefined>('*');
  /**
   * Allows selecting multiple files.
   */
  readonly multiple = input<boolean | undefined>(false);
  /**
   * Use custom button html passed from parent.
   */
  // TODO: Skipped for migration because:
  //  This query is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @ContentChild(TemplateRef) customButton: any;

  // TODO: remove this event. Now it's used only to trigger some logic in the parent component.
  // Prerequisites (changes in the parent component):
  // - use an async validator that "opens file" using the value of the form control
  // - "open file" on form submit, but not on the form control change
  readonly update = output<FileList | null>();

  @ViewChild('fileInput', { static: true })
  protected fileInput: ElementRef<HTMLInputElement>;

  selectFile($event: Event) {
    const files = ($event.target as HTMLInputElement)?.files;
    // If no files were selected (e.g., user clicked cancel), pass null instead of empty FileList
    const value = files && files.length > 0 ? files : null;
    this.onChangeCallback(value);
    this.update.emit(value);
  }

  removeFile(): void {
    this.fileInput.nativeElement.value = '';
    this.onChangeCallback(null);
    this.update.emit(null);
  }

  get selectedFiles(): File[] | undefined {
    const fileInput = this.fileInput;
    if (fileInput.nativeElement.files) {
      return Array.from(fileInput.nativeElement.files);
    }
    return undefined;
  }

  // ControlValueAccessor START
  protected onChangeCallback: Function = () => {
    // Intentional empty arrow function
  };
  protected onTouchedCallback: Function = () => {
    // Intentional empty arrow function
  };
  registerOnChange(callback: Function): void {
    this.onChangeCallback = callback;
  }
  registerOnTouched(callback: Function): void {
    this.onTouchedCallback = callback;
  }
  setDisabledState(disabled: boolean): void {
    this.fileInput.nativeElement.disabled = disabled;
  }
  writeValue(value: any): void {
    if (value instanceof FileList) {
      this.fileInput.nativeElement.files = value;
    }
  }
  // ControlValueAccessor END
}
