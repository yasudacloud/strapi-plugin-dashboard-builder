import {Box, Field, Flex, SingleSelect, SingleSelectOption, Typography} from '@strapi/design-system';
import { UploadFileMetaFields, WidgetProps } from '../../../../types';
import React, { useEffect, useState } from 'react';
import { useWidget } from '../../provider';
import UploadFileWidget from '../widget/UploadFileWidget';
import { translate } from '../../../../translate';
import { useIntl } from 'react-intl';

const UploadFileInputWidget = (props: WidgetProps) => {
  const { uuid } = props;
  const { findMetaFields } = useWidget();
  const metafields = findMetaFields(uuid);
  const [sortKey, setSortKey] = useState(metafields?.sortKey ?? 'createdAt');
  const [sortAction, setSortAction] = useState(metafields?.sortAction ?? 'desc');
  const { setMetaFields } = useWidget();
  const { formatMessage } = useIntl();

  useEffect(() => {
    const metaFields: UploadFileMetaFields = {
      sortKey,
      sortAction,
    };
    setMetaFields({ uuid, metaFields });
  }, [sortKey, sortAction]);

  if (props.isPreview) {
    return <UploadFileWidget {...props} />;
  }

  return (
    <>
      <Box style={{ margin: '10px 0' }}>
        <Typography variant={'beta'}>
          {formatMessage(translate('type.uploadFile', 'Upload File'))}
        </Typography>
      </Box>
      <Flex>
        <Field.Root>
          <Field.Label>{`*${formatMessage(translate('field.sort', 'Sort'))}`}</Field.Label>
          <SingleSelect value={sortKey} onChange={setSortKey} size={'S'}>
            <SingleSelectOption value={'createdAt'}>
              {formatMessage({ id: 'createdAt', defaultMessage: 'createdAt' })}
            </SingleSelectOption>
            <SingleSelectOption value={'updatedAt'}>
              {formatMessage({ id: 'updatedAt', defaultMessage: 'updatedAt' })}
            </SingleSelectOption>
          </SingleSelect>
        </Field.Root>
        <Field.Root>
          <Field.Label>&nbsp;</Field.Label>
          <SingleSelect value={sortAction} onChange={setSortAction} size={'S'}>
            <SingleSelectOption value={'asc'}>
              {formatMessage(translate('field.sort.asc', 'ASC'))}
            </SingleSelectOption>
            <SingleSelectOption value={'desc'}>
              {formatMessage(translate('field.sort.desc', 'DESC'))}
            </SingleSelectOption>
          </SingleSelect>
        </Field.Root>
      </Flex>
    </>
  );
};
export default UploadFileInputWidget;
