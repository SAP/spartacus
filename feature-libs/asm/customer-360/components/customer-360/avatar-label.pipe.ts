import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@spartacus/core';

@Pipe({ name: 'avatarLabel' })
export class AvatarLabelPipe implements PipeTransform {
  transform(customer?: User): string {
    customer = customer ?? {};
    const { firstName = '', lastName = '' } = customer;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }
}
