import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChartMetaFields, WidgetProps, WidgetType } from '../../../../types';
import { useFetchClient } from '@strapi/strapi/admin';
import { useWidget } from '../../provider';
import styled from 'styled-components';
import { Box, Flex, Typography } from '@strapi/design-system';
import { chartColors } from '../../../../constants';
import WidgetContainer from '../WidgetContainer';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Square = styled.div`
  border-radius: 2px;
  display: inline-block;
  width: 14px;
  height: 14px;
`;

const TooltipContent = styled(Box)`
  background-color: #fff;
  border-radius: 5px;
`;

const CustomTooltip = (props: any) => {
  const { active, payload } = props;
  if (active && payload && payload.length > 0) {
    return (
      <TooltipContent padding={3}>
        <Typography variant={'epsilon'}>{`${payload[0].name}: ${payload[0].value}`}</Typography>
      </TooltipContent>
    );
  }
};

const PieChartWidget = (props: WidgetProps) => {
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

  return (
    <WidgetContainer widgetType={WidgetType.pieChart}>
      <div style={{ position: 'absolute', marginTop: 10 }}>
        <div>
          {chartData.map((row, index) => (
            <Flex key={index}>
              <Square style={{ backgroundColor: chartColors[index % chartColors.length] }} />
              &nbsp;
              {`${row.name}`}
            </Flex>
          ))}
        </div>
      </div>
      <ResponsiveContainer
        style={{ margin: 'auto' }}
        width={400}
        height={Number.parseInt(widgetConfig.height?.replace('px', '') ?? '250') - 40}
      >
        <PieChart width={400} height={400}>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </WidgetContainer>
  );
};

export default PieChartWidget;
