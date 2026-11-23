/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpfIframeSandboxDirective } from './opf-iframe-sandbox.directive';

const SANDBOX_SCRIPTS = 'allow-scripts';
const SANDBOX_SCRIPTS_SAME_ORIGIN = 'allow-scripts allow-same-origin';

@Component({
  template: `<iframe [cxOpfSandbox]="sandboxValue()"></iframe>`,
  imports: [OpfIframeSandboxDirective],
})
class TestHostComponent {
  sandboxValue = signal<string | undefined>(undefined);
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
    component.sandboxValue.set(SANDBOX_SCRIPTS);
    fixture.detectChanges();

    iframe = getIframe();
    expect(iframe.getAttribute('sandbox')).toBe(SANDBOX_SCRIPTS);
  });

  it('should not set sandbox attribute when value is undefined', () => {
    component.sandboxValue.set(undefined);
    fixture.detectChanges();

    iframe = getIframe();
    expect(iframe.hasAttribute('sandbox')).toBeFalse();
  });

  it('should update sandbox attribute when value changes', () => {
    component.sandboxValue.set(SANDBOX_SCRIPTS);
    fixture.detectChanges();

    component.sandboxValue.set(SANDBOX_SCRIPTS_SAME_ORIGIN);
    fixture.detectChanges();

    iframe = getIframe();
    expect(iframe.getAttribute('sandbox')).toBe(SANDBOX_SCRIPTS_SAME_ORIGIN);
  });

  it('should remove sandbox attribute when value changes to undefined', () => {
    component.sandboxValue.set(SANDBOX_SCRIPTS);
    fixture.detectChanges();

    component.sandboxValue.set(undefined);
    fixture.detectChanges();

    iframe = getIframe();
    expect(iframe.hasAttribute('sandbox')).toBeFalse();
  });
});
