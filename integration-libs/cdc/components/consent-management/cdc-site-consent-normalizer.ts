import { Injectable } from "@angular/core";
import { Converter, ConsentTemplate, LanguageService } from "@spartacus/core";
import { CdcSiteConsentTemplate, siteConsentDetailTemplate } from "integration-libs/cdc/core";

@Injectable()
export class CdcConsentDetailsNormalizer implements Converter<CdcSiteConsentTemplate, ConsentTemplate[]>
{
    constructor(protected languageService: LanguageService,) {}

    convert(source: CdcSiteConsentTemplate, target: ConsentTemplate[]): ConsentTemplate[]
    {
        if (target === undefined) {
            target = { ...(source as any) } as ConsentTemplate[];
        }
        if (source.siteConsentDetails) {
            var siteLanguage: string = "";
            this.languageService.getActive().subscribe((language) => (siteLanguage = language)).unsubscribe();
            //source.siteConsentDetails.map((entry) => {consent  = this.convertConsentEntry(entry, siteLanguage);
            target = this.convertConsentEntries(source.siteConsentDetails, siteLanguage);
        }
        return target;
    }


    private convertConsentEntries( site: siteConsentDetailTemplate[], siteLanguage: string ): ConsentTemplate[] {
        var consents: ConsentTemplate[] = [];
        this.languageService
          .getActive()
          .subscribe((language) => (siteLanguage = language))
          .unsubscribe();
        for (var key in site) {
          if (Object.hasOwn(site, key)) {
            if (site[key].isActive === true) {
              var legalStatements = site[key].legalStatements;
              for (var lang in legalStatements) {
                if (Object.hasOwn(legalStatements, lang)) {
                  if (lang === siteLanguage) {
                    consents.push({
                      id: key,
    //                  name: => let it be empty
                      description: legalStatements[lang]?.purpose,
                      version: legalStatements[lang].currentDocVersion,
                    });
                  }
                }
              }
            }
          }
        }
        return consents;
      }
}


