AmdHarness-app-loader-dojo
==========================

AMD settings and loader selector. Compatible with Dojo Toolkit 1.6+.
Dojo Toolkit fixes:
- relative URL used in require() on page level, parser in page and templates.

WhyAmdHarness-loader
--------------------
1. Keep index.html same for different builds
2. Switch default build via pointing to different git submodule. There are embedded dojo 1.6+ release, debug, source and CDN modules. RequireJS and other  AMD loaders TBD.
3. In release buld ```debug=1``` URL query parameter will switch the compiled to matching revision of debug code.
4. Future releases capabilities. There is a promise to keep listing of compatible loaders on project Wiki opened for public contribution. Github also gives ability to see the pull/link list (TBD).
5. Application specific loader customization.  Could be done by a) app-specific branching of selected default loader and applying app changes there. b) AmdHarnessLoader global  variable (script attribute TBD)
6. Final release build could exclude as AMD as harness loader leaving just compiled bundle in loader.js Showcase TBD.
7. Loader.js could be used in addition to index.html in folders/files of html templates or simple widget test pages to test against different AMD loaders. It fixes relative path and other bugs on specific AMD loaders like dojo one.
8. Commonly used module with given API are embedded into config: cssQuery (link) - jQuery API for html dom and events manipulation. Other tbd.
9. Alternatives to toolkits. Many aspects of dojo toolkit could be implemented: CssQuery by ..., AMD by RequireJS, etc. Listing of API and alternatives will be open for public.

Bootstrap, The 3-stage CSS and JS loading 
-----------------------------------------
*1.* As a part of [AmdHarness bootstrap projects set](https://github.com/amdharness), the loader.js serves as primary entry point of main code base. Before it is loaded, the app/index.html and any HTML page( like test ) comprize the *embedded* JS and CSS only for initial one-page UI, often as "loading..." animation. The loading page specific resources (CSS, images, some JS) are meant to be compiled-in into HTML.

*2.* In second phase the ```<script src="../loader/loader.js" type="text/javascript" async="true" ></script>``` upon page load lazily will initiate main application screen resources: JS, CSS, templates as AMD modules. The production version of loader.js will be assembled from compiled and compressed JS of most reused modules along with templates and CSS-es.

*3.* Beyond the main app screen remaining UI could be loaded lazily on demand by usual AMD means.

Reusable application-wide resources 
-----------------------------------
For each application page whether it is a main index.html or IFRAMEd payment gateway or UI test pages it is important to keep same base resources loaded in unified way. As loader.js holds all CSS and AMD module set with app level shims enabled it serves as guarantee of same environment in all app pages and tests.  

Module location neutrality 
--------------------------
loader.js includes AMD shims for using the relative path as for JS as for AMD plugins like CSS or HTML templates. It allows to work with independent git repositories as subtree regardless of application folder structure.

Release build, locale and device profiles 
-----------------------------------------
loader.js in release mode is compiled from set of AMD modules pre-loaded by initial(debug) version.
As AMD permits conditional module inclusion (via HAS plugin or simple JS browser check) the build could be profiled for particular browser environment. In this case on particular device for particular region you could exclude the foreign resources from build-in code.

The profile detection could be done by server side say by HTTP headers/cookies or simple IP range. Different HTMLs will keep own packaged version of loader.js matching the profile. As AMD still works for not preloaded modules this kind of separation is error safe.

The UX device theme profiling also meant be done on this level having different media and locales compiled-in in loader.js in release and kept as conditional modules in debug.

Performance factors 
-------------------
As bundling all resources(JS,CSS, HTML, images) into single page (or JS) could look simple and efficient, in modern mobile environment it is not always true. The main page screen code most likely will not have extensive UI like calendars or grids. Those better to be loaded later as initial page load time could impact the user attraction a lot.

Another reason to skip the packaging and compression reside in low level stack which modern days could eliminate your efforts of manual compiling and bytes squeezing. GZIP-ed http connection is way more efficient of any JS one. The HTTP pipelining will permit to utilize the browser multithreading even in mobile environment. Having separate HTTP requests for each small resource will permit to process it immediately unlike only upon bundle load. The build support has a development and maintenance cost which in many cases is not justifiable. The true optimization will reside in other aspects of web application.

loader.js does not work around browser limits. But it gives a single place to resolve those.
The number of CSS links on page and rules in CSS file still need to be managed manually. As AMD CSS plugin abstracts this layer additional caution need to be done on separation of individual module rules and their integration into application.

Debug 
-----
Often the large 3rd party libraries are not subject for debugging and as such their **release** builds are used in main codebase even for **application's** debug profile. To enforce the debug version of whole codebase use ```debug=1``` URL parameter.

TODO
----
- CDN recovery fallback
