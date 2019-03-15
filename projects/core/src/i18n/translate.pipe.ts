import {
  Pipe,
  PipeTransform,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { TranslationService } from './translation.service';
import { Subscription } from 'rxjs';

@Pipe({ name: 'cxTranslate', pure: false })
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey: string;
  private lastValue: string;

  private sub = new Subscription();
  private isStale: boolean;

  constructor(
    private service: TranslationService,
    private cd: ChangeDetectorRef
  ) {
    this.sub = this.service.languageChanged$.subscribe(() =>
      this.onLanguageChange()
    );
  }

  transform(key: any, options: any = {}): string {
    if (this.lastKey !== key || this.isStale) {
      this.lastKey = key;
      this.isStale = false;

      this.lastValue = this.service.lazyTranslate(key, options, () =>
        this.onNamespaceLoad(key)
      );
    }
    return this.lastValue;
  }

  private onLanguageChange() {
    this.isStale = true;
    this.cd.markForCheck();
  }

  private onNamespaceLoad(key: string) {
    if (this.service.exists(key)) {
      this.isStale = true;
      this.cd.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
