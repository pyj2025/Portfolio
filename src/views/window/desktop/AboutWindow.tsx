import React from 'react';
import { DraggableData, Position, ResizableDelta } from 'react-rnd';
import {
  NavItmLabel,
  Window,
  WindowBody,
  WindowBodyContent,
  WindowBodyNavbar,
  WindowBodyNavItm,
} from '../../../GlobalStyle';
import {
  AboutIndexType,
  WindowPositionSetting,
  WindowSizeSetting,
} from '../../../types';
import useScreenSize, { TABLET_MAX_WIDTH } from '../../../utils/useScreenSize';
import { WindowProps } from '../../../components/BodyContent';
import { SMALL_ICON_SIZE, getIcon } from '../../../components/getIcon';
import WindowTopbar from '../../../components/WindowTopbar';
import useWindowsStore from '../../../utils/useWindowsStore';
import About from '../../../components/about/About';
import Experience from '../../../components/about/Experience';
import Education from '../../../components/about/Education';

const AboutWindow: React.FC<WindowProps> = ({ handleFocus }) => {
  const { width, height } = useScreenSize();
  const { focusedWindow, setFocusedWindow } = useWindowsStore((state) => state);

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

  const [index, setIndex] = React.useState<AboutIndexType>('About');
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
  }, [height, width]);

  React.useEffect(() => {
    // 150 is menu
    if (aboutSize.width - 150 >= 470) {
      setShowDate(true);
    } else {
      setShowDate(false);
    }
  }, [aboutSize.width, showDate]);

  const clickContentBody = React.useCallback(() => {
    setFocusedWindow('About');
  }, [setFocusedWindow]);

  const handleClick = React.useCallback(
    (name: AboutIndexType) => {
      setIndex(name);
    },
    [setIndex]
  );

  return (
    <Window
      id="About"
      ref={aboutRef}
      size={{ width: aboutSize.width, height: aboutSize.height }}
      position={{ x: aboutPosition.x, y: aboutPosition.y }}
      dragHandleClassName="topbar"
      minWidth={isMobileWindow ? width : 500}
      minHeight={300}
      style={{ zIndex: focusedWindow === 'About' ? 10 : undefined }}
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
          ref.style.width.substring(0, ref.style.width.indexOf('p'))
        );
        const newHeight = Number(
          ref.style.height.substring(0, ref.style.height.indexOf('p'))
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
      <WindowBody onClick={clickContentBody}>
        <WindowBodyNavbar>
          <WindowBodyNavItm
            first
            onClick={() => handleClick('About')}
            focus={index === 'About'}
          >
            {getIcon('File', SMALL_ICON_SIZE)}
            <NavItmLabel>Personal Info</NavItmLabel>
          </WindowBodyNavItm>
          <WindowBodyNavItm
            onClick={() => handleClick('Experience')}
            focus={index === 'Experience'}
          >
            {getIcon('Folder', SMALL_ICON_SIZE)}
            <NavItmLabel>Experience</NavItmLabel>
          </WindowBodyNavItm>
          <WindowBodyNavItm
            onClick={() => handleClick('Education')}
            focus={index === 'Education'}
          >
            {getIcon('File', SMALL_ICON_SIZE)}
            <NavItmLabel>Education</NavItmLabel>
          </WindowBodyNavItm>
        </WindowBodyNavbar>
        <WindowBodyContent>
          {index === 'About' ? <About /> : null}
          {index === 'Experience' ? <Experience showDate={showDate} /> : null}
          {index === 'Education' ? <Education /> : null}
        </WindowBodyContent>
      </WindowBody>
    </Window>
  );
};

export default AboutWindow;
