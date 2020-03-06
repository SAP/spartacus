import { Directive, ElementRef, OnInit } from '@angular/core';

/**
 * Abstract directive that provides a common interface for all focus directives:
 * - Persist Focus
 * - Auto Focus
 * - Escape Focus
 * - Tab Focus
 * - Lock Focus
 * - Trap Focus
 */
@Directive()
export abstract class BaseFocusDirective implements OnInit {
  protected defaultConfig = {};

  protected config: any;

  constructor(protected elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.config = Object.assign(this.defaultConfig, this.config);
  }

  set tabIndex(index: number) {
    if (index !== undefined) {
      this.host.setAttribute('tabindex', index.toString());
    }
  }

  // get tabIndex(): number {
  //   return Number(this.host.getAttribute('tabindex'));
  // }

  /**
   * Helper method to return the host element for the directive
   * given by the `elementRef`.
   */
  protected get host() {
    return this.elementRef.nativeElement;
  }
}
