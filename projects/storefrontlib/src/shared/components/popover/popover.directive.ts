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
  OnInit,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { PopoverComponent } from './popover.component';
import { PopoverPosition } from './popover.model';
import { PositioningService } from './positioning.service';

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
        this.popoverContainer.instance.triggerElement = this.element;
        this.popoverContainer.instance.popoverInstance = this.popoverContainer;
        this.popoverContainer.instance.position = this.placement;
        if (this.appendToBody) {
          this.popoverContainer.instance.appendToBody = this.appendToBody;
          this.renderer.appendChild(
            this.document.body,
            this.popoverContainer.location.nativeElement
          );
        }
      }
      this.openPopover.emit();
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * Method performs close action for popover component.
   */
  close() {
    this.viewContainer.clear();
    this.closePopover.emit();
  }

  ngOnInit(): void {
    this.renderer.listen(this.winRef.nativeWindow, 'click', (e: Event) => {
      if (e.target === this.element.nativeElement && !this.isOpen) {
        this.isOpen = true;
        this.open();
      } else {
        if (this.isOpen) {
          this.isOpen = false;
          this.close();
        }
      }
    });
  }

  constructor(
    protected element: ElementRef,
    protected viewContainer: ViewContainerRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    protected positioningService: PositioningService,
    protected winRef: WindowRef,
    @Inject(DOCUMENT) protected document: any
  ) {}
}
