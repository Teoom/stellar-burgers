import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Params } from 'react-router-dom';
const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const modalOnClose = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate('/feed');
    }
  };
  const params = useParams();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (typeof onClose === 'function') {
          onClose();
        } else {
          modalOnClose();
        }
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const getParamTitle = (
    params: Readonly<Params>,
    nameOfParam: string
  ): string => params[nameOfParam]!;

  return ReactDOM.createPortal(
    <ModalUI
      title={
        typeof title !== 'function' ? title : getParamTitle(params, title())
      }
      onClose={onClose || modalOnClose}
    >
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
