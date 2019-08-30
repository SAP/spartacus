import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country, Region, UserAddressService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-billing-address-form',
  templateUrl: './billing-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingAddressFormComponent implements OnInit {
  regions$: Observable<Region[]>;

  @Input()
  billingAddress: FormGroup;

  @Input()
  countries$: Observable<Country[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(protected userAddressService: UserAddressService) {}

  ngOnInit() {
    this.regions$ = this.selectedCountry$.pipe(
      switchMap(country => this.userAddressService.getRegions(country)),
      tap(regions => {
        const regionControl = this.billingAddress.get('region.isocodeShort');
        if (regions.length > 0) {
          regionControl.enable();
        } else {
          regionControl.disable();
        }
      })
    );
  }

  countrySelected(country: Country): void {
    this.billingAddress['controls'].country['controls'].isocode.setValue(
      country.isocode
    );
    this.selectedCountry$.next(country.isocode);
  }

  regionSelected(region: Region): void {
    this.billingAddress['controls'].region['controls'].isocodeShort.setValue(
      region.isocodeShort
    );
  }
}
