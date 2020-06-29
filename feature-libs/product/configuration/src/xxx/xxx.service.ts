import { Injectable } from '@angular/core';
import { YyyService } from '@spartacus/product/domain';

@Injectable({ providedIn: 'root' })
export class XxxService {
  constructor(y: YyyService) {
    console.log('xxx service ctor', y);
  }
}
