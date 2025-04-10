import {
  Box,
  SubNav,
  SubNavHeader,
  SubNavLink,
  SubNavSection,
  SubNavSections,
} from '@strapi/design-system';
import { WidgetType } from '../../../types';
import { Drag } from '@strapi/icons';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { translate } from '../../../translate';

const DragItem = styled(SubNavLink)`
  border: 1px solid #ccc;
  margin: 4px 0 0 0;

  &:hover {
    background: #eee;
    transition-duration: 300ms;
  }
`;

const SideBar = () => {
  const { formatMessage } = useIntl();
  const onDragStart = (e: any) => {
    const widgetType = e.target.getAttribute('data-widget-type');
    e.dataTransfer.setData('text/plain', widgetType);
  };

  return (
    <Box background="neutral200">
      <SubNav style={{ padding: 8 }}>
        <SubNavHeader label={formatMessage(translate('plugin.name', 'Dashboard Builder'))} />
        <SubNavSections>
          <SubNavSection
            label={formatMessage(translate('group.contentManager', 'Content Manager'))}
          >
            <DragItem
              draggable={true}
              data-widget-type={WidgetType.singleType}
              onDragStart={onDragStart}
              icon={<Drag />}
            >
              {formatMessage(translate('type.singleType', 'Single Type'))}
            </DragItem>
            <DragItem
              draggable={true}
              data-widget-type={WidgetType.collectionType}
              onDragStart={onDragStart}
              icon={<Drag />}
            >
              {formatMessage(translate('type.collectionType', 'Collection Type'))}
            </DragItem>
          </SubNavSection>
          <SubNavSection label={formatMessage(translate('group.mediaLibrary', 'Media Library'))}>
            <DragItem
              draggable={true}
              onDragStart={onDragStart}
              data-widget-type={WidgetType.uploadFile}
              icon={<Drag />}
            >
              {formatMessage(translate('type.uploadFile', 'Upload File'))}
            </DragItem>
          </SubNavSection>
          <SubNavSection label={formatMessage(translate('group.chart', 'Chart'))}>
            <DragItem
              draggable={true}
              onDragStart={onDragStart}
              data-widget-type={WidgetType.pieChart}
              icon={<Drag />}
            >
              {formatMessage(translate('type.pieChart', 'Pie Chart'))}
            </DragItem>
            <DragItem
              draggable={true}
              onDragStart={onDragStart}
              data-widget-type={WidgetType.barChart}
              icon={<Drag />}
            >
              {formatMessage(translate('type.barChart', 'Bar Chart'))}
            </DragItem>
            <DragItem
              draggable={true}
              onDragStart={onDragStart}
              data-widget-type={WidgetType.radarChart}
              icon={<Drag />}
            >
              {formatMessage(translate('type.radarChart', 'Radar Chart'))}
            </DragItem>
            <DragItem
              draggable={true}
              onDragStart={onDragStart}
              data-widget-type={WidgetType.lineChart}
              icon={<Drag />}
            >
              {formatMessage(translate('type.lineChart', 'Line Chart'))}
            </DragItem>
          </SubNavSection>

          <SubNavSection label={formatMessage(translate('group.others', 'Others'))}>
            <DragItem
              draggable={true}
              onDragStart={onDragStart}
              data-widget-type={WidgetType.lastEdited}
              icon={<Drag />}
            >
              {formatMessage(translate('type.lastEdit', 'Last edited entries'))}
            </DragItem>
            <DragItem
              draggable={true}
              onDragStart={onDragStart}
              data-widget-type={WidgetType.lastPublished}
              icon={<Drag />}
            >
              {formatMessage(translate('type.lastPublish', 'Last published entries'))}
            </DragItem>
            <DragItem
              draggable={true}
              onDragStart={onDragStart}
              data-widget-type={WidgetType.customWidget}
              icon={<Drag />}
            >
              {formatMessage(translate('type.customWidget', 'Custom Widget'))}
            </DragItem>
          </SubNavSection>
        </SubNavSections>
      </SubNav>
    </Box>
  );
};

export default SideBar;
