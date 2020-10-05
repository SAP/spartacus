# TODO

1. move @angular-devkit/schematics to the main package.json?

  - remove it from schematics
  - remove it from the my-account

2. Validate if adding to a Spartacus project

  - check for the @sparatcus/core dep
  - additionally check if the my-account lib is already present in the package.json

4. In ts.config.schematics.json:

```json

    "paths": {
      "@ngrx/data/schematics-core": ["./schematics-core"]
    },
```



import { defaultB2bOccConfig } from '@spartacus/setup';
import { OrganizationModule } from '@spartacus/my-account/organization';

@NgModule({
  imports: [
    OrganizationModule,
  ],
  providers: [
    provideDefaultConfig(defaultB2bOccConfig),
  ],
})

4. Have a "core" stuff in spartacus/schematics, and that can be included in other schematcics.