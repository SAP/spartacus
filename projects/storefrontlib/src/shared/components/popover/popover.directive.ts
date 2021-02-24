import { DOCUMENT } from '@angular/common';
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
  Inject,
  HostListener,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FocusConfig } from '../../../layout';
import { PopoverComponent } from './popover.component';
import { PopoverPosition } from './popover.model';
import { PositioningService } from './positioning.service';
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
   * Callback used to unlisten click event when is not necessary anymore.
   */
  clickEventUnlistener: () => void;

  /**
   * Callback used to unlisten keydown event when is not necessary anymore.
   */
  keydownEventUnlistener: () => void;

  /**
   * Listen events fired on element binded to popover directive.
   *
   * Based on event type some a11y improvements can be made.
   * For example if popover was opened by `space` or `enter` key
   * dedicated `FocusConfig` can be set to autofocus first
   * focusable element in popover container.
   */
  @HostListener('keydown.enter', ['$event'])
  @HostListener('click', ['$event'])
  handleOpen(event: MouseEvent | KeyboardEvent): void {
    this.toggle(event);
  }

  /**
   * Method performs open action for popover component.
   */
  open(event: MouseEvent | KeyboardEvent) {
    if (!this.disablePopover) {
      this.isOpen = true;
      this.focusConfig = this.popoverService.getFocusConfig(
        event,
        this.appendToBody
      );

      this.renderPopover();
      this.openPopover.emit();

      this.triggerClickEvent();
      this.triggerEscKeydownEvent();
    }
  }

  /**
   * Method performs close action for popover component.
   */
  close() {
    this.isOpen = false;
    this.viewContainer.clear();
    this.closePopover.emit();

    this.clickEventUnlistener();
    this.keydownEventUnlistener();
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

      if (this.appendToBody) {
        this.renderer.appendChild(
          this.document.body,
          this.popoverContainer.location.nativeElement
        );
      }

      this.popoverContainer.changeDetectorRef.detectChanges();
    }
  }

  /**
   * Method uses `Renderer2` service to listen every click event.
   *
   * Registered only when popover state was set to open and checks if element
   * outside popover component was clicked.
   *
   * If so directive performs `close()` action and fire unlistener for such event.
   */
  triggerClickEvent() {
    this.clickEventUnlistener = this.renderer.listen(
      this.winRef.nativeWindow,
      'click',
      (event: Event) => {
        if (event && event.target !== this.element.nativeElement) this.close();
      }
    );
  }

  /**
   * Method uses `Renderer2` service to listen every click event.
   *
   * Registered only when popover state was set to open and checks if `escape`
   * key was pressed.
   *
   * If so directive performs `close()` action and fire unlistener for such event.
   */
  triggerEscKeydownEvent() {
    this.keydownEventUnlistener = this.renderer.listen(
      this.winRef.nativeWindow,
      'keydown.escape',
      (event: KeyboardEvent) => {
        if (event) {
          this.close();
          if (this.focusConfig && this.appendToBody) {
            this.element.nativeElement.focus();
          }
        }
      }
    );
  }

  constructor(
    protected element: ElementRef,
    protected viewContainer: ViewContainerRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    protected positioningService: PositioningService,
    protected popoverService: PopoverService,
    protected winRef: WindowRef,

    @Inject(DOCUMENT) protected document: any
  ) {}
}
