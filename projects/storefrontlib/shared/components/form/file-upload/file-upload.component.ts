import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  // we cannot use onPush change detection as the form state isn't updated without explicit
  // change detection, see https://github.com/angular/angular/issues/10816
})
export class FileUploadComponent implements ControlValueAccessor {
  /**
   * Allowed file types. It's setting attribute used for OS window for choosing files.
   */
  @Input() accept?: string | string[] = '*';
  /**
   * Allows selecting multiple files.
   */
  @Input() multiple?: boolean = false;

  // TODO: remove this event. Now it's used only to trigger some logic in the parent component.
  // Prerequisites (changes in the parent component):
  // - use an async validator that "opens file" using the value of the form control
  // - "open file" on form submit, but not on the form control change
  @Output()
  update = new EventEmitter<FileList | null>();

  @ViewChild('fileInput', { static: true })
  protected fileInput: ElementRef<HTMLInputElement>;

  selectFile($event: Event) {
    const files = ($event.target as HTMLInputElement)?.files;
    this.onChangeCallback(files);
    this.update.emit(files);
  }

  get selectedFiles(): File[] | undefined {
    return Array.from(this.fileInput.nativeElement.files);
  }

  // ControlValueAccessor START
  protected onChangeCallback: Function = () => {};
  protected onTouchedCallback: Function = () => {};
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
