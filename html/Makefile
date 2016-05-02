# Include files
include helpdoc.mk
include watch.mk

define $(d)template
$(d)dist/index.html: $(addprefix $(d)partials/,header.html head-content.html main.html middle.html footer.html foot-content.html)
	mkdir -p $(d)dist/ && cat $(addprefix $(d)partials/,header.html head-content.html main.html middle.html footer.html foot-content.html) > $(d)dist/index.html

$(d)dist/unminified.html: $(addprefix $(d)partials/,header.html head-content.html main.html middle.html footer.html foot-content-unminified.html)
	mkdir -p $(d)dist/ && cat $(addprefix $(d)partials/,header.html head-content.html main.html middle.html footer.html foot-content-unminified.html) > $(d)dist/unminified.html

.PHONY: $(d)all
$(call helpdoc,$(d)all)
$(d)all: $(d)dist/index.html $(d)dist/unminified.html \
$(addprefix $(d)dist/js/,live-blocks.js live-blocks.min.js base64app.js base64app.min.js angular.min.js angular-base64app.js angular-base64app.min.js angular-utf8-base64.js angular-utf8-base64.min.js) \
$(addprefix $(d)dist/css/,bootstrap.min.css) \
$(addprefix $(d)dist/fonts/glyphicons-halflings-regular,.eot .svg .ttf .woff .woff2)

.PHONY: $(d)clean
$(call helpdoc,$(d)clean)
$(d)clean:
	rm -rf $(d)dist/
endef
$(eval $($(d)template))

# Default goal
.DEFAULT_GOAL := help

$(eval $(d)template :=)

