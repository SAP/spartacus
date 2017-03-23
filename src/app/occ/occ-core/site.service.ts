import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class OccSiteService extends BaseService {

    loadLanguages() {
        let url = this.getBaseEndPoint();
        url += '/languages';
        return this.promise(url);
    }

    loadCurrencies() {
        let url = this.getBaseEndPoint();
        url += 'currencies';
        return this.promise(url);
    }

}
