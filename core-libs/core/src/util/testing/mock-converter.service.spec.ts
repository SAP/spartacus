/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Converter, ConverterService } from '../converter.service';
import { ConverterTestingModule } from './converter-testing.module';
import { MockConverterService } from './mock-converter.service';

const TEST_CONVERTER = new InjectionToken<Converter<unknown, unknown>>(
  'TestConverter'
);

describe('MockConverterService', () => {
  let service: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ConverterTestingModule] });
    service = TestBed.inject(ConverterService);
  });

  it('should be provided via ConverterTestingModule', () => {
    expect(service).toBeInstanceOf(MockConverterService);
  });

  it('should convert as identity by default', () => {
    const source = { a: 1 };
    expect(service.convert(source, TEST_CONVERTER)).toBe(source);
    expect(service.convertMany([source], TEST_CONVERTER)).toEqual([source]);
    expect(service.hasConverters(TEST_CONVERTER)).toBe(false);
  });

  it('should allow overriding convert with vi.spyOn', () => {
    vi.spyOn(service, 'convert').mockReturnValue('converted');
    expect(service.convert({}, TEST_CONVERTER)).toBe('converted');
  });
});
