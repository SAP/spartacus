import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef
} from '@angular/core';

import {
  CmsService,
  ContentSlotData,
  JSP_INCLUDE_CMS_COMPONENT_TYPE,
  ContentSlotComponentData,
  CMS_FLEX_COMPONENT_TYPE
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'cx-dynamic-slot',
  templateUrl: './dynamic-slot.component.html',
  styleUrls: ['./dynamic-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSlotComponent implements OnInit {
  @Input() position: string;

  constructor(
    protected cmsService: CmsService,
    protected renderer: Renderer2,
    protected hostElement: ElementRef
  ) {}

  ngOnInit() {
    // add the position name as a css class so that
    // layout can be applied to it, using the position based class.
    this.renderer.addClass(this.hostElement.nativeElement, this.position);
  }

  /**
   * returns an observable with `ContentSlotData` for the current position
   */
  get slot$(): Observable<ContentSlotData> {
    return this.cmsService
      .getContentSlot(this.position)
      .pipe(tap(slot => this.addSmartEditSlotClass(slot)));
  }

  /**
   * returns an observable with components (`ContentSlotComponentData[]`)
   * for the current slot
   */
  get components$(): Observable<ContentSlotComponentData[]> {
    return this.slot$.pipe(
      map(slot => (slot && slot.components ? slot.components : [])),
      tap(components => this.addComponentClass(components))
    );
  }

  // add a class to indicate whether the class is empty or not
  private addComponentClass(components) {
    if (components && components.length > 0) {
      this.renderer.addClass(this.hostElement.nativeElement, 'has-components');
    }
  }

  private addSmartEditSlotClass(slot) {
    if (this.cmsService.isLaunchInSmartEdit()) {
      this.addSmartEditContract(slot);
    }
  }

  private addSmartEditContract(slot: ContentSlotData): void {
    this.renderer.addClass(
      this.hostElement.nativeElement,
      'smartEditComponent'
    );
    this.renderer.setAttribute(
      this.hostElement.nativeElement,
      'data-smartedit-component-type',
      'ContentSlot'
    );
    this.renderer.setAttribute(
      this.hostElement.nativeElement,
      'data-smartedit-component-id',
      slot.uid
    );
    this.renderer.setAttribute(
      this.hostElement.nativeElement,
      'data-smartedit-catalog-version-uuid',
      slot.catalogUuid
    );
    this.renderer.setAttribute(
      this.hostElement.nativeElement,
      'data-smartedit-component-uuid',
      slot.uuid
    );
  }

  /**
   * The "JspIncludeComponent" and "CMSFlexComponent" are types of CmsComponent that behave
   * as a placeholder component (with no specific data provided).
   *
   * While it's not very clean solution, we interpret the "uid" of the "JspIncludeComponent" and "flexType" of "CMSFlexComponent"
   * as a component type and thanks to that we map it onto the implementation of the Angular (or web) component.
   *
   * CAUTION: The mapped type should not be used for SmartEdit bindings.
   */
  getComponentMappedType(component: ContentSlotComponentData): string {
    switch (component.typeCode) {
      case JSP_INCLUDE_CMS_COMPONENT_TYPE:
        return component.uid;
      case CMS_FLEX_COMPONENT_TYPE:
        return component.flexType;
      default:
        return component.typeCode;
    }
  }
}
