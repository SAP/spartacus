#!/usr/bin/env bash
set -e
set -o pipefail

RUN_E2E=false
CONTEXT_TAGS=""
#GITHUB_BASE_REF='develop' 
CONTEXT_FN='srctags.json'

if [ ! -z "$GITHUB_BASE_REF" ]; then
    FILES=`git diff --name-only origin/$GITHUB_BASE_REF`
    context_path=''
    for file in $FILES; do
	echo "------------------------------------------------------------"
    echo "Full pathname: " "$file"

	path=`dirname $file`
	root_path=`echo $path | cut -d/ -f 1,2 || true`

	context_path_ln=`grep -m 1 -rnw $root_path $CONTEXT_FN | cut -f1 -d: || true`
  	if [ ! -z "$context_path_ln" ]; then
		echo "Directory name is: " $path
		echo "Root pathname is: " $root_path
		echo "Match found"
		echo "Context line number is: " $context_path_ln

		opt='p'
		tags_line=1
		context_path_ln=$(($context_path_ln+$tags_line))
		ln_opt="${context_path_ln}${opt}"
		echo "sed line option: "$ln_opt

		# String manipulation. Extract context tags.
		tags=`sed -n $ln_opt srctags.json || true`
		tags=`echo $tags | sed 's/^.\{,8\}//' || true`
		tags=`echo $tags | sed 's/^.//;s/.$//' || true`
		tags=`echo $tags | sed 's/\"//g' || true`

		if [[ "$CONTEXT_TAGS" == *"$tags"* ]]; then
			;;
		else
			CONTEXT_TAGS+=$tags', '
		fi
		echo "Associated tags are:" $tags
	else
        # Match not found
        ;;
	fi
    
    case "$file" in
        *.md | docs/** | tools/** | *.spec.ts | **/schematics/** )
            ;;
        * )
            # if anything other than `*.md | docs/** | tools/** | *.spec.ts | **/schematics/**` are found, then we should run e2es
            RUN_E2E=true
            ;;
        esac
    done
fi
echo "Tags to pass to cypress: " "$CONTEXT_TAGS"
