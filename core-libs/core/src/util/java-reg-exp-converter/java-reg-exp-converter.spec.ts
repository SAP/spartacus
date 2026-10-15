/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../../logger';
import { JavaRegExpConverter } from './java-reg-exp-converter';

describe('JavaRegExpConverter', () => {
  let converter: JavaRegExpConverter;
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    converter = TestBed.inject(JavaRegExpConverter);
    logger = TestBed.inject(LoggerService);

    vi.spyOn(logger, 'warn');
  });

  it('converts a compatible Java regexp', () => {
    expect(converter.toJsRegExp('(?i)pattern')).toEqual(/pattern/i);
  });

  it('returns null and warns for an unsupported Java regexp', () => {
    expect(converter.toJsRegExp('(?x)electronics')).toBeNull();
    expect(logger.warn).toHaveBeenCalledWith(
      'WARNING: Could not convert Java regexp into Javascript. Original regexp: (?x)electronics'
    );
  });
});
