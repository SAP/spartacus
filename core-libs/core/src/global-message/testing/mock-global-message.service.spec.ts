/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { GlobalMessageService } from '../facade/global-message.service';
import { GlobalMessageType } from '../models/global-message.model';
import { GlobalMessageTestingModule } from './global-message-testing.module';
import { MockGlobalMessageService } from './mock-global-message.service';

describe('MockGlobalMessageService', () => {
  let service: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [GlobalMessageTestingModule] });
    service = TestBed.inject(GlobalMessageService);
  });

  it('should be provided via GlobalMessageTestingModule', () => {
    expect(service).toBeInstanceOf(MockGlobalMessageService);
  });

  it('should return an empty entities map by default', async () => {
    expect(await firstValueFrom(service.get())).toEqual({});
  });

  it('should allow spying on add', () => {
    const spy = vi.spyOn(service, 'add');
    service.add('text', GlobalMessageType.MSG_TYPE_INFO);
    expect(spy).toHaveBeenCalledWith('text', GlobalMessageType.MSG_TYPE_INFO);
  });
});
