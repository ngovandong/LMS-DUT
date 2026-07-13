import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    :root {
      --brand-50: #ecfeff;
      --brand-100: #cffafe;
      --brand-500: #0891b2;
      --brand-600: #0e7490;
      --brand-700: #155e75;
      --accent-coral: #fb7185;
      --accent-sun: #fbbf24;
      --surface: #ffffff;
      --surface-soft: #f8fafc;
      --surface-border: #e2e8f0;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --danger: #dc2626;
      --header-height: 72px;
      --content-max: 1180px;
      --radius-sm: 10px;
      --radius-md: 16px;
      --radius-lg: 24px;
      --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
      --shadow-md: 0 10px 30px rgba(15, 23, 42, 0.09);
      --shadow-brand: 0 14px 32px rgba(8, 145, 178, 0.22);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
      min-width: 320px;
      background: var(--surface-soft);
    }

    body {
      padding-top: var(--header-height);
      min-width: 320px;
      min-height: 100vh;
      overflow-x: hidden;
      color: var(--text-primary);
      background:
        radial-gradient(circle at 8% 4%, rgba(103, 232, 249, 0.15), transparent 24rem),
        radial-gradient(circle at 92% 16%, rgba(251, 191, 36, 0.09), transparent 20rem),
        var(--surface-soft);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    ul {
      list-style: none;
      text-decoration: none;
    }

    button, input, textarea, select {
      font: inherit;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
    }

    button:focus-visible,
    a:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible,
    [tabindex]:focus-visible {
      outline: 3px solid rgba(8, 145, 178, 0.35);
      outline-offset: 3px;
    }

    ::selection {
      color: var(--text-primary);
      background: var(--brand-100);
    }

    @media (max-width: 767px) {
      :root {
        --header-height: 64px;
      }

      body {
        padding-bottom: env(safe-area-inset-bottom);
      }
    }
`;

