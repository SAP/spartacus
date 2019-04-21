import {
  ProductReference,
  ProductReferenceList,
} from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';

export class OccProductReferencesListNormalizer
  implements Converter<ProductReferenceList, ProductReference[]> {
  convert(
    source: ProductReferenceList,
    target: ProductReference[] = []
  ): ProductReference[] {
    // needs to be continued
    return;
    // return source.references.map((referenceType, index) => ({
    //   ...target[index],
    //   ...referenceType,
    // }));
  }
}
