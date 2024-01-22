/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ItemCounterService } from './item-counter.service';

describe('ItemCounterService', () => {
  let service: ItemCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default counter value of 1', () => {
    expect(service.getCounter()).toBe(1);
  });

  it('should not set the counter if a negative value', () => {
    const value = 2;
    service.setCounter(value);

    const negativeCounterValue = -3;
    service.setCounter(negativeCounterValue);
    expect(service.getCounter()).toBe(value);
  });

  it('should set and get the counter value', () => {
    const newCounterValue = 5;
    service.setCounter(newCounterValue);
    expect(service.getCounter()).toBe(newCounterValue);
  });
});
