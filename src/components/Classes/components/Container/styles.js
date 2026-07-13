import styled from "styled-components";

export const ContainerStyle = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 17.5rem), 1fr));
  gap: clamp(1rem, 3vw, 1.5rem);
  align-items: start;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(2rem, 8vw, 4rem) clamp(1rem, 4vw, 2rem);
  border: 1.5px dashed var(--surface-border);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at 20% 20%, rgba(8, 145, 178, 0.08), transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(251, 191, 36, 0.1), transparent 40%),
    var(--surface);
`;

export const EmptyIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 1.25rem;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--brand-50), #fff7ed);
  color: var(--brand-600);
  font-size: 1.75rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-sm);
`;

export const EmptyTitle = styled.h2`
  font-size: clamp(1.125rem, 3.5vw, 1.375rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

export const EmptyDescription = styled.p`
  font-size: 0.9375rem;
  color: var(--text-muted);
  max-width: 22rem;
  line-height: 1.55;
  margin-bottom: 1.5rem;
`;

export const EmptyActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  width: 100%;
  max-width: 20rem;
`;

const actionButtonBase = `
  flex: 1 1 8.5rem;
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 0.9rem;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(8, 145, 178, 0.35);
    outline-offset: 3px;
  }
`;

export const CreateButton = styled.button`
  ${actionButtonBase}
  color: var(--brand-700);
  background: var(--brand-50);
  border: 1.5px solid var(--brand-100);

  &:hover {
    background: var(--brand-100);
    box-shadow: var(--shadow-sm);
  }
`;

export const JoinButton = styled.button`
  ${actionButtonBase}
  color: #fff;
  background: var(--brand-500);
  border: 1.5px solid var(--brand-500);
  box-shadow: var(--shadow-brand);

  &:hover {
    background: var(--brand-600);
    border-color: var(--brand-600);
  }
`;
