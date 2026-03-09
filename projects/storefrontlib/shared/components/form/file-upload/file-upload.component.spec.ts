import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { FileUploadComponent } from './file-upload.component';

@Component({
  selector: 'cx-form-errors',
  imports: [I18nTestingModule, ReactiveFormsModule],
})
class MockFormErrorComponent {
  @Input() control: UntypedFormControl;
  @Input() translationParams: any;
}

const mockFile: File = {
  lastModified: new Date().getTime(),
  name: 'testFile',
  size: 4,
  type: '',
} as File;

const mockEvent = {
  preventDefault: () => {},
  stopPropagation: () => {},
  target: { files: [mockFile] },
};

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReactiveFormsModule,
        FileUploadComponent,
        MockFormErrorComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('change file', () => {
    it('should emit event', () => {
      spyOn(component.update, 'emit');
      inputEl.triggerEventHandler('change', mockEvent);
      expect(component.update.emit).toHaveBeenCalledWith([
        mockFile,
      ] as unknown as FileList);
    });

    it('should emit null when no files are selected (cancel)', () => {
      const emptyFileListEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        target: { files: [] as unknown as FileList },
      };
      spyOn(component.update, 'emit');
      inputEl.triggerEventHandler('change', emptyFileListEvent);
      expect(component.update.emit).toHaveBeenCalledWith(null);
    });

    it('should emit null when files is null', () => {
      const nullFilesEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        target: { files: null },
      };
      spyOn(component.update, 'emit');
      inputEl.triggerEventHandler('change', nullFilesEvent);
      expect(component.update.emit).toHaveBeenCalledWith(null);
    });
  });

  describe('removeFile', () => {
    it('should clear input value and emit null', () => {
      spyOn(component.update, 'emit');
      const onChangeCallbackSpy = jasmine.createSpy('onChangeCallback');
      component.registerOnChange(onChangeCallbackSpy);

      component.removeFile();

      expect(component.update.emit).toHaveBeenCalledWith(null);
      expect(onChangeCallbackSpy).toHaveBeenCalledWith(null);
    });
  });
});
