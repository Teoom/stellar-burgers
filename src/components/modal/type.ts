import { ReactNode } from 'react';

export type TModalProps = {
  title: string | (() => string);
  onClose?: () => void;
  children?: ReactNode;
};
