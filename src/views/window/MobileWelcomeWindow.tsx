import React from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import Typist from "react-typist";
import useScreenSize, {
  MOBILE_MAX_WIDTH,
  TABLET_MAX_WIDTH,
} from "../../utils/useScreenSize";
import { useWindows } from "../../utils/context/context";
import { WindowProps } from "../BodyContent";
import { WindowPositionSetting, WindowSizeSetting } from "../../types";
import Loaded from "../../components/welcome/Loaded";
import Intro from "../../components/welcome/Intro";
import Contact from "../../components/welcome/Contact";

const Window = styled(Rnd)`
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 0px 8px black;
`;

const WindowTopbar = styled.div`
  width: 100%;
  height: 28px;
  background-color: rgb(51, 52, 54);
  border-top: 1px rgb(70, 75, 80) solid;

  padding: 0px 10px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  cursor: default;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  align-items: center;
  box-sizing: border-box;
`;

const TopbarBtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TopbarBtn = styled.div<{ color: string; disabled: boolean }>`
  width: 12px;
  height: 12px;
  color: #62574c;
  display: inline-block;
  margin-left: ${({ color }: { color: string }) =>
    color === "close" ? "0px" : "8px"};
  border-radius: 8px;
  align-items: center;
  vertical-align: middle;
  background-color: ${({
    color,
    disabled,
  }: {
    color: string;
    disabled: boolean;
  }) =>
    disabled
      ? "#686B6D"
      : color === "minimize"
      ? "#F7BD45"
      : color === "expand"
      ? "#5FCB43"
      : "#ee514a"};
  cursor: ${({ disabled }: { disabled: boolean }) =>
    disabled ? undefined : "pointer"};
`;

const TopbarTitleImage = styled.img`
  width: 16px;
  height: 16px;
`;

const TopbarTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
`;

const TopbarTitleText = styled.span`
  margin-left: 6px;
  pointer-events: none;
`;

const WindowBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: calc(100% - 28px);
  background-color: #282a36;
  color: #ffffff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const TerminalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 4px 8px;
`;

const TerminalBadge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const FirstBadge = styled.div`
  background-color: #000000;
  padding: 4px 10px;
  border: none;
`;

const BadgeArrow = styled.div<{ first?: boolean }>`
  background-color: ${({ first }) => (first ? "transparent" : "#caa9fa")};
  width: 0;
  height: 0;
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
  border-left: 13px solid #000000;
`;

const TerminalLine = styled.div`
  margin-left: 8px;
`;

const MobileWelcomeWindow: React.FC<WindowProps> = ({ handleFocus }) => {
  const { width, height } = useScreenSize();
  const { focusedWindow, closeWelcomeWindow } = useWindows();

  const welcomeRef = React.useRef<any>();

  const [windowPosition, setWindowPosition] =
    React.useState<WindowPositionSetting>({
      x: Math.round(Math.max((width - 700) / 2, 0)),
      y: 0,
    });
  const [windowSize, setWindowSize] = React.useState<WindowSizeSetting>({
    width: 700,
    height: 450,
  });

  const [firstLine, setFirstLine] = React.useState(false);
  const [secondLine, setSecondLine] = React.useState(false);
  const [secondContent, setSecondContent] = React.useState(false);
  const [thirdLine, setThirdLine] = React.useState(false);
  const [thirdContent, setThirdContent] = React.useState(false);

  React.useEffect(() => {
    if (width <= TABLET_MAX_WIDTH) {
      setWindowSize({
        width,
        height: height - 80 - 25,
      });
      setWindowPosition({
        x: 0,
        y: 0,
      });
    }
  }, [width, height]);

  return (
    <Window
      id="Welcome"
      ref={welcomeRef}
      size={{ width: windowSize.width, height: windowSize.height }}
      position={{ x: windowPosition.x, y: windowPosition.y }}
      dragHandleClassName="topbar"
      onDragStart={handleFocus}
      enableResizing={false}
    >
      <WindowTopbar className="topbar">
        <TopbarBtnContainer>
          <TopbarBtn
            color="close"
            title={focusedWindow === "Welcome" ? "Close" : undefined}
            onClick={closeWelcomeWindow}
            onTouchStart={closeWelcomeWindow}
            disabled={focusedWindow !== "Welcome"}
          />
          <TopbarBtn color="disabled" disabled={true} />
          <TopbarBtn color="disabled" disabled={true} />
        </TopbarBtnContainer>
        <TopbarTitle>
          <TopbarTitleImage
            src="https://img.icons8.com/office/40/000000/console.png"
            alt="Welcome"
          />
          <TopbarTitleText>Welcome</TopbarTitleText>
        </TopbarTitle>
      </WindowTopbar>
      <WindowBody>
        <Loaded setFirstLine={setFirstLine} />
        {firstLine ? (
          <TerminalRow>
            <TerminalBadge>
              <FirstBadge>~/</FirstBadge>
              <BadgeArrow first />
            </TerminalBadge>
            <TerminalLine>
              <Typist
                cursor={{
                  show: true,
                  blink: true,
                  element: "|",
                  hideWhenDone: true,
                  hideWhenDoneDelay: 100,
                }}
                onTypingDone={() => setSecondLine(true)}
              >
                cd portfolio
              </Typist>
            </TerminalLine>
          </TerminalRow>
        ) : null}
        {secondLine ? (
          <TerminalRow>
            <TerminalBadge>
              <FirstBadge>~/portfolio/</FirstBadge>
              <BadgeArrow first />
            </TerminalBadge>
            <TerminalLine>
              <Typist
                cursor={{
                  show: true,
                  blink: true,
                  element: "|",
                  hideWhenDone: true,
                  hideWhenDoneDelay: 100,
                }}
                onTypingDone={() => {
                  setSecondContent(true);
                  setThirdLine(true);
                }}
              >
                cat intro.md
              </Typist>
            </TerminalLine>
          </TerminalRow>
        ) : null}
        {secondContent ? <Intro /> : null}
        {thirdLine ? (
          <TerminalRow>
            <TerminalBadge>
              <FirstBadge>~/portfolio/</FirstBadge>
              <BadgeArrow first />
            </TerminalBadge>
            <TerminalLine>
              <Typist
                cursor={{
                  show: true,
                  blink: true,
                  element: "|",
                  hideWhenDone: true,
                  hideWhenDoneDelay: 100,
                }}
                onTypingDone={() => {
                  setThirdContent(true);
                  // window.localStorage.setItem("welcomeWindowRendered", "true");
                }}
              >
                cat contact.md
              </Typist>
            </TerminalLine>
          </TerminalRow>
        ) : null}
        {thirdContent ? <Contact /> : null}
      </WindowBody>
    </Window>
  );
};

export default MobileWelcomeWindow;