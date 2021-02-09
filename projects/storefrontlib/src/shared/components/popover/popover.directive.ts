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
   * The preferred placement of the popover. Default popover position is 'top'.
   */
  @Input() placement?: PopoverPosition = PopoverPosition.TOP;

  /**
   * Popover component instance.
   */
  protected popoverContainer: ComponentRef<PopoverComponent>;

  private toggle: boolean;
  private unlistener: () => void;

  constructor(
    protected element: ElementRef,
    protected viewContainer: ViewContainerRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.unlistener = this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target === this.element.nativeElement && !this.toggle) {
        this.toggle = true;
        this.open();
      } else {
        this.toggle = false;
        this.close();
      }
    });
  }

  open() {
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
  }

  close() {
    this.viewContainer.clear();
  }

  ngOnDestroy(): void {
    this.unlistener();
  }
}
