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
result=$(printf " %s" "${names[@]}")
echo "$result"

# for i in $result; do
#     echo $i
# done