import {
  ProductReference,
  ProductReferenceList,
} from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';

export class OccProductReferencesListNormalizer
  implements Converter<ProductReferenceList, ProductReference[]> {
  convert(
    sources: ProductReferenceList,
    targets: ProductReference[] = []
  ): ProductReference[] {
    return sources.references.map((review, index) => ({
      ...targets[index],
      ...review,
    }));
  }
}
