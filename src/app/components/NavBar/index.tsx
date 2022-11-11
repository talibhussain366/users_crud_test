import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';
import { PageWrapper } from '../PageWrapper';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <Wrapper>
      <PageWrapper>
        <Link to="/">
          <LinkButton>All Users</LinkButton>
        </Link>
        <Link to="/add-user">
          <LinkButton>Add User</LinkButton>
        </Link>
      </PageWrapper>
    </Wrapper>
  );
}

const LinkButton = styled.span`
  text-decoration: none;
  color: white;
  margin-left: 20px;
  cursor: pointer;
`;

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${p => p.theme.background};
  z-index: 2;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.background.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.75)',
      )};
  }

  ${PageWrapper} {
    display: flex;
    align-items: center;
  }
`;
