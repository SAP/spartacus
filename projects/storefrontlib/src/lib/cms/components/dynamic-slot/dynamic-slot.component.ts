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
  FLEX_CMS_COMPONENT_TYPE
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-dynamic-slot',
  templateUrl: './dynamic-slot.component.html',
  styleUrls: ['./dynamic-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSlotComponent implements OnInit {
  currentSlot$: Observable<ContentSlotData>;

  @Input()
  position: string;
  @Input()
  limit: number;
  @Input()
  contextParameters: any;
  @Input()
  componentClass: string;

  constructor(
    protected cmsService: CmsService,
    protected renderer: Renderer2,
    protected hostElement: ElementRef
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.hostElement.nativeElement, this.position);

    this.currentSlot$ = this.cmsService.getContentSlot(this.position).pipe(
      tap(slot => {
        if (slot.components && slot.components.length > 0) {
          this.renderer.addClass(
            this.hostElement.nativeElement,
            'has-components'
          );
        }

        if (this.cmsService.isLaunchInSmartEdit()) {
          this.addSmartEditContract(slot);
        }
      })
    );
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
   * The "JspIncludeComponent" and "FlexCmsComponent" are types of CmsComponent that behave
   * as a placeholder component (with no specific data provided).
   *
   * While it's not very clean solution, we interpret the "uid" of the "JspIncludeComponent" and "flextype" of "FlexCmsComponent"
   * as a component type and thanks to that we map it onto the implementation of the Angular (or web) component.
   *
   * CAUTION: The mapped type should not be used for SmartEdit bindings.
   */
  getComponentMappedType(component: ContentSlotComponentData): string {
    switch (component.typeCode) {
      case JSP_INCLUDE_CMS_COMPONENT_TYPE:
        return component.uid;
      case FLEX_CMS_COMPONENT_TYPE:
        return component.flextype;
      default:
        return component.typeCode;
    }
  }
}
