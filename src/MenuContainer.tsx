import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faCode,
  faFile,
  faFolderOpen,
  faFolder,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  color: white;
`;

const MenuWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-shrink: 1;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const ListItem = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.5em;
  color: white;
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
  box-sizing: border-box;
  transition: background-color 0.2s;
  border-radius: 0.2rem;
  padding: 1rem;

  text-decoration: none;
  cursor: pointer;

  :hover {
    background-color: #3c3c3c;
  }
`;

export type MenuContainerProps = {
  isProjectsOpen: boolean;
  toggleAboutOpen: () => void;
  toggleSkillsOpen: () => void;
  toggleProjectsOpen: () => void;
};

const MenuContainer: React.FC<MenuContainerProps> = ({
  isProjectsOpen,
  toggleAboutOpen,
  toggleSkillsOpen,
  toggleProjectsOpen,
}) => {
  return (
    <SidebarContainer>
      <MenuWrapper>
        <ListItem onClick={toggleAboutOpen}>
          <FontAwesomeIcon icon={faUser} />
          About
        </ListItem>
        <ListItem onClick={toggleSkillsOpen}>
          <FontAwesomeIcon icon={faCode} />
          Skills
        </ListItem>
        <ListItem onClick={toggleProjectsOpen}>
          <FontAwesomeIcon icon={isProjectsOpen ? faFolderOpen : faFolder} />
          Projects
        </ListItem>
        <ListItem onClick={toggleProjectsOpen}>
          <FontAwesomeIcon icon={faFile} />
          Resume
        </ListItem>
        <ListItem href="https://github.com/pyj2025">
          <FontAwesomeIcon icon={faGithub} />
          Github
        </ListItem>
        <ListItem href="https://www.linkedin.com/in/devjoon/">
          <FontAwesomeIcon icon={faLinkedin} />
          Linkedin
        </ListItem>
      </MenuWrapper>
    </SidebarContainer>
  );
};

export default MenuContainer;
