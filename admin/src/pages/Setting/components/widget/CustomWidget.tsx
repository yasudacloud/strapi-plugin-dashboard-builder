import { Flex, Typography } from '@strapi/design-system';
import { CustomMetaFields, WidgetProps, WidgetType } from '../../../../types';
import { useStrapiApp } from '@strapi/strapi/admin';
import styled from 'styled-components';
import { useWidget } from '../../provider';
import WidgetContainer from '../WidgetContainer';

const Center = styled(Flex)`
  position: relative;
  top: 70px;
  justify-content: center;
`;

const ErrorText = styled(Typography)`
  color: #ff3333;
`;

const useInjectZone = () => {
  const getPlugin = useStrapiApp('useInjectionZone', (state) => state.getPlugin);
  const contentManagerPlugin = getPlugin('dashboard-builder');
  return contentManagerPlugin.getInjectedComponents('dashboard', 'customWidgets');
};

const CustomWidget = (props: WidgetProps) => {
  const { row_index, uuid } = props;
  const { data } = useWidget();
  const dashboardWidget = data[row_index].children.find((widget) => widget.uuid === uuid);
  const { name } = dashboardWidget?.metafields as CustomMetaFields;
  const components = useInjectZone().filter((component) => component.name === name);
  if (components.length === 0) {
    return (
      <WidgetContainer widgetType={WidgetType.customWidget}>
        <Center>
          <ErrorText variant="beta">{'Not Found Inject Component'}</ErrorText>
        </Center>
      </WidgetContainer>
    );
  }
  return (
    <WidgetContainer widgetType={WidgetType.customWidget}>
      {components.map((component) => {
        return <component.Component key={component.name} />;
      })}
    </WidgetContainer>
  );
};
export default CustomWidget;
