/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-f0e3ab47'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "./index.html",
    "revision": "75d3d9a7d0d4fada632b2738ffa7761a"
  }, {
    "url": "bundle.min.js",
    "revision": "c3cac6118c5f1457ebe01bd91ce8f0a8"
  }, {
    "url": "img/Group 1.svg",
    "revision": "48dc57300a8c86eca111cb2df7b423e9"
  }, {
    "url": "img/Group 2.png",
    "revision": "215581153f09d0e0141af308e142cba6"
  }, {
    "url": "img/cloud.png",
    "revision": "98491cb4556832d78e073b887376985a"
  }, {
    "url": "img/drizzle.png",
    "revision": "9be442f468dede20702a041c1000b696"
  }, {
    "url": "img/fog.png",
    "revision": "5e7ef826418ac80e8f14273244eccd9e"
  }, {
    "url": "img/ice.png",
    "revision": "350c5acece916f1d7d9f17ac0ff4fbf1"
  }, {
    "url": "img/rain.png",
    "revision": "10ba7bdd5c96ff2a5c57d81c765a6c41"
  }, {
    "url": "img/sun.png",
    "revision": "a1854b5688e3a31cc2b0e818798cd109"
  }, {
    "url": "img/thunderstorm.png",
    "revision": "213f27786d73a2a47788567017fa9f60"
  }, {
    "url": "img/unknown.png",
    "revision": "830abcd021b873c25faee09c6cc44c79"
  }, {
    "url": "main.css",
    "revision": "dbd1174bbc84a555810b7edb19f493e4"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
