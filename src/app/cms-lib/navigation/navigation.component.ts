import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../cms/abstract-component.component';
import { CmsModelService } from '../../data/cms-model.service';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'y-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends AbstractComponent  {

    node;
    
    constructor(
        protected cmsModelService: CmsModelService,
        private navigationService: NavigationService
    ) {
        super(cmsModelService);
    }

    protected fetchData() {
        super.fetchData();
        const data = this.data.navigationNode ? this.data.navigationNode : this.data;
        this.node = this.navigationService.createNode(data);
    }
}
