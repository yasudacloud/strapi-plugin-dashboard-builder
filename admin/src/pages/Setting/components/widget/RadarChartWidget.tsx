import { RadarChartMetaFields, WidgetProps, WidgetType } from '../../../../types';
import WidgetContainer from '../WidgetContainer';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  RadarChart,
} from 'recharts';
import { useWidget } from '../../provider';
import { useFetchClient } from '@strapi/strapi/admin';
import React, { useCallback, useEffect, useState } from 'react';
import { chartColors } from '../../../../constants';

const RadarChartWidget = (props: WidgetProps) => {
  const { isPreview, row_index, uuid } = props;
  const { widgetConfig, data } = useWidget();
  const client = useFetchClient();
  const [chartData, setChartData] = useState<any[]>([]);
  useEffect(() => {
    if (isPreview) {
      const dashboardWidget = data[row_index].children.find((widget) => widget.uuid === uuid);
      const { endpoint } = dashboardWidget?.metafields as RadarChartMetaFields;
      if (endpoint) {
        client.get(endpoint).then((response) => {
          const { data } = response;
          setChartData(data);
        });
      }
    }
  }, [isPreview]);
  const getBars = useCallback(() => {
    const fields = Object.keys(chartData[0]).filter((key) => key !== 'name' && key !== 'fullMark');
    return (
      <>
        {fields.map((field, index) => (
          <Radar
            key={index}
            name={field}
            dataKey={field}
            fill={chartColors[index % chartColors.length]}
            fillOpacity={0.6}
          />
        ))}
      </>
    );
  }, [chartData]);
  return (
    <>
      <WidgetContainer widgetType={WidgetType.radarChart}>
        <ResponsiveContainer
          width={400}
          height={Number.parseInt(widgetConfig.height?.replace('px', '') ?? '250') - 40}
          style={{ margin: 'auto' }}
        >
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            {chartData.length > 0 && getBars()}
          </RadarChart>
        </ResponsiveContainer>
      </WidgetContainer>
    </>
  );
};

export default RadarChartWidget;
