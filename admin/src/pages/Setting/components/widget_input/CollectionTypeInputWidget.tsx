import { CollectionTypeMetaFields, WidgetProps } from '../../../../types';
import {
  Box,
  Flex,
  MultiSelect,
  MultiSelectOption,
  SingleSelect,
  SingleSelectOption, Typography,
} from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Field } from '@strapi/design-system';
import { supportSchemaType } from '../../../../constants';
import CollectionTypeWidget from '../widget/CollectionTypeWidget';
import { useWidget } from '../../provider';
import { translate } from '../../../../translate';
import { useIntl } from 'react-intl';

const CollectionTypeInputWidget = (props: WidgetProps) => {
  const { isPreview, uuid } = props;
  const { setMetaFields, findMetaFields } = useWidget();
  const metafields = findMetaFields(uuid);
  const [collectionType, setCollectionType] = useState(metafields.collectionType ?? '');
  const [collectionTypes, setCollectionTypes] = useState<any[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [selectFields, setSelectFields] = useState<string[]>(metafields.fields ?? []);
  const [sortKey, setSortKey] = useState(metafields.sortKey ?? '');
  const [sortAction, setSortAction] = useState(metafields.sortAction ?? '');
  const { formatMessage } = useIntl();

  const client = useFetchClient();
  useEffect(() => {
    if (!isPreview) {
      if (collectionTypes.length > 0) {
        return;
      }
      client.get(`/content-manager/init`).then((response) => {
        const { data } = response.data;
        const { contentTypes } = data;
        setCollectionTypes(
          contentTypes.filter(
            (contentType: any) => contentType.isDisplayed && contentType.kind === 'collectionType'
          )
        );
        if (collectionType && selectFields.length > 0) {
          const collectionTypeFields: string[] = [];
          const selectCollectionType = contentTypes.find((ct: any) => ct.uid === collectionType);
          for (let fieldName in selectCollectionType.attributes) {
            const attribute = selectCollectionType.attributes[fieldName];
            if (supportSchemaType.some((type) => type === attribute.type)) {
              collectionTypeFields.push(fieldName);
            }
          }
          setFields(collectionTypeFields);
        }
      });
    }
  }, [isPreview]);

  useEffect(() => {
    const metaFields: CollectionTypeMetaFields = {
      fields: selectFields,
      collectionType,
      sortKey,
      sortAction,
    };
    setMetaFields({ uuid, metaFields });
  }, [selectFields, collectionType, sortKey, sortAction]);

  const onChangeCollectionType = (value: string) => {
    setCollectionType(value);
    setSelectFields([]);
    const selectColletionType = collectionTypes.find((st: any) => st.uid === value);
    if (!selectColletionType || !selectColletionType.attributes) {
      console.error('not found Collection Type', selectColletionType);
      return;
    }
    const collectionTypeFields = [];
    for (let fieldName in selectColletionType.attributes) {
      const attribute = selectColletionType.attributes[fieldName];
      if (supportSchemaType.some((type) => type === attribute.type)) {
        collectionTypeFields.push(fieldName);
      }
    }
    setFields(collectionTypeFields);
    setSortKey('');
    setSortAction('');
  };

  if (isPreview) {
    return <CollectionTypeWidget {...props} />;
  }

  return (
    <div style={{ height: 180, overflowY: 'scroll' }}>
      <Box style={{ margin: '10px 0' }}>
        <Typography variant={'beta'}>
          {formatMessage(translate('type.collectionType', 'Collection Type'))}
        </Typography>
      </Box>
      <Field.Root>
        <Field.Label>
          {`*${formatMessage(translate('type.collectionType', 'Collection Type'))}`}
        </Field.Label>
        <SingleSelect value={collectionType} onChange={onChangeCollectionType} size={'S'}>
          {collectionTypes.map((collectionType: any) => (
            <SingleSelectOption value={collectionType.uid} key={collectionType.uid}>
              {collectionType.info.displayName}
            </SingleSelectOption>
          ))}
        </SingleSelect>
      </Field.Root>
      {collectionType && (
        <>
          <div style={{ marginTop: 3 }}>
            <Field.Root>
              <Field.Label>
                {`*${formatMessage(translate('field.fields', 'Fields'))}`}
              </Field.Label>
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

            <Flex>
              <Field.Root>
                <Field.Label>{`*${formatMessage(translate('field.sort', 'Sort'))}`}</Field.Label>
                <SingleSelect value={sortKey} onChange={setSortKey} size={'S'}>
                  {fields.map((field: string) => (
                    <SingleSelectOption value={field} key={field}>
                      {field}
                    </SingleSelectOption>
                  ))}
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
          </div>
        </>
      )}
    </div>
  );
};

export default CollectionTypeInputWidget;
