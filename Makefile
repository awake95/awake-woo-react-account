SLUG := $(shell composer show --self 2>/dev/null| head -n1 | awk -F'/' '{print $$2}')
build:
	mkdir -p $(SLUG)
	composer install
	npm install
	npm run build
	cp -r includes $(SLUG)/
	cp -r vendor $(SLUG)/
	cp -r autoload.php $(SLUG)/
	cp -r plugin.php $(SLUG)/
	cp -r composer.json $(SLUG)/
	cp -r assets $(SLUG)/
clean:
	rm -rf $(SLUG)
	[ -f dist.zip ] && rm dist.zip

zipball: build
	zip -r dist.zip $(SLUG)/
