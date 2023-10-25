/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  byBoolean,
  byComparison,
  byNullish,
  byNumber,
  byString,
  isNumber,
  isString,
  itemsWith,
  property,
  SortOrder,
  whenType,
} from '.';

describe('sortArrayAlphabetically()', () => {
  function arrayEquals(a: any, b: any) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }
  interface MockTypeData {
    valueString: string;
    valueNumber: number;
    valueBoolean: boolean;
  }
  interface MockTypeOptionalData {
    valueString?: string;
    valueNumber?: number;
    valueBoolean?: boolean;
  }
  const mockData: Array<MockTypeData> = [
    { valueString: 'd', valueNumber: 4, valueBoolean: false },
    { valueString: 'a', valueNumber: 3, valueBoolean: true },
    { valueString: 'c', valueNumber: 2, valueBoolean: false },
    { valueString: 'b', valueNumber: 1, valueBoolean: true },
  ];
  const mockData2: Array<MockTypeOptionalData> = [
    { valueString: 'a', valueNumber: 4, valueBoolean: false },
    { valueNumber: 3, valueBoolean: true },
    { valueNumber: 2, valueBoolean: false },
    { valueString: 'b', valueNumber: 1, valueBoolean: true },
  ];

  it('should sort string value correctly', () => {
    const dataASC = mockData.sort(
      itemsWith(property('valueString', byString(SortOrder.ASC)))
    );
    const singleASC = dataASC.map((item) => item.valueString);
    const isEqualASC = arrayEquals(singleASC, ['a', 'b', 'c', 'd']);
    expect(isEqualASC).toBe(true);

    const dataDESC = mockData.sort(
      itemsWith(property('valueString', byString(SortOrder.DESC)))
    );
    const singleDESC = dataDESC.map((item) => item.valueString);
    const isEqualDESC = arrayEquals(singleDESC, ['d', 'c', 'b', 'a']);
    expect(isEqualDESC).toBe(true);
  });

  it('should sort number value correctly', () => {
    const dataASC = mockData.sort(
      itemsWith(property('valueNumber', byNumber(SortOrder.ASC)))
    );
    const singleASC = dataASC.map((item) => item.valueNumber);
    const isEqualASC = arrayEquals(singleASC, [1, 2, 3, 4]);
    expect(isEqualASC).toBe(true);

    const dataDESC = mockData.sort(
      itemsWith(property('valueNumber', byNumber(SortOrder.DESC)))
    );
    const singleDESC = dataDESC.map((item) => item.valueNumber);
    const isEqualDESC = arrayEquals(singleDESC, [4, 3, 2, 1]);
    expect(isEqualDESC).toBe(true);
  });

  it('should sort boolean value correctly', () => {
    const dataASC = mockData.sort(
      itemsWith(property('valueBoolean', byBoolean(SortOrder.ASC)))
    );
    const singleASC = dataASC.map((item) => item.valueBoolean);
    const isEqualASC = arrayEquals(singleASC, [true, true, false, false]);
    expect(isEqualASC).toBe(true);

    const dataDESC = mockData.sort(
      itemsWith(property('valueBoolean', byBoolean(SortOrder.DESC)))
    );
    const singleDESC = dataDESC.map((item) => item.valueBoolean);
    const isEqualDESC = arrayEquals(singleDESC, [false, false, true, true]);
    expect(isEqualDESC).toBe(true);
  });

  it('should sort by checking type', () => {
    const data = mockData.sort(
      itemsWith(
        property(
          'valueNumber',
          itemsWith(
            whenType(isString, byString(SortOrder.ASC)),
            whenType(isNumber, byComparison(SortOrder.ASC))
          )
        )
      )
    );
    const singleASC = data.map((item) => item.valueNumber);
    const isEqualASC = arrayEquals(singleASC, [1, 2, 3, 4]);
    expect(isEqualASC).toBe(true);

    const data2 = mockData.sort(
      itemsWith(
        property(
          'valueString',
          itemsWith(
            whenType(isString, byString(SortOrder.ASC)),
            whenType(isNumber, byComparison(SortOrder.ASC))
          )
        )
      )
    );
    const singleASC2 = data2.map((item) => item.valueString);
    const isEqualASC2 = arrayEquals(singleASC2, ['a', 'b', 'c', 'd']);
    expect(isEqualASC2).toBe(true);
  });

  it('should sort with null value', () => {
    const data = mockData2.sort(
      itemsWith(
        property(
          'valueString',
          itemsWith(
            byNullish(SortOrder.DESC),
            whenType(isString, byString(SortOrder.ASC))
          )
        )
      )
    );
    const singleASC = data.map((item) => item.valueString);
    const isEqualASC = arrayEquals(singleASC, ['a', 'b', undefined, undefined]);
    expect(isEqualASC).toBe(true);
  });
});
