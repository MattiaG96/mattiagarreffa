import { FC } from 'react';

interface BannerProps {
  message: string;
  onClose: () => void;
}

export const Banner: FC<BannerProps> = ({ message, onClose }) => {
  return (
    <div className="banner-root">
      <div>
        <h3 style={{ textAlign: 'center' }}>{message}</h3>
        <button type="button" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
};
