import React from 'react';
import info from '../../info.json';
import styled from 'styled-components';
import SkillIcon, { SkillIconProps } from './SkillIcon';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const FrontEnd: React.FC = () => {
  const [frontEndSkills, setFrontEndSkills] = React.useState<
    Array<SkillIconProps>
  >([]);

  React.useEffect(() => {
    setFrontEndSkills(info.skills.front);
  }, []);

  return (
    <ContentContainer>
      {frontEndSkills.map((skill) => {
        return <SkillIcon name={skill.name} noWidth={skill.noWidth} />;
      })}
    </ContentContainer>
  );
};

export default FrontEnd;
