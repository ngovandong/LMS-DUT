import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const RoomPage = styled.main`
  width: 100%;
  max-width: min(var(--content-max), 100%);
  margin: 0 auto;
  padding: clamp(12px, 3vw, 28px);
  min-width: 0;
`;

export const PageSection = styled.section`
  margin-bottom: 1.75rem;
  min-width: 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 0.85rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid var(--brand-100);
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  font-weight: 700;
  color: var(--brand-700);
  letter-spacing: -0.02em;
`;

export const Card = styled.article`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  min-width: 0;
`;

export const ListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  min-width: 0;
  border-bottom: 1px solid var(--surface-border);
  border-radius: var(--radius-sm);
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  transition: background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;

  &:last-child {
    border-bottom: none;
  }

  ${({ $clickable }) =>
    $clickable &&
    `
    &:hover {
      background: var(--brand-50);
      box-shadow: var(--shadow-sm);
    }

    &:active {
      transform: scale(0.995);
    }
  `}
`;

export const RowMain = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex: 1;
`;

export const RowMeta = styled.span`
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-muted);
  white-space: nowrap;
`;

export const RowTitle = styled.span`
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const IconCircle = styled.div`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $muted }) =>
    $muted
      ? "linear-gradient(135deg, var(--text-muted), #94a3b8)"
      : "linear-gradient(135deg, var(--brand-500), var(--brand-600))"};
  box-shadow: ${({ $muted }) =>
    $muted ? "none" : "0 6px 16px rgba(8, 145, 178, 0.25)"};
`;

export const CreateButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 2.75rem;
  padding: 0 1.25rem;
  margin-bottom: 1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--brand-500), var(--brand-600));
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: var(--shadow-brand);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 36px rgba(8, 145, 178, 0.28);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const IconActionButton = styled.button`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${({ $danger }) => ($danger ? "var(--danger)" : "var(--brand-600)")};
  transition: background 0.18s ease;

  &:hover {
    background: ${({ $danger }) =>
      $danger ? "rgba(220, 38, 38, 0.08)" : "var(--brand-50)"};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: clamp(1.5rem, 5vw, 2.5rem) 1rem;
  text-align: center;
  border: 1px dashed var(--surface-border);
  border-radius: var(--radius-md);
  background: linear-gradient(
    160deg,
    rgba(236, 254, 255, 0.65),
    rgba(255, 255, 255, 0.9)
  );
`;

export const EmptyIcon = styled.div`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--brand-50);
  color: var(--brand-600);
  font-size: 1.5rem;
`;

export const EmptyTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: var(--brand-700);
`;

export const EmptyText = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  max-width: 22rem;
  line-height: 1.5;
`;

export const SkeletonBlock = styled.div`
  border-radius: ${({ $round }) => ($round ? "50%" : "var(--radius-sm)")};
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "1rem"};
  background: linear-gradient(
    90deg,
    var(--surface-border) 25%,
    var(--surface-soft) 50%,
    var(--surface-border) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.65rem 1.1rem;
  border-radius: 999px;
  border: 1.5px solid var(--brand-500);
  color: var(--brand-700);
  font-weight: 700;
  font-size: 0.88rem;
  background: var(--brand-50);
  transition: background 0.18s ease, transform 0.18s ease;

  &:hover {
    background: var(--brand-100);
    transform: translateY(-1px);
  }
`;
