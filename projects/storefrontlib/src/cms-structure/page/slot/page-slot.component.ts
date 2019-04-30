import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  CmsService,
  ContentSlotComponentData,
  ContentSlotData,
  DynamicAttributeService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { CmsMappingService } from '../../../lib/cms/services/cms-mapping.service';

@Component({
  selector: 'cx-page-slot',
  templateUrl: './page-slot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSlotComponent implements OnInit {
  @Input() position: string;

  /**
   * returns an observable with components (`ContentSlotComponentData[]`)
   * for the current slot
   */
  public components$: Observable<ContentSlotComponentData[]>;

  constructor(
    protected cmsService: CmsService,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected hostElement: ElementRef,
    protected cmsMapping: CmsMappingService
  ) {}

  ngOnInit(): void {
    // add the position name as a css class so that
    // layout can be applied to it, using the position based class.
    this.renderer.addClass(this.hostElement.nativeElement, this.position);
    this.components$ = this.slot$.pipe(
      map(slot => (slot && slot.components ? slot.components : [])),
      distinctUntilChanged(
        (a, b) =>
          a.length === b.length &&
          !a.find((el, index) => el.uid !== b[index].uid)
      ),
      tap(components => this.addComponentClass(components))
    );
  }

  /**
   * returns an observable with `ContentSlotData` for the current position
   */
  get slot$(): Observable<ContentSlotData> {
    return this.cmsService
      .getContentSlot(this.position)
      .pipe(tap(slot => this.addSmartEditSlotClass(slot)));
  }

  // add a class to indicate whether the class is empty or not
  private addComponentClass(components): void {
    if (components && components.length > 0) {
      this.renderer.addClass(this.hostElement.nativeElement, 'has-components');
    }
  }

  private addSmartEditSlotClass(slot): void {
    if (this.cmsService.isLaunchInSmartEdit()) {
      this.addSmartEditContract(slot);
    }
  }

  private addSmartEditContract(slot: ContentSlotData): void {
    this.dynamicAttributeService.addDynamicAttributes(
      slot.properties,
      this.hostElement.nativeElement,
      this.renderer
    );
  }
}
