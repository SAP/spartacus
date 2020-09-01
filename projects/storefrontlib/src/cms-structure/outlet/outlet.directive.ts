import {
  ComponentFactory,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DeferLoaderService } from '../../layout/loading/defer-loader.service';
import { IntersectionOptions } from '../../layout/loading/intersection.model';
import { OutletRendererService } from './outlet-renderer.service';
import {
  OutletContextData,
  OutletPosition,
  USE_STACKED_OUTLETS,
} from './outlet.model';
import { OutletService } from './outlet.service';

@Directive({
  selector: '[cxOutlet]',
})
export class OutletDirective implements OnDestroy, OnChanges {
  private renderedTemplate = [];
  public renderedComponents = new Map<
    OutletPosition,
    Array<ComponentRef<any> | EmbeddedViewRef<any>>
  >();

  @Input()
  cxOutlet: string;

  @Input() cxOutletContext: any;

  /**
   * Defers loading options for the the templates of this outlet.
   */
  @Input() cxOutletDefer: IntersectionOptions;

  @Output() loaded: EventEmitter<Boolean> = new EventEmitter<Boolean>(true);

  subscription = new Subscription();

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private outletService: OutletService,
    private deferLoaderService: DeferLoaderService,
    private outletRendererService: OutletRendererService
  ) {}

  public render(): void {
    this.vcr.clear();
    this.getHostElement().setAttribute('outlet', this.cxOutlet);
    this.renderedTemplate = [];
    this.renderedComponents.clear();
    this.subscription.unsubscribe();
    this.subscription = new Subscription();

    if (this.cxOutletDefer) {
      this.deferLoading();
    } else {
      this.build();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cxOutlet) {
      this.render();
      this.outletRendererService.register(this.cxOutlet, this);
    }
  }

  private deferLoading(): void {
    this.loaded.emit(false);
    const hostElement = this.getHostElement(this.vcr.element.nativeElement);
    // Although the deferLoaderService might emit only once, as long as the hostElement
    // isn't being loaded, there's no value being emitted. Therefor we need to clean up
    // the subscription on destroy.
    this.subscription.add(
      this.deferLoaderService
        .load(hostElement, this.cxOutletDefer)
        .subscribe(() => {
          this.build();
          this.loaded.emit(true);
        })
    );
  }

  private build() {
    this.buildOutlet(OutletPosition.BEFORE);
    this.buildOutlet(OutletPosition.REPLACE);
    this.buildOutlet(OutletPosition.AFTER);
  }

  private buildOutlet(position: OutletPosition): void {
    let templates: any[] = <any[]>(
      this.outletService.get(this.cxOutlet, position, USE_STACKED_OUTLETS)
    );

    templates = templates?.filter((el) => !this.renderedTemplate.includes(el));

    if (!templates && position === OutletPosition.REPLACE) {
      templates = [this.templateRef];
    }

    // Just in case someone extended the `OutletService` and
    // returns a singular object.
    if (!Array.isArray(templates)) {
      templates = [templates];
    }

    const components = [];
    templates.forEach((obj) => {
      const component = this.create(obj, position);
      components.push(component);
    });

    this.renderedComponents.set(position, components);
  }

  private create(
    tmplOrFactory: any,
    position: OutletPosition
  ): ComponentRef<any> | EmbeddedViewRef<any> {
    this.renderedTemplate.push(tmplOrFactory);

    if (tmplOrFactory instanceof ComponentFactory) {
      const component = this.vcr.createComponent(
        tmplOrFactory,
        undefined,
        this.getComponentInjector(position)
      );
      return component;
    } else if (tmplOrFactory instanceof TemplateRef) {
      const view = this.vcr.createEmbeddedView(
        <TemplateRef<any>>tmplOrFactory,
        {
          $implicit: this.cxOutletContext,
        }
      );

      // we do not know if content is created dynamically or not
      // so we apply change detection anyway
      view.markForCheck();
      return view;
    }
  }

  /**
   * Returns injector with OutletContextData that can be injected to the component
   * rendered in the outlet
   */
  private getComponentInjector(position: OutletPosition): Injector {
    const contextData: OutletContextData = {
      reference: this.cxOutlet,
      position,
      context: this.cxOutletContext,
    };

    return Injector.create({
      providers: [
        {
          provide: OutletContextData,
          useValue: contextData,
        },
      ],
      parent: this.vcr.injector,
    });
  }

  /**
   * Returns the closest `HtmlElement`, by iterating over the
   * parent nodes of the given element.
   *
   * We avoid traversing the parent _elements_, as this is blocking
   * ie11 implementations. One of the spare exclusions we make to not
   * supporting ie11.
   *
   * @param element
   */
  private getHostElement(element?: Node): HTMLElement {
    if (!element) {
      element = this.vcr.element.nativeElement;
    }
    if (element instanceof HTMLElement) {
      return element;
    }
    return this.getHostElement(element.parentNode);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
