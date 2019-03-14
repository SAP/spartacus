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
  ContentSlotComponentData
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CmsMappingService } from '../../services/cms-mapping.service';

@Component({
  selector: 'cx-page-slot',
  templateUrl: './page-slot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSlotComponent implements OnInit {
  @Input() position: string;

  constructor(
    protected cmsService: CmsService,
    protected renderer: Renderer2,
    protected hostElement: ElementRef,
    protected cmsMapping: CmsMappingService
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

  getComponentMappedType(component: ContentSlotComponentData): string {
    return this.cmsMapping.getMappedType(component);
  }
}
