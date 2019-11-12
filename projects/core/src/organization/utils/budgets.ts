import { BudgetSearchConfig } from "../model/search-config";

export function serializeBudgetSearchConfig(config: BudgetSearchConfig) {
  return `pageSize=${config.pageSize || ''}&currentPage=${config.currentPage || ''}&sort=${config.sort || ''}`;
}
