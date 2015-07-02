#!/bin/sh
git remote add AmdHarness-app-loader-dojo https://github.com/amdharness/AmdHarness-app-loader-dojo.git
git remote add AmdHarness-amd-dijitTemplate https://github.com/amdharness/AmdHarness-amd-dijitTemplate.git
git remote add AmdHarness-amd-cssI https://github.com/amdharness/AmdHarness-amd-cssI.git
#git remote add AmdHarness-compat-js5 https://github.com/amdharness/amdharness-compat-js5.git
git remote add -t 1.10 dojo https://github.com/dojo/dojo.git
git remote add -t 1.10 dijit https://github.com/dojo/dijit.git
git remote add -t 1.10 dojox https://github.com/dojo/dojox.git
git remote add -t 1.10 dojoutil https://github.com/dojo/util.git
#git remote add -t master es5-shim https://github.com/es-shims/es5-shim.git
git fetch --all
git subtree add -P app/loader AmdHarness-app-loader-dojo/master
git subtree add -P lib/amdharness.org/amd/dijitTemplate AmdHarness-amd-dijitTemplate/master
git subtree add -P lib/amdharness.org/amd/cssI AmdHarness-amd-cssI/master
#git subtree add -P lib/amdharness.org/compat/js5 AmdHarness-compat-js5
git subtree add -P lib/dojotoolkit.org/dojo dojo/1.10 --squash
git subtree add -P lib/dojotoolkit.org/dijit dijit/1.10 --squash
git subtree add -P lib/dojotoolkit.org/dojox dojox/1.10 --squash
git subtree add -P lib/dojotoolkit.org/util dojoutil/1.10 --squash
#git subtree add -P lib/compat/es5-shim es5-shim/master --squash