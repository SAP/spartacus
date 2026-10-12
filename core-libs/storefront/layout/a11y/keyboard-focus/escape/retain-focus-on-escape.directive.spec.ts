/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RetainFocusOnEscapeDirective } from './retain-focus-on-escape.directive';

const DEFAULT_CLASS = 'cx-dismissed';
const CUSTOM_CLASS = 'my-custom-dismissed';

@Component({
  selector: 'cx-host',
  template: `
    <span class="wrapper">
      <button type="button" cxRetainFocusOnEscape>info</button>
      <span class="tooltip">hint</span>
    </span>
  `,
  imports: [RetainFocusOnEscapeDirective],
})
class MockComponent {}

@Component({
  selector: 'cx-host-custom',
  template: `
    <span class="wrapper">
      <button type="button" [cxRetainFocusOnEscape]="'${CUSTOM_CLASS}'">info</button>
      <span class="tooltip">hint</span>
    </span>
  `,
  imports: [RetainFocusOnEscapeDirective],
})
class MockComponentCustomClass {}

describe('RetainFocusOnEscapeDirective', () => {
  describe('default class', () => {
    let fixture: ComponentFixture<MockComponent>;
    let button: HTMLElement;
    let wrapper: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MockComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(MockComponent);
      fixture.detectChanges();

      button = fixture.debugElement.query(By.css('button')).nativeElement;
      wrapper = fixture.debugElement.query(By.css('.wrapper')).nativeElement;
    });

    describe('on escape', () => {
      function triggerEscape(): KeyboardEvent {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        vi.spyOn(event, 'preventDefault');
        vi.spyOn(event, 'stopPropagation');
        fixture.debugElement
          .query(By.css('button'))
          .triggerEventHandler('keydown.escape', event);
        return event;
      }

      it('should add the dismissed class to the wrapper', () => {
        triggerEscape();
        expect(wrapper.classList.contains(DEFAULT_CLASS)).toBe(true);
      });

      it('should prevent default and stop propagation', () => {
        const event = triggerEscape();
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
      });

      it('should keep focus on the button', () => {
        button.focus();
        triggerEscape();
        expect(document.activeElement).toBe(button);
      });
    });

    describe('on blur', () => {
      it('should remove the dismissed class so the tooltip is re-enabled', () => {
        wrapper.classList.add(DEFAULT_CLASS);
        fixture.debugElement
          .query(By.css('button'))
          .triggerEventHandler('blur', {});
        expect(wrapper.classList.contains(DEFAULT_CLASS)).toBe(false);
      });

      it('should not fail when the dismissed class is absent', () => {
        expect(() =>
          fixture.debugElement
            .query(By.css('button'))
            .triggerEventHandler('blur', {})
        ).not.toThrow();
        expect(wrapper.classList.contains(DEFAULT_CLASS)).toBe(false);
      });
    });
  });

  describe('configurable cxRetainFocusOnEscape input', () => {
    let fixture: ComponentFixture<MockComponentCustomClass>;
    let wrapper: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MockComponentCustomClass],
      }).compileComponents();

      fixture = TestBed.createComponent(MockComponentCustomClass);
      fixture.detectChanges();

      wrapper = fixture.debugElement.query(By.css('.wrapper')).nativeElement;
    });

    it('should add the custom class on escape', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      fixture.debugElement
        .query(By.css('button'))
        .triggerEventHandler('keydown.escape', event);
      expect(wrapper.classList.contains(CUSTOM_CLASS)).toBe(true);
      expect(wrapper.classList.contains(DEFAULT_CLASS)).toBe(false);
    });

    it('should remove the custom class on blur', () => {
      wrapper.classList.add(CUSTOM_CLASS);
      fixture.debugElement
        .query(By.css('button'))
        .triggerEventHandler('blur', {});
      expect(wrapper.classList.contains(CUSTOM_CLASS)).toBe(false);
    });
  });
});
