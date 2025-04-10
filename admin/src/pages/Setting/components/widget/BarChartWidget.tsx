import React, { useCallback, useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  BarChartMetaFields,
  WidgetProps,
  WidgetType,
} from '../../../../types';
import { useFetchClient } from '@strapi/strapi/admin';
import { useWidget } from '../../provider';
import { chartColors } from '../../../../constants';
import WidgetContainer from '../WidgetContainer';

const BarChartWidget = (props: WidgetProps) => {
  const { isPreview, row_index, uuid } = props;
  const { data, widgetConfig } = useWidget();
  const client = useFetchClient();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (isPreview) {
      const dashboardWidget = data[row_index].children.find((widget) => widget.uuid === uuid);
      const { endpoint } = dashboardWidget?.metafields as BarChartMetaFields;
      if (endpoint) {
        client.get(endpoint).then((response) => {
          const { data } = response;
          setChartData(data);
        });
      }
    }
  }, [isPreview]);

  const getBars = useCallback(() => {
    const fields = Object.keys(chartData[0]).filter((key) => key !== 'name');
    return (
      <>
        {fields.map((field, index) => (
          <Bar
            key={index}
            dataKey={field}
            fill={chartColors[index % chartColors.length]}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        ))}
      </>
    );
  }, [chartData]);
  return (
    <WidgetContainer widgetType={WidgetType.barChart}>
      <ResponsiveContainer
        width={400}
        height={Number.parseInt(widgetConfig.height?.replace('px', '') ?? '250') - 40}
        style={{ margin: 'auto' }}
      >
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          {chartData.length > 0 && getBars()}
        </BarChart>
      </ResponsiveContainer>
    </WidgetContainer>
  );
};

export default BarChartWidget;
