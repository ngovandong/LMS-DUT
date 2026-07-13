import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { SkeletonBlock } from "../../styles/shared";

const BannerCard = styled.section`
  margin: 0 auto 1.5rem;
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  background: var(--surface);
`;

const Hero = styled.div`
  position: relative;
  min-height: clamp(10rem, 32vw, 15rem);
  background: ${({ $background }) =>
    $background
      ? `linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.55) 100%), url(${$background})`
      : "linear-gradient(135deg, var(--brand-500) 0%, var(--brand-700) 55%, #0f4c5c 100%)"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1rem, 4vw, 1.75rem);
`;

const ClassName = styled.h1`
  font-size: clamp(1.35rem, 5vw, 2rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.15;
  text-shadow: 0 2px 12px rgba(15, 23, 42, 0.35);
  word-break: break-word;
`;

const Teacher = styled.p`
  margin-top: 0.45rem;
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(0.75rem, 2.5vw, 0.95rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const ToggleWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.75rem;
`;

const DetailToggle = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(6px);
  color: #fff;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.28);
  }
`;

const DetailPanel = styled.div`
  padding: 1.1rem clamp(1rem, 3vw, 1.5rem);
  background: var(--surface-soft);
  border-top: 1px solid var(--surface-border);
  display: grid;
  gap: 0.65rem;
`;

const DetailRow = styled.p`
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.5;
  word-break: break-word;

  strong {
    color: var(--text-primary);
    font-weight: 700;
  }
`;

const LoadingHero = styled.div`
  min-height: clamp(10rem, 32vw, 15rem);
  padding: clamp(1rem, 4vw, 1.75rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.65rem;
  background: linear-gradient(
    135deg,
    var(--brand-50) 0%,
    var(--surface-soft) 100%
  );
`;

export default function Banner({ data, id }) {
  const [showDetail, setShowDetail] = useState(false);
  const isLoading = !data?.name;

  if (isLoading) {
    return (
      <BannerCard aria-busy="true" aria-label="Loading class information">
        <LoadingHero>
          <SkeletonBlock $width="70%" $height="1.75rem" />
          <SkeletonBlock $width="45%" $height="0.9rem" />
        </LoadingHero>
      </BannerCard>
    );
  }

  return (
    <BannerCard aria-label={`${data.name} class banner`}>
      <Hero $background={data.background}>
        <ClassName>{data.name}</ClassName>
        <Teacher>{data.creatorName}</Teacher>
        <ToggleWrap>
          <DetailToggle
            type="button"
            $open={showDetail}
            onClick={() => setShowDetail((prev) => !prev)}
            aria-expanded={showDetail}
            aria-controls="class-detail-panel"
            aria-label={showDetail ? "Hide class details" : "Show class details"}
          >
            <IoIosArrowDown size={22} aria-hidden="true" />
          </DetailToggle>
        </ToggleWrap>
      </Hero>
      {showDetail && (
        <DetailPanel id="class-detail-panel" role="region" aria-label="Class details">
          <DetailRow>
            <strong>Credits:</strong> {data.credits}
          </DetailRow>
          <DetailRow>
            <strong>Join code:</strong> {id}
          </DetailRow>
        </DetailPanel>
      )}
    </BannerCard>
  );
}
