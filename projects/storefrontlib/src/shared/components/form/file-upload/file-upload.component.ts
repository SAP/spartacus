import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Component that adds a file upload control.
 */
@Component({
  selector: 'cx-file-upload',
  templateUrl: './file-upload.component.html',
  // we cannot use onPush change detection as the form state isn't updated without explicit
  // change detection, see https://github.com/angular/angular/issues/10816
})
export class FileUploadComponent {
  selectedFile: File;

  @Input() control: FormControl;
  @Input() buttonText: string;
  @Input() allowedExtensions?: string = '*';
  @Input() maxSize?: number;

  @Output() update: EventEmitter<File> = new EventEmitter();

  fileError: {
    tooLarge?: boolean;
  } = {};

  selectFile(file: File) {
    this.selectedFile = file;
    this.update.emit(file);
  }
}
