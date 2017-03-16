import { Injectable } from '@angular/core';
import { ModelService } from './model.service';

const CART_MODEL = 'cart';

@Injectable()
export class CartModelService extends ModelService {

    get() {
        return super.get(CART_MODEL);
    }
    store(model) {
        return super.store(CART_MODEL, model);
    }

}
