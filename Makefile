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
$(d)test-base64app: $(d)karma $(d)src/base64app/test-deps
	$(if $(d),(cd $(d) && ./karma start src/base64app/config/karma.conf.js),./karma start src/base64app/config/karma.conf.js)

.PHONY: $(d)test-base64app-production
$(call helpdoc,$(d)test-base64app-production)
$(d)test-base64app-production: $(d)karma $(d)src/base64app/dist/base64app.js $(d)src/base64app/test-deps
	$(if $(d),(cd $(d) && ./karma start src/base64app/config/karma-production.conf.js),./karma start src/base64app/config/karma-production.conf.js)

.PHONY: $(d)test-base64app-minified
$(call helpdoc,$(d)test-base64app-minified)
$(d)test-base64app-minified: $(d)karma $(d)src/base64app/dist/base64app.min.js $(d)src/base64app/test-deps
	$(if $(d),(cd $(d) && ./karma start src/base64app/config/karma-minified.conf.js),./karma start src/base64app/config/karma-minified.conf.js)

.PHONY: $(d)test-angular-base64app
$(call helpdoc,$(d)test-angular-base64app)
$(d)test-angular-base64app: $(d)karma $(d)src/angular-base64app/test-deps
	$(if $(d),(cd $(d) && ./karma start src/angular-base64app/config/karma.conf.js),./karma start src/angular-base64app/config/karma.conf.js)

.PHONY: $(d)test-angular-base64app-production
$(call helpdoc,$(d)test-angular-base64app-production)
$(d)test-angular-base64app-production: $(d)karma $(d)src/angular-base64app/dist/angular-base64app.js $(d)src/angular-base64app/test-deps
	$(if $(d),(cd $(d) && ./karma start src/angular-base64app/config/karma-production.conf.js),./karma start src/angular-base64app/config/karma-production.conf.js)

.PHONY: $(d)test-angular-base64app-minified
$(call helpdoc,$(d)test-angular-base64app-minified)
$(d)test-angular-base64app-minified: $(d)karma $(d)src/angular-base64app/dist/angular-base64app.min.js $(d)src/angular-base64app/test-deps
	$(if $(d),(cd $(d) && ./karma start src/angular-base64app/config/karma-minified.conf.js),./karma start src/angular-base64app/config/karma-minified.conf.js)

$(d)karma: $(d)node_modules/karma/bin/karma
	ln -sf node_modules/karma/bin/karma $(d)karma

$(d)node_modules/karma/bin/karma:
	$(if $(d),(cd $(d) && npm install),npm install)

.PHONY: $(d)lint
$(call helpdoc,$(d)lint)
$(d)lint:
	jscs -x -r inline $(addprefix $(d)src/base64app/,js/ spec/) $(addprefix $(d)src/angular-base64app/,services/ spec/)

endef

# Compile template
$(eval $($(d)template))

# File copy rules
define $(d)template
$(2): $(1)
	mkdir -p $(dir $(2)) && cp $(1) $(2)
endef
$(eval $(call $(d)template,$(d)downloads/angular/angular.min.js,$(d)src/angular-base64app/downloads/angular.js))
$(eval $(call $(d)template,$(d)downloads/angular/angular-mocks.js,$(d)src/angular-base64app/downloads/angular-mocks.js))
$(eval $(call $(d)template,$(d)downloads/angular-utf8-base64/angular-utf8-base64.min.js,$(d)src/angular-base64app/downloads/angular-utf8-base64.js))
$(eval $(call $(d)template,$(d)downloads/live-blocks/live-blocks.min.js,$(d)src/angular-base64app/downloads/live-blocks.js))

$(eval $(call $(d)template,$(d)downloads/angular/angular.min.js,$(d)html/downloads/angular.min.js))
$(eval $(call $(d)template,$(d)src/angular-base64app/dist/angular-base64app.js,$(d)html/downloads/angular-base64app.js))
$(eval $(call $(d)template,$(d)downloads/angular-utf8-base64/angular-utf8-base64.js,$(d)html/downloads/angular-utf8-base64.js))
$(eval $(call $(d)template,$(d)src/base64app/dist/base64app.js,$(d)html/downloads/base64app.js))
$(eval $(call $(d)template,$(d)downloads/bootstrap/bootstrap.min.css,$(d)html/downloads/bootstrap.min.css))
$(eval $(call $(d)template,$(d)downloads/live-blocks/live-blocks.js,$(d)html/downloads/live-blocks.js))

# Default to help
.DEFAULT_GOAL := help

# Clear local variables
$(eval $(d)submodules :=)
$(eval $(d)subexports :=)
$(eval $(d)template :=)

