/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
import { ReplaySubject, Subscription } from 'rxjs';
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
export class OutletDirective<T = any> implements OnDestroy, OnChanges {
  private renderedTemplate: any[] = [];
  public renderedComponents = new Map<
    OutletPosition,
    Array<ComponentRef<any> | EmbeddedViewRef<any>>
  >();

  @Input() cxOutlet: string;

  /**
   * Context data to be provided to child view of the outlet
   */
  @Input() cxOutletContext: T;

  /**
   * Observable with current outlet context
   */
  private readonly outletContext$ = new ReplaySubject<T>(1);

  /**
   * Defers loading options for the the templates of this outlet.
   */
  @Input() cxOutletDefer: IntersectionOptions;

  @Input() cxOutletWrapperTemplate: TemplateRef<any>;

  @Output() loaded: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  subscription = new Subscription();

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private outletService: OutletService,
    private deferLoaderService: DeferLoaderService,
    private outletRendererService: OutletRendererService
  ) {}

  /**
   * Renders view for outlet or defers it, depending on the input `cxOutletDefer`
   */
  public render(): void {
    this.vcr.clear();
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
    if (changes.cxOutletContext) {
      this.outletContext$.next(this.cxOutletContext);
    }
  }

  private deferLoading(): void {
    this.loaded.emit(false);
    const hostElement = this.getHostElement(this.vcr.element.nativeElement);
    // Although the deferLoaderService might emit only once, as long as the hostElement
    // isn't being loaded, there's no value being emitted. Therefore we need to clean up
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

  /**
   * Renders view for outlet
   */
  private build() {
    this.buildOutlet(OutletPosition.BEFORE);
    this.buildOutlet(OutletPosition.REPLACE);
    this.buildOutlet(OutletPosition.AFTER);
  }

  /**
   * Renders view in a given position for outlet
   */
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

    const components: (ComponentRef<any> | EmbeddedViewRef<any>)[] = [];
    templates.forEach((obj) => {
      const component = this.create(obj, position);
      if (component) {
        components.push(component);
      }
    });

    this.renderedComponents.set(position, components);
  }

  /**
   * Renders view based on the given template or component factory
   */
  private create(
    tmplOrFactory: any,
    position: OutletPosition
  ): ComponentRef<any> | EmbeddedViewRef<any> | undefined {
    this.renderedTemplate.push(tmplOrFactory);

    if (tmplOrFactory instanceof ComponentFactory) {
      const component = this.vcr.createComponent(
        tmplOrFactory,
        undefined,
        this.getComponentInjector(position)
      );

      // SPIKE NEW
      if (this.cxOutletWrapperTemplate) {
        const wrapperEmbeddedView = this.vcr.createEmbeddedView(
          this.cxOutletWrapperTemplate
        );
        const destination = wrapperEmbeddedView.rootNodes[0].querySelector(
          '[cx-outlet-destination]'
        );

        // WATCH OUT: using native DOM operations is not "the Angular way" of doing things.
        // Several things might break, when moving/adding other elements inside the same VCR.
        destination?.appendChild(component.location.nativeElement);
      }

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
    const contextData: OutletContextData<T> = {
      reference: this.cxOutlet,
      position,
      context: this.cxOutletContext,
      context$: this.outletContext$.asObservable(),
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
  private getHostElement(element: Node): HTMLElement {
    if (element instanceof HTMLElement) {
      return element;
    }
    return this.getHostElement(<HTMLElement>element.parentNode);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.outletContext$.complete();
  }
}
