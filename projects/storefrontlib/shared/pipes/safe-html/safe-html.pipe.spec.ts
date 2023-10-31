/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let safeHtmlPipe: SafeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SafeHtmlPipe,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (value: string) => value,
          },
        },
      ],
    });

    safeHtmlPipe = TestBed.inject(SafeHtmlPipe);
  });

  it('should create an instance', () => {
    expect(safeHtmlPipe).toBeTruthy();
  });

  it('should bypass security and return SafeHtml', () => {
    const htmlString = '<div>Some HTML content</div>';
    const sanitizedHtml = safeHtmlPipe.transform(htmlString);

    expect(sanitizedHtml).toBeDefined();
  });
});
