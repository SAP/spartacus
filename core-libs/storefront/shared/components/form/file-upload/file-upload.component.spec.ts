import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { FileUploadComponent } from './file-upload.component';

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

class MockDataTransfer {
  private filesArray: File[] = [];

  items = {
    add: (file: File) => this.filesArray.push(file),
  };

  get files(): FileList {
    return {
      0: this.filesArray[0],
      length: this.filesArray.length,
      item: (index: number) => this.filesArray[index] ?? null,
    } as unknown as FileList;
  }
}

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  let inputEl: DebugElement;

  beforeEach(() => {
    vi.stubGlobal('DataTransfer', MockDataTransfer);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FileUploadComponent],
    })
      .overrideComponent(FileUploadComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [MockTranslatePipe] },
      })
      .compileComponents();
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
    it('should emit selected files', () => {
      const onChangeCallbackSpy = vi.fn();
      component.registerOnChange(onChangeCallbackSpy);

      inputEl.triggerEventHandler('change', mockEvent);

      const fileList = onChangeCallbackSpy.mock.calls[0][0];

      expect(fileList?.length).toBe(1);
      expect(fileList?.[0]).toBe(mockFile);
    });

    it('should not emit when no files are selected (cancel)', () => {
      const onChangeCallbackSpy = vi.fn();
      component.registerOnChange(onChangeCallbackSpy);

      const emptyFileListEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        target: { files: [] as unknown as FileList },
      };

      inputEl.triggerEventHandler('change', emptyFileListEvent);

      expect(onChangeCallbackSpy).not.toHaveBeenCalled();
    });

    it('should not emit when files is null', () => {
      const onChangeCallbackSpy = vi.fn();
      component.registerOnChange(onChangeCallbackSpy);

      const nullFilesEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        target: { files: null },
      };

      inputEl.triggerEventHandler('change', nullFilesEvent);

      expect(onChangeCallbackSpy).not.toHaveBeenCalled();
    });
  });

  describe('removeAllFiles', () => {
    it('should clear input value and emit null', () => {
      const onChangeCallbackSpy = vi.fn();
      component.registerOnChange(onChangeCallbackSpy);

      component.removeAllFiles();

      expect(onChangeCallbackSpy).toHaveBeenCalledWith(null);
    });
  });
});
