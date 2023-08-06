dev:
	npm run dev

deploy:
	gh workflow run 'Deploy' --ref "$(git rev-parse --abbrev-ref HEAD)"