import { Injectable } from '@angular/core';
import { YyyService } from '@spartacus/product/main';

@Injectable({ providedIn: 'root' })
export class XxxService {
  constructor(y: YyyService) {
    console.log('xxx service ctor', y);
  }
}
