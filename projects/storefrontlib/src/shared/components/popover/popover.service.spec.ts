import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverService } from './popover.service';
import { Component, ElementRef } from '@angular/core';

const focusConfig = {
  trap: true,
  block: true,
  focusOnEscape: false,
  autofocus: true,
};

@Component({ template: '<div id="a"></div><div id="b" tabindex="5"></div>' })
class MockComponent {}

describe('PopoverService', () => {
  let service: PopoverService;
  let fixture: ComponentFixture<MockComponent>;
  let el: ElementRef<HTMLElement>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopoverService],
    });
    service = TestBed.inject(PopoverService);
    fixture = TestBed.createComponent(MockComponent);
    el = fixture.debugElement.query(By.css('#a'));
    spyOn(el.nativeElement, 'focus').and.callThrough();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('getFocusConfig', () => {
    ['Enter', 'Space'].forEach((code) => {
      it(`should return config for pressing ${code}`, () => {
        const event = new KeyboardEvent('keydown', { code });
        expect(service.getFocusConfig(event, true)).toEqual(focusConfig);
      });

      it(`should return empty config for pressing ${code} with appendToBody flag set as false`, () => {
        const event = new KeyboardEvent('keydown', { code });
        expect(service.getFocusConfig(event, false)).toEqual({});
      });
    });

    ['Ctrl', 'Shift', 'x', '1'].forEach((code) => {
      it(`should return empty config for pressing ${code}`, () => {
        const event = new KeyboardEvent('keydown', { code });
        expect(service.getFocusConfig(event, true)).toEqual({});
      });
    });

    it(`should return empty config for click a mouse`, () => {
      const event = new MouseEvent('click', {});
      expect(service.getFocusConfig(event, true)).toEqual({});
    });
  });

  describe('setFocusOnElement', () => {
    it('should focus on Element with config', () => {
      service.setFocusOnElement(el, focusConfig, true);
      expect(el.nativeElement.focus).toHaveBeenCalled();
    });

    it('should focus on Element with empty config', () => {
      service.setFocusOnElement(el, {}, true);
      expect(el.nativeElement.focus).toHaveBeenCalled();
    });

    it('should not focus on Element without config', () => {
      service.setFocusOnElement(el, undefined, true);
      expect(el.nativeElement.focus).not.toHaveBeenCalled();
    });

    it('should not focus on Element with appendToBody flag set as false', () => {
      service.setFocusOnElement(el, {}, false);
      expect(el.nativeElement.focus).not.toHaveBeenCalled();
    });
  });
});
