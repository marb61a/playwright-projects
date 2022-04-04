#environment
env=$1

#cucumber tag
tag=$2

#run cucumber tests & on failure then run postcucumber
#will know which environment to run
yarn run cucumber:$env --profile $tag || yarn run postcucumber
