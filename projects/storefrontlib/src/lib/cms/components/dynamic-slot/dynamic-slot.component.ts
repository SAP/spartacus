import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef
} from '@angular/core';

import {
  CmsService,
  ContentSlotData,
  JSP_INCLUDE_CMS_COMPONENT_TYPE
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
   * The "JspIncludeComponent" is a type of CmsComponent that behaves as a placeholder component
   * (with no specific data provided), but has a unique "uid".
   *
   * While it's not very clean solution, we interpret the "uid" of the "JspIncludeComponent"
   * as a component type and thanks to that we map it with the implementation of Angular (or web) component..
   */
  getComponentType(originalComponentType: string, uid: string): string {
    return originalComponentType === JSP_INCLUDE_CMS_COMPONENT_TYPE
      ? uid
      : originalComponentType;
  }
}
