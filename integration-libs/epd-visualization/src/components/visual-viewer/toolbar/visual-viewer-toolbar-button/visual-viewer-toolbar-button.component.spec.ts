import { CommonModule } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VisualViewerToolbarButtonComponent } from './visual-viewer-toolbar-button.component';
import { IconModule } from '@spartacus/storefront';

describe('VisualViewerToolbarButtonComponent', () => {
  let toolbarButtonComponent: VisualViewerToolbarButtonComponent;
  let fixture: ComponentFixture<VisualViewerToolbarButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CommonModule,
        IconModule,
      ],
      declarations: [VisualViewerToolbarButtonComponent],
    }).compileComponents();

    TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(VisualViewerToolbarButtonComponent);
    toolbarButtonComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create toolbar button component', () => {
    expect(toolbarButtonComponent).toBeTruthy();
  });
});
