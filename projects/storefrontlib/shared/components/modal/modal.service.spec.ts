import { ApplicationRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureConfigService } from '@spartacus/core';
import { ModalService } from './modal.service';

class MockFeatureConfigService {
  isLevel() {
    return true;
  }
}
@Component({
  selector: 'cx-root-app',
  template: '',
})
class MockRootComponent {}

describe('ModalService', () => {
  let fixture: ComponentFixture<MockRootComponent>;
  let modalService: ModalService;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
      declarations: [MockRootComponent],
    }).compileComponents();

    appRef = TestBed.inject(ApplicationRef);
    fixture = TestBed.createComponent(MockRootComponent);
    appRef.components.push(fixture.componentRef);
    modalService = TestBed.inject(ModalService);
  });

  it('should ModalService is injected', () => {
    expect(modalService).toBeTruthy();
  });

  it('should have active modal after opening it', () => {
    modalService.open('a');
    expect(modalService.getActiveModal()).toBeDefined();
  });

  it('should not have active modal after dismissing it', (done) => {
    const modal = modalService.open('a');
    modal.result.catch((reason) => {
      expect(reason).toEqual('dismiss_reason');
      expect(modalService.getActiveModal()).toBeNull();
      done();
    });
    modalService.dismissActiveModal('dismiss_reason');
  });

  it('should not have active modal after closing it', (done) => {
    const modal = modalService.open('a');
    modal.result.then((reason) => {
      expect(reason).toEqual('close_reason');
      expect(modalService.getActiveModal()).toBeNull();
      done();
    });
    modalService.closeActiveModal('close_reason');
  });

  it('should not have active modal when it is closed by backdrop click or esc key', (done) => {
    const modal = modalService.open('a');
    modal.result.catch((reason) => {
      expect(reason).toEqual('backdrop_click');
      expect(modalService.getActiveModal()).toBeNull();
      done();
    });
    modal.dismiss('backdrop_click');
  });

  it('should open modal inside root component', () => {
    const modalContent = 'Test Modal Content';
    modalService.open(modalContent);
    expect(fixture.debugElement.nativeElement.textContent).toEqual(
      modalContent
    );
  });
});
