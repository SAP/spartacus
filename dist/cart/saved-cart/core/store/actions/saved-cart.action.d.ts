import { StateUtils } from '@spartacus/core';
export declare const LOAD_SAVED_CART = "[Saved Cart] Load Saved Cart";
export declare const LOAD_SAVED_CART_SUCCESS = "[Saved Cart] Load Saved Cart Success";
export declare const LOAD_SAVED_CART_FAIL = "[Saved Cart] Load Saved Cart Fail";
export declare const LOAD_SAVED_CARTS = "[Saved Cart] Load Saved Carts";
export declare const LOAD_SAVED_CARTS_SUCCESS = "[Saved Cart] Load Saved Carts Success";
export declare const LOAD_SAVED_CARTS_FAIL = "[Saved Cart] Load Saved Carts Fail";
export declare const CLEAR_SAVED_CARTS = "[Saved Cart] Clear Saved Carts";
export declare const RESTORE_SAVED_CART = "[Saved Cart] Restore Saved Cart";
export declare const RESTORE_SAVED_CART_SUCCESS = "[Saved Cart] Restore Saved Cart Success";
export declare const RESTORE_SAVED_CART_FAIL = "[Saved Cart] Restore Saved Cart Fail";
export declare const CLEAR_RESTORE_SAVED_CART = "[Saved Cart] Clear Restore Saved Cart";
export declare const SAVE_CART = "[Saved Cart] Save Cart";
export declare const SAVE_CART_SUCCESS = "[Saved Cart] Save Cart Success";
export declare const SAVE_CART_FAIL = "[Saved Cart] Save Cart Fail";
export declare const CLEAR_SAVE_CART = "[Saved Cart] Clear Save Cart";
export declare const EDIT_SAVED_CART = "[Saved Cart] Edit Saved Cart";
export declare const EDIT_SAVED_CART_SUCCESS = "[Saved Cart] Edit Saved Cart Success";
export declare const EDIT_SAVED_CART_FAIL = "[Saved Cart] Edit Saved Cart Fail";
export declare const CLONE_SAVED_CART = "[Saved Cart] Clone Saved Cart";
export declare const CLONE_SAVED_CART_SUCCESS = "[Saved Cart] Clone Saved Cart Success";
export declare const CLONE_SAVED_CART_FAIL = "[Saved Cart] Clone Saved Cart Fail";
export declare const CLEAR_CLONE_SAVED_CART = "[Saved Cart] Clear Clone Saved Cart";
export declare class LoadSavedCart extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        cartId: string;
    };
    readonly type = "[Saved Cart] Load Saved Cart";
    constructor(payload: {
        userId: string;
        cartId: string;
    });
}
export declare class LoadSavedCartSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        userId: string;
        cartId: string;
    };
    readonly type = "[Saved Cart] Load Saved Cart Success";
    constructor(payload: {
        userId: string;
        cartId: string;
    });
}
export declare class LoadSavedCartFail extends StateUtils.EntityFailAction {
    payload: {
        userId: string;
        cartId: string;
        error: any;
    };
    readonly type = "[Saved Cart] Load Saved Cart Fail";
    constructor(payload: {
        userId: string;
        cartId: string;
        error: any;
    });
}
export declare class LoadSavedCarts extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
    };
    readonly type = "[Saved Cart] Load Saved Carts";
    constructor(payload: {
        userId: string;
    });
}
export declare class LoadSavedCartsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        userId: string;
    };
    readonly type = "[Saved Cart] Load Saved Carts Success";
    constructor(payload: {
        userId: string;
    });
}
export declare class LoadSavedCartsFail extends StateUtils.EntityFailAction {
    payload: {
        userId: string;
        error: any;
    };
    readonly type = "[Saved Cart] Load Saved Carts Fail";
    constructor(payload: {
        userId: string;
        error: any;
    });
}
export declare class ClearSavedCarts extends StateUtils.EntityLoaderResetAction {
    readonly type = "[Saved Cart] Clear Saved Carts";
    constructor();
}
export declare class RestoreSavedCart extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        cartId: string;
    };
    readonly type = "[Saved Cart] Restore Saved Cart";
    constructor(payload: {
        userId: string;
        cartId: string;
    });
}
export declare class RestoreSavedCartSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        userId: string;
        cartId: string;
    };
    readonly type = "[Saved Cart] Restore Saved Cart Success";
    constructor(payload: {
        userId: string;
        cartId: string;
    });
}
export declare class RestoreSavedCartFail extends StateUtils.EntityFailAction {
    payload: {
        userId: string;
        cartId: string;
        error: any;
    };
    readonly type = "[Saved Cart] Restore Saved Cart Fail";
    constructor(payload: {
        userId: string;
        cartId: string;
        error: any;
    });
}
export declare class ClearRestoreSavedCart extends StateUtils.EntityLoaderResetAction {
    readonly type = "[Saved Cart] Clear Restore Saved Cart";
    constructor();
}
export declare class SaveCart extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    };
    readonly type = "[Saved Cart] Save Cart";
    constructor(payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    });
}
export declare class SaveCartSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    };
    readonly type = "[Saved Cart] Save Cart Success";
    constructor(payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    });
}
export declare class SaveCartFail extends StateUtils.EntityFailAction {
    payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
        error: any;
    };
    readonly type = "[Saved Cart] Save Cart Fail";
    constructor(payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
        error: any;
    });
}
export declare class ClearSaveCart extends StateUtils.EntityLoaderResetAction {
    readonly type = "[Saved Cart] Clear Save Cart";
    constructor();
}
export declare class EditSavedCart extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    };
    readonly type = "[Saved Cart] Edit Saved Cart";
    constructor(payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    });
}
export declare class EditSavedCartSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    };
    readonly type = "[Saved Cart] Edit Saved Cart Success";
    constructor(payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
    });
}
export declare class EditSavedCartFail extends StateUtils.EntityFailAction {
    payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
        error: any;
    };
    readonly type = "[Saved Cart] Edit Saved Cart Fail";
    constructor(payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        saveCartDescription?: string;
        error: any;
    });
}
export declare class CloneSavedCart extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
    };
    readonly type = "[Saved Cart] Clone Saved Cart";
    constructor(payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
    });
}
export declare class CloneSavedCartSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
    };
    readonly type = "[Saved Cart] Clone Saved Cart Success";
    constructor(payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
    });
}
export declare class CloneSavedCartFail extends StateUtils.EntityFailAction {
    payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        error: any;
    };
    readonly type = "[Saved Cart] Clone Saved Cart Fail";
    constructor(payload: {
        userId: string;
        cartId: string;
        saveCartName?: string;
        error: any;
    });
}
export declare class ClearCloneSavedCart extends StateUtils.EntityLoaderResetAction {
    readonly type = "[Saved Cart] Clear Clone Saved Cart";
    constructor();
}
export type SavedCartActions = LoadSavedCart | LoadSavedCartSuccess | LoadSavedCartFail | LoadSavedCarts | LoadSavedCartsSuccess | LoadSavedCartsFail | ClearSavedCarts | RestoreSavedCart | RestoreSavedCartSuccess | RestoreSavedCartFail | ClearRestoreSavedCart | SaveCart | SaveCartSuccess | SaveCartFail | ClearSaveCart | EditSavedCart | EditSavedCartSuccess | EditSavedCartFail | CloneSavedCart | CloneSavedCartSuccess | CloneSavedCartFail | ClearCloneSavedCart;
