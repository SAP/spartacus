/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  inject,
  output,
  input,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Subject } from 'rxjs';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { PopoverComponent } from './popover.component';
import { PopoverEvent, PopoverOptions } from './popover.model';
import { PopoverService } from './popover.service';

/**
 * Directive to bind popover with any DOM element.
 */
@Directive({ selector: '[cxPopover]' })
export class PopoverDirective implements OnInit {
  protected element = inject(ElementRef);
  protected viewContainer = inject(ViewContainerRef);
  protected renderer = inject(Renderer2);
  protected changeDetectorRef = inject(ChangeDetectorRef);
  protected popoverService = inject(PopoverService);
  protected winRef = inject(WindowRef);

  /**
   * Template or string to be rendered inside popover wrapper component.
   */
  readonly cxPopover = input<string | TemplateRef<any>>();

  /**
   * Options set for popover component.
   */
  readonly cxPopoverOptions = input<PopoverOptions>();

  /**
   * An event emitted when the popover is opened.
   */
  readonly openPopover = output<void>();

  /**
   * An event emitted when the popover is closed.
   */
  readonly closePopover = output<void>();

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
  open(event: PopoverEvent) {
    const cxPopoverOptions = this.cxPopoverOptions();
    if (!cxPopoverOptions?.disable) {
      this.isOpen = true;
      this.focusConfig = this.popoverService.getFocusConfig(
        event,
        cxPopoverOptions?.appendToBody || false
      );
      this.renderPopover();
      this.openPopover.emit();
    }
  }

  /**
   * Method performs close action for popover component.
   */
  close() {
    this.isOpen = false;
    this.viewContainer.clear();
    this.closePopover.emit();
  }

  /**
   * Method subscribes for events emitted by popover component
   * and based on event performs specific action.
   */
  handlePopoverEvents() {
    this.eventSubject.subscribe((event: PopoverEvent) => {
      if (this.openTriggerEvents.includes(event)) {
        this.open(event);
      }
      if (this.focusPopoverTriggerEvents.includes(event)) {
        this.popoverContainer.location.nativeElement.focus();
      }
      if (this.closeTriggerEvents.includes(event)) {
        this.close();
      }
      if (this.focusDirectiveTriggerEvents.includes(event)) {
        this.popoverService.setFocusOnElement(this.element);
      }
    });
  }

  /**
   * Method creates instance and pass parameters to popover component.
   */
  renderPopover() {
    const content = this.cxPopover();
    if (content === undefined) {
      return;
    }
    this.popoverContainer =
      this.viewContainer.createComponent(PopoverComponent);

    const componentInstance = this.popoverContainer.instance;
    if (componentInstance) {
      componentInstance.content = content;
      componentInstance.triggerElement = this.element;
      componentInstance.popoverInstance = this.popoverContainer;
      componentInstance.focusConfig = this.focusConfig;
      componentInstance.eventSubject = this.eventSubject;
      const cxPopoverOptions = this.cxPopoverOptions();
      componentInstance.position = cxPopoverOptions?.placement;
      componentInstance.customClass = cxPopoverOptions?.class;
      componentInstance.appendToBody = cxPopoverOptions?.appendToBody;
      componentInstance.positionOnScroll = cxPopoverOptions?.positionOnScroll;
      componentInstance.displayCloseButton =
        cxPopoverOptions?.displayCloseButton;
      componentInstance.autoPositioning = cxPopoverOptions?.autoPositioning;

      if (cxPopoverOptions?.appendToBody) {
        const body = this.winRef.document.body;
        const element = body.firstElementChild ?? body;
        this.renderer.appendChild(
          element,
          this.popoverContainer.location.nativeElement
        );
      }

      this.popoverContainer.changeDetectorRef.detectChanges();
    }
  }

  ngOnInit() {
    this.handlePopoverEvents();
  }
}
