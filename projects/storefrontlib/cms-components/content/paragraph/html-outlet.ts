import {
  Component,
  Directive,
  NgModule,
  Input,
  ViewContainerRef,
  Compiler,
  ComponentFactory,
  ModuleWithComponentFactories,
  ComponentRef,
  OnDestroy,
  OnInit,
  Injector,
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export function createComponentFactory(
  compiler: Compiler,
  metadata: Component
): Promise<ComponentFactory<any> | undefined> {
  const cmpClass = class DynamicComponent {};
  const decoratedCmp = Component(metadata)(cmpClass);

  const decoratedNgModule = NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [decoratedCmp],
  })(cmpClass);

  return compiler
    .compileModuleAndAllComponentsAsync(decoratedNgModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories.find(
        (x) => x.componentType === decoratedCmp
      );
    });
}

@Directive({ selector: '[htmlOutlet]' })
export class HtmlOutletDirective implements OnInit, OnDestroy {
  @Input() html: string;
  cmpRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

  ngOnInit() {
    const html = this.html;
    if (!html) return;

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const compMetadata = new Component({
      selector: 'dynamic-html',
      template: this.html,
    });

    createComponentFactory(this.compiler, compMetadata).then((factory) => {
      const injector = Injector.create({
        providers: [],
        parent: this.vcRef.parentInjector,
      });
      this.cmpRef = this.vcRef.createComponent(<any>factory, 0, injector, []);
    });
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
