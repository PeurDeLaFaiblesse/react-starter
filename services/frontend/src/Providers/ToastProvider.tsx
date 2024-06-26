import { Alert, AlertProps, Box, Button, Portal, styled, Typography } from '@mui/material';
import { createContext, FC, PropsWithChildren, useCallback, useState } from 'react';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}

export const getErrorMessage = (err: ReturnType<typeof Error>): string => {
  return (
    (err as AxiosError<ErrorResponse> | undefined)?.response?.data.message ??
    (err as AxiosError | undefined)?.message ??
    (err as Error | undefined)?.message ??
    'Ошибка'
  );
};

const StyledAlert = styled(Alert)`
  padding: 5px 10px;
  font-weight: 500;
  border-radius: 5px;
  .MuiAlert-icon {
    min-width: 22px;
  }
  .MuiAlert-action {
    margin-right: 0;
    display: flex;
    padding: 0;
    flex-grow: 1;
    align-items: center;
    .MuiButtonBase-root {
      min-width: 30px;
    }
  }
  .MuiAlert-message {
    margin-right: 12px;
    overflow: hidden;
    flex-grow: 1;
  }
  &.MuiAlert-filledInfo {
    background-color: ${(props) => props.theme.palette.primary.main};
  }
  &.MuiAlert-outlinedInfo {
    border-color: ${(props) => props.theme.palette.primary.main};
    .MuiAlert-icon {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
  &.MuiAlert-outlinedWarning {
    border-color: ${(props) => props.theme.palette.warning.main};
    .MuiAlert-icon {
      color: ${(props) => props.theme.palette.warning.main};
    }
  }
  &.MuiAlert-outlinedError {
    border-color: ${(props) => props.theme.palette.error.main};
    .MuiAlert-icon {
      color: ${(props) => props.theme.palette.error.main};
    }
  }
  &.MuiAlert-outlinedSuccess {
    border-color: ${(props) => props.theme.palette.success.main};
    .MuiAlert-icon {
      color: ${(props) => props.theme.palette.success.main};
    }
  }
  &.MuiAlert-standardWarning {
    background-color: ${(props) => props.theme.palette.background.paper};
    color: ${(props) => props.theme.palette.warning.dark};
    .MuiAlert-icon {
      color: ${(props) => props.theme.palette.warning.dark};
    }
  }
  &.MuiAlert-standardError {
    background-color: ${(props) => props.theme.palette.background.paper};
    color: ${(props) => props.theme.palette.error.dark};
    .MuiAlert-icon {
      color: ${(props) => props.theme.palette.error.dark};
    }
  }
  &.MuiAlert-standardInfo {
    background-color: ${(props) => props.theme.palette.background.paper};
    color: ${(props) => props.theme.palette.info.dark};
    .MuiAlert-icon {
      color: ${(props) => props.theme.palette.info.dark};
    }
  }
  &.MuiAlert-standardSuccess {
    background-color: ${(props) => props.theme.palette.background.paper};
    color: ${(props) => props.theme.palette.success.dark};
    .MuiAlert-icon {
      color: ${(props) => props.theme.palette.success.dark};
    }
  }
` as typeof Alert;

interface ButtonProps {
  buttonText: string;
  onClose?: () => void;
}
export interface ToastProps {
  title?: string;
  text: string;
  button?: ButtonProps | false;
  variant?: AlertProps['variant'];
  type: AlertProps['severity'];
  closeDelay?: number;
}

export interface Toast extends ToastProps {
  id: string;
}

interface ToastsCalls {
  addToast: (toast: ToastProps) => void;
  errorToast: (text: unknown, title?: string, variant?: AlertProps['variant'], button?: ButtonProps | false) => void;
  successToast: (text: string, title?: string, variant?: AlertProps['variant'], button?: ButtonProps | false) => void;
  warningToast: (text: string, title?: string, variant?: AlertProps['variant'], button?: ButtonProps | false) => void;
  infoToast: (text: string, title?: string, variant?: AlertProps['variant'], button?: ButtonProps | false) => void;
}

const TOAST_MAX_WIDTH = 600;
const TOAST_AUTOCLOSE_DELAY = 5000;

export const ToastContext = createContext<ToastsCalls>({
  addToast: () => null,
  errorToast: () => null,
  successToast: () => null,
  warningToast: () => null,
  infoToast: () => null,
});

let toastId = 0;
const ToastProvider: FC = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const handleClose = useCallback((toastId: string) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== toastId));
  }, []);

  const addToast = useCallback(
    (toast: ToastProps) => {
      const tid = `${toastId++}-${Date.now()}`;
      setToasts((prevState) => [...prevState, { ...toast, id: tid }]);
      setTimeout(() => handleClose(tid), toast.closeDelay ?? TOAST_AUTOCLOSE_DELAY);
    },
    [handleClose],
  );

  const errorToast = useCallback(
    (text: Error, title?: string, variant?: AlertProps['variant'], button?: ButtonProps | false) => {
      addToast({ text: getErrorMessage(text), title, variant: 'filled', button, type: 'error' });
    },
    [addToast],
  );

  const successToast = useCallback(
    (text: string, title?: string, variant?: AlertProps['variant'], button?: ButtonProps | false) => {
      addToast({ text, title, variant: 'filled', button, type: 'success' });
    },
    [addToast],
  );

  const warningToast = useCallback(
    (text: string, title?: string, variant?: AlertProps['variant'], button?: ButtonProps | false) => {
      addToast({ text, title, variant: 'filled', button, type: 'warning' });
    },
    [addToast],
  );

  const infoToast = useCallback(
    (text: string, title?: string, variant?: AlertProps['variant'], button?: ButtonProps | false) => {
      addToast({ text, title, variant: 'filled', button, type: 'info' });
    },
    [addToast],
  );

  return (
    <ToastContext.Provider value={{ addToast, errorToast, successToast, infoToast, warningToast }}>
      {children}
      <Portal>
        <Box
          position="fixed"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          maxWidth={TOAST_MAX_WIDTH}
          mb={2}
          mr={2}
          gap={1}
          sx={{ right: 0, bottom: 10 }}
          zIndex={(theme) => theme.zIndex.snackbar}
        >
          {toasts.map((toast: Toast) => (
            <Box key={toast.id}>
              <StyledAlert
                severity={toast.type}
                variant={toast.variant ?? 'standard'}
                onClose={() => handleClose(toast.id)}
                action={
                  toast.button && (
                    // @ts-ignore
                    <Button
                      onClick={() => {
                        handleClose(toast.id);
                        (toast.button as ButtonProps).onClose?.();
                      }}
                      color="inherit"
                      textButton
                      sx={{
                        marginLeft: (theme) => theme.spacing(5.25),
                        textTransform: 'uppercase',
                      }}
                    >
                      {toast.button.buttonText}
                    </Button>
                  )
                }
              >
                {toast.title && (
                  <Typography fontWeight={500} marginBottom={0.5}>
                    {toast.title}
                  </Typography>
                )}
                {toast.text}
              </StyledAlert>
            </Box>
          ))}
        </Box>
      </Portal>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
