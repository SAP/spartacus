import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VisualViewerComponent } from './visual-viewer.component';

describe('VisualComponent', () => {
  let visualComponent: VisualViewerComponent;
  let fixture: ComponentFixture<VisualViewerComponent>;
  let el: DebugElement;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [VisualViewerComponent],
      providers: [],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(VisualViewerComponent);
    visualComponent = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create visual viewer component', () => {
    expect(visualComponent).toBeTruthy();
  });
});
