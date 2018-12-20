import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef
} from '@angular/core';

import { CmsService, ContentSlotData } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-dynamic-slot',
  templateUrl: './dynamic-slot.component.html',
  styleUrls: ['./dynamic-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSlotComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {}
}
