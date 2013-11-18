amdharness-app
==============

JavaScript AMD based application framework.

The goal is to make amd use a straightforward and consistent with html page SDLC.
It comprize the modules embedding and use convention, unification of documentation, tests, design and support.

The modular structure is normalized across project parts and emphasize individual SDLC for its modules
from dedicated version control repository to folder hierarchy and AMD MIDs convention.

Present structure in amdharness-app repository serves design and development phase of SDLC.
During release builds most of packages could be fused into one or few bundles and perhaps embedded into release version
of page. AmdHarness does not encourage such builds as there is not much benefits but there are plenty of drawbacks(blog TBD).

loader.js
---------

The main HTML page runtime engine of amdharness based application is loader.js module. It will be a primary, often single entry
point to the code. The application or page specific parameters and code could be triggered as loader.js parameters or via
embedded into page SCRIPT require() statements.

loader.js will take care of run- and build-time time replacement of various package builds like debug vs release vs bundle.
That historically been done by altering index.html config and script tag for different builds.
loader.js will eliminate the need for index.html versions and open main build profile for test and other pages so your
tests will run against same JS environment as primary page.

loader.js will help to phase the application resources load to
- initial(loading...) HTML+CSS+JS set,
- front page UI components set resources
- rest of reused in various application modules dependencies
- leaving minor individual modules/widgets dependencies to run time.

most used MIDs
--------------
The most popular APIs have dedicated MIDs. Among those:
* "cssQuery" - jQuery dom manipulation. There are 3 implementations to choose from:
	- amdharness.org/CssQuery/dojo-jQuery - shim to load dojo/query and jQuery API support
	- shimbhala.org/CssQuery/jQuery - shim for cssQuery css selector goup operations
	- amdharness.org/CssQuery/jQuery - shim to load genuine jQuery via AMD

* "cssI!" AMD plugin to embed CSS link into page. Alternatives are XStyle, tbd.

* "textTemplate!" shortcut to "text!myTemplate.html!strip" pligin with following implementations:
	- amdharness.org/amd/text/textTemplate - shim for "dojo/text!" with bug fixes for relative MIDs.
	- "dojo/text" - genuine template loading plugin, does not treat MIDs.
	- require.js "text!" plugin, does not have a concept of context teplacement, hence not aware of MIDs at all.


## relative MID support

made a fist-class citizen. Shims embedded into loader.js will fix the lack of relative MIDs on page, template and
parser levels in AMD provider like dojo or Require.js.
I.e it is permitted and encouraged to use relative MIDs everywhere starting from HTML pages, test pages and templates.

## design notes

AmdHarness-loader where loader.js is located embedded into application project as git subtree.
Such use of AmdHarness-loader [todo replace w/ cdn link] as embedded in your project folder will allow:
1. Keep index.html same for different builds
2. Switch default build via pointing to different git submodule. There are embedded dojo 1.6+ release, debug, source and CDN modules. RequireJS and other  AMD loaders TBD.
3. In release one with AmdLoader=debug URL query parameter it is possible to switch the compiled to matching revision of debug code.
4. Future releases capabilities. There is a promise to keep listing of compatible loaders on project Wiki opened for public contribution. Github also gives ability to see the pull/link list (TBD).
5. Application specific loader customization.  Could be done by
a) app-specific branching of selected default loader and applying app changes there.
b) AmdHarnessLoader global  variable (script attribute TBD)
6. Final release build could exclude as AMD as harness loader leaving just compiled bundle in loader.js Showcase TBD.
7. Loader.js could be used in addition to index.html in folders/files of html templates or simple widget test pages to test against different AMD. It fixes relative path and other bugs on specific AMD loaders like dojo one.
8. Commonly used module with given API are embedded into config: cssQuery (link) - jQuery API for html dom and events manipulation. Other tbd.
9. Alternatives to toolkits. Many aspects of dojo toolkit could be implemented: CssQuery by ..., AMD by RequireJS, etc. Listing of API and alternatives will be open for public.


git subtree in AmdHarness
-------------------------
While module does not need to be part of project to be used by app via AMD, it is essential to be able consistently track
all modules revisions as one for maintenance and application release control.
Git subtree[todo link] gives ability to embed exact
revision of external module into source tree. In addition to keeping the track it will allow to make application-specific
fixes into application repository without the need to alter original sources. Still permitting upstream commits to
contribute your fixes to external module and also merging external module updates back to application.

To initialize the external module in application( replace lib/dojotoolkit.org/dojo with your org/module as folder path and your git link with revision ):

$cd amdharness-app

	make an "dojo" alias name for remote repo for brevity
$ git remote add -t 1.9 dojo https://github.com/dojo/dojo.git
$ git fetch dojo
$ git subtree add -P lib/dojotoolkit.org/dojo dojo/1.9 --squash

you could use "master" instead of 1.9 branch to use the latest. It is advisable only when planning to change the module
and contribute it back.

	to see all remote aliases
$ git remote -v


default modules
```Shell
$ git remote add AmdHarness-app-loader-dojo https://github.com/amdharness/AmdHarness-app-loader-dojo.git
$ git remote add AmdHarness-amd-dijitTemplate https://github.com/amdharness/AmdHarness-amd-dijitTemplate.git
$ git remote add -t 1.9 dojo https://github.com/dojo/dojo.git
$ git remote add -t 1.9 dijit https://github.com/dojo/dijit.git
$ git remote add -t 1.9 dojox https://github.com/dojo/dojox.git
$ git remote add -t 1.9 dojoutil https://github.com/dojo/util.git
$ git fetch --all
$ git subtree add -P app/loader AmdHarness-app-loader-dojo/master
$ git subtree add -P lib/amdharness.org/amd/dijitTemplate AmdHarness-amd-dijitTemplate/master
$ git subtree add -P lib/dojotoolkit.org/dojo dojo/1.9 --squash
$ git subtree add -P lib/dojotoolkit.org/dijit dijit/1.9 --squash
$ git subtree add -P lib/dojotoolkit.org/dojox dojox/1.9 --squash
$ git subtree add -P lib/dojotoolkit.org/util dojoutil/1.9 --squash
```


