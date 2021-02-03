import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { PopoverComponent } from './popover.component';

@Directive({
  selector: '[cxPopover]',
})
export class PopoverDirective {
  @Input()
  cxPopover: TemplateRef<any>;

  private popoverContainer: ComponentRef<PopoverComponent>;

  private toggle: boolean;

  constructor(
    private element: ElementRef,
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener('click') onElementClick() {
    console.log(this.element);

    this.toggle = !this.toggle;

    if (this.toggle) {
      const containerFactory = this.componentFactoryResolver.resolveComponentFactory(
        PopoverComponent
      );
      this.popoverContainer = this.viewContainer.createComponent(
        containerFactory
      );

      if (this.popoverContainer && this.popoverContainer.instance) {
        this.popoverContainer.instance.content = this.cxPopover;
      }

      // this.viewContainer.createEmbeddedView(this.cxPopover);
    } else {
      this.viewContainer.clear();
    }
  }
}
