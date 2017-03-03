import { Component } from '@angular/core';
import { AbstractComponent } from '../../cms/abstract-component.component';

@Component({
    selector: 'y-footer-navigation',
    templateUrl: './footer-navigation.component.html',
    styleUrls: ['./footer-navigation.component.scss']
})
export class FooterNavigationComponent extends AbstractComponent {

    children = [];

    protected fetchData() {
        super.fetchData();

        if (this.data && this.data.navigationNode && this.data.navigationNode.children) {
            for (const child of this.data.navigationNode.children) {
                const links = [];
                for (const subchild of child.children) {
                    // let links = [];
                    for (const entry of subchild.entries) {
                        // if we want to reuse the existing link component we need to make sure 
                        // that it can collect the necessary data for this subcomponennt
                        // this.cmsLoader.storeComponentData(entry.item);
                        links.push(entry.item);
                    }
                    // this.children.push({links: links});
                }
                this.children.push({title: child.title, links: links});

            }
        }
    }

}
