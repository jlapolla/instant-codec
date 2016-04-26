# List submodules
$(eval $(d)submodules := $(patsubst $(if $(d),$(d),./)%Makefile,%,$(shell find $(d) -mindepth 2 -maxdepth 2 -type f -name Makefile)))

# Require submodules
include require.mk
$(eval $(d)subexports := $(call require,$(addprefix $(d),$(addsuffix Makefile,$(call $(d)submodules)))))

# Includes
include helpdoc.mk

# Main template
define $(d)template

$(call helpdoc,$(d)clean)
.PHONY: $(d)clean
$(d)clean: $(addprefix $(d),$(addsuffix clean,$($(d)submodules)))
endef

# Compile template
$(eval $($(d)template))

# Default to help
.DEFAULT_GOAL := help

# Clear local variables
$(eval $(d)submodules :=)
$(eval $(d)subexports :=)

