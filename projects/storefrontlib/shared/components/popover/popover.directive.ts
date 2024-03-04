/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { FeatureConfigService, WindowRef } from '@spartacus/core';
import { SelectFocusUtility } from '@spartacus/storefront';
import { Subject, take } from 'rxjs';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { PopoverComponent } from './popover.component';
import { PopoverEvent, PopoverOptions } from './popover.model';
import { PopoverService } from './popover.service';

/**
 * Directive to bind popover with any DOM element.
 */
@Directive({
  selector: '[cxPopover]',
})
export class PopoverDirective implements OnInit {
  @Optional() featureFlagService = inject(FeatureConfigService);
  @Optional() selectFocusUtility = inject(SelectFocusUtility);
  /**
   * Template or string to be rendered inside popover wrapper component.
   */
  @Input() cxPopover: string | TemplateRef<any>;

  /**
   * Options set for popover component.
   */
  @Input() cxPopoverOptions?: PopoverOptions;

  /**
   * An event emitted when the popover is opened.
   */
  @Output() openPopover: EventEmitter<void> = new EventEmitter();

  /**
   * An event emitted when the popover is closed.
   */
  @Output() closePopover: EventEmitter<void> = new EventEmitter();

  /**
   * Flag used to inform about current state of popover component.
   * Popover is closed by default, so value is set to false.
   */
  isOpen: boolean;

  /**
   * Popover component instance.
   */
  popoverContainer: ComponentRef<PopoverComponent>;

  /**
   * Configuration for a11y improvements.
   */
  focusConfig: FocusConfig;

  /**
   * Subject which emits specific type of `PopoverEvent`.
   */
  eventSubject: Subject<PopoverEvent> = new Subject<PopoverEvent>();

