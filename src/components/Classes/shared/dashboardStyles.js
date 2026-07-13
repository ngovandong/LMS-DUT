import styled from "styled-components";

export const DashboardPage = styled.main`
  width: min(100%, var(--content-max));
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem) clamp(0.75rem, 3vw, 1.5rem)
    clamp(2rem, 5vw, 3rem);
`;

export const DashboardHeader = styled.header`
  margin-bottom: clamp(1.25rem, 4vw, 2rem);
`;

export const DashboardTitle = styled.h1`
  font-size: clamp(1.5rem, 4.5vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  line-height: 1.15;
`;

export const DashboardSubtitle = styled.p`
  margin-top: 0.4rem;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  color: var(--text-muted);
  max-width: 36rem;
  line-height: 1.55;
`;

export const ClassCount = styled.span`
  display: inline-flex;
  align-items: center;
  margin-top: 0.75rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: var(--brand-50);
  color: var(--brand-700);
  font-size: 0.8125rem;
  font-weight: 600;
`;
