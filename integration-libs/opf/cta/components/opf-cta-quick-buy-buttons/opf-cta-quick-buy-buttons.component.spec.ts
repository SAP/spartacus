/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OpfCtaScriptsService } from '../opf-cta-scripts/opf-cta-scripts.service';
import { OpfCtaQuickBuyButtonsComponent } from './opf-cta-quick-buy-buttons.component';

describe('OpfCtaQuickBuyButtonsComponent', () => {
  let component: OpfCtaQuickBuyButtonsComponent;
  let fixture: ComponentFixture<OpfCtaQuickBuyButtonsComponent>;
  let opfCtaScriptsService: jasmine.SpyObj<OpfCtaScriptsService>;

  beforeEach(() => {
    opfCtaScriptsService = jasmine.createSpyObj('OpfCtaScriptsService', [
      'getQuickBuyCtaHtmlList',
    ]);

    TestBed.configureTestingModule({
      imports: [OpfCtaQuickBuyButtonsComponent],
      providers: [
        { provide: OpfCtaScriptsService, useValue: opfCtaScriptsService },
      ],
    });

    opfCtaScriptsService.getQuickBuyCtaHtmlList.and.returnValue(of([]));

    fixture = TestBed.createComponent(OpfCtaQuickBuyButtonsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getQuickBuyCtaHtmlList on init', () => {
    fixture.detectChanges();
    expect(opfCtaScriptsService.getQuickBuyCtaHtmlList).toHaveBeenCalled();
  });
});
