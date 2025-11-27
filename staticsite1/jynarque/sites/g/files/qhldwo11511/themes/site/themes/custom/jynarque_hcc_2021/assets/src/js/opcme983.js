/**
 * @file
 * Otsuka Privacy Compliant Media utilities.
 *
 * Added here rather than global.js due to async function causing issues
 * with babel and old Node version (v14).
 *
 * @see https://github.com/babel/babel/issues/8829
 */
(function (Drupal, OtsukaPCM) {

  'use strict';

  Drupal.behaviors.cmpInitScript = {
    attach: (context) => {
      once("cmpInitScript", "script", context).forEach(async (script) => {
        try {
          await OtsukaPCM.initScript(script);
        } catch (e) {
          console.error(`global.js initScript: caught error: ${e}`);
        }
      });
    },
  };

})(Drupal, OtsukaPCM);
