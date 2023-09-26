import React from "react";
import { DraggableData, Position, ResizableDelta } from "react-rnd";
import About from "../../../components/about/About";
import Education from "../../../components/about/Education";
import Experience from "../../../components/about/Experience";
import WindowTopbar from "../../../components/WindowTopbar";
import { WindowPositionSetting, WindowSizeSetting } from "../../../types";
import useScreenSize, { TABLET_MAX_WIDTH } from "../../../utils/useScreenSize";
import { WindowProps } from "../../../components/BodyContent";

import {
  MobileBackButton,
  MobileBackButtonContainer,
  MobileBodyContent,
  MobilePanel,
  MobileMenuItemLabel,
  MobileNavbar,
  MobileNavbarMenu,
  MobileWindowBody,
  MobileWindowMenuItem,
  MobileNavbarItem,
  Window,
  MobileNavbarMenuLabel,
} from "../../../GlobalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useWindows } from "../../../utils/context/context";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type MobileIndexType = "Menu" | "About" | "Experience" | "Education";

type MobileAboutWindowMenuProps = {
  onClick: (index: MobileIndexType) => void;
};

const MobileAboutWindowMenu: React.FC<MobileAboutWindowMenuProps> = ({
  onClick,
}) => {
  return (
    <>
      <MobileWindowMenuItem onClick={() => onClick("About")}>
        <img src="https://img.icons8.com/color/48/000000/file.png" alt="file" />
        <MobileMenuItemLabel>About</MobileMenuItemLabel>
      </MobileWindowMenuItem>
      <MobileWindowMenuItem onClick={() => onClick("Experience")} isEven>
        <img
          src="https://img.icons8.com/color/48/000000/mac-folder.png"
          alt="folder"
        />
        <MobileMenuItemLabel>Experience</MobileMenuItemLabel>
      </MobileWindowMenuItem>
      <MobileWindowMenuItem onClick={() => onClick("Education")}>
        <img src="https://img.icons8.com/color/48/000000/file.png" alt="file" />
        <MobileMenuItemLabel>Education</MobileMenuItemLabel>
      </MobileWindowMenuItem>
    </>
  );
};

const MobileAboutWindow: React.FC<WindowProps> = ({ handleFocus }) => {
  const { width, height } = useScreenSize();
  const { focusedWindow } = useWindows();

  const aboutRef = React.useRef<any>();

  const [aboutSize, setAboutSize] = React.useState<WindowSizeSetting>({
    width: 500,
    height: 300,
  });
  const [aboutPosition, setAboutPosition] =
    React.useState<WindowPositionSetting>({
      x: 20,
      y: 20,
    });

  const [aboutPrevSetting, setAboutPrevSetting] = React.useState<
    (WindowSizeSetting & WindowPositionSetting) | null
  >(null);

  const [index, setIndex] = React.useState<MobileIndexType>("Menu");
  const [isMobileWindow, setIsMobileWindow] = React.useState<boolean>(false);
  const [showDate, setShowDate] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (width < TABLET_MAX_WIDTH) {
      setAboutSize({
        width,
        height: height - 80 - 25,
      });
      setAboutPosition({
        x: 0,
        y: 0,
      });
      setIsMobileWindow(true);
    } else {
      setIsMobileWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  React.useEffect(() => {
    // 150 is menu
    if (aboutSize.width - 150 >= 470) {
      setShowDate(true);
    } else {
      setShowDate(false);
    }
  }, [aboutSize.width, showDate]);

  const handleClick = (name: MobileIndexType) => {
    setIndex(name);
  };

  return (
    <Window
      id="About"
      ref={aboutRef}
      size={{ width: aboutSize.width, height: aboutSize.height }}
      position={{ x: aboutPosition.x, y: aboutPosition.y }}
      dragHandleClassName="topbar"
      minWidth={isMobileWindow ? width : 500}
      minHeight={300}
      style={{ zIndex: focusedWindow === "About" ? 10 : undefined }}
      onDragStart={handleFocus}
      onDragStop={(_e: any, data: DraggableData) => {
        setAboutPosition({ x: data.x, y: data.y });
      }}
      onResizeStop={(
        _e: MouseEvent | TouchEvent,
        _dir: any,
        ref: any,
        _delta: ResizableDelta,
        position: Position
      ) => {
        const newWidth = Number(
          ref.style.width.substring(0, ref.style.width.indexOf("p"))
        );
        const newHeight = Number(
          ref.style.height.substring(0, ref.style.height.indexOf("p"))
        );
        setAboutSize({
          width: newWidth,
          height: newHeight,
        });
        setAboutPosition({ x: position.x, y: position.y });
      }}
    >
      <WindowTopbar
        title="About"
        windowRef={aboutRef}
        size={aboutSize}
        setSize={setAboutSize}
        position={aboutPosition}
        setPosition={setAboutPosition}
        prevSetting={aboutPrevSetting}
        setPrevSetting={setAboutPrevSetting}
        isMobileWindow={isMobileWindow}
      />
      <MobileWindowBody>
        <MobileNavbar>
          <MobileNavbarItem
            title="About"
            onClick={() => handleClick("About")}
            focus={index === "About"}
          >
            <MobileNavbarMenu
              src="https://img.icons8.com/color/48/000000/file.png"
              alt="file"
            />
            <MobileNavbarMenuLabel>About</MobileNavbarMenuLabel>
          </MobileNavbarItem>
          <MobileNavbarItem
            title="Experience"
            onClick={() => handleClick("Experience")}
            focus={index === "Experience"}
          >
            <MobileNavbarMenu
              src="https://img.icons8.com/color/48/000000/mac-folder.png"
              alt="folder"
            />
            <MobileNavbarMenuLabel>Experience</MobileNavbarMenuLabel>
          </MobileNavbarItem>
          <MobileNavbarItem
            title="Education"
            onClick={() => handleClick("Education")}
            focus={index === "Education"}
          >
            <MobileNavbarMenu
              src="https://img.icons8.com/color/48/000000/file.png"
              alt="file"
            />
            <MobileNavbarMenuLabel>Education</MobileNavbarMenuLabel>
          </MobileNavbarItem>
        </MobileNavbar>
        <MobileBodyContent>
          {index === "Menu" ? (
            <MobileAboutWindowMenu onClick={handleClick} />
          ) : (
            <MobilePanel>
              <MobileBackButtonContainer>
                <MobileBackButton onClick={() => handleClick("Menu")}>
                  <FontAwesomeIcon icon={faArrowLeft as IconProp} />
                </MobileBackButton>
              </MobileBackButtonContainer>
              {index === "About" && <About />}
              {index === "Experience" && (
                <Experience isMobile={isMobileWindow} showDate={showDate} />
              )}
              {index === "Education" && <Education />}
            </MobilePanel>
          )}
        </MobileBodyContent>
      </MobileWindowBody>
    </Window>
  );
};

export default MobileAboutWindow;