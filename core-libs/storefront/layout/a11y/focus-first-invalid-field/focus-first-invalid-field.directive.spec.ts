/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { FocusFirstInvalidFieldDirective } from './focus-first-invalid-field.directive';

@Component({
  selector: 'cx-host',
  template: `
    <form cxFocusFirstInvalidField>
      <ng-select class="valid-select"><input /></ng-select>
      <ng-select class="invalid-select ng-invalid"><input /></ng-select>
      <input class="text-input ng-invalid" />
    </form>
  `,
  imports: [FocusFirstInvalidFieldDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class HostComponent {}

describe('FocusFirstInvalidFieldDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let directive: FocusFirstInvalidFieldDirective;

  // The directive defers focus to a `setTimeout(0)` macrotask; awaiting a real
  // macrotask (a later `setTimeout(0)`) lets it run before we assert, without
  // needing `fakeAsync`/`tick` (unsupported by the vitest zone setup).
  const flushMacrotask = (): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement
      .query(By.directive(FocusFirstInvalidFieldDirective))
      .injector.get(FocusFirstInvalidFieldDirective);
  });

  it('should focus the inner input of the first invalid ng-select', async () => {
    const invalidSelectInput: HTMLElement = fixture.debugElement.query(
      By.css('.invalid-select input')
    ).nativeElement;
    vi.spyOn(invalidSelectInput, 'focus');

    directive.focusFirstInvalidField();
    await flushMacrotask(); // flush the deferred macrotask

    expect(invalidSelectInput.focus).toHaveBeenCalled();
  });

  it('should focus a plain invalid input directly', async () => {
    // Remove the invalid ng-select so the plain input is the first invalid field.
    // eslint-disable-next-line no-restricted-syntax -- test DOM teardown; Renderer2 has no node-removal equivalent
    fixture.debugElement
      .query(By.css('.invalid-select'))
      .nativeElement.remove();

    const textInput: HTMLElement = fixture.debugElement.query(
      By.css('.text-input')
    ).nativeElement;
    vi.spyOn(textInput, 'focus');

    directive.focusFirstInvalidField();
    await flushMacrotask();

    expect(textInput.focus).toHaveBeenCalled();
  });

  it('should do nothing when there is no invalid field', async () => {
    // eslint-disable-next-line no-restricted-syntax -- test DOM teardown; Renderer2 has no node-removal equivalent
    fixture.debugElement
      .query(By.css('.invalid-select'))
      .nativeElement.remove();
    // eslint-disable-next-line no-restricted-syntax -- test DOM teardown; Renderer2 has no node-removal equivalent
    fixture.debugElement.query(By.css('.text-input')).nativeElement.remove();

    const validSelectInput: HTMLElement = fixture.debugElement.query(
      By.css('.valid-select input')
    ).nativeElement;
    vi.spyOn(validSelectInput, 'focus');

    directive.focusFirstInvalidField();
    await flushMacrotask();

    expect(validSelectInput.focus).not.toHaveBeenCalled();
  });
});
