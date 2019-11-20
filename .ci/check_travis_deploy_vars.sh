#!/bin/bash
# check travis ci env
set -ex
if [[ $TRAVIS_BRANCH == master && $TRAVIS_EVENT_TYPE == push && 
      ! "$GITHUB_TOKEN" ]]; then
  false
fi