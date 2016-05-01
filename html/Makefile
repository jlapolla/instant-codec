# Include files
include helpdoc.mk
include watch.mk

define $(d)template
$(call helpdoc,$(d)dist/single-page.html)
$(d)dist/single-page.html: $(addprefix $(d)partials/,header.html main.html middle.html footer.html) $(addprefix $(d)downloads/,angular.min.js angular-base64app.js angular-utf8-base64.js base64app.js bootstrap.min.css live-blocks.js)
	mkdir -p $(d)dist/
	cat $(d)partials/header.html > $(d)dist/single-page.html
	printf '%s\n' '<style>' >> $(d)dist/single-page.html
	cat $(d)downloads/bootstrap.min.css >> $(d)dist/single-page.html
	printf '%s\n' '</style>' >> $(d)dist/single-page.html
	cat $(d)partials/middle.html $(d)partials/main.html >> $(d)dist/single-page.html
	printf '%s\n' '<script>' >> $(d)dist/single-page.html
	cat $(addprefix $(d)downloads/,live-blocks.js base64app.js angular.min.js angular-base64app.js angular-utf8-base64.js) >> $(d)dist/single-page.html
	printf '%s\n' '</script>' >> $(d)dist/single-page.html
	cat $(d)partials/footer.html >> $(d)dist/single-page.html

.PHONY: $(d)clean
$(call helpdoc,$(d)clean)
$(d)clean:
	rm -rf $(d)dist/ $(d)downloads/
endef
$(eval $($(d)template))

# Default goal
.DEFAULT_GOAL := help

$(eval $(d)template :=)

