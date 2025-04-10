import {SingleTypeMetaFields, WidgetProps, WidgetType} from '../../../../types';
import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Table, Tbody, Tr, Td, Th } from '@strapi/design-system';
import WidgetError from '../WidgetError';
import { useWidget } from '../../provider';
import WidgetContainer from "../WidgetContainer";

const SingleTypeWidget = (props: WidgetProps) => {
  const { isPreview, row_index, uuid } = props;
  const [fields, setFields] = useState<string[]>([]);
  const [singleTypeData, setSingleTypeData] = useState<string[]>([]);
  const client = useFetchClient();
  const { data } = useWidget();

  useEffect(() => {
    if (isPreview) {
      const dashboardWidget = data[row_index].children.find((widget) => widget.uuid === uuid);
      const { singleType, fields } = dashboardWidget?.metafields as SingleTypeMetaFields;
      setFields(fields ?? []);
      const hasParameter = singleType && fields && fields.length > 0;
      if (hasParameter) {
        client.get(`/content-manager/single-types/${singleType}`).then((response) => {
          const params: string[] = [];
          fields.forEach((field) => {
            params.push(response.data.data[field] ?? '');
          });
          setSingleTypeData(params);
        });
      }
    }
  }, [isPreview]);

  if (fields.length === 0) {
    return <WidgetError />;
  } else {
    return (
      <WidgetContainer widgetType={WidgetType.singleType}>
        <Table>
          <Tbody>
            <Tr>
              {fields.map((field) => (
                <Td key={field}>{field}</Td>
              ))}
            </Tr>
            <Tr>
              {singleTypeData.map((field) => (
                <Td key={field}>{field}</Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </WidgetContainer>
    );
  }
};

export default SingleTypeWidget;
