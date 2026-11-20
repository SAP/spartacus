/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  output,
} from '@angular/core';

/**
 * Custom Directive used to enable clients to track (react to) Host's Element DOM changes.
 *
 * Whenever the mutation (Host's element DOM subthree change) is detected it will trigger the
 * _cxDomChange_ Output allowing clients to react to the Host's element DOM changes.
 *
 * Optional _cxDomChangeTargetSelector_ Input enables clients to be more specifixc when reacting to
 * the Host's element DOM changes by allowing them to specify css selector (relative to Host Element)
 * that narrows down the number of _cxDomChange_ Output executions to be triggered only when
 * _cxDomChangeTargetSelector_ Input relevant elements changes are detected.
 */
@Directive({ selector: '[cxDomChange]' })
export class DomChangeDirective implements OnDestroy {
  protected changes: MutationObserver;

  /**
   * Optional Css Selector Input filtering DOM mutations to those targeting only elements described via provided selector
   */
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() cxDomChangeTargetSelector?: string;

  public readonly cxDomChange = output<MutationRecord>();

  protected elementRef: ElementRef;

  constructor() {
    this.elementRef = inject(ElementRef);
    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      const affectedMutations = this.cxDomChangeTargetSelector
        ? mutations.filter(
            (mutation) =>
              mutation.target ===
              this.elementRef.nativeElement.querySelector(
                this.cxDomChangeTargetSelector
              )
          )
        : mutations;
      affectedMutations.forEach((mutation) => this.cxDomChange.emit(mutation));
    });

    this.changes.observe(this.elementRef.nativeElement, {
      subtree: true,
      childList: true,
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
