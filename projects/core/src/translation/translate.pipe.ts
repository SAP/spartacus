import {
  Pipe,
  PipeTransform,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { TranslationService } from './translation.service';
import { Subscription } from 'rxjs';

@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform, OnDestroy {
  key: string;
  sub = new Subscription();

  constructor(
    private service: TranslationService,
    private cd: ChangeDetectorRef
  ) {
    this.sub.add(
      this.service.languageChanged$.subscribe(this.onLanguageChange.bind(this))
    );
  }

  transform(key: any, options: any = {}) {
    this.key = key;
    return this.service.translateLazy(
      key,
      options,
      this.onNamespaceLoad.bind(this)
    );
  }

  private onLanguageChange() {
    this.cd.markForCheck();
  }

  private onNamespaceLoad() {
    if (this.key && this.service.exists(this.key)) {
      this.cd.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
