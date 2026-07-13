let stylesInjected = false;

export const MODAL_CSS = `
  .lms-modal {
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    background: var(--surface);
  }

  .lms-modal .modal-header {
    border-bottom: 1px solid var(--surface-border);
    background: linear-gradient(135deg, var(--brand-50) 0%, var(--surface) 100%);
    padding: 1.1rem 1.35rem;
  }

  .lms-modal .modal-title {
    color: var(--text-primary);
    font-weight: 700;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
  }

  .lms-modal .modal-body {
    padding: 1.35rem;
    color: var(--text-secondary);
  }

  .lms-modal .modal-footer {
    border-top: 1px solid var(--surface-border);
    background: var(--surface-soft);
    padding: 0.9rem 1.35rem;
    gap: 0.5rem;
  }

  .lms-modal .btn-close:focus {
    box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.35);
  }

  .lms-modal .form-label {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }

  .lms-modal .form-control {
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-sm);
    padding: 0.65rem 0.85rem;
    color: var(--text-primary);
    background: var(--surface);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .lms-modal .form-control:focus {
    border-color: var(--brand-500);
    box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.18);
  }

  .lms-modal .alert {
    border-radius: var(--radius-sm);
    border: none;
    font-size: 0.9rem;
  }

  .lms-modal .btn-secondary {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
    font-weight: 600;
    padding: 0.5rem 1rem;
  }

  .lms-modal .btn-secondary:hover {
    background: var(--surface-soft);
    border-color: var(--surface-border);
    color: var(--text-primary);
  }

  .lms-modal .btn-primary {
    background: var(--brand-600);
    border: none;
    border-radius: var(--radius-sm);
    font-weight: 600;
    padding: 0.5rem 1.1rem;
    box-shadow: var(--shadow-brand);
  }

  .lms-modal .btn-primary:hover {
    background: var(--brand-700);
  }

  .lms-modal .btn-danger {
    background: var(--danger);
    border: none;
    border-radius: var(--radius-sm);
    font-weight: 600;
    padding: 0.5rem 1.1rem;
  }
`;

export function ensureModalStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.id = "lms-modal-theme";
  style.textContent = MODAL_CSS;
  document.head.appendChild(style);
  stylesInjected = true;
}

export const APP_BAR_SX = {
  position: "relative",
  background: "var(--brand-600)",
  boxShadow: "var(--shadow-sm)",
};

export const MAIN_GRID_SX = {
  height: { xs: "auto", md: "calc(100vh - var(--header-height))" },
  minHeight: { xs: "auto", md: "calc(100vh - var(--header-height))" },
};

export const MAIN_CONTENT_SX = {
  height: "100%",
  padding: { xs: 2, sm: 2.5, md: 3 },
};

export const SIDE_PANEL_SX = {
  borderLeft: { xs: "none", md: "1px solid var(--surface-border)" },
  borderTop: { xs: "1px solid var(--surface-border)", md: "none" },
  padding: { xs: 2, sm: 2.5, md: 3 },
  height: { xs: "auto", md: "calc(100vh - var(--header-height))" },
  background: { xs: "var(--surface-soft)", md: "transparent" },
};

export const WORK_CARD_SX = {
  boxShadow: "var(--shadow-md)",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--surface-border)",
  padding: { xs: 2, sm: 2.5 },
  marginTop: { xs: 0, md: 2 },
  background: "var(--surface)",
};

export const LIST_ITEM_SX = {
  borderBottom: "1px solid var(--surface-border)",
  borderRadius: "var(--radius-sm)",
  mb: 0.5,
};

export const FILE_LINK_SX = {
  textDecoration: "none",
  color: "var(--text-primary)",
  display: "block",
  "&:hover": {
    backgroundColor: "var(--brand-50)",
  },
};

export const STATUS_CHIP_SX = {
  color: "var(--brand-600)",
  fontWeight: 600,
  fontSize: "0.875rem",
};

export const MUI_DIALOG_PAPER_SX = {
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--surface-border)",
  boxShadow: "var(--shadow-md)",
  overflow: "hidden",
};

export const bootstrapModalProps = {
  centered: true,
  dialogClassName: "lms-modal-dialog",
  contentClassName: "lms-modal",
  className: "lms-modal-root",
};
