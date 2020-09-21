#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'gunchained.app' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://soleone.github.io/gunchained
git push -f git@github.com:soleone/gunchained.git master:gh-pages

cd -