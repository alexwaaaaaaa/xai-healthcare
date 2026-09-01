'use client';
import { useEffect } from 'react';

import { SIGNALS, TESTIDS, predictStore } from '@/lib/reticle-dev';

/** Dev-only: connect Reticle + install the React adapter, after hydration. */
export function ReticleDev() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    void import('@reticlehq/react').then(({ reticle, install, registerCapabilities, registerStore }) => {
      install();
      // Both provided by withReticle() in next.config. The bridge rejects a connect with no token;
      // the root makes source paths repo-relative instead of absolute.
      const token = process.env.NEXT_PUBLIC_RETICLE_TOKEN;
      const root = process.env.NEXT_PUBLIC_RETICLE_ROOT;
      // withReticle() finds the daemon serving this project on every dev-server start. It wins over
      // any port written into this file at install time, so moving the daemon needs no edit here.
      const url = process.env.NEXT_PUBLIC_RETICLE_URL;
      // captureNetworkBodies is off by default. It is enabled here because the
      // one thing worth proving about this app is that the explanation on screen
      // came from the model's response — asserting on the DOM alone cannot
      // distinguish a real SHAP payload from a UI echoing its own input. Dev-only,
      // and these bodies carry public research data, no PII.
      reticle.connect({ projectId: 'web-dc8122da', captureNetworkBodies: true, ...(url ? { url } : {}), ...(token ? { token } : {}), ...(root ? { root } : {}) });

      // The predict flow is the app's one real flow. Its state lives in component
      // hooks, so `src/lib/reticle-dev.ts` mirrors it into a subscribable store —
      // passing the store (not a bare getter) wires `subscribe`, so every
      // transition emits a state diff instead of only answering pull reads.
      registerStore('predictFlow', predictStore);

      registerCapabilities({
        testids: [...TESTIDS],
        signals: [...SIGNALS],
        stores: ['predictFlow'],
        flows: [
          {
            name: 'explainable-prediction',
            steps: [
              'open /predict/{dataset}',
              'fill demographics, continue',
              'fill vitals, continue',
              'fill labs',
              'submit predict-submit',
              'await signal predict:explained',
              'read prediction-verdict, probability-gauge, top-factors, shap-waterfall, lime-panel',
            ],
          },
          {
            // The form's zod schema is generated from the same bounds the API
            // enforces, so an out-of-range value is stopped in the browser and
            // never reaches the server. The API's 422 is the backstop for direct
            // callers, not a state this flow can reach.
            name: 'out-of-range-blocked-client-side',
            steps: [
              'open /predict/{dataset}',
              'enter a value outside the trained range',
              'submit predict-submit',
              'await signal predict:blocked with zero POST /predict requests',
              'read prediction-error / the field-level range message',
            ],
          },
        ],
      });
    });
  }, []);
  return null;
}
