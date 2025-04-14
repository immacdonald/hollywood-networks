GIT_BRANCH = $(shell git rev-parse --abbrev-ref HEAD)

deploy:
	gh workflow run 'Deploy' --ref "$(GIT_BRANCH)"

.PHONY: deploy