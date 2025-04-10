import {Box, Field, Flex, Typography} from '@strapi/design-system';
import { CustomMetaFields, SingleTypeMetaFields, WidgetProps } from '../../../../types';
import { TextInput } from '@strapi/design-system';
import React, { useEffect, useState } from 'react';
import CustomWidget from '../widget/CustomWidget';
import { useWidget } from '../../provider';
import { translate } from '../../../../translate';
import { useIntl } from 'react-intl';

const CustomInputWidget = (props: WidgetProps) => {
  const { isPreview, uuid } = props;
  const { setMetaFields, findMetaFields } = useWidget();
  const metafields = findMetaFields(uuid);
  const [name, setName] = useState(metafields.name ?? '');
  const { formatMessage } = useIntl();

  useEffect(() => {
    const metaFields: CustomMetaFields = {
      name,
    };
    setMetaFields({ uuid, metaFields });
  }, [name]);

  if (isPreview) {
    return <CustomWidget {...props} />;
  }
  return (
    <>
      <Box style={{ margin: '10px 0' }}>
        <Typography variant={'beta'}>
          {formatMessage(translate('type.customWidget', 'Custom Widget'))}
        </Typography>
      </Box>
      <Field.Root>
        <Field.Label>
          {formatMessage(translate('field.injectZone', 'InjectZone Name'))}
        </Field.Label>
        <TextInput size={'S'} value={name} onChange={(e: any) => setName(e.target.value)} />
      </Field.Root>
    </>
  );
};

export default CustomInputWidget;
