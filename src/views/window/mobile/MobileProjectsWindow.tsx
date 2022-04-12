import React from "react";
import { DraggableData, Position, ResizableDelta } from "react-rnd";
import { WindowProps } from "../../BodyContent";
import {
  MobileProjects,
  Projects,
  WebProjects,
} from "../../../components/Projects";
import WindowTopbar from "../../../components/WindowTopbar";
import {
  MobileBackButton,
  MobileBackButtonContainer,
  MobileBodyContent,
  MobilePanel,
  MobileNavbar,
  MobileNavbarMenu,
  MobileWindowBody,
  MobileNavbarItem,
  Window,
} from "../../../GlobalStyle";
import { WindowPositionSetting, WindowSizeSetting } from "../../../types";
import useScreenSize, { TABLET_MAX_WIDTH } from "../../../utils/useScreenSize";
import Foodie from "../../../components/projects/Foodie";
import Portfolio from "../../../components/projects/Portfolio";
import DatApex from "../../../components/projects/DatApex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export type IndexType =
  | "Projects"
  | "WebProjects"
  | "MobileProjects"
  | "DatApex"
  | "Foodie"
  | "Portfolio";

const MobileProjectsWindow: React.FC<WindowProps> = ({ handleFocus }) => {
  const { width, height } = useScreenSize();

  const projectsRef = React.useRef<any>();

  const [projectsSize, setProjectsSize] = React.useState<WindowSizeSetting>({
    width: 500,
    height: 300,
  });
  const [projectsPosition, setProjectsPosition] =
    React.useState<WindowPositionSetting>({
      x: 100,
      y: 100,
    });

  const [projectsPrevSetting, setProjectsPrevSetting] = React.useState<
    (WindowSizeSetting & WindowPositionSetting) | null
  >(null);
  const [index, setIndex] = React.useState<IndexType>("Projects");
  const [isMobileWindow, setIsMobileWindow] = React.useState(false);

  React.useEffect(() => {
    if (width < TABLET_MAX_WIDTH) {
      setProjectsSize({
        width,
        height: height - 80 - 25,
      });
      setProjectsPosition({
        x: 0,
        y: 0,
      });
      setIsMobileWindow(true);
    } else {
      setIsMobileWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const handleClick = (name: IndexType) => {
    setIndex(name);
  };

  return (
    <Window
      id="Projects"
      ref={projectsRef}
      size={{ width: projectsSize.width, height: projectsSize.height }}
      position={{ x: projectsPosition.x, y: projectsPosition.y }}
      dragHandleClassName="topbar"
      minWidth={isMobileWindow ? width : 525}
      minHeight={300}
      onDragStart={handleFocus}
      onDragStop={(_e: any, data: DraggableData) => {
        setProjectsPosition({ x: data.x, y: data.y });
      }}
      onResizeStop={(
        _e: MouseEvent | TouchEvent,
        _dir: any,
        ref: any,
        _delta: ResizableDelta,
        position: Position
      ) => {
        setProjectsSize({
          width: ref.style.width,
          height: ref.style.height,
        });
        setProjectsPosition({ x: position.x, y: position.y });
      }}
    >
      <WindowTopbar
        title="Projects"
        windowRef={projectsRef}
        size={projectsSize}
        setSize={setProjectsSize}
        position={projectsPosition}
        setPosition={setProjectsPosition}
        prevSetting={projectsPrevSetting}
        setPrevSetting={setProjectsPrevSetting}
        isMobileWindow={isMobileWindow}
      />
      <MobileWindowBody>
        <MobileNavbar>
          <MobileNavbarItem
            title="Projects"
            onClick={() => handleClick("Projects")}
            focus
          >
            <MobileNavbarMenu
              src="https://img.icons8.com/color/48/000000/mac-folder.png"
              alt="folder"
            />
          </MobileNavbarItem>
          <MobileNavbarItem
            title="Web"
            onClick={() => handleClick("WebProjects")}
            focus={
              index === "DatApex" ||
              index === "Portfolio" ||
              index === "WebProjects"
            }
            isChild
          >
            <MobileNavbarMenu
              src="https://img.icons8.com/color/48/000000/mac-folder.png"
              alt="folder"
            />
          </MobileNavbarItem>
          <MobileNavbarItem
            title="Mobile"
            onClick={() => handleClick("MobileProjects")}
            focus={index === "Foodie" || index === "MobileProjects"}
            isChild
          >
            <MobileNavbarMenu
              src="https://img.icons8.com/color/48/000000/mac-folder.png"
              alt="folder"
            />
          </MobileNavbarItem>
        </MobileNavbar>
        <MobileBodyContent>
          {index === "Projects" ? <Projects click={handleClick} /> : null}
          {index === "WebProjects" ? <WebProjects click={handleClick} /> : null}
          {index === "MobileProjects" ? (
            <MobileProjects click={handleClick} />
          ) : null}
          {index === "DatApex" ? (
            <MobilePanel>
              <MobileBackButtonContainer>
                <MobileBackButton onClick={() => handleClick("Projects")}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </MobileBackButton>
              </MobileBackButtonContainer>
              <DatApex />
            </MobilePanel>
          ) : null}
          {index === "Portfolio" ? (
            <MobilePanel>
              <MobileBackButtonContainer>
                <MobileBackButton onClick={() => handleClick("Projects")}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </MobileBackButton>
              </MobileBackButtonContainer>
              <Portfolio />
            </MobilePanel>
          ) : null}
          {index === "Foodie" ? (
            <MobilePanel>
              <MobileBackButtonContainer>
                <MobileBackButton onClick={() => handleClick("Projects")}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </MobileBackButton>
              </MobileBackButtonContainer>
              <Foodie />
            </MobilePanel>
          ) : null}
        </MobileBodyContent>
      </MobileWindowBody>
    </Window>
  );
};

export default MobileProjectsWindow;
