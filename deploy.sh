#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build && firebase deploy --only hosting