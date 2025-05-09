import { Box, Flex, IconButton, Typography } from '@strapi/design-system';
import Widget from '../Setting/components/Widget';
import { useWidget } from '../Setting/provider';
import { useFetchClient, useStrapiApp } from '@strapi/strapi/admin';
import { useEffect } from 'react';
import { DashboardWidgetGroup } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Layout = styled.div`
  max-width: 1400px;
  margin: 0 0 0 8px;
`;

const WidgetWrap = styled(Box)`
  background-color: #fff;
  padding: 8px;
  border-radius: 15px;

  & .thumbnail {
    max-height: 45px;
  }
`;

const DashboardView = () => {
  const { data, setData, setWidgetConfig, widgetConfig } = useWidget();
  const client = useFetchClient();
  useEffect(() => {
    setWidgetConfig({ height: '250px' });
    client.get('/dashboard-builder/widgets').then((response) => {
      const { data } = response;
      if (Array.isArray(data)) {
        const maxRowIndex = Math.max(...data.map(item => item.row_index));
        const groups: DashboardWidgetGroup[] = [];
        for (let i = 0; i < maxRowIndex + 1; i++) {
          groups.push({ children: [] });
        }
        data.forEach((widget) => {
          groups[widget.row_index].children.push({
            row_index: widget.row_index,
            uuid: uuidv4(),
            metafields: widget.metafields,
            widget_type: widget.widget_type,
          });
        });
        setData(groups);
      }
    });
  }, []);

  return (
    <Layout>
      <Box paddingTop={2} paddingLeft={3}>
        <Flex justifyContent="space-between">
          <Typography variant={'alpha'}>{'Dashboard'}</Typography>
        </Flex>
      </Box>
      {data.map((group, groupIndex) => (
        <Flex key={groupIndex} style={{ height: widgetConfig.height, margin: '30px 6px' }}>
          {group.children.map((widget, widgetIndex) => (
            <WidgetWrap
              style={{
                margin: '20px 8px',
                width: `${100 / group.children.length}%`,
              }}
              key={`${groupIndex}_${widgetIndex}`}
            >
              <Widget isPreview={true} {...widget} />
            </WidgetWrap>
          ))}
        </Flex>
      ))}
    </Layout>
  );
};

export default DashboardView;
