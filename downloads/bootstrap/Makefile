# Bootstrap file download template
include download.mk
define $(d)template

$(d)$(2)-$(3)$(4):
	$(call download,https://maxcdn.bootstrapcdn.com/bootstrap/$(3)/$(1)/$(2)$(4),$(d)$(2)-$(3)$(4))
endef

# File downloads
$(eval $(d)ver := 3.3.6) # Bootstrap version number
$(eval $(call $(d)template,css,bootstrap,$($(d)ver),.min.css))
$(eval $(call $(d)template,css,bootstrap-theme,$($(d)ver),.min.css))
$(eval $(call $(d)template,js,bootstrap,$($(d)ver),.min.js))

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
	rm -f $(d)bootstrap*
endef

# Compile template
$(eval $($(d)template))

# Default goal
.DEFAULT_GOAL := help

# Clear local variables
$(eval $(d)template :=)
$(eval $(d)ver :=)

