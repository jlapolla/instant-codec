# Source files must be concatenated in a specific order
$(eval $(d)js :=)
$(eval $(d)js += extendClass)
$(eval $(d)js += getUndefined)
$(eval $(d)js += hasOwnProperty)
$(eval $(d)js += multiInheritClass)
$(eval $(d)js += Bit)

# Source files wrapped in "test" partials
define $(d)template
$(d)test/$(1).js: $(d)js/$(1).js $(addprefix $(d)partials/test-,$(addsuffix .js,header footer))
	mkdir -p $(d)test/ && cat $(d)partials/test-header.js $(d)js/$(1).js $(d)partials/test-footer.js > $(d)test/$(1).js
endef
$(foreach $(d)var,$($(d)js),$(eval $(call $(d)template,$($(d)var))))

# Include files
include helpdoc.mk
include watch.mk

define $(d)template
$(call helpdoc,$(d)dist/instant-codec.js,InstantCodec module)
$(d)dist/instant-codec.js: $(addprefix $(d)js/,$(addsuffix .js,$($(d)js))) $(addprefix $(d)partials/,$(addsuffix .js,header footer preamble))
	mkdir -p $(d)dist/ && cat $(d)partials/preamble.js $(d)partials/header.js $(addprefix $(d)js/,$(addsuffix .js,$($(d)js))) $(d)partials/footer.js > $(d)dist/instant-codec.js

$(call helpdoc,$(d)dist/instant-codec.min.js,InstantCodec module (minified))
$(d)dist/instant-codec.min.js: $(d)dist/instant-codec.js $(d)partials/preamble.js
	cat $(d)partials/preamble.js > $(d)dist/instant-codec.min.js
	uglifyjs -mc unsafe -- - < $(d)dist/instant-codec.js >> $(d)dist/instant-codec.min.js

.PHONY: $(d)all
$(call helpdoc,$(d)all,Build main files)
$(d)all: $(addprefix $(d)dist/,$(addsuffix .js,instant-codec instant-codec.min))

.PHONY: $(d)test-deps
$(call helpdoc,$(d)test-deps,Build files needed for testing)
$(d)test-deps: $(d)test/test-start.js $(addprefix $(d)test/,$(addsuffix .js,$($(d)js)))

$(d)test/test-start.js: $(d)partials/test-start.js
	mkdir -p $(d)test/ && cp $(d)partials/test-start.js $(d)test/test-start.js

.PHONY: $(d)clean
$(call helpdoc,$(d)clean,Delete build products)
$(d)clean:
	rm -rf $(d)dist/ $(d)test/ $(d)reports/
endef
$(eval $($(d)template))

# Default goal
.DEFAULT_GOAL := help

$(eval $(d)js :=)
$(eval $(d)template :=)
$(eval $(d)var :=)

