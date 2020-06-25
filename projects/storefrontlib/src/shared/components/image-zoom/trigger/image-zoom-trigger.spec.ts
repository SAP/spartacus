import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '../../../../layout/launch-dialog/index';
import { ImageZoomTriggerComponent } from './image-zoom-trigger';

@Component({
  template: '',
})
class TestDialogComponent {
  constructor(public vcr: ViewContainerRef) {}
}

class MockLaunchDialogService {
  launch() {}
  clear() {}
  get dialogClose() {
    return of('close');
  }
}

describe('ImageZoomTriggerComponent', () => {
  let component: ImageZoomTriggerComponent;
  let fixture: ComponentFixture<ImageZoomTriggerComponent>;
  let testDialogComponent: ComponentRef<TestDialogComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
      declarations: [ImageZoomTriggerComponent, TestDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageZoomTriggerComponent);
    component = fixture.componentInstance;
    testDialogComponent = TestBed.createComponent(TestDialogComponent)
      .componentRef;
    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('expandImage', () => {
    beforeEach(() => {
      spyOn(launchDialogService, 'launch').and.returnValue(
        of(testDialogComponent)
      );
    });

    it('should call launchDialogService launch', () => {
      component.expandImage();

      expect(launchDialogService.launch).toHaveBeenCalledWith(
        LAUNCH_CALLER.IMAGE_ZOOM,
        component['vcr']
      );
    });

    it('should call LaunchDialogService clear on close', () => {
      spyOn(launchDialogService, 'clear');

      component.expandImage();

      expect(launchDialogService.clear).toHaveBeenCalledWith(
        LAUNCH_CALLER.IMAGE_ZOOM
      );
    });

    it('should destroy component on close', () => {
      spyOn(testDialogComponent, 'destroy');

      component.expandImage();

      expect(testDialogComponent.destroy).toHaveBeenCalled();
    });
  });
});
