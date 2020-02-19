import { Component, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusTrapDirective } from './focus-trap.directive';
import { FocusTrapService } from '../service/focus-trap.service';

class MockFocusTrapService {
  getTrapHandler = () => {
    return () => null;
  };

  focusFirstEl = () => {
    return null;
  };
}

@Component({
  template: `
    <div cxFocusTrap></div>
  `,
})
class TestContainerComponent {}

@Component({
  template: `
    <div [cxFocusTrap]="{ autoFocus: true }"></div>
  `,
})
class TestContainerWithAutoFocusComponent {}

fdescribe('FocusTrapDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let service: FocusTrapService;
  let component: TestContainerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        TestContainerComponent,
        TestContainerWithAutoFocusComponent,
        FocusTrapDirective,
      ],
      providers: [
        { provide: FocusTrapService, useClass: MockFocusTrapService },
      ],
    }).compileComponents();
  }));

  describe('Without config', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestContainerComponent);
      service = TestBed.get(FocusTrapService as Type<FocusTrapService>);
      component = fixture.componentInstance;
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should create focus trap on component creation', () => {
      const element = fixture.nativeElement.querySelector('div[cxfocustrap]');
      const spyHandler = spyOn(service, 'getTrapHandler');
      const spyAutoFocus = spyOn(service, 'focusFirstEl');
      const spyListener = spyOn(element, 'addEventListener');

      expect(spyHandler).not.toHaveBeenCalled();
      expect(spyAutoFocus).not.toHaveBeenCalled();
      expect(spyListener).not.toHaveBeenCalled();
      fixture.detectChanges();
      expect(spyHandler).toHaveBeenCalled();
      expect(spyAutoFocus).not.toHaveBeenCalled();
      expect(spyListener).toHaveBeenCalled();
    });

    it('should remove focus trap on component destruction', () => {
      const element = fixture.nativeElement.querySelector('div[cxfocustrap]');
      const spyListener = spyOn(element, 'removeEventListener');
      expect(spyListener).not.toHaveBeenCalled();
      fixture.detectChanges();
      fixture.destroy();
      expect(spyListener).toHaveBeenCalled();
    });
  });

  describe('With AutoFocus', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestContainerWithAutoFocusComponent);
      service = TestBed.get(FocusTrapService as Type<FocusTrapService>);
      component = fixture.componentInstance;
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should create focus trap and call autofocus', () => {
      const element = fixture.nativeElement.querySelector('div');
      const spyHandler = spyOn(service, 'getTrapHandler');
      const spyAutoFocus = spyOn(service, 'focusFirstEl');
      const spyListener = spyOn(element, 'addEventListener');

      expect(spyHandler).not.toHaveBeenCalled();
      expect(spyAutoFocus).not.toHaveBeenCalled();
      expect(spyListener).not.toHaveBeenCalled();
      fixture.detectChanges();
      expect(spyHandler).toHaveBeenCalled();
      expect(spyAutoFocus).toHaveBeenCalled();
      expect(spyListener).toHaveBeenCalled();
    });

    it('should remove focus trap on component destruction', () => {
      const element = fixture.nativeElement.querySelector('div');
      const spyListener = spyOn(element, 'removeEventListener');
      expect(spyListener).not.toHaveBeenCalled();
      fixture.detectChanges();
      fixture.destroy();
      expect(spyListener).toHaveBeenCalled();
    });
  });
});
