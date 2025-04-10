import { Alert, Button, Flex } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import { useWidget } from '../provider';
import {
  BarChartMetaFields,
  CollectionTypeMetaFields,
  CustomMetaFields,
  LineChartMetaFields,
  PieChartMetaFields,
  RadarChartMetaFields,
  SingleTypeMetaFields,
  UploadFileMetaFields,
  WidgetType,
} from '../../../types';
import { translate } from '../../../translate';
import { useIntl } from 'react-intl';

const Header = () => {
  const { formatMessage } = useIntl();
  const client = useFetchClient();
  const { data, visibleNotification, openNotification } = useWidget();
  const onSave = () => {
    let requestBody: any[] = [];
    data.forEach((group) => {
      group.children.forEach((widget) => {
        requestBody.push({
          row_index: widget.row_index,
          metafields: widget.metafields,
          widget_type: widget.widget_type,
        });
      });
    });
    client.post('/dashboard-builder', requestBody).then((response) => {
      openNotification();
    });
  };
  let isError = false;
  data.forEach((group) => {
    group.children.forEach((widget) => {
      if (widget.widget_type === WidgetType.unknown) {
        isError = true;
      } else {
        if (widget.widget_type === WidgetType.singleType) {
          const metaFields = widget.metafields as SingleTypeMetaFields;
          if (
            metaFields.singleType === '' ||
            !metaFields.fields ||
            metaFields.fields.length === 0
          ) {
            isError = true;
          }
        }

        if (widget.widget_type === WidgetType.collectionType) {
          const metaFields = widget.metafields as CollectionTypeMetaFields;
          if (
            metaFields.collectionType === '' ||
            !metaFields.fields ||
            metaFields.fields.length === 0 ||
            !metaFields.sortKey ||
            !metaFields.sortAction
          ) {
            isError = true;
          }
        }

        if (widget.widget_type === WidgetType.uploadFile) {
          const metaFields = widget.metafields as UploadFileMetaFields;
          if (!metaFields.sortKey || !metaFields.sortAction) {
            isError = true;
          }
        }

        if (widget.widget_type === WidgetType.pieChart) {
          const metaFields = widget.metafields as PieChartMetaFields;
          if (!metaFields.endpoint) {
            isError = true;
          }
        }

        if (widget.widget_type === WidgetType.barChart) {
          const metaFields = widget.metafields as BarChartMetaFields;
          if (!metaFields.endpoint) {
            isError = true;
          }
        }
        if (widget.widget_type === WidgetType.lineChart) {
          const metaFields = widget.metafields as LineChartMetaFields;
          if (!metaFields.endpoint) {
            isError = true;
          }
        }
        if (widget.widget_type === WidgetType.radarChart) {
          const metaFields = widget.metafields as RadarChartMetaFields;
          if (!metaFields.endpoint) {
            isError = true;
          }
        }
        if (widget.widget_type === WidgetType.customWidget) {
          const metaFields = widget.metafields as CustomMetaFields;
          if (!metaFields.name) {
            isError = true;
          }
        }
      }
    });
  });
  return (
    <header>
      {visibleNotification && (
        <div style={{ margin: 10, position: 'absolute', zIndex: 10 }}>
          <Alert closeLabel="Close alert" title="" variant={'success'}>
            {formatMessage(translate('save.success', 'Save Success'))}
          </Alert>
        </div>
      )}

      <Flex direction="column" alignItems="center" style={{ maxWidth: 1000, margin: '8px 0 0 0' }}>
        <Flex width="100%" justifyContent="flex-end" alignItems="center">
          <Button onClick={onSave} disabled={isError}>
            {formatMessage(translate('save', 'Save'))}
          </Button>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
