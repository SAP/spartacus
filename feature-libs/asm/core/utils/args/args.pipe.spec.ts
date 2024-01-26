/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArgsPipe } from './args.pipe';

describe('ArgsPipe', () => {
  let pipe: ArgsPipe;

  beforeEach(() => {
    pipe = new ArgsPipe();
  });

  it('should transform the input values', () => {
    const inputFunction = (a: number, b: number, c: number) => a + b + c;
    const inputArgs: [number, number, number] = [1, 2, 3];
    const expectedResult = 6;

    const result = pipe.transform(inputFunction, ...inputArgs);

    expect(result).toEqual(expectedResult);
  });
});
