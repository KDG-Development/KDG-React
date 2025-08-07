import React, { ReactNode } from 'react';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { ActionButton } from '../Buttons/Buttons';

type ConfirmationDialogProps = {
  trigger: ReactNode;
  header: string;
  message: ReactNode;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  buttonClassName?: string;
  messageClassName?: string;
  disabled?: boolean;
}

/**
 * A reusable confirmation dialog component that wraps ConfirmModal to provide a standardized interface for confirmation actions.
 * @example
 * ```tsx
 * <ConfirmationDialog
 *   trigger={<button>Delete Item</button>}
 *   header="Confirm Deletion"
 *   message="Are you sure you want to delete this item?"
 *   onConfirm={() => handleDelete()}
 *   onCancel={() => handleCancel()}
 * />
 * ```
 */
export const ConfirmationDialog = ({
  trigger,
  header,
  message,
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
  onConfirm,
  onCancel,
  buttonClassName = "",
  messageClassName = "",
  disabled = false,
}: ConfirmationDialogProps) => (
  <ConfirmModal
    trigger={trigger}
    header={header}
    disabled={disabled}
    content={(cancel) => (
      <div>
        <span className={messageClassName}>{message}</span>
        <div className="d-flex justify-content-end gap-2">
          <ActionButton variant="ghost" onClick={() => {
            onCancel?.();
            cancel();
          }}>
            {cancelButtonText}
          </ActionButton>
          <ActionButton 
            className={buttonClassName} 
            onClick={() => {
              onConfirm();
              cancel();
            }}
            disabled={disabled}
          >
            {confirmButtonText}
          </ActionButton>
        </div>
      </div>
    )}
  />
);