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

.PHONY: $(d)test-instant-codec
$(call helpdoc,$(d)test-instant-codec)
$(d)test-instant-codec: $(d)karma $(d)src/instant-codec/test-deps
	$(if $(d),(cd $(d) && ./karma start src/instant-codec/config/karma.conf.js),./karma start src/instant-codec/config/karma.conf.js)

.PHONY: $(d)test-instant-codec-production
$(call helpdoc,$(d)test-instant-codec-production)
$(d)test-instant-codec-production: $(d)karma $(d)src/instant-codec/dist/instant-codec.js $(d)src/instant-codec/test-deps
	$(if $(d),(cd $(d) && ./karma start src/instant-codec/config/karma-production.conf.js),./karma start src/instant-codec/config/karma-production.conf.js)

.PHONY: $(d)test-instant-codec-minified
$(call helpdoc,$(d)test-instant-codec-minified)
$(d)test-instant-codec-minified: $(d)karma $(d)src/instant-codec/dist/instant-codec.min.js $(d)src/instant-codec/test-deps
	$(if $(d),(cd $(d) && ./karma start src/instant-codec/config/karma-minified.conf.js),./karma start src/instant-codec/config/karma-minified.conf.js)

.PHONY: $(d)test-angular-instant-codec
$(call helpdoc,$(d)test-angular-instant-codec)
$(d)test-angular-instant-codec: $(d)karma $(d)src/angular-instant-codec/test-deps
	$(if $(d),(cd $(d) && ./karma start src/angular-instant-codec/config/karma.conf.js),./karma start src/angular-instant-codec/config/karma.conf.js)

.PHONY: $(d)test-angular-instant-codec-production
$(call helpdoc,$(d)test-angular-instant-codec-production)
$(d)test-angular-instant-codec-production: $(d)karma $(d)src/angular-instant-codec/dist/angular-instant-codec.js $(d)src/angular-instant-codec/test-deps
	$(if $(d),(cd $(d) && ./karma start src/angular-instant-codec/config/karma-production.conf.js),./karma start src/angular-instant-codec/config/karma-production.conf.js)

.PHONY: $(d)test-angular-instant-codec-minified
$(call helpdoc,$(d)test-angular-instant-codec-minified)
$(d)test-angular-instant-codec-minified: $(d)karma $(d)src/angular-instant-codec/dist/angular-instant-codec.min.js $(d)src/angular-instant-codec/test-deps
	$(if $(d),(cd $(d) && ./karma start src/angular-instant-codec/config/karma-minified.conf.js),./karma start src/angular-instant-codec/config/karma-minified.conf.js)

$(d)karma: $(d)node_modules/karma/bin/karma
	ln -sf node_modules/karma/bin/karma $(d)karma

$(d)node_modules/karma/bin/karma:
	$(if $(d),(cd $(d) && npm install),npm install)

.PHONY: $(d)lint
$(call helpdoc,$(d)lint)
$(d)lint:
	jscs -x -r inline $(addprefix $(d)src/instant-codec/,js/ spec/) $(addprefix $(d)src/angular-instant-codec/,services/ spec/)

endef

# Compile template
$(eval $($(d)template))

# File copy rules
define $(d)template
$(2): $(1)
	mkdir -p $(dir $(2)) && cp $(1) $(2)
endef

# angular-instant-codec testing
$(eval $(call $(d)template,$(d)downloads/angular/angular.min.js,$(d)src/angular-instant-codec/downloads/angular.js))
$(eval $(call $(d)template,$(d)downloads/angular/angular-mocks.js,$(d)src/angular-instant-codec/downloads/angular-mocks.js))
$(eval $(call $(d)template,$(d)downloads/angular-utf8-base64/angular-utf8-base64.min.js,$(d)src/angular-instant-codec/downloads/angular-utf8-base64.js))
$(eval $(call $(d)template,$(d)downloads/live-blocks/live-blocks.min.js,$(d)src/angular-instant-codec/downloads/live-blocks.js))

# html/dist dependencies
$(eval $(call $(d)template,$(d)downloads/angular/angular.min.js,$(d)html/dist/js/angular.min.js))
$(eval $(call $(d)template,$(d)src/angular-instant-codec/dist/angular-instant-codec.js,$(d)html/dist/js/angular-instant-codec.js))
$(eval $(call $(d)template,$(d)src/angular-instant-codec/dist/angular-instant-codec.min.js,$(d)html/dist/js/angular-instant-codec.min.js))
$(eval $(call $(d)template,$(d)downloads/angular-utf8-base64/angular-utf8-base64.js,$(d)html/dist/js/angular-utf8-base64.js))
$(eval $(call $(d)template,$(d)downloads/angular-utf8-base64/angular-utf8-base64.min.js,$(d)html/dist/js/angular-utf8-base64.min.js))
$(eval $(call $(d)template,$(d)src/instant-codec/dist/instant-codec.js,$(d)html/dist/js/instant-codec.js))
$(eval $(call $(d)template,$(d)src/instant-codec/dist/instant-codec.min.js,$(d)html/dist/js/instant-codec.min.js))
$(eval $(call $(d)template,$(d)downloads/live-blocks/live-blocks.js,$(d)html/dist/js/live-blocks.js))
$(eval $(call $(d)template,$(d)downloads/live-blocks/live-blocks.min.js,$(d)html/dist/js/live-blocks.min.js))
$(eval $(call $(d)template,$(d)downloads/bootstrap/bootstrap.min.css,$(d)html/dist/css/bootstrap.min.css))
$(eval $(call $(d)template,$(d)downloads/glyphicons/glyphicons-halflings-regular.eot,$(d)html/dist/fonts/glyphicons-halflings-regular.eot))
$(eval $(call $(d)template,$(d)downloads/glyphicons/glyphicons-halflings-regular.svg,$(d)html/dist/fonts/glyphicons-halflings-regular.svg))
$(eval $(call $(d)template,$(d)downloads/glyphicons/glyphicons-halflings-regular.ttf,$(d)html/dist/fonts/glyphicons-halflings-regular.ttf))
$(eval $(call $(d)template,$(d)downloads/glyphicons/glyphicons-halflings-regular.woff,$(d)html/dist/fonts/glyphicons-halflings-regular.woff))
$(eval $(call $(d)template,$(d)downloads/glyphicons/glyphicons-halflings-regular.woff2,$(d)html/dist/fonts/glyphicons-halflings-regular.woff2))

# Default to help
.DEFAULT_GOAL := help

# Clear local variables
$(eval $(d)submodules :=)
$(eval $(d)subexports :=)
$(eval $(d)template :=)

