# List submodules
$(eval $(d)submodules := $(patsubst $(if $(d),$(d),./)%Makefile,%,$(shell find $(d) -mindepth 2 -maxdepth 2 -type f -name Makefile)))

# Require submodules
include require.mk
$(eval $(d)subexports := $(call require,$(addprefix $(d),$(addsuffix Makefile,$(call $(d)submodules)))))

# Includes
include helpdoc.mk

# Main template
define $(d)template

.PHONY: $(d)serve
$(call helpdoc,$(d)serve,Serve project root on port 8080. Useful for viewing test reports.)
$(d)serve:
	http-server -c-1 $(d)

.PHONY: $(d)clean
$(call helpdoc,$(d)clean)
$(d)clean: $(addprefix $(d),$(addsuffix clean,$($(d)submodules)))

.PHONY: $(d)test-base64app
$(call helpdoc,$(d)test-base64app)
$(d)test-base64app: $(d)karma
	$(if $(d),(cd $(d) && ./karma start src/base64app/config/karma.conf.js),./karma start src/base64app/config/karma.conf.js)

.PHONY: $(d)test-base64app-production
$(call helpdoc,$(d)test-base64app-production)
$(d)test-base64app-production: $(d)karma
	$(if $(d),(cd $(d) && ./karma start src/base64app/config/karma-production.conf.js),./karma start src/base64app/config/karma-production.conf.js)

.PHONY: $(d)test-base64app-minified
$(call helpdoc,$(d)test-base64app-minified)
$(d)test-base64app-minified: $(d)karma
	$(if $(d),(cd $(d) && ./karma start src/base64app/config/karma-minified.conf.js),./karma start src/base64app/config/karma-minified.conf.js)

$(d)karma: $(d)node_modules/karma/bin/karma
	ln -sf node_modules/karma/bin/karma $(d)karma

$(d)node_modules/karma/bin/karma:
	$(if $(d),(cd $(d) && npm install),npm install)
endef

# Compile template
$(eval $($(d)template))

# Default to help
.DEFAULT_GOAL := help

# Clear local variables
$(eval $(d)submodules :=)
$(eval $(d)subexports :=)

