import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchDialogService } from '../../../../layout/launch-dialog/index';
import { ImageZoomDialogComponent } from './image-zoom-dialog.component';

class MockLaunchDialogService {
  closeDialog() {}
}

describe('ImageZoomDialogComponent', () => {
  let component: ImageZoomDialogComponent;
  let fixture: ComponentFixture<ImageZoomDialogComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
      declarations: [ImageZoomDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageZoomDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.get(LaunchDialogService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('close', () => {
    it('should call close dialog with the close reason', () => {
      spyOn(launchDialogService, 'closeDialog');

      component.close();

      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('');

      component.close('cross clicked');

      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'cross clicked'
      );
    });
  });
});
