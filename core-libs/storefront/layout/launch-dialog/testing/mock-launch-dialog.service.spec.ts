/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { LaunchDialogService } from '../services/launch-dialog.service';
import { LaunchDialogTestingModule } from './launch-dialog-testing.module';
import { MockLaunchDialogService } from './mock-launch-dialog.service';

describe('MockLaunchDialogService', () => {
  let service: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [LaunchDialogTestingModule] });
    service = TestBed.inject(LaunchDialogService);
  });

  it('should be provided via LaunchDialogTestingModule', () => {
    expect(service).toBeInstanceOf(MockLaunchDialogService);
  });

  it('should allow spying on openDialog', () => {
    const spy = vi.spyOn(service, 'openDialog').mockReturnValue(of('opened'));
    service.openDialog('caller' as any, undefined, undefined);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit dialogClose by default', async () => {
    expect(await firstValueFrom(service.dialogClose)).toBeUndefined();
  });
});
