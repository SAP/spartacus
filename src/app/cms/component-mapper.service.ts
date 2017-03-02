import { Injectable } from '@angular/core';
import { ComponentMapperConfigService } from './component-mapper-config.service';

@Injectable()
export class ComponentMapperService {

    constructor(
        private mapperConfig: ComponentMapperConfigService
    ) { }

    /**
     * @desc
     * returns a web component for the CMS typecode. 
     *
     * The mapping of CMS components to web componetns requires a mapping.
     * This is configurable when the module is loaded.
     * 
     * For example: 
     * 
     *  {
     *      'CMSLinkComponent': 'LinkComponent',
     *      'SimpleResponsiveBannerComponent': 'SimpleResponsiveBannerComponent',
     *      [etc.]
     *  }
     *
     * The type codes are dynamic since they depend on the implementation.
     * Customer will add, extend or ingore standard components.
     * 
     * @param typeCode the component type
     */
    getType(typeCode: string) {
        return (this.mapperConfig.componentMapping[typeCode]);
    }


}
