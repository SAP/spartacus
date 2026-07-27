/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  PLATFORM_ID,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import {
  outputToObservable,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  FeatureToggles,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import { filter, merge, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { BREAKPOINT, BreakpointService } from '../../../layout';

const ARIA_LABEL = 'aria-label';
const ARIA_HIDDEN = 'aria-hidden';

@Directive({ selector: '[cxNgSelectA11y]' })
export class NgSelectA11yDirective implements AfterViewInit {
  /**
   * Use directive to bind aria attribute to inner element of ng-select
   * Angular component for accessibility compliance. If ng-select controls itself
   * ariaControls is not needed, instead bind a specific id to the <ng-select> element.
   */
  @Input() cxNgSelectA11y: { ariaLabel?: string; ariaControls?: string };

  protected translationService = inject(TranslationService);
  protected domSanitizer = inject(DomSanitizer);
  protected selectComponent = inject(NgSelectComponent);
  protected destroyRef = inject(DestroyRef);
  private featureToggles = inject(FeatureToggles);
  protected platformId = inject(PLATFORM_ID);
  protected selectObserver: MutationObserver | null = null;
  protected breakpointService = inject(BreakpointService, { optional: true });

  private wasOpenOnEnterKeydown = false;

  /**
   * When we inside a combo box using JAWS screen reader and press escape key
   * an escape keyboard event doesn't get fired, instead an AltLeft is fired.
   */
  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const jawsEscapeCode = 'AltLeft';
    if (event.code === jawsEscapeCode) {
      this.selectComponent.close();
      return;
    }
    if (
      this.featureToggles.a11yNavigationSpaceKeyOnKeyUp &&
      event.key === 'Enter' &&
      this.wasOpenOnEnterKeydown
    ) {
      this.wasOpenOnEnterKeydown = false;
      this.selectComponent.toggleItem(
        this.selectComponent.itemsList.markedItem
      );
    }
  }

  @HostListener('keydown.escape')
  onEscape() {
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('input').focus();
    });
  }

  /**
   * Keystrokes inside ng-select are dropdown navigation, not form filling,
   * so the focus outline must remain visible. `VisibleFocusDirective` treats
   * any `<input>` keystroke as form filling and adds a `mouse-focus` class
   * (which hides the outline) when the dropdown was opened with a mouse.
   * We defer to a microtask so this runs after the bubbled keydown has
   * reached `VisibleFocusDirective`, then clear the class on the closest
   * ancestor that has it.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.featureToggles.a11yNavigationSpaceKeyOnKeyUp) {
      if (
        (event.key === ' ' || event.code === 'Space') &&
        this.selectComponent.isOpen()
      ) {
        event.preventDefault();
      }
    }
    if (!this.featureToggles.a11yRestoreFocusOnNgSelect) {
      return;
    }
    Promise.resolve().then(() => {
      this.elementRef.nativeElement
        .closest('.mouse-focus')
        ?.classList.remove('mouse-focus');
    });
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    useFeatureStyles('a11yNgSelectUnicodeCarets');
    if (this.featureToggles.a11yVocalizeDropdownItemCount) {
      this.vocalizeItemCount();
    }
  }

  ngAfterViewInit(): void {
    const nativeEl = this.elementRef.nativeElement;
    const inputCombobox = nativeEl.querySelector('[role="combobox"]');

    this.renderer.setAttribute(inputCombobox, 'role', 'combobox');
    this.renderer.setAttribute(inputCombobox, 'aria-expanded', 'false');

    /*
     * Hide the arrow indicator from screen readers to prevent it from
     * announcing the unicode caret character (▼) as "black icon"
     * introduced by a11yNgSelectUnicodeCarets feature
     * */
    const arrowWrapper = nativeEl.querySelector('.ng-arrow-wrapper');
    if (arrowWrapper) {
      this.renderer.setAttribute(arrowWrapper, ARIA_HIDDEN, 'true');
    }

    const isOpened$ = outputToObservable(this.selectComponent.openEvent).pipe(
      map(() => 'true')
    );
    const isClosed$ = outputToObservable(this.selectComponent.closeEvent).pipe(
      map(() => 'false')
    );
    merge(isOpened$, isClosed$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        this.renderer.setAttribute(inputCombobox, 'aria-expanded', state);
        if (ariaControls) {
          // Delay execution to come after the ng-select's own 'aria-controls' logic
          setTimeout(() => {
            this.renderer.setAttribute(
              inputCombobox,
              'aria-controls',
              ariaControls
            );
          });
        }
      });

    const ariaLabel = this.cxNgSelectA11y.ariaLabel;
    const elementId = nativeEl.id;
    const ariaControls = this.cxNgSelectA11y.ariaControls ?? elementId;

    if (ariaLabel) {
      this.renderer.setAttribute(inputCombobox, ARIA_LABEL, ariaLabel);
    }

    if (ariaControls) {
      this.renderer.setAttribute(inputCombobox, 'aria-controls', ariaControls);
    }

    if (inputCombobox.readOnly && isPlatformBrowser(this.platformId)) {
      if (this.featureToggles.a11yNgSelectReadonlyInputValue) {
        this.setInputValue(inputCombobox);
        this.selectObserver = new MutationObserver(() => {
          this.setInputValue(inputCombobox);
        });
        this.selectObserver.observe(nativeEl, {
          subtree: true,
          characterData: true,
          childList: true,
        });
        this.destroyRef.onDestroy(() => this.selectObserver?.disconnect());
      } else {
        this.breakpointService
          ?.isDown(BREAKPOINT.md)
          .pipe(filter(Boolean), take(1))
          .subscribe(() => {
            const selectObserver = new MutationObserver((changes, observer) => {
              this.appendValueToAriaLabel(changes, observer, inputCombobox);
            });
            selectObserver.observe(nativeEl, {
              subtree: true,
              characterData: true,
              childList: true,
            });
          });
      }
    }

    if (this.featureToggles.a11yNavigationSpaceKeyOnKeyUp) {
      this.interceptEnterKeyDown();
    }
  }

  /**
   * Wraps `NgSelectComponent.handleKeyDown` to skip the built-in Enter handler
   * when the dropdown is open, so selection is deferred to keyup (WCAG 2.5.2).
   * `event.preventDefault()` alone cannot block another HostListener on the
   * same element, hence the method wrap.
   */
  protected interceptEnterKeyDown(): void {
    const selectComponent = this.selectComponent;
    const original = selectComponent.handleKeyDown.bind(selectComponent);
    selectComponent.handleKeyDown = ($event: KeyboardEvent) => {
      if ($event.key === 'Enter' && selectComponent.isOpen()) {
        this.wasOpenOnEnterKeydown = true;
        $event.preventDefault();
        return;
      }
      original($event);
    };
    this.destroyRef.onDestroy(() => {
      selectComponent.handleKeyDown = original;
    });
  }

  vocalizeItemCount() {
    effect(() => {
      this.translationService
        .translate('assistiveMessage.dropdownItemCount', {
          count: this.selectComponent.items()?.length ?? 0,
        })
        .pipe(take(1), takeUntilDestroyed(this.destroyRef))
        .subscribe((countText) => {
          const itemCountSpan =
            this.elementRef.nativeElement.querySelector(
              '.cx-ng-select-count'
            ) ?? this.createItemCountSpan();
          this.renderer.setProperty(itemCountSpan, 'textContent', countText);
        });
    });
  }

  protected createItemCountSpan() {
    const itemCountSpan = this.renderer.createElement('span');
    this.renderer.addClass(itemCountSpan, 'cx-ng-select-count');
    this.renderer.addClass(itemCountSpan, 'cx-visually-hidden');
    this.renderer.setAttribute(itemCountSpan, ARIA_HIDDEN, 'true');
    this.renderer.appendChild(this.elementRef.nativeElement, itemCountSpan);
    const countId =
      (this.elementRef.nativeElement.id || 'ng-select') + '-count';
    this.renderer.setAttribute(itemCountSpan, 'id', countId);
    const inputCombobox =
      this.elementRef.nativeElement.querySelector('[role="combobox"]');
    if (inputCombobox) {
      this.renderer.setAttribute(inputCombobox, 'aria-describedby', countId);
    }
    this.destroyRef.onDestroy(() => itemCountSpan.remove());
    return itemCountSpan;
  }

  setInputValue(inputCombobox: HTMLElement) {
    const sanitizedValueLabel = this.domSanitizer.sanitize(
      SecurityContext.HTML,
      this.elementRef.nativeElement.querySelector('.ng-value-label')?.innerText
    );
    if (sanitizedValueLabel) {
      // We set the input's value so JAWS reads it instead of announcing "blank"
      this.renderer.setProperty(inputCombobox, 'value', sanitizedValueLabel);
      const valueElement =
        this.elementRef.nativeElement.querySelector('.ng-value');
      if (valueElement) {
        // hide this value to avoid double readout
        this.renderer.setAttribute(valueElement, ARIA_HIDDEN, 'true');
      }
    }
  }

  /**
   * Hides the input value from the screen reader and provides it as part of the aria-label instead.
   * This improves the screen reader output on mobile devices.
   */
  appendValueToAriaLabel(
    _changes: any,
    observer: MutationObserver,
    divCombobox: HTMLElement
  ) {
    const sanitizedValueLabel = this.domSanitizer.sanitize(
      SecurityContext.HTML,
      this.elementRef.nativeElement.querySelector('.ng-value-label')?.innerText
    );
    if (sanitizedValueLabel) {
      const comboboxAriaLabel = divCombobox?.getAttribute(ARIA_LABEL) || '';
      const valueElement =
        this.elementRef.nativeElement.querySelector('.ng-value');
      this.renderer.setAttribute(valueElement, ARIA_HIDDEN, 'true');
      this.renderer.setAttribute(
        divCombobox,
        ARIA_LABEL,
        comboboxAriaLabel + ', ' + sanitizedValueLabel
      );
    }
    observer.disconnect();
  }
}
