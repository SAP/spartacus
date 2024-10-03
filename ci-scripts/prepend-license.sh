# Find .ts files that:
# - are not in node_modules
# - do not have 'spec' in their name
#   (however words containing a substring 'spec' are allowed, e.g. 'inSPECtor' or 'SPECial')
FILES=`find . -not -path '**/node_modules/**' -not -regex ".*[^a-zA-Z]spec[^a-zA-Z].*" -name '*.ts' -print`

reuse annotate --copyright="SAP Spartacus team <spartacus-team@sap.com>" --license="Apache-2.0" --multi-line $FILES
