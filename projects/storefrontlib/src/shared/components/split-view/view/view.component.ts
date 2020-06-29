import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SplitViewService } from '../split/split-view.service';

@Component({
  selector: 'cx-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent implements OnInit, OnDestroy {
  @Input() @HostBinding('attr.depth') viewNum: number;

  @Input()
  set hidden(hidden: boolean) {
    this.splitService.toggle(this.depth, hidden);
  }

  @Output() hiddenChange = new EventEmitter();

  protected subs = new Subscription();

  constructor(protected splitService: SplitViewService) {}

  ngOnInit() {
    this.splitService.add(this.depth, this.hidden);

    this.subs.add(
      this.splitService.visible$.subscribe((visible) => {
        if (this.hidden !== this.depth >= visible) {
          this.hiddenChange.emit(this.depth >= visible);
        }
      })
    );
  }

  toggle(force?: boolean): void {
    this.splitService.toggle(this.depth, force);
  }

  protected get depth(): number {
    if (this.viewNum === undefined) {
      this.viewNum = this.splitService.nextViewNum;
    }
    return this.viewNum;
  }

  ngOnDestroy() {
    this.splitService.remove(this.depth);
    this.subs.unsubscribe();
  }
}
