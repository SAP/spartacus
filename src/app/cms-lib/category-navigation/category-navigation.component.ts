import { Component } from '@angular/core';
import { AbstractComponent } from '../../cms/abstract-component.component';

@Component({
  selector: 'y-category-navigation',
  templateUrl: './category-navigation.component.html',
  styleUrls: ['./category-navigation.component.scss']
})
export class CategoryNavigationComponent extends AbstractComponent {

    nodes = [];

    protected fetchData() {
        super.fetchData();

        if (this.model && this.model.navigationNode && this.model.navigationNode.children) {
            for (const node of this.model.navigationNode.children) {
                this.cmsModelService.storeComponent(node);
                this.nodes.push(node);
            }
        }
    }


}
