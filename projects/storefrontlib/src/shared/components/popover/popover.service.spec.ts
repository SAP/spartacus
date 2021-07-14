import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverService } from './popover.service';
import { Component, ElementRef } from '@angular/core';
import { PopoverEvent } from '@spartacus/storefront';

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
    it(`should return config for pressing ${PopoverEvent.OPEN_BY_KEYBOARD}`, () => {
      expect(
        service.getFocusConfig(PopoverEvent.OPEN_BY_KEYBOARD, true)
      ).toEqual(focusConfig);
    });

    it(`should return empty config for pressing ${PopoverEvent.OPEN_BY_KEYBOARD} with appendToBody flag set as false`, () => {
      expect(
        service.getFocusConfig(PopoverEvent.OPEN_BY_KEYBOARD, false)
      ).toEqual({});
    });

    it(`should return empty config for click a mouse`, () => {
      expect(service.getFocusConfig(PopoverEvent.OPEN, true)).toEqual({});
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
