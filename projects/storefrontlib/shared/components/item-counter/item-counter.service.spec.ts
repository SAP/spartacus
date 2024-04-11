/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElementRef } from '@angular/core';
import { ItemCounterService } from './item-counter.service';

describe('ItemCounterService', () => {
  let itemCounterService: ItemCounterService;

  beforeEach(() => {
    itemCounterService = new ItemCounterService();
  });

  it('should return the initial counter value of 1', () => {
    expect(itemCounterService.getCounter()).toBe(1);
  });

  it('should not update the counter if the value is not greater than 0', () => {
    itemCounterService.setCounter(0);
    expect(itemCounterService.getCounter()).toBe(1);
  });

  it('should update the counter if the value is greater than 0 and input is valid', () => {
    const mockInput = {
      nativeElement: { offsetParent: { className: 'cx-counter-stock' } },
    } as ElementRef<HTMLInputElement>;
    itemCounterService.setCounter(5, mockInput);
    expect(itemCounterService.getCounter()).toBe(5);
  });

  it('should not update the counter if the input is invalid', () => {
    const mockInput = {
      nativeElement: { offsetParent: { className: 'invalid-class' } },
    } as ElementRef<HTMLInputElement>;
    itemCounterService.setCounter(10, mockInput);
    expect(itemCounterService.getCounter()).toBe(1);
  });

  it('should return true if the input is an initial product counter', () => {
    const mockInput = {
      nativeElement: { offsetParent: { className: 'cx-counter-stock' } },
    } as ElementRef<HTMLInputElement>;
    expect(itemCounterService['isInitialProductCounter'](mockInput)).toBe(true);
  });

  it('should return false if the input is not an initial product counter', () => {
    const mockInput = {
      nativeElement: { offsetParent: { className: 'invalid-class' } },
    } as ElementRef<HTMLInputElement>;
    expect(itemCounterService['isInitialProductCounter'](mockInput)).toBe(
      false
    );
  });
});
