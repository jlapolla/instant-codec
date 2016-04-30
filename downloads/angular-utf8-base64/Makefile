# Check for source module
ifeq ($(wildcard $(d)src/README.md),) # Source module is not installed
  # Download source module
  include exec.mk
  $(call exec,git clone https://github.com/stranger82/angular-utf8-base64.git $(d)src,Failed to clone https://github.com/stranger82/angular-utf8-base64.git)
endif # End check for source module

# List submodules
$(eval $(d)submodules := $(patsubst $(if $(d),$(d),./)%Makefile,%,$(shell find $(d) -mindepth 2 -maxdepth 2 -type f -name Makefile)))

# Require submodules
include require.mk
$(eval $(d)subexports := $(call require,$(addprefix $(d),$(addsuffix Makefile,$(call $(d)submodules)))))

# Includes
include helpdoc.mk

# Main template
define $(d)template

$(call helpdoc,$(d)angular-utf8-base64.js)
$(d)angular-utf8-base64.js: $(d)src/angular-utf8-base64.js
	cp $(d)src/angular-utf8-base64.js $(d)angular-utf8-base64.js

$(call helpdoc,$(d)angular-utf8-base64.min.js)
$(d)angular-utf8-base64.min.js: $(d)angular-utf8-base64.js
	uglifyjs -mc unsafe -- - < $(d)angular-utf8-base64.js > $(d)angular-utf8-base64.min.js

$(call helpdoc,$(d)clean)
.PHONY: $(d)clean
$(d)clean: $(addprefix $(d),$(addsuffix clean,$($(d)submodules)))
	rm -f $(d)angular-utf8-base64*
endef

# Compile template
$(eval $($(d)template))

# Default to help
.DEFAULT_GOAL := help

# Clear local variables
$(eval $(d)submodules :=)
$(eval $(d)subexports :=)
$(eval $(d)template :=)

