import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VisualViewerToolbarButtonComponent } from './visual-viewer-toolbar-button.component';

describe('VisualViewerToolbarButtonComponent', () => {
  let toolbarButtonComponent: VisualViewerToolbarButtonComponent;
  let fixture: ComponentFixture<VisualViewerToolbarButtonComponent>;
  let el: DebugElement;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [VisualViewerToolbarButtonComponent],
      providers: [],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(VisualViewerToolbarButtonComponent);
    toolbarButtonComponent = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create toolbar button component', () => {
    expect(toolbarButtonComponent).toBeTruthy();
  });
});
