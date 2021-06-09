import { TestBed } from '@angular/core/testing';
import { ConfiguratorAttributeNumericInputFieldService } from './configurator-attribute-numeric-input-field.component.service';

describe('ConfigAttributeNumericInputFieldService', () => {
  let serviceUnderTest: ConfiguratorAttributeNumericInputFieldService;

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(
      ConfiguratorAttributeNumericInputFieldService
    );
  });

  it('should be created', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  it('should accept integer that exactly matches the maximum length ', () => {
    expect(
      serviceUnderTest.performValidationAccordingToMetaData(
        '1,234',
        ',',
        '.',
        4,
        0
      )
    ).toBe(false);
  });

  it('should accept multiple grouping separators', () => {
    expect(
      serviceUnderTest.performValidationAccordingToMetaData(
        '1,23,4',
        ',',
        '.',
        4,
        0
      )
    ).toBe(false);
  });

  it('should not accept multiple decimal separators', () => {
    expect(
      serviceUnderTest.performValidationAccordingToMetaData(
        '1234.22.22',
        ',',
        '.',
        9,
        4
      )
    ).toBe(true);
  });

  it('should not accept input where natural part exceeds its share of total part for a natural number', () => {
    expect(
      serviceUnderTest.performValidationAccordingToMetaData(
        '123434',
        ',',
        '.',
        9,
        4
      )
    ).toBe(true);
  });

  it('should not accept input where natural part exceeds its share of total part', () => {
    expect(
      serviceUnderTest.performValidationAccordingToMetaData(
        '123434.2',
        ',',
        '.',
        9,
        4
      )
    ).toBe(true);
  });

  it('should not accept multiple decimal separators in case grouping separator needs escaping', () => {
    expect(
      serviceUnderTest.performValidationAccordingToMetaData(
        '1234,22,22',
        '.',
        ',',
        9,
        4
      )
    ).toBe(true);
  });

  it('should not accept integer that exceeds the maximum length ', () => {
    expect(
      serviceUnderTest.performValidationAccordingToMetaData(
        '1,234',
        ',',
        '.',
        3,
        0
      )
    ).toBe(true);
  });

  it('should not accept if numeric input is malformed according to swiss locale settings', () => {
    const input = '1,234';
    expect(
      serviceUnderTest.performValidationAccordingToMetaData(
        input,
        "'",
        '.',
        4,
        0
      )
    ).toBe(true);
  });

  it('should compile pattern for validation message', () => {
    expect(
      serviceUnderTest.getPatternForValidationMessage(3, 10, false, 'en')
    ).toBe('#,###,###.###');
  });

  it('should consider negative sign for validation message', () => {
    expect(
      serviceUnderTest.getPatternForValidationMessage(3, 10, true, 'en')
    ).toBe('-#,###,###.###');
  });

  it('should compile pattern for validation message in case no decimal places are present', () => {
    expect(
      serviceUnderTest.getPatternForValidationMessage(0, 10, false, 'en')
    ).toBe('#,###,###,###');
  });
});
