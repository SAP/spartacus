import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabFocusDirective } from './tab-focus.directive';
import { TabFocusService } from './tab-focus.service';

@Component({
  selector: 'cx-host',
  template: `
    <div cxTabFocus id="a"></div>
    <div [cxTabFocus]="{ tab: true }" id="b"></div>
    <div [cxTabFocus]="{ tab: false }" id="c"></div>
  `,
})
class MockComponent {}

class MockTabFocusService {
  moveTab() {}
  hasPersistedFocus() {}
  shouldFocus() {}
}

describe('TabFocusDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let service: TabFocusService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, TabFocusDirective],
      providers: [
        {
          provide: TabFocusService,
          useClass: MockTabFocusService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    service = TestBed.inject(TabFocusService);
  }));

  const event = {
    preventDefault: () => {},
    stopPropagation: () => {},
  } as KeyboardEvent;

  describe('configuration', () => {
    it('should use tab by default', () => {
      const host = fixture.debugElement.query(By.css('#a'));
      spyOn(service, 'moveTab').and.callThrough();
      fixture.detectChanges();

      host.triggerEventHandler('keydown.arrowRight', event);
      host.triggerEventHandler('keydown.arrowLeft', event);
      expect(service.moveTab).toHaveBeenCalledTimes(2);
    });

    it('should call moveTab when tab = true', () => {
      const host = fixture.debugElement.query(By.css('#b'));
      spyOn(service, 'moveTab').and.callThrough();
      fixture.detectChanges();

      host.triggerEventHandler('keydown.arrowRight', event);
      host.triggerEventHandler('keydown.arrowLeft', event);
      expect(service.moveTab).toHaveBeenCalledTimes(2);
    });

    it('should not call moveTab when tab = false', () => {
      const host = fixture.debugElement.query(By.css('#c'));
      spyOn(service, 'moveTab').and.callThrough();
      fixture.detectChanges();

      host.triggerEventHandler('keydown.arrowRight', event);
      host.triggerEventHandler('keydown.arrowLeft', event);
      expect(service.moveTab).toHaveBeenCalledTimes(0);
    });
  });

  describe('right', () => {
    it('should moveTab 1 when arrowRight is used ', () => {
      const host = fixture.debugElement.query(By.css('#a'));
      spyOn(service, 'moveTab').and.callThrough();
      fixture.detectChanges();

      host.triggerEventHandler('keydown.arrowRight', event);
      expect(service.moveTab).toHaveBeenCalledWith(
        host.nativeElement,
        { tab: true },
        1,
        event
      );
    });

    it('should not moveTab 1 when arrowLeft is used ', () => {
      const host = fixture.debugElement.query(By.css('#a'));
      spyOn(service, 'moveTab').and.callThrough();
      fixture.detectChanges();

      host.triggerEventHandler('keydown.arrowLeft', event);

      expect(service.moveTab).not.toHaveBeenCalledWith(
        host.nativeElement,
        { tab: true },
        1,
        event
      );
    });
  });

  describe('left', () => {
    it('should moveTab 1 when arrowLeft is used ', () => {
      const host = fixture.debugElement.query(By.css('#a'));
      spyOn(service, 'moveTab').and.callThrough();
      fixture.detectChanges();

      host.triggerEventHandler('keydown.arrowLeft', event);
      expect(service.moveTab).toHaveBeenCalledWith(
        host.nativeElement,
        { tab: true },
        -1,
        event
      );
    });

    it('should not moveTab -1 when arrowRight is used ', () => {
      const host = fixture.debugElement.query(By.css('#a'));
      spyOn(service, 'moveTab').and.callThrough();
      fixture.detectChanges();

      host.triggerEventHandler('keydown.arrowRight', event);

      expect(service.moveTab).not.toHaveBeenCalledWith(
        host.nativeElement,
        { tab: true },
        -1,
        event
      );
    });
  });
});
