#!/usr/bin/env bash

#
#
# App Center - Ionic build script
#
# Reusable build script for App Center to build your Ionic + Capacitor application with Angular
# as your framework.
# This script assumes that you are making use of buildTargets (Android) and schemes (iOS) to use specific configuration
# based on the selected target/scheme. Your native projects can have target/scheme specific configuration. We call this the BUILD_ENV in this script.
# The BUILD_ENV will then be used to select the correct Angular configuration that you need to set in your angular.json file
# to use the correct environment settings for the Angular part of the application.
#
# MAKE SURE THAT YOU KEEP THIS FILE IN SYNC IN BOTH ANDROID AND IOS PROJECTS.
#
#

# fail if any command fails
set -e
# debug log
set -x

# go to root of project
cd ../..


# The BUILD_ENV will be set with the expected environment (dev, tst, acc, prd) based on the scheme (iOS) or buildType (Android)

if [ -z "$APPCENTER_XCODE_PROJECT" ]
then
    echo "SELECTED ANDROID VARIANT => $APPCENTER_ANDROID_VARIANT"
    BUILD_ENV=$APPCENTER_ANDROID_VARIANT
else
    echo "SELECTED XCODE SCHEME    => $APPCENTER_XCODE_SCHEME"
    BUILD_ENV=$APPCENTER_XCODE_SCHEME
fi

echo "build env => $BUILD_ENV"

# install dependencies
npm ci

if [[ $BUILD_ENV == "dev" ]]; then
    # A dev build is the standard configuration in a Angular config. We can just use npm run build for this.
    # no need to create an optimized build
    npm run build -- --configuration=dev
else
    # Build the web app based on the given build environment. Make sure that your angular.json supports all possible configurations other then 'dev'
    # Each configured configuration in your angular.json can use fileReplacements to substibute environment specific variables
    # We use 'production' as our main configuration. Any appended configuration will override previously set configuration.
    # This way we can inherit config from production but override fileReplacements for example
    npm run build -- --configuration=production,$BUILD_ENV
fi

# copy the web assets to the native projects and updates the native plugins and dependencies based in package.json
npx cap sync