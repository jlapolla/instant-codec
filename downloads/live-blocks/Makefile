# Check for LiveBlocks module
ifeq ($(wildcard $(d)src/Makefile),) # LiveBlocks is not installed
  # Download LiveBlocks
  include exec.mk
  $(call exec,git clone https://github.com/jlapolla/live-blocks.git $(d)src,Failed to clone https://github.com/jlapolla/live-blocks.git)
endif # End check for LiveBlocks module

# List submodules
$(eval $(d)submodules := $(patsubst $(if $(d),$(d),./)%Makefile,%,$(shell find $(d) -mindepth 2 -maxdepth 2 -type f -name Makefile)))

# Require submodules
include require.mk
$(eval $(d)subexports := $(call require,$(addprefix $(d),$(addsuffix Makefile,$(call $(d)submodules)))))

# Includes
include helpdoc.mk

# Main template
define $(d)template

$(call helpdoc,$(d)live-blocks.js)
$(d)live-blocks.js: $(d)src/dist/live-blocks.js
	cp $(d)src/dist/live-blocks.js $(d)live-blocks.js

$(call helpdoc,$(d)live-blocks.min.js)
$(d)live-blocks.min.js: $(d)src/dist/live-blocks.min.js
	cp $(d)src/dist/live-blocks.min.js $(d)live-blocks.min.js

$(call helpdoc,$(d)clean)
.PHONY: $(d)clean
$(d)clean: $(addprefix $(d),$(addsuffix clean,$($(d)submodules)))
	rm -f $(d)live-blocks*
endef

# Compile template
$(eval $($(d)template))

# Default to help
.DEFAULT_GOAL := help

# Clear local variables
$(eval $(d)submodules :=)
$(eval $(d)subexports :=)
$(eval $(d)template :=)

