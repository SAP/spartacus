/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { BreakpointService } from '../../breakpoint';
import { ResponsiveAriaLabelDirective } from './responsive-aria-label.directive';

const mockIsLargeScreen$ = new BehaviorSubject<boolean>(false);

class MockBreakpointService {
  isUp() {
    return mockIsLargeScreen$.asObservable();
  }
}

@Component({
  template: `
    <a
      cxResponsiveAriaLabel
      [ariaLabelSmall]="'small label'"
      [ariaLabelLarge]="'large label'"
    ></a>
  `,
  imports: [ResponsiveAriaLabelDirective],
})
class TestHostComponent {}

describe('ResponsiveAriaLabelDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: BreakpointService, useClass: MockBreakpointService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  }));

  it('should set ariaLabelSmall on small screens', () => {
    mockIsLargeScreen$.next(false);
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(
      By.directive(ResponsiveAriaLabelDirective)
    ).nativeElement;

    expect(anchor.getAttribute('aria-label')).toBe('small label');
  });

  it('should set ariaLabelLarge on large screens', () => {
    mockIsLargeScreen$.next(true);
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(
      By.directive(ResponsiveAriaLabelDirective)
    ).nativeElement;

    expect(anchor.getAttribute('aria-label')).toBe('large label');
  });

  it('should update aria-label when breakpoint changes', () => {
    mockIsLargeScreen$.next(false);
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(
      By.directive(ResponsiveAriaLabelDirective)
    ).nativeElement;

    expect(anchor.getAttribute('aria-label')).toBe('small label');

    mockIsLargeScreen$.next(true);
    fixture.detectChanges();

    expect(anchor.getAttribute('aria-label')).toBe('large label');
  });
});
