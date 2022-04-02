import React, { lazy, Suspense } from 'react';

const LazyMovieDetails = lazy(() => import('./MovieDetails'));

const MovieDetails = props => (
  <Suspense fallback={null}>
    <LazyMovieDetails {...props} />
  </Suspense>
);

export default MovieDetails;
