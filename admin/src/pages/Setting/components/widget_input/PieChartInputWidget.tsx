import React, { useState } from 'react';
import { WidgetProps } from '../../../../types';
import {Box, Field, TextInput, Typography} from '@strapi/design-system';
import PieChartWidget from '../widget/PieChartWidget';
import { useWidget } from '../../provider';
import { translate } from '../../../../translate';
import { useIntl } from 'react-intl';

const PieChartInputWidget = (props: WidgetProps) => {
  const { isPreview, uuid } = props;
  const { setMetaFields, findMetaFields } = useWidget();
  const metafields = findMetaFields(uuid);
  const [endpoint, setEndpoint] = useState(
    metafields.endpoint ?? '/dashboard-builder/pie_chart_sample'
  );
  const { formatMessage } = useIntl();

  const onChangeEndpoint = (e: any) => {
    setEndpoint(e.target.value);
    setMetaFields({
      uuid,
      metaFields: {
        endpoint: e.target.value,
      },
    });
  };
  if (isPreview) {
    return <PieChartWidget {...props} />;
  }
  return (
    <>
      <div style={{ height: 180, overflowY: 'scroll' }}>
        <Box style={{ margin: '10px 0' }}>
          <Typography variant={'beta'}>
            {formatMessage(translate('type.pieChart', 'Pie Chart'))}
          </Typography>
        </Box>
        <Field.Root>
          <Field.Label>
            {`*${formatMessage(translate('field.dataEndpoint', 'Data Endpoint'))}`}
          </Field.Label>
          <TextInput size={'S'} value={endpoint} onChange={onChangeEndpoint} />
        </Field.Root>
      </div>
    </>
  );
};

export default PieChartInputWidget;
