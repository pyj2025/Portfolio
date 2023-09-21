import React from "react";
import styled from "styled-components";
import { DraggableData } from "react-rnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faLocationArrow,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
// import img from "../../../image/Logo.png";
import img from "../../../image/profile.jpg";
import {
  TopbarBtn,
  TopbarBtnContainer,
  TopbarTitle,
  TwoColumnsGrid,
  Window,
  WindowTopbarContainer,
} from "../../../GlobalStyle";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import useScreenSize from "../../../utils/useScreenSize";
import { useWindows } from "../../../utils/context/context";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const WindowBody = styled.div`
  display: grid;
  grid-template-rows: 9fr 1fr;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 28px);
  color: black;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoListItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoListItemLabel = styled.div`
  margin-left: 8px;
`;

const CopyrightContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

type TopbarAboutWindowProps = {
  handleFocus: (_e: any, data: DraggableData) => void;
};

const TopbarAboutWindow: React.FC<TopbarAboutWindowProps> = ({
  handleFocus,
}) => {
  const { width, height } = useScreenSize();
  const { focusedWindow, toggleDesktopAboutOpen } = useWindows();

  const desktopAboutRef = React.useRef<any>();

  const handleDesktopAboutClose = () => {
    if (focusedWindow === "DesktopAbout") toggleDesktopAboutOpen();
  };

  return (
    <Window
      id="DesktopAbout"
      ref={desktopAboutRef}
      default={{
        x: width / 3,
        y: height / 5,
        width: 500,
        height: 300,
      }}
      dragHandleClassName="topbar"
      onDragStart={handleFocus}
      enableResizing={false}
    >
      <WindowTopbarContainer className="topbar">
        <TopbarBtnContainer>
          <TopbarBtn
            color="close"
            title={focusedWindow === "DesktopAbout" ? "Close" : undefined}
            onClick={handleDesktopAboutClose}
            disabled={focusedWindow !== "DesktopAbout"}
          />
          <TopbarBtn color="disabled" disabled={true} />
          <TopbarBtn color="disabled" disabled={true} />
        </TopbarBtnContainer>
        <TopbarTitle />
      </WindowTopbarContainer>
      <WindowBody>
        <TwoColumnsGrid>
          <LogoContainer>
            <img src={img} width="200" height="200" alt="Logo" />
          </LogoContainer>
          <div>
            <h1>Youngjoon Park</h1>
            <h4>Junior Frontend Developer</h4>
            <InfoList>
              <InfoListItem>
                <FontAwesomeIcon icon={faBirthdayCake as IconProp} />
                <InfoListItemLabel>Jan 17th, 1994</InfoListItemLabel>
              </InfoListItem>
              <InfoListItem>
                <FontAwesomeIcon icon={faPhone as IconProp} />
                <InfoListItemLabel>+1 778-847-4625</InfoListItemLabel>
              </InfoListItem>
              <InfoListItem>
                <FontAwesomeIcon icon={faLocationArrow as IconProp} />
                <InfoListItemLabel>
                  514-384 E 1st Ave, Vancouver, BC, V5T 0G5
                </InfoListItemLabel>
              </InfoListItem>
            </InfoList>
          </div>
        </TwoColumnsGrid>
        <CopyrightContainer>
          <InfoListItem>
            <FontAwesomeIcon icon={faCopyright as IconProp} />
            <InfoListItemLabel>Youngjoon Park</InfoListItemLabel>
          </InfoListItem>
        </CopyrightContainer>
      </WindowBody>
    </Window>
  );
};

export default TopbarAboutWindow;
