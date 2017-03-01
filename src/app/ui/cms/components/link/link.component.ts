import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../abstract-component.component';
import { CmsModelService } from '../../../../data/cms-model.service';

@Component({
  selector: 'y-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent extends AbstractComponent {

    constructor(
        protected cmsModelService: CmsModelService
    ) {
        super(cmsModelService);
    }

}
