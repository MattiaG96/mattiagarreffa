import { useState } from 'react';

export const LoaderControls = () => {
  const [isLoaderVisible, setLoaderVisible] = useState<boolean>(false);

  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);

  return {
    isLoaderVisible,
    showLoader,
    hideLoader,
  };
};
