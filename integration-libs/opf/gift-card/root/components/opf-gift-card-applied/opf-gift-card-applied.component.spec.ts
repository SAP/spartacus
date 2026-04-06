/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { of, throwError } from 'rxjs';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CommonModule } from '@angular/common';
import { OpfGiftCardAppliedComponent } from './opf-gift-card-applied.component';
import { OpfGiftCardService } from '@spartacus/opf/gift-card/core'
import { OutletModule } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';

describe('OpfGiftCardAppliedComponent', () => {
  let component: OpfGiftCardAppliedComponent;
  let fixture: ComponentFixture<OpfGiftCardAppliedComponent>;

  let mockGlobalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let mockGiftCardService: jasmine.SpyObj<OpfGiftCardService>;
  let mockActiveCartFacade: jasmine.SpyObj<ActiveCartFacade>;

  beforeEach(async () => {
    mockGlobalMessageService = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);
    mockGiftCardService = jasmine.createSpyObj('OpfGiftCardService', [
      'removeGiftCard',
    ]);
    mockActiveCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
      'reloadActiveCart',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, OutletModule, OpfGiftCardAppliedComponent],
      providers: [
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        { provide: OpfGiftCardService, useValue: mockGiftCardService },
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        TranslatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfGiftCardAppliedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove gift card successfully', () => {
    const giftCardId = '123';

    mockGiftCardService.removeGiftCard.and.returnValue(of(undefined));
    component.removeGiftCard(giftCardId);

    expect(mockGiftCardService.removeGiftCard).toHaveBeenCalledWith(giftCardId);
    expect(mockActiveCartFacade.reloadActiveCart).toHaveBeenCalled();
    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { key: 'opfGiftCard.removedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should handle error when removing gift card fails', () => {
    const giftCardId = '123';
    const errorResponse = {
      message: 'Failed to remove gift card',
      details: [{ message: 'Detailed error' }],
    };

    spyOn(console, 'error');

    mockGiftCardService.removeGiftCard.and.returnValue(
      throwError(() => errorResponse)
    );

    component.removeGiftCard(giftCardId);

    expect(mockGiftCardService.removeGiftCard).toHaveBeenCalledWith(giftCardId);
    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { raw: errorResponse.details[0].message },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
