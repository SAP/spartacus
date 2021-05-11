import { Injectable, NgModule } from "@angular/core";
import { I18nConfig, normalizeHttpError, OccConfig, provideConfig, User } from "@spartacus/core";
import { UserAccountModule, UserProfileModule } from "@spartacus/user";
import { userAccountTranslations, userAccountTranslationChunksConfig } from "@spartacus/user/account/assets";
import { UserAccountRootModule } from "@spartacus/user/account/root";
import { userProfileTranslations, userProfileTranslationChunksConfig } from "@spartacus/user/profile/assets";
import { UserProfileAdapter, USER_PROFILE_SERIALIZER } from "@spartacus/user/profile/core";
import { OccUserProfileAdapter } from "@spartacus/user/profile/occ";
import { UserProfileRootModule } from "@spartacus/user/profile/root";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
export class CdcUserProfileAdapter extends OccUserProfileAdapter{
    update(userId: string, user: User): Observable<unknown> {
        const url = this.occEndpoints.getUrl('users/${userId}', { userId });
        user = this.converter.convert(user, USER_PROFILE_SERIALIZER);
        return this.http
          .patch(url, user)
          .pipe(catchError((error) => throwError(normalizeHttpError(error))));
      }
}
@NgModule({
    declarations: [],
  imports: [
    UserAccountRootModule,
    UserAccountModule,
    UserProfileRootModule,
    UserProfileModule,
  ],
  providers: [
    { provide: UserProfileAdapter, useClass: CdcUserProfileAdapter},
    // Configurable separate endpoint for update
    provideConfig(<OccConfig>{
        backend: {
          occ: {
            endpoints: {
              updateUser: 'users/${userId}',
            },
          },
        },
      }),
      provideConfig(<I18nConfig>{
        i18n: {
          resources: userAccountTranslations,
          chunks: userAccountTranslationChunksConfig,
          fallbackLang: 'en',
        },
      }),
      provideConfig(<I18nConfig>{
        i18n: {
          resources: userProfileTranslations,
          chunks: userProfileTranslationChunksConfig,
          fallbackLang: 'en',
        },
      }),
    ],
})
export class CdcUserProfileModule {}