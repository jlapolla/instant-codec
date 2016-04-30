# JavaScript source files
$(eval $(d)js := $(patsubst $(d)%.js,%,$(wildcard $(d)services/*.js)))

# Source files wrapped in "test" partials
define $(d)template
$(d)test/$(1).js: $(d)$(1).js $(addprefix $(d)partials/test-,$(addsuffix .js,header footer))
	mkdir -p $(dir $(d)test/$(1).js) && cat $(d)partials/test-header.js $(d)$(1).js $(d)partials/test-footer.js > $(d)test/$(1).js
endef
$(foreach $(d)var,$($(d)js),$(eval $(call $(d)template,$($(d)var))))

# Include files
include helpdoc.mk
include watch.mk

define $(d)template
$(call helpdoc,$(d)dist/angular-base64app.js,Base64App Angular module)
$(d)dist/angular-base64app.js: $(addprefix $(d),$(addsuffix .js,$($(d)js))) $(addprefix $(d)partials/,$(addsuffix .js,header footer preamble))
	mkdir -p $(d)dist/ && cat $(d)partials/preamble.js $(d)partials/header.js $(addprefix $(d),$(addsuffix .js,$($(d)js))) $(d)partials/footer.js > $(d)dist/angular-base64app.js

$(call helpdoc,$(d)dist/angular-base64app.min.js,Base64App Angular module (minified))
$(d)dist/angular-base64app.min.js: $(d)dist/angular-base64app.js $(d)partials/preamble.js
	cat $(d)partials/preamble.js > $(d)dist/angular-base64app.min.js
	uglifyjs -mc unsafe -- - < $(d)dist/angular-base64app.js >> $(d)dist/angular-base64app.min.js

.PHONY: $(d)all
$(call helpdoc,$(d)all,Build main files)
$(d)all: $(addprefix $(d)dist/,$(addsuffix .js,angular-base64app angular-base64app.min))

.PHONY: $(d)test-deps
$(call helpdoc,$(d)test-deps,Build files needed for testing)
$(d)test-deps: $(d)test/test-start.js $(addprefix $(d)test/,$(addsuffix .js,$($(d)js))) $(addprefix $(d)downloads/,angular-utf8-base64.js live-blocks.js angular.js angular-mocks.js)

$(d)test/test-start.js: $(d)partials/test-start.js
	mkdir -p $(d)test/ && cp $(d)partials/test-start.js $(d)test/test-start.js

.PHONY: $(d)clean
$(call helpdoc,$(d)clean,Delete build products)
$(d)clean:
	rm -rf $(d)dist/ $(d)downloads/ $(d)test/ $(d)reports/
endef
$(eval $($(d)template))

# Default goal
.DEFAULT_GOAL := help

$(eval $(d)js :=)
$(eval $(d)template :=)
$(eval $(d)var :=)

