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
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { PopoverComponent } from './popover.component';
import { PopoverEvent, PopoverPosition } from './popover.model';
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
   * The preferred placement of the popover. Default popover position is 'auto'.
   *
   *  Allowed popover positions: 'auto', 'top', 'bottom', 'left', 'right',
   * 'top-left', 'top-right', 'bottom-left', 'bottom-right',
   * 'left-top', 'left-bottom', 'right-top', 'right-bottom'.
   */
  @Input() placement?: PopoverPosition;

  /**
   * Flag used to prevent firing popover open function.
   */
  @Input() disablePopover?: boolean;

  /**
   * Custom class name for popover component wrapper.
   */
  @Input() customClass? = 'cx-popover';

  /**
   * Append popover component into 'body' selector.
   */
  @Input() appendToBody?: boolean;

  /**
   * Flag indicates if popover should be re-positioned on scroll event.
   */
  @Input() positionOnScroll?: boolean;

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
    if (!this.disablePopover) {
      this.isOpen = true;
      this.focusConfig = this.popoverService.getFocusConfig(
        event,
        this.appendToBody || false
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
    this.popoverContainer.instance.eventSubject.subscribe(
      (event: PopoverEvent) => {
        if (event !== PopoverEvent.INSIDE_CLICK) this.close();
        if (
          event === PopoverEvent.ESCAPE_KEYDOWN ||
          event === PopoverEvent.CLOSE_BUTTON_KEYDOWN
        ) {
          setTimeout(() =>
            this.popoverService.setFocusOnElement(
              this.element,
              this.focusConfig,
              this.appendToBody
            )
          );
        }
      }
    );
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
    if (this.popoverContainer && this.popoverContainer.instance) {
      this.popoverContainer.instance.content = this.cxPopover;
      this.popoverContainer.instance.triggerElement = this.element;
      this.popoverContainer.instance.popoverInstance = this.popoverContainer;
      this.popoverContainer.instance.position = this.placement;
      this.popoverContainer.instance.customClass = this.customClass;
      this.popoverContainer.instance.focusConfig = this.focusConfig;
      this.popoverContainer.instance.appendToBody = this.appendToBody;
      this.popoverContainer.instance.positionOnScroll = this.positionOnScroll;

      if (this.appendToBody) {
        this.renderer.appendChild(
          this.winRef.document.body,
          this.popoverContainer.location.nativeElement
        );
      }

      this.popoverContainer.changeDetectorRef.detectChanges();

      setTimeout(() => this.handlePopoverEvents());
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
