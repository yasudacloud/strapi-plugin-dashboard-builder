import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import WidgetContainer from '../WidgetContainer';
import { PieChartMetaFields, WidgetProps, WidgetType } from '../../../../types';
import { useWidget } from '../../provider';
import { useFetchClient } from '@strapi/strapi/admin';
import React, { useCallback, useEffect, useState } from 'react';
import { chartColors } from '../../../../constants';

const LineChartWidget = (props: WidgetProps) => {
  const { isPreview, row_index, uuid } = props;
  const { data, widgetConfig } = useWidget();
  const client = useFetchClient();
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (isPreview) {
      const dashboardWidget = data[row_index].children.find((widget) => widget.uuid === uuid);
      const { endpoint } = dashboardWidget?.metafields as PieChartMetaFields;
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
          <Line
            key={index}
            type="monotone"
            dataKey={field}
            stroke={chartColors[index % chartColors.length]}
            activeDot={{ r: 8 }}
          />
        ))}
      </>
    );
  }, [chartData]);
  return (
    <WidgetContainer widgetType={WidgetType.lineChart}>
      <ResponsiveContainer
        style={{ margin: '10px auto 0 auto' }}
        width={400}
        height={Number.parseInt(widgetConfig.height?.replace('px', '') ?? '250') - 40}
      >
        <LineChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {chartData.length > 0 && getBars()}
        </LineChart>
      </ResponsiveContainer>
    </WidgetContainer>
  );
};

export default LineChartWidget;
