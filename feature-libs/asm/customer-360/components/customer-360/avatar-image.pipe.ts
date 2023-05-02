import { Pipe, PipeTransform } from '@angular/core';
import { CustomerOverview } from '@spartacus/asm/customer-360/root';
import { Image } from '@spartacus/core';

@Pipe({ name: 'avatarImage' })
export class AvatarImagePipe implements PipeTransform {
  transform(overview?: CustomerOverview): Image | undefined {
    return overview?.userAvatar?.url
      ? {
          altText: overview.name,
          url: overview.userAvatar.url,
          format: overview.userAvatar.format,
        }
      : undefined;
  }
}
