import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractCmsComponent } from '../abstract-cms-component';

@Component({
  selector: 'y-category-navigation',
  templateUrl: './category-navigation.component.html',
  styleUrls: ['./category-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryNavigationComponent extends AbstractCmsComponent {

    nodes = [];

    protected fetchData() {
        // navigationnodes contain children of ordinary type cms components
        // we thread them simmilar and use the cms model service to store them
        if (this.component && this.component.navigationNode && this.component.navigationNode.children) {
            for (const node of this.component.navigationNode.children) {
                this.cmsService.storeComponent(node.uid, node);
                this.nodes.push(node);
            }
        }
        super.fetchData();
    }


}
