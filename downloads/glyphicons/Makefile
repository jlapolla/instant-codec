# Bootstrap file download template
include download.mk
define $(d)template

$(d)$(2)$(4):
	$(call download,https://cdnjs.cloudflare.com/ajax/libs/bootswatch/$(3)/$(1)/$(2)$(4),$(d)$(2)$(4))
endef

# File downloads
$(eval $(d)ver := 3.3.6) # Glyphicons version number
$(eval $(call $(d)template,fonts,glyphicons-halflings-regular,$($(d)ver),.eot))
$(eval $(call $(d)template,fonts,glyphicons-halflings-regular,$($(d)ver),.svg))
$(eval $(call $(d)template,fonts,glyphicons-halflings-regular,$($(d)ver),.ttf))
$(eval $(call $(d)template,fonts,glyphicons-halflings-regular,$($(d)ver),.woff))
$(eval $(call $(d)template,fonts,glyphicons-halflings-regular,$($(d)ver),.woff2))

# Includes
include helpdoc.mk

# Other targets
define $(d)template

$(call helpdoc,$(d)clean)
.PHONY: $(d)clean
$(d)clean:

$(call helpdoc,$(d)download-clean)
.PHONY: $(d)download-clean
$(d)download-clean:
	rm -f $(d)glyphicons-halflings-regular*
endef

# Compile template
$(eval $($(d)template))

# Default goal
.DEFAULT_GOAL := help

# Clear local variables
$(eval $(d)template :=)
$(eval $(d)ver :=)

