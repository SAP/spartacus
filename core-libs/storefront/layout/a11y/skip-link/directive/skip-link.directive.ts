/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { SkipLinkService } from '../service/skip-link.service';

@Directive({ selector: '[cxSkipLink]' })
export class SkipLinkDirective implements OnInit, OnDestroy {
  protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected skipLinkService = inject(SkipLinkService);

  readonly cxSkipLink = input.required<string>();

  ngOnInit(): void {
    this.skipLinkService.add(this.cxSkipLink(), this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.skipLinkService.remove(this.cxSkipLink());
  }
}
