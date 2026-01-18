/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { BypassSecurityTrustHtmlPipe } from './bypass-security-trust-html.pipe';

describe('BypassSecurityTrustHtmlPipe', () => {
  let pipe: BypassSecurityTrustHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BypassSecurityTrustHtmlPipe],
    });

    pipe = TestBed.inject(BypassSecurityTrustHtmlPipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return SafeHtml using DomSanitizer', () => {
    const html = `<div><a href="#test">link</a></div>`;
    const result = pipe.transform(html);

    // The return should be a SafeHtml wrapper
    expect(result).toBeTruthy();
    expect(result).toEqual(sanitizer.bypassSecurityTrustHtml(html));
  });

  it('should return SafeHtml even for empty string', () => {
    const result = pipe.transform('');
    expect(result).toEqual(sanitizer.bypassSecurityTrustHtml(''));
  });

  it('should return SafeHtml for undefined input as empty string', () => {
    const result = pipe.transform(undefined);
    expect(result).toEqual(sanitizer.bypassSecurityTrustHtml(''));
  });
});
