import { TestBed } from '@angular/core/testing';
import {
  ConfiguratorAttributeNumericInputFieldService,
  ConfiguratorAttributeNumericInterval,
} from './configurator-attribute-numeric-input-field.component.service';
import { Configurator } from '../../../../core/model/configurator.model';

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

  describe('getIntervals', () => {
    let intervals: ConfiguratorAttributeNumericInterval[] = [
      {
        minValue: 4,
        maxValue: 7,
        minValueIncluded: false,
        maxValueIncluded: true,
      },

      {
        minValue: 10,
        maxValue: 12,
        minValueIncluded: true,
        maxValueIncluded: true,
      },
    ];

    let value1: Configurator.Value = {
      valueCode: '1',
      name: '>4 - 7',
    };

    let value2: Configurator.Value = {
      valueCode: '1',
      name: '10 - 12',
    };

    let values: Configurator.Value[] = [];
    values.push(value1);
    values.push(value2);
    it('should get multiple intervals', () => {
      expect(serviceUnderTest.getIntervals(values)).toEqual(intervals);
    });
  });

  describe('formatIntervalValue', () => {
    it('should format interval value in en format', () => {
      expect(serviceUnderTest.formatIntervalValue(2.75, 3, 'en')).toEqual(
        '2.750'
      );
    });
    it('should format large interval value in en format', () => {
      expect(serviceUnderTest.formatIntervalValue(3222543.75, 2, 'en')).toEqual(
        '3,222,543.75'
      );
    });
    it('should format large interval value in en format with undefined decimal places', () => {
      expect(
        serviceUnderTest.formatIntervalValue(3222543.75, undefined, 'en')
      ).toEqual('3,222,544');
    });
  });

  describe('getInterval', () => {
    it('should get minValue and maxValue from closed interval string', () => {
      let interval: ConfiguratorAttributeNumericInterval = {
        minValue: 4,
        maxValue: 7,
        minValueIncluded: true,
        maxValueIncluded: true,
      };
      let value: Configurator.Value = {
        valueCode: '1',
        name: '4 - 7',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(interval);
    });

    it('should get minValue and maxValue from open interval string', () => {
      let interval: ConfiguratorAttributeNumericInterval = {
        minValue: 4,
        maxValue: 7,
        minValueIncluded: false,
        maxValueIncluded: false,
      };
      let value: Configurator.Value = {
        valueCode: '1',
        name: '>4 - <7',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(interval);
    });

    it('should get minValue and maxValue from half-open interval string (min included)', () => {
      let interval: ConfiguratorAttributeNumericInterval = {
        minValue: 4,
        maxValue: 7,
        minValueIncluded: true,
        maxValueIncluded: false,
      };
      let value: Configurator.Value = {
        valueCode: '1',
        name: '4 - <7',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(interval);
    });

    it('should get minValue and maxValue from half-open interval string (max included)', () => {
      let interval: ConfiguratorAttributeNumericInterval = {
        minValue: 4,
        maxValue: 7,
        minValueIncluded: false,
        maxValueIncluded: true,
      };
      let value: Configurator.Value = {
        valueCode: '1',
        name: '>4 - 7',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(interval);
    });

    it('should get minValue from infinite interval string', () => {
      let interval: ConfiguratorAttributeNumericInterval = {
        minValue: 5,
        maxValue: undefined,
        minValueIncluded: false,
        maxValueIncluded: false,
      };
      let value: Configurator.Value = {
        valueCode: '1',
        name: '>5',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(interval);
    });

    it('should get minValue from infinite interval string, minValue included', () => {
      let interval: ConfiguratorAttributeNumericInterval = {
        minValue: 5,
        maxValue: undefined,
        minValueIncluded: true,
        maxValueIncluded: false,
      };
      let value: Configurator.Value = {
        valueCode: '1',
        name: '≥5',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(interval);
    });

    it('should get maxValue from interval string', () => {
      let interval: ConfiguratorAttributeNumericInterval = {
        minValue: undefined,
        maxValue: 5,
        maxValueIncluded: false,
        minValueIncluded: false,
      };
      let value: Configurator.Value = {
        valueCode: '1',
        name: '<5',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(interval);
    });

    it('should get maxValue from interval string, value included', () => {
      let interval: ConfiguratorAttributeNumericInterval = {
        minValue: undefined,
        maxValue: 5,
        maxValueIncluded: true,
        minValueIncluded: false,
      };
      let value: Configurator.Value = {
        valueCode: '1',
        name: '≤5',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(interval);
    });

    it('should get single value from interval string', () => {
      let interval: ConfiguratorAttributeNumericInterval = {
        maxValue: 5,
        minValue: 5,
        maxValueIncluded: true,
        minValueIncluded: true,
      };
      let value: Configurator.Value = {
        valueCode: '1',
        name: '5',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(interval);
    });

    it('should return undefined if value is selected', () => {
      let value: Configurator.Value = {
        valueCode: '1',
        name: '5',
        selected: true,
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(undefined);
    });

    it('should return undefined if value name is not provided', () => {
      let value: Configurator.Value = {
        valueCode: '1',
      };
      expect(serviceUnderTest.getInterval(value)).toEqual(undefined);
    });
  });
});
