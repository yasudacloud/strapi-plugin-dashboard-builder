import { WidgetProps, WidgetType } from '../../../types';
import { Flex, Typography } from '@strapi/design-system';
import LastPublishWidget from './widget/LastPublishWidget';
import styled from 'styled-components';
import LastEditWidget from './widget/LastEditWidget';
import PieChartInputWidget from './widget_input/PieChartInputWidget';
import CollectionTypeInputWidget from './widget_input/CollectionTypeInputWidget';
import SingleTypeInputWidget from './widget_input/SingleTypeInputWidget';
import UploadFileInputWidget from './widget_input/UploadFileInputWidget';
import BarChartInputWidget from './widget_input/BarChartInputWidget';
import CustomInputWidget from './widget_input/CustomInputWidget';
import RadarChartInputWidget from './widget_input/RadarChartInputWidget';
import LineChartInputWidget from './widget_input/LineChartInputWidget';

const Center = styled(Flex)`
  position: relative;
  top: 70px;
  justify-content: center;
`;

const Widget = (props: WidgetProps) => {
  const { widget_type } = props;
  if (widget_type === WidgetType.unknown) {
    return (
      <Center>
        <Typography variant={'beta'}>{'Drag and drop here'}</Typography>
      </Center>
    );
  }

  if (widget_type === WidgetType.singleType) {
    return <SingleTypeInputWidget {...props} />;
  } else if (widget_type === WidgetType.collectionType) {
    return <CollectionTypeInputWidget {...props} />;
  } else if (widget_type === WidgetType.uploadFile) {
    return <UploadFileInputWidget {...props} />;
  } else if (widget_type === WidgetType.pieChart) {
    return <PieChartInputWidget {...props} />;
  } else if (widget_type === WidgetType.lastEdited) {
    return <LastEditWidget {...props} />;
  } else if (widget_type === WidgetType.lastPublished) {
    return <LastPublishWidget {...props} />;
  } else if (widget_type === WidgetType.customWidget) {
    return <CustomInputWidget {...props} />;
  } else if (widget_type === WidgetType.barChart) {
    return <BarChartInputWidget {...props} />;
  } else if (widget_type === WidgetType.radarChart) {
    return <RadarChartInputWidget {...props} />;
  } else if (widget_type === WidgetType.lineChart) {
    return <LineChartInputWidget {...props} />;
  } else {
    return <></>;
  }
};

export default Widget;