  /**
   * Listen events fired on element binded to popover directive.
   *
   * Based on event type some a11y improvements can be made.
   * For example if popover was opened by `space` or `enter` key
   * dedicated `FocusConfig` can be set to autofocus first
   * focusable element in popover container.
   */
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handlePress(event: KeyboardEvent): void {
    event?.preventDefault();
    if (event?.target === this.element.nativeElement && !this.isOpen) {
      this.eventSubject.next(PopoverEvent.OPEN_BY_KEYBOARD);
    } else if (this.isOpen) {
      this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_KEYDOWN);
    }
  }

  @HostListener('keydown.tab')
  @HostListener('keydown.shift.tab')
  handleTab(): void {
    if (!this.focusConfig?.trap && this.isOpen) {
      this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_KEYDOWN);
    }
  }

  @HostListener('keydown.escape')
  handleEscape(): void {
    this.eventSubject.next(PopoverEvent.ESCAPE_KEYDOWN);
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    event?.preventDefault();
    if (event?.target === this.element.nativeElement && !this.isOpen) {
      this.eventSubject.next(PopoverEvent.OPEN);
    } else if (this.isOpen) {
      this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_CLICK);
    }
  }

  protected openTriggerEvents: PopoverEvent[] = [
    PopoverEvent.OPEN,
    PopoverEvent.OPEN_BY_KEYBOARD,
  ];

  protected focusPopoverTriggerEvents: PopoverEvent[] = [
    PopoverEvent.OPEN_BY_KEYBOARD,
  ];

  protected closeTriggerEvents: PopoverEvent[] = [
    PopoverEvent.ROUTE_CHANGE,
    PopoverEvent.ESCAPE_KEYDOWN,
    PopoverEvent.OUTSIDE_CLICK,
    PopoverEvent.CLOSE_BUTTON_KEYDOWN,
    PopoverEvent.CLOSE_BUTTON_CLICK,
  ];

  protected focusDirectiveTriggerEvents: PopoverEvent[] = [
    PopoverEvent.ESCAPE_KEYDOWN,
    PopoverEvent.CLOSE_BUTTON_KEYDOWN,
  ];

  /**
   * Method performs open action for popover component.
   */
  // TODO: (CXSPA-6442) - remove feature flags next major release
  open(event: PopoverEvent) {
    if (!this.cxPopoverOptions?.disable) {
      if (this.featureFlagService.isLevel('6.8')) {
        if (event === PopoverEvent.OPEN_BY_KEYBOARD) {
          this.removePopoverWrapper();
        }
      }
      this.isOpen = true;
      this.focusConfig = this.popoverService.getFocusConfig(
        event,
        this.cxPopoverOptions?.appendToBody || false
      );
      this.renderPopover();
      if (!this.featureFlagService.isLevel('6.8')) {
        this.openPopover.emit();
      }
    }
  }

  /**
   * Method performs close action for popover component.
   */
  // TODO: (CXSPA-6442) - remove feature flags next major release
  close() {
    this.isOpen = false;
    this.viewContainer.clear();
    if (this.featureFlagService.isLevel('6.8')) {
      if (this.cxPopoverOptions?.appendToBody) {
        this.removePopoverWrapper();
      }
    }
    this.closePopover.emit();
  }

  /**
   * Method subscribes for events emitted by popover component
   * and based on event performs specific action.
   */
  // TODO: (CXSPA-6442) - remove feature flags next major release
  handlePopoverEvents() {
    this.eventSubject.subscribe((event: PopoverEvent) => {
      if (this.openTriggerEvents.includes(event)) {
        this.open(event);
      }
      if (this.focusPopoverTriggerEvents.includes(event)) {
        if (this.featureFlagService.isLevel('6.8')) {
          this.openPopover.pipe(take(1)).subscribe(() => {
            this.selectFocusUtility
              .findFocusable(this.popoverContainer.location.nativeElement)[0]
              ?.focus();
          });
        } else {
          this.popoverContainer.location.nativeElement.focus();
        }
      }
      if (this.closeTriggerEvents.includes(event)) {
        this.close();
      }
      if (this.focusDirectiveTriggerEvents.includes(event)) {
        this.popoverService.setFocusOnElement(
          this.element,
          this.focusConfig,
          this.cxPopoverOptions?.appendToBody
        );
      }
    });
  }

  /**
   * Method creates instance and pass parameters to popover component.
   */
  // TODO: (CXSPA-6442) - remove feature flags next major release
  renderPopover() {
    const containerFactory =
      this.componentFactoryResolver.resolveComponentFactory(PopoverComponent);
    this.popoverContainer =
      this.viewContainer.createComponent(containerFactory);

    const componentInstance = this.popoverContainer.instance;
    if (componentInstance) {
      componentInstance.content = this.cxPopover;
      componentInstance.triggerElement = this.element;
      componentInstance.popoverInstance = this.popoverContainer;
      componentInstance.focusConfig = this.focusConfig;
      componentInstance.eventSubject = this.eventSubject;
      componentInstance.position = this.cxPopoverOptions?.placement;
      componentInstance.customClass = this.cxPopoverOptions?.class;
      componentInstance.appendToBody = this.cxPopoverOptions?.appendToBody;
      componentInstance.positionOnScroll =
        this.cxPopoverOptions?.positionOnScroll;
      componentInstance.displayCloseButton =
        this.cxPopoverOptions?.displayCloseButton;
      componentInstance.autoPositioning =
        this.cxPopoverOptions?.autoPositioning;

      if (this.cxPopoverOptions?.appendToBody) {
        if (this.featureFlagService.isLevel('6.8')) {
          this.appendPopoverToBody();
          return;
        } else {
          this.renderer.appendChild(
            this.winRef.document.body,
            this.popoverContainer.location.nativeElement
          );
        }
      }
      if (this.featureFlagService.isLevel('6.8')) {
        this.openPopover.emit();
      }
      this.popoverContainer.changeDetectorRef.detectChanges();
    }
  }

  /**
   * To ensure screen reader readout, this method first creates
   * an aria-live wrapper then nests the popover.
   */
  appendPopoverToBody(): void {
    const popoverWrapper = this.renderer.createElement('div');
    const observer = new MutationObserver((_mutation, observer) => {
      this.renderer.appendChild(
        popoverWrapper,
        this.popoverContainer.location.nativeElement
      );
      this.popoverContainer.instance.positionPopover();
      this.popoverContainer.changeDetectorRef.detectChanges();
      observer.disconnect();
      this.openPopover.emit();
    });
    observer.observe(this.winRef.document.body, { childList: true });
    this.renderer.setAttribute(popoverWrapper, 'aria-live', 'polite');
    this.renderer.setProperty(popoverWrapper, 'id', 'popoverWrapper');
    this.renderer.appendChild(this.winRef.document.body, popoverWrapper);
  }

  removePopoverWrapper(): void {
    const popoverWrapper =
      this.winRef.document.getElementById('popoverWrapper');
    if (popoverWrapper) {
      this.renderer.removeChild(this.winRef.document.body, popoverWrapper);
    }
  }

  ngOnInit() {
    this.handlePopoverEvents();
  }

  constructor(
    protected element: ElementRef,
    protected viewContainer: ViewContainerRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    protected popoverService: PopoverService,
    protected winRef: WindowRef
  ) {}
}
