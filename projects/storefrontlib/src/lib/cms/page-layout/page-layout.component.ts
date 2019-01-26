import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { PageLayoutService } from './page-layout.service';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutComponent implements OnInit {
  @Input() section: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private pageLayoutService: PageLayoutService
  ) {}

  ngOnInit() {
    if (this.section) {
      this.styleClass = this.section;
    }
  }

  get slots$() {
    return this.pageLayoutService.getSlots(this.section);
  }

  set styleClass(cls: string) {
    this.renderer.addClass(this.el.nativeElement, cls);
  }
}
