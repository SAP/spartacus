/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TruncationTooltipDirective } from './truncation-tooltip.directive';

@Component({
  template: `<input cxTruncationTooltip value="CUSTOMER-ID-12345" />`,
  imports: [TruncationTooltipDirective],
  standalone: true,
})
class TestHostComponent {}

describe('TruncationTooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: DebugElement;
  let inputNative: HTMLInputElement;

  const makeOverflowing = () => {
    Object.defineProperty(inputNative, 'scrollWidth', {
      value: 300,
      configurable: true,
    });
    Object.defineProperty(inputNative, 'clientWidth', {
      value: 100,
      configurable: true,
    });
    spyOn(inputNative, 'getBoundingClientRect').and.returnValue({
      top: 50,
      left: 20,
    } as DOMRect);
  };

  const makeFitting = () => {
    Object.defineProperty(inputNative, 'scrollWidth', {
      value: 100,
      configurable: true,
    });
    Object.defineProperty(inputNative, 'clientWidth', {
      value: 300,
      configurable: true,
    });
  };

  const tooltip = () =>
    document.body.querySelector<HTMLElement>('.cx-truncation-tooltip');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(
      By.directive(TruncationTooltipDirective)
    );
    inputNative = inputEl.nativeElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('initialisation', () => {
    it('should apply cx-truncate-with-elipsis class to host input', () => {
      expect(inputNative.classList).toContain('cx-truncate-with-elipsis');
    });

    it('should append tooltip span to document body', () => {
      expect(tooltip()).toBeTruthy();
    });

    it('should set aria-hidden on tooltip span', () => {
      expect(tooltip()?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('show()', () => {
    it('should not show tooltip on mouseenter when text is not truncated', () => {
      makeFitting();
      inputEl.triggerEventHandler('mouseenter', null);

      expect(tooltip()?.classList).not.toContain('cx-truncation-tooltip--visible');
    });

    it('should not show tooltip on focus when text is not truncated', () => {
      makeFitting();
      inputEl.triggerEventHandler('focus', null);

      expect(tooltip()?.classList).not.toContain('cx-truncation-tooltip--visible');
    });

    it('should show tooltip on mouseenter when text is truncated', () => {
      makeOverflowing();
      inputEl.triggerEventHandler('mouseenter', null);

      expect(tooltip()?.classList).toContain('cx-truncation-tooltip--visible');
    });

    it('should show tooltip on focus when text is truncated', () => {
      makeOverflowing();
      inputEl.triggerEventHandler('focus', null);

      expect(tooltip()?.classList).toContain('cx-truncation-tooltip--visible');
    });

    it('should set tooltip text content to the input value', () => {
      makeOverflowing();
      inputEl.triggerEventHandler('mouseenter', null);

      expect(tooltip()?.textContent).toBe('CUSTOMER-ID-12345');
    });

    it('should position tooltip using bounding rect top and left', () => {
      makeOverflowing();
      inputEl.triggerEventHandler('mouseenter', null);

      expect(tooltip()?.style.top).toBe('50px');
      expect(tooltip()?.style.left).toBe('20px');
    });
  });

  describe('hide()', () => {
    beforeEach(() => {
      makeOverflowing();
      inputEl.triggerEventHandler('mouseenter', null);
    });

    it('should hide tooltip on mouseleave', () => {
      inputEl.triggerEventHandler('mouseleave', null);

      expect(tooltip()?.classList).not.toContain('cx-truncation-tooltip--visible');
    });

    it('should hide tooltip on blur', () => {
      inputEl.triggerEventHandler('blur', null);

      expect(tooltip()?.classList).not.toContain('cx-truncation-tooltip--visible');
    });
  });

  describe('ngOnDestroy()', () => {
    it('should remove tooltip span from document body', () => {
      fixture.destroy();

      expect(tooltip()).toBeNull();
    });
  });
});
