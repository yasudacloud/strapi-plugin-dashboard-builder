import { DashboardWidgetGroup, WidgetType } from '../../../types';
import { Box, Flex } from '@strapi/design-system';
import styled from 'styled-components';
import { Cross } from '@strapi/icons';
import { PlusCircle } from '@strapi/icons';
import { useWidget } from '../provider';
import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import Widget from './Widget';
import { Toggle } from '@strapi/design-system';
import { v4 as uuidv4 } from 'uuid';
import { translate } from '../../../translate';
import { useIntl } from 'react-intl';

const widgetHeight = 220;

const DashboardWidgetPreview = styled.div`
  min-width: 400px;
  width: 100%;
  max-width: 450px;
  height: ${widgetHeight}px;
  background: #eee;
  margin: 4px;
  transition-duration: 300ms;

  &.drop-widget {
    background: #bbb;
  }
`;

const Inner = styled.div`
  width: 90%;
  margin: auto;
`;

const initialValue = [
  {
    children: [
      {
        widget_type: WidgetType.unknown,
        row_index: 0,
        uuid: uuidv4(),
        metafields: {},
      },
      {
        widget_type: WidgetType.unknown,
        row_index: 0,
        uuid: uuidv4(),
        metafields: {},
      },
      {
        widget_type: WidgetType.unknown,
        row_index: 0,
        uuid: uuidv4(),
        metafields: {},
      },
    ],
  },
  {
    children: [
      {
        widget_type: WidgetType.unknown,
        row_index: 1,
        uuid: uuidv4(),
        metafields: {},
      },
      {
        widget_type: WidgetType.unknown,
        row_index: 1,
        uuid: uuidv4(),
        metafields: {},
      },
      {
        widget_type: WidgetType.unknown,
        row_index: 1,
        uuid: uuidv4(),
        metafields: {},
      },
    ],
  },
];

const DashboardPreview = () => {
  const { data, setData, setWidgetConfig } = useWidget();
  const [isPreview, setPreview] = useState(false);
  const client = useFetchClient();
  const { formatMessage } = useIntl();
  useEffect(() => {
    setWidgetConfig({
      height: '180px',
    });
  }, []);

  useEffect(() => {
    client.get('/dashboard-builder/widgets').then((response) => {
      const { data } = response;
      if (Array.isArray(data) && data.length > 0) {
        const maxRowIndex = data.reduce((l, r) =>
          l.row_index > r.row_index ? l.row_index : r.row_index
        );
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
      } else {
        setData(initialValue);
      }
    });
  }, []);

  // onClick bottom add icon
  const onAddBelow = () => {
    setData(() =>
      data.concat([
        {
          children: [],
        },
      ])
    );
  };

  // onClick right add icon
  const onAddRight = (groupIndex: number) => {
    const newData = data.map((group, index) => {
      if (index === groupIndex) {
        group.children.push({
          widget_type: WidgetType.unknown,
          metafields: {},
          row_index: groupIndex,
          uuid: uuidv4(),
        });
      }
      return group;
    });
    setData(newData);
  };

  // remove widget
  const onRemove = (groupIndex: number, widgetIndex: number) => {
    const newData = data
      .filter((group, gi) => {
        group.children = group.children.filter((_, wi) => {
          const isRemoveTarget = gi === groupIndex && wi === widgetIndex;
          return !isRemoveTarget;
        });
        return group.children.length !== 0;
      })
      .map((group, gi) => ({
        children: group.children.map((widget) => {
          widget.row_index = gi;
          return widget;
        }),
      }));

    setData(newData);
  };

  // drop widget
  const onDrop = (e: any, groupIndex: number, widgetIndex: number) => {
    e.target.classList.remove('drop-widget');
    const widgetType = e.dataTransfer.getData('text/plain');
    setData(() =>
      data.map((group, gi) => {
        group.children = group.children.map((widget, wi) => {
          if (gi === groupIndex && wi === widgetIndex) {
            widget.widget_type = widgetType;
            if (widgetType === WidgetType.pieChart) {
              {
                widget.metafields = {
                  endpoint: '/dashboard-builder/pie_chart_sample',
                };
              }
            } else if (widgetType === WidgetType.barChart) {
              widget.metafields = { endpoint: '/dashboard-builder/bar_chart_sample' };
            } else if (widgetType === WidgetType.radarChart) {
              widget.metafields = { endpoint: '/dashboard-builder/radar_chart_sample' };
            } else if (widgetType === WidgetType.lineChart) {
              widget.metafields = { endpoint: '/dashboard-builder/line_chart_sample' };
            } else {
              widget.metafields = {};
            }
          }
          return widget;
        });
        return group;
      })
    );
  };
  return (
    <div>
      <div style={{ width: 200, margin: 8 }}>
        <Toggle
          onLabel={formatMessage(translate('toggle.preview', 'Preview'))}
          offLabel={formatMessage(translate('toggle.edit', 'Edit'))}
          checked={isPreview}
          onChange={() => setPreview(!isPreview)}
        />
      </div>
      {data.map((group, groupIndex) => (
        <Flex key={groupIndex} style={{ height: widgetHeight, margin: '25px 6px' }}>
          {group.children.map((widget, widgetIndex) => (
            <DashboardWidgetPreview
              key={`${groupIndex}_${widgetIndex}`}
              onDragOver={(e: any) => {
                e.preventDefault();
                e.target.classList.add('drop-widget');
              }}
              onDragLeave={(e: any) => {
                e.target.classList.remove('drop-widget');
              }}
              onDrop={(e) => onDrop(e, groupIndex, widgetIndex)}
            >
              <div style={{ margin: '5px 0 0 5px' }}>
                <Cross onClick={() => onRemove(groupIndex, widgetIndex)} style={{}} />
              </div>
              <Box style={{}}>
                <Inner>
                  <Widget isPreview={isPreview} {...widget} />
                </Inner>
              </Box>
            </DashboardWidgetPreview>
          ))}
          <div
            style={{
              backgroundColor: '#ddd',
              height: '100%',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <PlusCircle
              fill={'buttonPrimary600'}
              width={25}
              height={25}
              onClick={() => onAddRight(groupIndex)}
            />
          </div>
        </Flex>
      ))}
      <Box
        style={{
          textAlign: 'center',
          backgroundColor: '#ddd',
          margin: '8px 12px 0 12px',
        }}
      >
        <PlusCircle fill={'buttonPrimary600'} width={25} height={25} onClick={onAddBelow} />
      </Box>
    </div>
  );
};

export default DashboardPreview;
