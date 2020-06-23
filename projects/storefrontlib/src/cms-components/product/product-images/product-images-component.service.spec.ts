import {
  Component,
  ComponentRef,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '../../../layout/launch-dialog/index';
import { ProductImagesComponentService } from './product-images-component.service';

@Component({
  template: '',
})
class TestContainerComponent {
  @Input() galleryItem: number;
  constructor(public vcr: ViewContainerRef) {}
}

class MockLaunchDialogService {
  launch() {}
  clear() {}
  get dialogClose() {
    return of('close');
  }
}

describe('ProductImagesComponentService', () => {
  let service: ProductImagesComponentService;
  let launchDialogService: LaunchDialogService;
  let component: TestContainerComponent;
  let componentRef: ComponentRef<TestContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
      declarations: [TestContainerComponent],
    }).compileComponents();

    service = TestBed.inject(ProductImagesComponentService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    component = TestBed.createComponent(TestContainerComponent)
      .componentInstance;
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('expandImage', () => {
    beforeEach(() => {
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
    });

    it('should call LaunchDialogService launch', () => {
      service.expandImage(component.vcr, null);

      expect(launchDialogService.launch).toHaveBeenCalledWith(
        LAUNCH_CALLER.IMAGE_ZOOM,
        component.vcr
      );
    });

    it('should call LaunchDialogService clear on close', () => {
      spyOn(launchDialogService, 'clear');

      const comp = service.expandImage(component.vcr, null);

      comp.subscribe();

      expect(launchDialogService.clear).toHaveBeenCalledWith(
        LAUNCH_CALLER.IMAGE_ZOOM
      );
    });

    it('should destroy component on close', () => {
      spyOn(componentRef, 'destroy');

      const comp = service.expandImage(component.vcr, null);

      comp.subscribe();

      expect(componentRef.destroy).toHaveBeenCalled();
    });

    it('should pass index of zoom image to dialog', () => {
      const comp = service.expandImage(component.vcr, 2);

      comp.subscribe();

      expect(componentRef.instance.galleryItem).toEqual(2);
    });
  });
});
