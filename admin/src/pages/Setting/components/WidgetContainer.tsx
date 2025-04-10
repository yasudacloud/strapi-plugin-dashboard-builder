import React from 'react';
import { useWidget } from '../provider';
import { WidgetType } from '../../../types';

interface Props {
  children?: React.ReactNode;
  widgetType: WidgetType;
}

const WidgetContainer = (props: Props) => {
  const { widgetConfig } = useWidget();
  const chartTypes = [WidgetType.pieChart, WidgetType.barChart, WidgetType.radarChart];
  const overflowY = chartTypes.some((type) => props.widgetType === type) ? 'initial' : 'scroll';
  if (props.widgetType === WidgetType.customWidget) {
    return (
      <div style={{ width: widgetConfig.width, height: widgetConfig.height, overflow: 'scroll' }}>
        {props.children}
      </div>
    );
  }
  return (
    <div style={{ width: widgetConfig.width, height: widgetConfig.height, overflowY }}>
      {props.children}
    </div>
  );
};
export default WidgetContainer;
