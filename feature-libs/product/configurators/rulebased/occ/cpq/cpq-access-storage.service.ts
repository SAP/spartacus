import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';
import { Cpq } from '../../cpq/cpq.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';

@Injectable({ providedIn: 'root' })
export class CpqAccessStorgeService {
  constructor(protected cpqAccessLoaderService: CpqAccessLoaderService) {}

  protected cpqAccessData: Observable<Cpq.AccessData>;
  getCachedCpqAccessData(): Observable<Cpq.AccessData> {
    if (!this.cpqAccessData) {
      this.cpqAccessData = this.cpqAccessLoaderService
        .getCpqAccessData()
        .pipe(publishReplay(1), refCount());
    }
    return this.cpqAccessData;
  }

  clearCachedAccessData() {
    this.cpqAccessData = undefined;
  }
}
