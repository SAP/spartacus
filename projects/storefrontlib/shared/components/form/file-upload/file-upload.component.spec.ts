import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { FileUploadComponent } from './file-upload.component';

@Component({
  selector: 'cx-form-errors',
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
    console.log('Starting FileUploadComponent test');
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [FileUploadComponent, MockFormErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    console.log('Starting FileUploadComponent test');
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
  });
});
