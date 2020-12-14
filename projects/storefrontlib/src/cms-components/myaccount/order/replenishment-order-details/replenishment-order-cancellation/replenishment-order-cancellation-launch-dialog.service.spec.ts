import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '../../../../../layout/launch-dialog/index';
import { ReplenishmentOrderCancellationLaunchDialogService } from './replenishment-order-cancellation-launch-dialog.service';

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

describe('ReplenishmentOrderCancellationLaunchDialogService', () => {
  let service: ReplenishmentOrderCancellationLaunchDialogService;
  let launchDialogService: LaunchDialogService;
  let component: TestContainerComponent;
  let componentRef: ComponentRef<TestContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestContainerComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();

    service = TestBed.inject(ReplenishmentOrderCancellationLaunchDialogService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    component = TestBed.createComponent(TestContainerComponent)
      .componentInstance;
    componentRef = TestBed.createComponent(TestContainerComponent).componentRef;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('openDialog', () => {
    beforeEach(() => {
      spyOn(launchDialogService, 'launch').and.returnValue(of(componentRef));
    });

    it('should call LaunchDialogService launch', () => {
      service.openDialog(null, component.vcr, { test: 123 });

      expect(launchDialogService.launch).toHaveBeenCalledWith(
        LAUNCH_CALLER.REPLENISHMENT_ORDER,
        component.vcr,
        {
          test: 123,
        }
      );
    });

    it('should call LaunchDialogService clear on close', () => {
      spyOn(launchDialogService, 'clear');

      const comp = service.openDialog(null, component.vcr);

      comp.subscribe();

      expect(launchDialogService.clear).toHaveBeenCalledWith(
        LAUNCH_CALLER.REPLENISHMENT_ORDER
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
