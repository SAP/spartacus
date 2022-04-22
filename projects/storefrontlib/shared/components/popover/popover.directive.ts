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
  OnInit,
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
@Directive({
  selector: '[cxPopover]',
})
export class PopoverDirective implements OnInit {
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
  open(event: PopoverEvent) {
    if (!this.cxPopoverOptions?.disable) {
      this.isOpen = true;
      this.focusConfig = this.popoverService.getFocusConfig(
        event,
        this.cxPopoverOptions?.appendToBody || false
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
        this.renderer.appendChild(
          this.winRef.document.body,
          this.popoverContainer.location.nativeElement
        );
      }

      this.popoverContainer.changeDetectorRef.detectChanges();
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
