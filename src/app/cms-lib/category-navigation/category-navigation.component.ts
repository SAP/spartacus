import { Component } from '@angular/core';
import { AbstractComponent } from '../../cms/abstract-component.component';
import { CmsModelService } from '../../data/cms-model.service';

@Component({
  selector: 'y-category-navigation',
  templateUrl: './category-navigation.component.html',
  styleUrls: ['./category-navigation.component.scss']
})
export class CategoryNavigationComponent extends AbstractComponent {

    nodes = [];

    constructor(
        protected cmsModelService: CmsModelService
    ) {
        super(cmsModelService);
    }


    protected fetchData() {
        super.fetchData();

        if (this.data && this.data.navigationNode && this.data.navigationNode.children) {
            for (const node of this.data.navigationNode.children) {
                this.cmsModelService.storeComponent(node);
                this.nodes.push(node);
            }
        }
    }


}
