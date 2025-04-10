import { SingleTypeMetaFields, WidgetProps } from '../../../../types';
import {
  Box,
  MultiSelect,
  MultiSelectOption,
  SingleSelect,
  SingleSelectOption,
  Typography,
} from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Field } from '@strapi/design-system';
import { supportSchemaType } from '../../../../constants';
import SingleTypeWidget from '../widget/SingleTypeWidget';
import { useWidget } from '../../provider';
import { translate } from '../../../../translate';
import { useIntl } from 'react-intl';
import WidgetTitle from '../WidgetTitle';

const SingleTypeInputWidget = (props: WidgetProps) => {
  const { isPreview, uuid } = props;
  const { findMetaFields } = useWidget();
  const metafields = findMetaFields(uuid);

  const [singleType, setSingleType] = useState(metafields?.singleType ?? '');
  const [singleTypes, setSingleTypes] = useState<any[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [selectFields, setSelectFields] = useState<string[]>(metafields?.fields ?? []);
  const { setMetaFields } = useWidget();
  const client = useFetchClient();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!isPreview) {
      client.get(`/content-manager/init`).then((response) => {
        const { data } = response.data;
        const { contentTypes } = data;
        setSingleTypes(
          contentTypes.filter(
            (contentType: any) => contentType.isDisplayed && contentType.kind === 'singleType'
          )
        );
        if (singleType && selectFields.length > 0) {
          const selectSingleType = contentTypes.find((ct: any) => ct.uid === singleType);
          const singleTypeFields = [];
          for (let fieldName in selectSingleType.attributes) {
            const attribute = selectSingleType.attributes[fieldName];
            if (supportSchemaType.some((type) => type === attribute.type)) {
              singleTypeFields.push(fieldName);
            }
          }
          setFields(singleTypeFields);
        }
      });
    }
  }, [isPreview]);

  useEffect(() => {
    const metaFields: SingleTypeMetaFields = {
      singleType,
      fields: selectFields,
    };
    setMetaFields({ uuid, metaFields });
  }, [singleType, selectFields]);

  useEffect(() => {
    if (fields.length > 0) {
      setSelectFields([]);
    }
  }, [singleType]);

  useEffect(() => {
    if (!singleType || singleTypes.length === 0) {
      return;
    }
    const selectSingleType = singleTypes.find((st: any) => st.uid === singleType);
    if (!selectSingleType || !selectSingleType.attributes) {
      console.error('not found Single Type', selectSingleType);
      return;
    }

    const singleTypeFields = [];
    for (let fieldName in selectSingleType.attributes) {
      const attribute = selectSingleType.attributes[fieldName];
      if (supportSchemaType.some((type) => type === attribute.type)) {
        singleTypeFields.push(fieldName);
      }
    }
    setFields(singleTypeFields);
  }, [singleType, singleTypes]);

  if (isPreview) {
    return <SingleTypeWidget {...props} />;
  }

  return (
    <>
      <Box style={{ margin: '10px 0' }}>
        <Typography variant={'beta'}>
          {formatMessage(translate('type.singleType', 'Single Type'))}
        </Typography>
      </Box>
      <Field.Root>
        <Field.Label>
          {`*${formatMessage(translate('type.singleType', 'Single Type'))}`}
        </Field.Label>
        <SingleSelect value={singleType} onChange={setSingleType} size={'S'}>
          {singleTypes.map((singleType: any) => (
            <SingleSelectOption value={singleType.uid} key={singleType.uid}>
              {singleType.info.displayName}
            </SingleSelectOption>
          ))}
        </SingleSelect>
      </Field.Root>

      {singleType && (
        <div style={{ marginTop: 3 }}>
          <Field.Root>
            <Field.Label>{`*${formatMessage(translate('field.fields', 'Fields'))}`}</Field.Label>
            <MultiSelect
              withTags={true}
              value={selectFields}
              size={'S'}
              onChange={(values: string[]) => setSelectFields(values)}
            >
              {fields.map((field: string) => (
                <MultiSelectOption value={field} key={field}>
                  {field}
                </MultiSelectOption>
              ))}
            </MultiSelect>
          </Field.Root>
        </div>
      )}
    </>
  );
};

export default SingleTypeInputWidget;
