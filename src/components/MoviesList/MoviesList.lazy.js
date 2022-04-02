import React, { lazy, Suspense } from 'react';

const LazyMoviesList = lazy(() => import('./MoviesList'));

const MoviesList = props => (
  <Suspense fallback={null}>
    <LazyMoviesList {...props} />
  </Suspense>
);

export default MoviesList;
