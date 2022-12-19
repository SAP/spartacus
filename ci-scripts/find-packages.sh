#!/bin/bash

FILES=$(find core-libs feature-libs integration-libs projects -name package.json -not -path "*node_modules*")

# for file in ${FILES[@]}; do
#     echo $file    
# done

names=()

for file in ${FILES[@]}; do
    names+=(`awk '/name/{print $2}' $file | awk -F[\/,\"] '{print $3}'`)
done
# echo "${names[@]}"

formattedNames=""

for name in ${names[@]}; do
    formattedNames+="    - ${name}\n"
done
echo "$formattedNames"



# for name in ${name[@]}; do    
#     echo $name
# done
# # awk -F: '/name:/{print $2}' feature-libs/tracking/package.json
# variable=$(awk '/name/{print $2}' feature-libs/tracking/package.json)
# # variable2=`awk '/name/{print $2}' feature-libs/tracking/package.json | sed -e 's/@spartacus\(.*\),/\1/'`

# # variable2=$variable | awk -F[=,] '{print $2}'

# variable2=`awk '/name/{print $2}' feature-libs/tracking/package.json | awk -F[\/,\"] '{print $3}'`

# echo $variable2