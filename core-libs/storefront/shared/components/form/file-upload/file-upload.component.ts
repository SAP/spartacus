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
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@spartacus/core';
import { IconComponent } from '../../../../cms-components/misc/icon/icon.component';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';

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
  imports: [NgTemplateOutlet, TranslatePipe, IconComponent],
})
export class FileUploadComponent implements ControlValueAccessor {

  protected readonly iconTypes = ICON_TYPE;

  /**
   * Allowed file types. It's setting attribute used for OS window for choosing files.
   */
  @Input() accept?: string | string[] = '*';
  /**
   * Allows selecting multiple files.
   */
  @Input() multiple?: boolean = false;
  /**
   * Use custom button html passed from parent.
   */
  @ContentChild(TemplateRef) customButton: any;

  @ViewChild('fileInput', {static: true})
  protected fileInput!: ElementRef<HTMLInputElement>;

  files: File[] = [];
  disabled = false;

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    if (this.multiple) {
      const existingFiles = [...this.files];
      const newFiles = Array.from(input.files);

      this.files = [
        ...existingFiles,
        ...newFiles.filter(newFile =>
          // Logic to filter out duplicates
          !existingFiles.some(existingFile =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size &&
            existingFile.lastModified === newFile.lastModified
          )
        ),
      ];

      input.value = '';
    } else {
      this.files = [
        ...Array.from(input.files),
      ];
    }

    this.propagateChange();
  }

  openFileDialog(): void {
    if (this.disabled) {
      return;
    }

    this.fileInput.nativeElement.click();
  }

  removeFileByIndex(index: number): void {
    if (this.disabled) {
      return;
    }

    this.files = this.files.filter((_, i) => i !== index);

    this.propagateChange();
  }

  removeAllFiles(): void {
    if (this.disabled) {
      return;
    }

    this.files = [];
    this.fileInput.nativeElement.value = '';

    this.propagateChange();
  }

  private propagateChange(): void {
    const fileList = this.toFileList();

    this.onChange(fileList);
    this.onTouched();
  }

  private toFileList(): FileList | null {
    if (!this.files.length) {
      return null;
    }

    const dataTransfer = new DataTransfer();

    for (const file of this.files) {
      dataTransfer.items.add(file);
    }

    return dataTransfer.files;
  }

  // ControlValueAccessor START

  private onChange: (value: FileList | null) => void = () => {
  };

  private onTouched: () => void = () => {
  };

  registerOnChange(fn: (value: FileList | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  writeValue(value: FileList | File[] | null): void {
    if (value instanceof FileList) {
      this.files = Array.from(value);
    } else {
      this.files = value ? [...value] : [];
    }
  }

  // ControlValueAccessor END

}
