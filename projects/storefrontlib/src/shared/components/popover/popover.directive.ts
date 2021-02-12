import {
  Directive,
  ElementRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Renderer2,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { PopoverComponent } from './popover.component';
import { PopoverPosition } from './popover.model';
import { positionElements } from './utils/positioning';

/**
 * Directive to bind popover with any DOM element.
 */
@Directive({
  selector: '[cxPopover]',
})
export class PopoverDirective implements OnInit, OnDestroy {
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
        setTimeout(() => {
          positionElements(
            this.element.nativeElement,
            this.popoverContainer.location.nativeElement,
            this.placement,
            false
          );
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
    this.viewContainer.clear();
    this.closePopover.emit();
  }

  /**
   * Method toggles between open and close actions depends on `isOpen` property value.
   */
  toggle() {
    if (!this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  constructor(
    protected element: ElementRef,
    protected viewContainer: ViewContainerRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target === this.element.nativeElement && !this.isOpen) {
        this.isOpen = true;
        this.open();
      } else {
        this.isOpen = false;
        this.close();
      }
    });
  }

  ngOnDestroy(): void {}
}
