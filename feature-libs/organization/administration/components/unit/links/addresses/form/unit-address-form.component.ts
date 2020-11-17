import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Address, Country, Region, Title } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { UnitAddressItemService } from '../services/unit-address-item.service';
import { UnitAddressFormService } from './unit-address-form.service';

@Component({
  selector: 'cx-org-unit-address-form',
  templateUrl: './unit-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UnitAddressItemService,
    },
  ],
})
export class UnitAddressFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  key$ = this.itemService.key$;
  countries$: Observable<Country[]> = this.formService.getCountries();
  titles$: Observable<Title[]> = this.formService.getTitles();
  regions$: Observable<Region[]> = this.formService.getRegions();

  constructor(
    protected itemService: OrganizationItemService<Address>,
    protected formService: UnitAddressFormService
  ) {}

  ngOnInit(): void {}
}
