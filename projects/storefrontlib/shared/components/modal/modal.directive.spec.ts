import { Component, DebugElement, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from './modal.directive';

abstract class BaseTestComponent {
  @Input() type;
  @Input() reason;
}

@Component({
  template: `<button [cxModal]="type" [cxModalReason]="reason" id="test">
    TEST
  </button>`,
})
class TestButtonComponent extends BaseTestComponent {}

@Component({
  template: `<a
    routerLink="/test/url"
    [cxModal]="type"
    [cxModalReason]="reason"
    id="test"
    >TEST</a
  >`,
})
class TestLinkComponent extends BaseTestComponent {}

@Component({
  template: `<button
    routerLink="/test/url"
    [cxModal]="type"
    [cxModalReason]="reason"
    id="test"
  >
    TEST
  </button>`,
})
class TestButtonLinkComponent extends BaseTestComponent {}

@Component({ template: '' })
class RouteComponent {}

describe('ModalDirective', () => {
  let component: BaseTestComponent;
  let fixture: ComponentFixture<BaseTestComponent>;
  let activeModal: NgbActiveModal;

  function configureTestingModule(componentClass: Type<BaseTestComponent>) {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '**', component: RouteComponent },
        ]),
      ],
      declarations: [
        ModalDirective,
        TestButtonComponent,
        TestLinkComponent,
        TestButtonLinkComponent,
      ],
      providers: [
        {
          provide: NgbActiveModal,
          useValue: {
            dismiss: jasmine.createSpy('dismiss'),
            close: jasmine.createSpy('close'),
          } as NgbActiveModal,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(componentClass);
    activeModal = TestBed.inject(NgbActiveModal);
    component = fixture.componentInstance;
  }

  function getTestElement(): DebugElement {
    return fixture.debugElement.query(By.css('#test'));
  }

  describe('on button click', () => {
    beforeEach(() => {
      configureTestingModule(TestButtonComponent);
    });

    it('should dismiss modal', () => {
      component.type = 'dismiss';
      component.reason = 'test reason';
      fixture.detectChanges();
      getTestElement().triggerEventHandler('click', {});
      expect(activeModal.dismiss).toHaveBeenCalledWith('test reason');
    });

    it('should close modal', () => {
      component.type = 'close';
      component.reason = 'test reason';
      fixture.detectChanges();
      getTestElement().triggerEventHandler('click', {});
      expect(activeModal.close).toHaveBeenCalledWith('test reason');
    });

    it('should use undefined reason if not specified', () => {
      component.type = 'close';
      fixture.detectChanges();
      getTestElement().triggerEventHandler('click', {});
      expect(activeModal.close).toHaveBeenCalledWith(undefined);
    });
  });

  describe('on link click', () => {
    beforeEach(() => {
      configureTestingModule(TestLinkComponent);
    });

    it('should fallback reason to URL', () => {
      component.type = 'dismiss';
      fixture.detectChanges();
      getTestElement().triggerEventHandler('click', {});
      expect(activeModal.dismiss).toHaveBeenCalledWith(
        jasmine.stringMatching(/\/test\/url/)
      );
    });
  });

  describe('on button-link click', () => {
    beforeEach(() => {
      configureTestingModule(TestButtonLinkComponent);
    });

    it('should fallback reason to URL', () => {
      component.type = 'close';
      fixture.detectChanges();
      getTestElement().triggerEventHandler('click', {});
      expect(activeModal.close).toHaveBeenCalledWith(
        jasmine.stringMatching(/\/test\/url/)
      );
    });
  });
});
