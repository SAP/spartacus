FILES=`find . -not -path '**/node_modules/**' -not -name '*spec*' -name '*.ts' -print`

reuse annotate --copyright="SAP Spartacus team <spartacus-team@sap.com>" --license="Apache-2.0" --multi-line $FILES
