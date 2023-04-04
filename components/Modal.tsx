"use client";

import { type ReactNode, type MouseEventHandler } from "react";

import { Button, IconButton, Modal as MuiModal, Typography, Box, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { CloseOutlined } from "@mui/icons-material";
import { m } from "framer-motion";

interface IModalProps {
  open: boolean;
  keepMounted?: boolean;
  variant?: "small" | "middle" | "large";
  onClose: MouseEventHandler | undefined;
  requestButtonText?: string;
  onRequest?: MouseEventHandler | undefined;
  requesting?: boolean;
  onCancel?: MouseEventHandler | undefined;
  cancelButtonText?: string;
  title?: string | ReactNode;
  modalContent?: ReactNode;
  modalHeader?: ReactNode;
  modalFooter?: ReactNode;
  requestErrorText?: string | ReactNode;
  children?: ReactNode | undefined;
}

const Modal = ({
  open,
  keepMounted = true,
  variant = "small",
  onClose,
  requestButtonText,
  onRequest,
  requesting,
  onCancel,
  cancelButtonText,
  title,
  modalContent,
  modalHeader,
  modalFooter,
  requestErrorText,
  children,
}: IModalProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      keepMounted={keepMounted}
    >
      <Box
        sx={{
          width:
            variant === 'large'
              ? { md: '800px', sm: '600px', xs: '100%' }
              : variant === 'middle'
                ? { sm: '600px', xs: '100%' }
                : { sm: '400px', xs: '100%' },
          maxHeight: { sm: '650px', xs: '90%' },
          overflowY: 'scroll',
        }}
        animate={{
          top: open ? '50%' : '60%',
          opacity: open ? 1 : 0,
        }}
        initial={{ top: '60%' }}
        component={m.div}
        className="modal-wrapper"
        transition={{ type: 'spring' }}
      >
        {modalContent
          ? modalContent : (
            <>
              {modalHeader
                ? modalHeader : (
                  <Stack
                    sx={{ mb: 3 }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="h6"
                      fontWeight="medium"
                    >
                      {title}
                    </Typography>

                    <IconButton
                      sx={{
                        color: 'white',
                        opacity: 0.6,
                        transition: 'all .3s ease-in-out',

                        ':hover': {
                          opacity: 1
                        }
                      }}
                      onClick={onClose}
                    >
                      <CloseOutlined />
                    </IconButton>
                  </Stack>
                )}
              {children}
              {modalFooter
                ? modalFooter : (
                  <Stack
                    sx={{ mt: 3 }}
                    spacing={1}
                  >
                    <Stack
                      spacing={2}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-around"
                    >
                      <LoadingButton
                        variant="contained"
                        onClick={onRequest}
                        loading={requesting}
                        fullWidth
                      >
                        {requestButtonText || "Ok"}
                      </LoadingButton>
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={onCancel}
                        disabled={requesting}
                        fullWidth
                      >
                        {cancelButtonText || "Cancel"}
                      </Button>
                    </Stack>

                    {requestErrorText && (
                      <Typography
                        color="red"
                        variant="body2"
                        fontWeight="medium"
                      >
                        {requestErrorText}
                      </Typography>
                    )}
                  </Stack>
                )}
            </>
          )}
      </Box>
    </MuiModal>
  );
};

export default Modal;
