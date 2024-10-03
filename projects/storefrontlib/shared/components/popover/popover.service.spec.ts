import { Component, ElementRef } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeatureConfigService } from '@spartacus/core';
import { PopoverEvent } from '@spartacus/storefront';
import { PopoverService } from './popover.service';

const focusConfig = {
  trap: true,
  block: true,
  focusOnEscape: false,
  autofocus: true,
};

@Component({ template: '<div id="a"></div><div id="b" tabindex="5"></div>' })
class MockComponent {}

class mockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('PopoverService', () => {
  let service: PopoverService;
  let fixture: ComponentFixture<MockComponent>;
  let el: ElementRef<HTMLElement>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PopoverService,
        {
          provide: FeatureConfigService,
          useClass: mockFeatureConfigService,
        },
      ],
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
    it('should restore focus to the element', fakeAsync(() => {
      service.setFocusOnElement(el);
      tick();
      expect(el.nativeElement.focus).toHaveBeenCalled();
    }));
  });
});
