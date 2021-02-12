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
  NgZone,
  HostListener,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PopoverComponent } from './popover.component';
import { PopoverPosition } from './popover.model';
import { PositioningService } from './positioning-service';

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
   */
  @Input() placement?: PopoverPosition = PopoverPosition.AUTO;

  /**
   * Flag used to prevent firing popover open function.
   */
  @Input() disablePopover?: boolean;

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
   * Property containing ngZone subscription.
   */
  ngZoneSubscription: Subscription;

  /**
   * Method performs open action for popover component.
   */
  open() {
    if (!this.disablePopover) {
      const containerFactory = this.componentFactoryResolver.resolveComponentFactory(
        PopoverComponent
      );
      this.popoverContainer = this.viewContainer.createComponent(
        containerFactory
      );
      if (this.popoverContainer && this.popoverContainer.instance) {
        this.popoverContainer.instance.content = this.cxPopover;
        if (this.appendToBody) {
          this.renderer.appendChild(
            this.document.body,
            this.popoverContainer.location.nativeElement
          );
        }
        this.ngZoneSubscription = this.ngZone.onStable.subscribe(() => {
          if (this.popoverContainer) {
            this.positioningService.positionElements(
              this.element.nativeElement,
              this.popoverContainer.location.nativeElement,
              this.placement,
              this.appendToBody
            );
          }
        });
      }
      this.changeDetectorRef.markForCheck();
      this.openPopover.emit();
    }
  }

  /**
   * Method performs close action for popover component.
   */
  close() {
    if (this.ngZoneSubscription) {
      this.ngZoneSubscription.unsubscribe();
    }
    this.viewContainer.clear();
    this.closePopover.emit();
  }

  /**
   * Method triggers clicked element from event and toggles popover component.
   */
  trigger(event: Event) {
    if (event && this.element.nativeElement === event.target && !this.isOpen) {
      this.isOpen = true;
      this.open();
    } else {
      this.isOpen = false;
      this.close();
    }
  }

  /**
   * Listener for every click events in document.
   */
  @HostListener('document:click', ['$event'])
  clickEvent(event: Event) {
    this.trigger(event);
  }

  constructor(
    protected element: ElementRef,
    protected viewContainer: ViewContainerRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    protected positioningService: PositioningService,
    protected ngZone: NgZone,
    @Inject(DOCUMENT) protected document: any
  ) {}
}
