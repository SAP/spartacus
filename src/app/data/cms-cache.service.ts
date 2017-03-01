import { Injectable } from '@angular/core';

@Injectable()
export class CmsCacheService {

    components = {};

    constructor() { }

    // storeComponent(componentData) {
    //     if (!this.hasComponent(componentData.uid)) {
    //         this.components[componentData.uid] = componentData;
    //         // only call next on observer when the component is changed
    //         this.getSubject(COMPONENT_PREFIX + componentData.uid).next(componentData.uid);
    //     }
    // }

    // hasComponent(componentUID) {
    //     return this.components.hasOwnProperty(componentUID);
    // }

}
