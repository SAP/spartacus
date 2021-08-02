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
  /**
   * Form control for the input.
   */
  @Input() control: FormControl;
  /**
   * Allowed extensions for the file. It's setting attribute used for OS window for choosing files.
   */
  @Input() allowedExtensions?: string = '*';
  /**
   * Max size of file. This property is used only for translation params if 'tooLarge' error occur.
   */
  @Input() maxSize?: number;
  /**
   * Emitter for event of changed file.
   */
  @Output() update: EventEmitter<File> = new EventEmitter();

  selectFile(file: File) {
    this.selectedFile = file;
    this.update.emit(file);
  }
}
