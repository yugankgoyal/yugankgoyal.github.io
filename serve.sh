#!/bin/zsh
# Run the site locally at http://localhost:4000 (auto-rebuilds on edits; restart if you change _config.yml)
export PATH=/opt/homebrew/opt/ruby/bin:$PATH
cd "$(dirname "$0")"
bundle exec jekyll serve --livereload
