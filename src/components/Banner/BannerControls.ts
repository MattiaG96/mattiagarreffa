import { useState } from 'react';

export const BannerControls = () => {
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);
  const [bannerMessage, setBannerMessage] = useState<string>('');

  const showBanner = (message: string) => {
    setBannerMessage(message);
    setIsBannerVisible(true);
  };
  const hideBanner = () => setIsBannerVisible(false);
  return { isBannerVisible, bannerMessage, showBanner, hideBanner };
};
