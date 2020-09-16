import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BAddress, Country, Region, Title } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../../..//shared/organization-item.service';
import { UnitAddressItemService } from '../services/unit-address-item.service';
import { UnitAddressFormService } from './unit-address-form.service';

@Component({
  templateUrl: './unit-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UnitAddressItemService,
    },
  ],
})
export class UnitAddressFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  countries$: Observable<Country[]> = this.formService.getCountries();
  titles$: Observable<Title[]> = this.formService.getTitles();
  regions$: Observable<Region[]> = this.formService.getRegions();

  constructor(
    protected itemService: OrganizationItemService<B2BAddress>,
    protected formService: UnitAddressFormService
  ) {}

  ngOnInit(): void {}
}
