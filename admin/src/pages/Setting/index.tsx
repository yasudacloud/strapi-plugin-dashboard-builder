import SideBar from './components/SideBar';
import DashboardPreview from './components/DashboardPreview';
import Header from './components/Header';
import { WidgetProvider } from './provider';
import { Flex } from '@strapi/design-system';
import styled from 'styled-components';

const Main = styled.div`
  user-select: none;
  -ms-user-select: none;
  overflow-x: scroll;
`;

const Setting = () => {
  return (
    <WidgetProvider>
      <Flex style={{ alignItems: 'start' }}>
        <SideBar />
        <Main>
          <Header />
          <DashboardPreview />
        </Main>
      </Flex>
    </WidgetProvider>
  );
};

export default Setting;
