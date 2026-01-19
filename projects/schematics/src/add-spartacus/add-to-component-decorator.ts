import { Node, SourceFile } from 'ts-morph';

/**
 * Helper function to add a value to a Component decorator property.
 */
export function addToComponentDecorator(
  sourceFile: SourceFile,
  propertyName: string,
  value: string
): void {
  const classes = sourceFile.getClasses();

  for (const classDeclaration of classes) {
    const decorator = classDeclaration.getDecorator('Component');

    if (decorator) {
      const args = decorator.getArguments();

      if (args.length > 0 && Node.isObjectLiteralExpression(args[0])) {
        const objLiteral = args[0];
        const importsProperty = objLiteral
          .getProperties()
          .find(
            (prop) =>
              Node.isPropertyAssignment(prop) && prop.getName() === propertyName
          );

        if (importsProperty && Node.isPropertyAssignment(importsProperty)) {
          const arrayLiteral = importsProperty.getInitializer();

          if (arrayLiteral && Node.isArrayLiteralExpression(arrayLiteral)) {
            const alreadyExists = arrayLiteral
              .getElements()
              .some((element) => element.getText() === value);

            if (!alreadyExists) {
              arrayLiteral.addElement(value);
            }
          }
        } else {
          // Add the property if it doesn't exist
          objLiteral.addPropertyAssignment({
            name: propertyName,
            initializer: `[${value}]`,
          });
        }
      }
    }
  }
}
