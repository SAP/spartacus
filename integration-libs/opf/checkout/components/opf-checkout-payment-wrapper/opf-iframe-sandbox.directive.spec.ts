/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpfIframeSandboxDirective } from './opf-iframe-sandbox.directive';

const SANDBOX_SCRIPTS = 'allow-scripts';
const SANDBOX_SCRIPTS_SAME_ORIGIN = 'allow-scripts allow-same-origin';

@Component({
  template: `<iframe [opfSandbox]="sandboxValue"></iframe>`,
  imports: [OpfIframeSandboxDirective],
  standalone: true,
})
class TestHostComponent {
  sandboxValue: string | undefined;
}

describe('OpfIframeSandboxDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let iframe: HTMLIFrameElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  const getIframe = () =>
    fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement;

  it('should set sandbox attribute when value is provided', () => {
    component.sandboxValue = SANDBOX_SCRIPTS;
    fixture.detectChanges();

    iframe = getIframe();
    expect(iframe.getAttribute('sandbox')).toBe(SANDBOX_SCRIPTS);
  });

  it('should not set sandbox attribute when value is undefined', () => {
    component.sandboxValue = undefined;
    fixture.detectChanges();

    iframe = getIframe();
    expect(iframe.hasAttribute('sandbox')).toBeFalse();
  });

  it('should update sandbox attribute when value changes', () => {
    component.sandboxValue = SANDBOX_SCRIPTS;
    fixture.detectChanges();

    component.sandboxValue = SANDBOX_SCRIPTS_SAME_ORIGIN;
    fixture.detectChanges();

    iframe = getIframe();
    expect(iframe.getAttribute('sandbox')).toBe(SANDBOX_SCRIPTS_SAME_ORIGIN);
  });

  it('should remove sandbox attribute when value changes to undefined', () => {
    component.sandboxValue = SANDBOX_SCRIPTS;
    fixture.detectChanges();

    component.sandboxValue = undefined;
    fixture.detectChanges();

    iframe = getIframe();
    expect(iframe.hasAttribute('sandbox')).toBeFalse();
  });
});
