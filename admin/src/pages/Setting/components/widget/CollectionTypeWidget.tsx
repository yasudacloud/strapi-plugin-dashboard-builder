import { CollectionTypeMetaFields, WidgetProps, WidgetType } from '../../../../types';
import { EmptyStateLayout, Table, Tbody, Td, Tr } from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import WidgetError from '../WidgetError';
import { useWidget } from '../../provider';
import WidgetContainer from '../WidgetContainer';

const CollectionTypeWidget = (props: WidgetProps) => {
  const { isPreview, row_index, uuid } = props;
  const [fields, setFields] = useState<string[]>([]);
  const { data } = useWidget();
  const [tableData, setTableData] = useState([]);

  const client = useFetchClient();
  useEffect(() => {
    if (isPreview) {
      const dashboardWidget = data[row_index].children.find((widget) => widget.uuid === uuid);
      const { collectionType, fields, sortKey, sortAction } =
        dashboardWidget?.metafields as CollectionTypeMetaFields;
      setFields(fields ?? []);
      const hasParameter = collectionType && fields && fields.length > 0 && sortKey && sortAction;
      if (hasParameter) {
        const url = `/content-manager/collection-types/${collectionType}?page=1&pageSize=10&sort=${sortKey}%3A${sortAction}`;
        client.get(url).then((response) => {
          setTableData(response.data.results);
        });
      }
    }
  }, [isPreview]);

  if (fields.length === 0) {
    return <WidgetError />;
  } else {
    if (tableData.length === 0) {
      return <EmptyStateLayout content={'No Data'} />;
    }
    return (
      <WidgetContainer widgetType={WidgetType.collectionType}>
        <Table>
          <Tbody>
            <Tr>
              {fields.map((field) => (
                <Td key={field}>{field}</Td>
              ))}
            </Tr>

            {tableData.map((row: any, index) => (
              <Tr key={index}>
                {fields.map((field) => (
                  <Td key={`${index}_${field}`}>{row[field]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </WidgetContainer>
    );
  }
};

export default CollectionTypeWidget;
