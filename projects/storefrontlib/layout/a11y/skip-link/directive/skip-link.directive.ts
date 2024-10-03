/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { SkipLinkService } from '../service/skip-link.service';

@Directive({
  selector: '[cxSkipLink]',
})
export class SkipLinkDirective implements OnInit, OnDestroy {
  @Input() cxSkipLink: string;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected skipLinkService: SkipLinkService
  ) {}

  ngOnInit(): void {
    this.skipLinkService.add(this.cxSkipLink, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.skipLinkService.remove(this.cxSkipLink);
  }
}
