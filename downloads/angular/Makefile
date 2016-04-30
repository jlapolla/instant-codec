# Angular file download template
define $(d)template

$(eval include download.mk)

$(d)$(1)-$(2)$(3):
	$(call download,https://code.angularjs.org/$(2)/$(1)$(3),$(d)$(1)-$(2)$(3))
endef

# File downloads
$(eval $(d)ver := 1.5.5) # Angular version number
$(eval $(call $(d)template,angular,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-animate,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-aria,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-cookies,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-loader,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-message-format,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-messages,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-parse-ext,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-resource,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-route,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-sanitize,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-touch,$($(d)ver),.min.js))
$(eval $(call $(d)template,angular-mocks,$($(d)ver),.js))
$(eval $(call $(d)template,angular-scenario,$($(d)ver),.js))
$(eval $(d)template :=)

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
	rm -f $(d)angular*
endef

# Compile template
$(eval $($(d)template))

# Default goal
.DEFAULT_GOAL := help

# Clear local variables
$(eval $(d)template :=)
$(eval $(d)ver :=)

