import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import info from '../../info.json';

import {
  PanelContainer,
  PanelDescriptionContainer,
  PanelDescriptionRow,
  LinkLabel,
  PanelLogoContainer,
  PanelDescriptionLabel,
  PanelDescriptionText,
  PanelLogoImage,
} from '../../GlobalStyle';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ParstagramLogo from '../../image/projects/Parstagram.png';

const Parstagram: React.FC = () => {
  return (
    <PanelContainer>
      <PanelLogoContainer>
        <PanelLogoImage src={ParstagramLogo} alt="Parstagram" />
      </PanelLogoContainer>
      <PanelDescriptionContainer>
        <PanelDescriptionRow>
          <PanelDescriptionLabel>Name</PanelDescriptionLabel>
          <PanelDescriptionText>
            {info.project.Parstagram.name}
          </PanelDescriptionText>
        </PanelDescriptionRow>
        <PanelDescriptionRow>
          <PanelDescriptionLabel>Link</PanelDescriptionLabel>
          <LinkLabel href={info.project.Parstagram.link}>
            <span>
              Link <FontAwesomeIcon icon={faExternalLinkAlt as IconProp} />
            </span>
          </LinkLabel>
        </PanelDescriptionRow>
        <PanelDescriptionRow>
          <PanelDescriptionLabel>Stack</PanelDescriptionLabel>
          <PanelDescriptionText>
            {info.project.Parstagram.stack.map((value, idx) =>
              idx === info.project.Parstagram.stack.length - 1
                ? value
                : value + ', '
            )}
          </PanelDescriptionText>
        </PanelDescriptionRow>
        <PanelDescriptionRow>
          <PanelDescriptionLabel>Detail</PanelDescriptionLabel>
          <PanelDescriptionText>
            {info.project.Parstagram.details}
          </PanelDescriptionText>
        </PanelDescriptionRow>
      </PanelDescriptionContainer>
    </PanelContainer>
  );
};

export default React.memo(Parstagram);