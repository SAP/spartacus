/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeatureToggles } from '@spartacus/core';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import { NativeSelectSpaceDirective } from './native-select-space.directive';

@Component({
  template: `<select cxNativeSelectSpace>
    <option value="a">A</option>
  </select>`,
  imports: [NativeSelectSpaceDirective],
})
class TestHostComponent {}

describe('NativeSelectSpaceDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let selectEl: HTMLSelectElement;

  const setup = async (toggleOn: boolean) => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideMockFeatureToggles({
          a11yNavigationSpaceKeyOnKeyUp: toggleOn,
        } as FeatureToggles),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    selectEl = fixture.debugElement.query(By.css('select')).nativeElement;
  };

  const dispatchKey = (
    type: 'keydown' | 'keyup',
    repeat = false
  ): KeyboardEvent => {
    const event = new KeyboardEvent(type, {
      key: ' ',
      code: 'Space',
      cancelable: true,
      bubbles: true,
      repeat,
    });
    selectEl.dispatchEvent(event);
    return event;
  };

  describe('toggle a11yNavigationSpaceKeyOnKeyUp ON', () => {
    beforeEach(async () => setup(true));

    it('should prevent keydown Space when event.repeat is true', () => {
      const event = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        cancelable: true,
        bubbles: true,
        repeat: true,
      });
      spyOn(event, 'preventDefault');
      selectEl.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not prevent keydown Space when event.repeat is false (first press)', () => {
      const event = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        cancelable: true,
        bubbles: true,
        repeat: false,
      });
      spyOn(event, 'preventDefault');
      selectEl.dispatchEvent(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should call click() on the select element on keyup Space', () => {
      spyOn(selectEl, 'click');
      dispatchKey('keyup');
      expect(selectEl.click).toHaveBeenCalled();
    });
  });

  describe('toggle a11yNavigationSpaceKeyOnKeyUp OFF', () => {
    beforeEach(async () => setup(false));

    it('should not prevent keydown Space even when event.repeat is true', () => {
      const event = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        cancelable: true,
        bubbles: true,
        repeat: true,
      });
      spyOn(event, 'preventDefault');
      selectEl.dispatchEvent(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should not call click() on keyup Space', () => {
      spyOn(selectEl, 'click');
      dispatchKey('keyup');
      expect(selectEl.click).not.toHaveBeenCalled();
    });
  });
});
