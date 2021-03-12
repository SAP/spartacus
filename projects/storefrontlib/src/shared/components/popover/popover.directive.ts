import {
  Directive,
  ElementRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Renderer2,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { skip } from 'rxjs/operators';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { PopoverComponent } from './popover.component';
import { PopoverEvent, PopoverOptions } from './popover.model';
import { PositioningService } from '../../services/positioning/positioning.service';
import { PopoverService } from './popover.service';

/**
 * Directive to bind popover with any DOM element.
 */
@Directive({
  selector: '[cxPopover]',
})
export class PopoverDirective {
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
  @Output() openPopover?: EventEmitter<void> = new EventEmitter();

  /**
   * An event emitted when the popover is closed.
   */
  @Output() closePopover?: EventEmitter<void> = new EventEmitter();

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
   * Listen events fired on element binded to popover directive.
   *
   * Based on event type some a11y improvements can be made.
   * For example if popover was opened by `space` or `enter` key
   * dedicated `FocusConfig` can be set to autofocus first
   * focusable element in popover container.
   */

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  handleOpen(event: MouseEvent | KeyboardEvent): void {
    if (event.target === this.element.nativeElement) this.toggle(event);
  }

  /**
   * Method performs open action for popover component.
   */
  open(event: MouseEvent | KeyboardEvent) {
    if (!this.cxPopoverOptions?.disable) {
      this.isOpen = true;
      this.focusConfig = this.popoverService.getFocusConfig(
        event,
        this.cxPopoverOptions?.appendToBody || false
      );

      this.renderPopover();

      if (this.openPopover) this.openPopover.emit();
    }
  }

  /**
   * Method performs close action for popover component.
   */
  close() {
    this.isOpen = false;
    this.viewContainer.clear();

    if (this.closePopover) this.closePopover.emit();
  }

  /**
   * Method performs toggle action for popover component.
   */
  toggle(event: MouseEvent | KeyboardEvent) {
    if (event && event.target === this.element.nativeElement && !this.isOpen)
      this.open(event);
    else if (this.isOpen) this.close();
  }

  /**
   * Method subscribes for events emitted by popover component
   * and based on event performs specific action.
   */
  handlePopoverEvents() {
    return this.popoverContainer.instance.eventSubject
      .pipe(skip(1))
      .subscribe((event: PopoverEvent) => {
        if (
          event !== PopoverEvent.INSIDE_CLICK &&
          event !== PopoverEvent.CLOSE_BUTTON_KEYDOWN
        )
          this.close();
        if (
          event === PopoverEvent.ESCAPE_KEYDOWN ||
          event === PopoverEvent.CLOSE_BUTTON_KEYDOWN
        ) {
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
  renderPopover() {
    const containerFactory = this.componentFactoryResolver.resolveComponentFactory(
      PopoverComponent
    );
    this.popoverContainer = this.viewContainer.createComponent(
      containerFactory
    );

    const componentInstance = this.popoverContainer.instance;
    if (componentInstance) {
      componentInstance.content = this.cxPopover;
      componentInstance.triggerElement = this.element;
      componentInstance.popoverInstance = this.popoverContainer;
      componentInstance.position = this.cxPopoverOptions?.placement;
      componentInstance.customClass = this.cxPopoverOptions?.class;
      componentInstance.focusConfig = this.focusConfig;
      componentInstance.appendToBody = this.cxPopoverOptions?.appendToBody;
      componentInstance.positionOnScroll = this.cxPopoverOptions?.positionOnScroll;
      componentInstance.displayCloseButton = this.cxPopoverOptions?.displayCloseButton;

      if (this.cxPopoverOptions?.appendToBody) {
        this.renderer.appendChild(
          this.winRef.document.body,
          this.popoverContainer.location.nativeElement
        );
      }

      this.popoverContainer.changeDetectorRef.detectChanges();
      this.handlePopoverEvents();
    }
  }

  constructor(
    protected element: ElementRef,
    protected viewContainer: ViewContainerRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    protected positioningService: PositioningService,
    protected popoverService: PopoverService,
    protected winRef: WindowRef
  ) {}
}
