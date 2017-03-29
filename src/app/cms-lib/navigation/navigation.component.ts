import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/abstract-cms-component';
import { CmsModelService } from '../../data/cms-model.service';
import { ConfigService } from '../../cms/config.service';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'y-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
        if (!this.model) {
            return;
        }
        const data = this.model.navigationNode ? this.model.navigationNode : this.model;
        this.node = this.navigationService.createNode(data);
        this.cd.detectChanges();
    }

    protected getUrl(link) {
        if (!link || !link.url) {
            return '';
        }
        let url = this.mapUrl(link.url);
        url += '/' + this.sanitizeName(link.title);
        return url;
    }

    private sanitizeName(name) {
        return name.replace(/\s/g, '-');
    }
}
