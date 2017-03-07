import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/abstract-cms-component';
import { CmsModelService } from '../../data/cms-model.service';
import { ConfigService } from '../../cms/config.service';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'y-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends AbstractCmsComponent  {

    node;
    
    constructor(
        protected cd: ChangeDetectorRef,
        protected cmsModelService: CmsModelService,
        protected configService: ConfigService,
        private navigationService: NavigationService
    ) {
        super(cd, configService, cmsModelService);
    }

    protected fetchData() {
        super.fetchData();
        const data = this.model.navigationNode ? this.model.navigationNode : this.model;
        this.node = this.navigationService.createNode(data);
    }

    protected getUrl(url: string) {
        return this.mapUrl(url);
    }
}
