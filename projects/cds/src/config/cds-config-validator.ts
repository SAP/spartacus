import { CdsConfig } from "./cds.config";

export function cdsConfigValidator(config: CdsConfig) {
  if (config.cds) {
    if (config.cds.profileTag !== undefined) {
      if (config.cds.profileTag.configUrl === undefined) {
        return "Please configure profileTag.configUrl before using the CDS library";
      }
      if (config.cds.profileTag.javascriptUrl === undefined) {
        return "Please configure profileTag.configUrl before using the CDS library";
      }
    }
    if (config.cds.tenant === undefined) {
      return "Please configure cds.tenant before using CDS library";
    }

    if (config.cds.baseUrl === undefined) {
      return "Please configure cds.baseUrl before using CDS library";
    }

    if (
      config.cds.endpoints === undefined ||
      config.cds.endpoints.strategyProducts === undefined
    ) {
      return "Please configure the cds.endpoints before using CDS library";
    }
  }
}
