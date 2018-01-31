import { Injectable } from '@angular/core';
import { ModelService } from './model.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductModelService {

    constructor(
        protected modelService: ModelService
    ) {}

    getProduct(key) {
        return this.modelService.get(key);
    }
    storeProduct(key, model) {
        this.modelService.store(key, model);
    }
}
