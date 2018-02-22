#!/bin/bash

echo



##########################################################################
Unit tests
##########################################################################
echo 'Running unit tests'

ng test --watch=false > log.txt 2>&1

if grep -q 'FAILED' "log.txt";
then
        rm log.txt
        echo 'Error: One or more unit tests failed'
        exit 1;
else
        echo 'All unit tests passed'
fi
#########################################################################



echo



##########################################################################
yarn in spaccelerator
##########################################################################
echo 'Running yarn in spaccelerator'

yarn > log.txt 2>&1

if [ $? -ne 0 ];
then
	rm log.txt
	echo 'Error: Failed to install dependencies in spaccelerator'
	exit 1
fi
#########################################################################



echo



##########################################################################
yarn build-lib in spaccelerator
##########################################################################
echo 'Running yarn build-lib in spaccelerator'

yarn build-lib > log.txt 2>&1

if [ $? -ne 0 ];
then
	rm log.txt
	echo 'Error: Failed to build lib'
	exit 1
fi
#########################################################################



cd ../spaccwrapper

echo



##########################################################################
yarn in spaccwrapper
##########################################################################
echo 'Running yarn in spaccwrapper'

yarn > log.txt 2>&1

if [ $? -ne 0 ];
then
	rm log.txt 
	echo 'Error: Failed to install dependencies in spaccwrapper'
	exit 1
fi
#########################################################################



echo



##########################################################################
yarn install-lib in spaccwrapper
##########################################################################
echo 'Running yarn install-lib in spaccwrapper'

yarn install-lib > log.txt 2>&1

if [ $? -ne 0 ];
then 
	rm log.txt
	echo 'Error: Failed to install lib'
	exit 1
fi
#########################################################################



cd ../spaccelerator

echo



##########################################################################
ng build --aot in spaccelerator
##########################################################################
echo 'Running ng build --aot'
ng build --aot > log.txt 2>&1


if [ $? -ne 0 ];
then
	rm log.txt
	echo 'Error: Failed to build aot'
	exit 1
fi
#########################################################################



echo



##########################################################################
ng build --prod in spaccelerator
##########################################################################
echo 'Running ng build --prod'
ng build --prod > log.txt 2>&1

if [ $? -ne 0 ];
then
	rm log.txt
	echo 'Error: Failed to build prod'
	exit 1
fi
#########################################################################


rm log.txt

echo

cat << EOF
==================================================================================================================
						   IMPORTANT
==================================================================================================================
If you have made any of the following changes in spaccelerator, please also update the spawrapper app accordingly
- Added or changed a route.
- Changed the path or name of a module.
- Added a component or module.
==================================================================================================================

EOF


















