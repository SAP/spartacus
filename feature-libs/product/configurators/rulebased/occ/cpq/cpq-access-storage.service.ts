import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cpq } from '../../cpq/cpq.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorRestService {
  constructor(protected cpqAccessLoaderService: CpqAccessLoaderService) {}

  protected cpqAccessData: Observable<Cpq.AccessData>;

  getCpqAccessData(): Observable<Cpq.AccessData> {
    if (this.cpqAccessData) {
      this.cpqAccessData = this.cpqAccessLoaderService.getCpqAccessData();
    }
    return this.cpqAccessData;
  }
}
