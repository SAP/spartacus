import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualViewerToolbarButtonComponent } from './visual-viewer-toolbar-button.component';
import { IconModule } from '@spartacus/storefront';

describe('VisualViewerToolbarButtonComponent', () => {
  let toolbarButtonComponent: VisualViewerToolbarButtonComponent;
  let fixture: ComponentFixture<VisualViewerToolbarButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, IconModule],
      declarations: [VisualViewerToolbarButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualViewerToolbarButtonComponent);
    toolbarButtonComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create toolbar button component', () => {
    expect(toolbarButtonComponent).toBeTruthy();
  });
});
