import { Component } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/abstract-cms-component';

@Component({
  selector: 'y-category-navigation',
  templateUrl: './category-navigation.component.html',
  styleUrls: ['./category-navigation.component.scss']
})
export class CategoryNavigationComponent extends AbstractCmsComponent {

    nodes = [];

    protected fetchData() {
        super.fetchData();

        // navigationnodes contain children of ordinary type cms components
        // we thread them simmilar and use the cms model service to store them
        if (this.model && this.model.navigationNode && this.model.navigationNode.children) {
            for (const node of this.model.navigationNode.children) {
                this.cmsModelService.store(node.uid, node);
                this.nodes.push(node);
            }
        }
    }


}
