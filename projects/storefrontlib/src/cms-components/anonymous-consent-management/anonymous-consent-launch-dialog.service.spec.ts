import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LaunchDialogService, LAUNCH_CALLER } from '../../layout';
import { AnonymousConsentLaunchDialogService } from './anonymous-consent-launch-dialog.service';

@Component({
  template: '',
})
class TestContainerComponent {
  constructor(public vcr: ViewContainerRef) {}
}

class MockLaunchDialogService {
  launch() {}
  clear() {}
  get dialogClose() {
    return of('close');
  }
}

describe('AnonymousConsentLaunchDialogService', () => {
  let service: AnonymousConsentLaunchDialogService;
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

    service = TestBed.inject(AnonymousConsentLaunchDialogService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    component = TestBed.createComponent(TestContainerComponent)
      .componentInstance;
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openDialog', () => {
    beforeEach(() => {
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
    });

    it('should call LaunchDialogService launch', () => {
      service.openDialog(null, component.vcr);

      expect(launchDialogService.launch).toHaveBeenCalledWith(
        LAUNCH_CALLER.ANONYMOUS_CONSENT,
        component.vcr
      );
    });

    it('should call LaunchDialogService clear on close', () => {
      spyOn(launchDialogService, 'clear');

      const comp = service.openDialog(null, component.vcr);

      comp.subscribe();

      expect(launchDialogService.clear).toHaveBeenCalledWith(
        LAUNCH_CALLER.ANONYMOUS_CONSENT
      );
    });

    it('should destroy component on close', () => {
      spyOn(componentRef, 'destroy');

      const comp = service.openDialog(null, component.vcr);

      comp.subscribe();

      expect(componentRef.destroy).toHaveBeenCalled();
    });
  });
});
