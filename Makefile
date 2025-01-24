update:
	pnpm update --latest -r

delete-branches:
	git branch | grep -v "master" | xargs git branch -D
