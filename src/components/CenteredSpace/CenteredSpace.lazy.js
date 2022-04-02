import React, { lazy, Suspense } from 'react';

const LazyCenteredSpace = lazy(() => import('./CenteredSpace'));

const CenteredSpace = props => (
  <Suspense fallback={null}>
    <LazyCenteredSpace {...props} />
  </Suspense>
);

export default CenteredSpace;
