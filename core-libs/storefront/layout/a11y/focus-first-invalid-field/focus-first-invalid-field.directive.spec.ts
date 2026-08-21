/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should focus the inner input of the first invalid ng-select', fakeAsync(() => {
    const invalidSelectInput: HTMLElement = fixture.debugElement.query(
      By.css('.invalid-select input')
    ).nativeElement;
    spyOn(invalidSelectInput, 'focus');

    directive.focusFirstInvalidField();
    tick(); // flush the deferred macrotask

    expect(invalidSelectInput.focus).toHaveBeenCalled();
  }));

  it('should focus a plain invalid input directly', fakeAsync(() => {
    // Remove the invalid ng-select so the plain input is the first invalid field.
    // eslint-disable-next-line no-restricted-syntax -- test DOM teardown; Renderer2 has no node-removal equivalent
    fixture.debugElement
      .query(By.css('.invalid-select'))
      .nativeElement.remove();

    const textInput: HTMLElement = fixture.debugElement.query(
      By.css('.text-input')
    ).nativeElement;
    spyOn(textInput, 'focus');

    directive.focusFirstInvalidField();
    tick();

    expect(textInput.focus).toHaveBeenCalled();
  }));

  it('should do nothing when there is no invalid field', fakeAsync(() => {
    // eslint-disable-next-line no-restricted-syntax -- test DOM teardown; Renderer2 has no node-removal equivalent
    fixture.debugElement
      .query(By.css('.invalid-select'))
      .nativeElement.remove();
    // eslint-disable-next-line no-restricted-syntax -- test DOM teardown; Renderer2 has no node-removal equivalent
    fixture.debugElement.query(By.css('.text-input')).nativeElement.remove();

    const validSelectInput: HTMLElement = fixture.debugElement.query(
      By.css('.valid-select input')
    ).nativeElement;
    spyOn(validSelectInput, 'focus');

    directive.focusFirstInvalidField();
    tick();

    expect(validSelectInput.focus).not.toHaveBeenCalled();
  }));
});
