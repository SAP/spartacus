/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CvvTooltipDirective } from './cvv-tooltip.directive';

@Component({
  template: `<button [cxCvvTooltip]="text">info</button>`,
  imports: [CvvTooltipDirective],
})
class TestHostComponent {
  text = 'Hint text';
}

describe('CvvTooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let button: HTMLButtonElement;

  const getTooltipEl = (): HTMLElement | null =>
    document.body.querySelector('.cx-cvv-tooltip');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button')).nativeElement;
  });

  afterEach(() => {
    // Remove tooltip element left in body between tests
    getTooltipEl()?.remove();
  });

  it('should create a tooltip element in the DOM on init', () => {
    expect(getTooltipEl()).toBeTruthy();
  });

  it('should set role="tooltip" on the tooltip element', () => {
    expect(getTooltipEl()?.getAttribute('role')).toBe('tooltip');
  });

  it('should set aria-describedby on the host pointing at the tooltip id', () => {
    const tooltipEl = getTooltipEl();
    const tooltipId = tooltipEl?.id;
    expect(tooltipId).toBeTruthy();
    expect(button.getAttribute('aria-describedby')).toBe(tooltipId);
  });

  it('should start with aria-hidden="true" on the tooltip', () => {
    expect(getTooltipEl()?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should set aria-hidden="false" on mouseenter', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    expect(getTooltipEl()?.getAttribute('aria-hidden')).toBe('false');
  });

  it('should set aria-hidden="false" on focus', () => {
    button.dispatchEvent(new FocusEvent('focus'));
    expect(getTooltipEl()?.getAttribute('aria-hidden')).toBe('false');
  });

  it('should add visible class on show', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    expect(getTooltipEl()?.classList.contains('cx-cvv-tooltip--visible')).toBe(
      true
    );
  });

  it('should set aria-hidden="true" on mouseleave', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    button.dispatchEvent(new MouseEvent('mouseleave'));
    expect(getTooltipEl()?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should set aria-hidden="true" on blur', () => {
    button.dispatchEvent(new FocusEvent('focus'));
    button.dispatchEvent(new FocusEvent('blur'));
    expect(getTooltipEl()?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should remove visible class on hide', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    button.dispatchEvent(new MouseEvent('mouseleave'));
    expect(getTooltipEl()?.classList.contains('cx-cvv-tooltip--visible')).toBe(
      false
    );
  });

  it('should hide on Escape keydown', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(getTooltipEl()?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should display the input text as tooltip content on show', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    expect(getTooltipEl()?.textContent).toBe('Hint text');
  });

  it('should remove the tooltip element from the DOM on destroy', () => {
    const tooltipId = getTooltipEl()?.id ?? '';
    fixture.destroy();
    expect(document.getElementById(tooltipId)).toBeNull();
  });

  it('should remove aria-describedby from host on destroy', () => {
    fixture.destroy();
    expect(button.getAttribute('aria-describedby')).toBeNull();
  });
});
