import React from "react";
import styled, { keyframes, css } from "styled-components";

function MarqueeFC() {
  return (
    <AppContainer>
      <Wrapper className="mt-3">
        <Marquee className="skew-y-3">
          <MarqueeGroup className="h-12 bg-alpha-yellow">
            <p className="text-3xl m-2 font-black text-beta-pink">
              FRESHLY BAKED CAKES
            </p>
            <p className="text-3xl m-2 font-black text-beta-pink">
              FRESHLY BAKED CAKES
            </p>
            <p className="text-3xl m-2 font-black text-beta-pink">
              FRESHLY BAKED CAKES
            </p>
          </MarqueeGroup>
          <MarqueeGroup className="h-12 bg-alpha-yellow">
            {" "}
            <p className="text-3xl m-2 font-black text-beta-pink">
              FRESHLY BAKED CAKES
            </p>
            <p className="text-3xl m-2 font-black text-beta-pink">
              FRESHLY BAKED CAKES
            </p>
            <p className="text-3xl m-2 font-black text-beta-pink">
              FRESHLY BAKED CAKES
            </p>
          </MarqueeGroup>
        </Marquee>
        <Marquee className="-skew-y-3 relative bottom-2">
          <MarqueeGroup2 className="h-12 bg-beta-pink mt-3">
            {" "}
            <p className="text-3xl m-2 font-black text-alpha-yellow">
              MAKE TO ORDER
            </p>
            <p className="text-3xl m-2 font-black text-alpha-yellow">
              MAKE TO ORDER
            </p>
            <p className="text-3xl m-2 font-black text-alpha-yellow">
              MAKE TO ORDER
            </p>
          </MarqueeGroup2>
          <MarqueeGroup2 className="h-12 bg-beta-pink mt-3">
            {" "}
            <p className="text-3xl m-2 font-black text-alpha-yellow">
              MAKE TO ORDER
            </p>
            <p className="text-3xl m-2 font-black text-alpha-yellow">
              MAKE TO ORDER
            </p>
            <p className="text-3xl m-2 font-black text-alpha-yellow">
              MAKE TO ORDER
            </p>
          </MarqueeGroup2>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
}

export default MarqueeFC;

const AppContainer = styled.div`
  width: 100vw;
  height: 10rem;
  color: #000000;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Marquee = styled.div`
  display: flex;
  width: 1200px;
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
`;
const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;
