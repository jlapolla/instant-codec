# Angular controller source files
$(eval $(d)controller := $(patsubst $(d)%.js,%,$(wildcard $(d)controllers/*.js)))

# Angular directive source files
$(eval $(d)directive := $(patsubst $(d)%.js,%,$(wildcard $(d)directives/*.js)))

# Angular service source files
$(eval $(d)service := $(patsubst $(d)%.js,%,$(wildcard $(d)services/*.js)))

# All Angular source files
$(eval $(d)all := $($(d)controller) $($(d)directive) $($(d)service))

# Service source files wrapped in "test" partials
define $(d)template
$(d)test/$(1).js: $(d)$(1).js $(addprefix $(d)partials/test-,$(addsuffix .js,header footer))
	mkdir -p $(dir $(d)test/$(1).js) && cat $(d)partials/test-header.js $(d)$(1).js $(d)partials/test-footer.js > $(d)test/$(1).js
endef
$(foreach $(d)var,$($(d)service),$(eval $(call $(d)template,$($(d)var))))

# Include files
include helpdoc.mk
include watch.mk

define $(d)template
$(call helpdoc,$(d)dist/angular-base64app.js,Base64App Angular module)
$(d)dist/angular-base64app.js: $(addprefix $(d),$(addsuffix .js,$($(d)all))) $(addprefix $(d)partials/,$(addsuffix .js,header footer preamble))
	mkdir -p $(d)dist/ && cat $(d)partials/preamble.js $(d)partials/header.js $(addprefix $(d),$(addsuffix .js,$($(d)all))) $(d)partials/footer.js > $(d)dist/angular-base64app.js

$(call helpdoc,$(d)dist/angular-base64app.min.js,Base64App Angular module (minified))
$(d)dist/angular-base64app.min.js: $(d)dist/angular-base64app.js $(d)partials/preamble.js
	cat $(d)partials/preamble.js > $(d)dist/angular-base64app.min.js
	uglifyjs -mc unsafe -- - < $(d)dist/angular-base64app.js >> $(d)dist/angular-base64app.min.js

.PHONY: $(d)all
$(call helpdoc,$(d)all,Build main files)
$(d)all: $(addprefix $(d)dist/,$(addsuffix .js,angular-base64app angular-base64app.min))

.PHONY: $(d)test-deps
$(call helpdoc,$(d)test-deps,Build files needed for testing)
$(d)test-deps: $(d)test/test-start.js $(addprefix $(d)test/,$(addsuffix .js,$($(d)service))) $(addprefix $(d)downloads/,angular-utf8-base64.js live-blocks.js angular.js angular-mocks.js)

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

$(eval $(d)all :=)
$(eval $(d)controller :=)
$(eval $(d)directive :=)
$(eval $(d)service :=)
$(eval $(d)template :=)
$(eval $(d)var :=)

