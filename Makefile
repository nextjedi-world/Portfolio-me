# Repo contract (nextjedi/platform docs/CONTRACTS.md):
#   make setup   install dependencies
#   make dev     run locally
#   make verify  typecheck + unit tests + build (no linter configured; see CLAUDE.md)
#   make e2e     no e2e suite in this repo
.DEFAULT_GOAL := verify
.PHONY: setup dev verify typecheck test build e2e clean

export NG_CLI_ANALYTICS := false

setup:
	@if [ -f package-lock.json ]; then npm ci; else npm install; fi
	@npx --no-install lefthook install 2>/dev/null || echo "lefthook not installed, hooks skipped"

dev:
	npm start

typecheck:
	npx tsc -p tsconfig.app.json --noEmit
	npx tsc -p tsconfig.spec.json --noEmit

test:
	npx ng test --watch=false --browsers=ChromeHeadless

build:
	npm run build

verify: typecheck test build

e2e:
	@echo "No e2e suite in this repo."

clean:
	rm -rf dist .angular
