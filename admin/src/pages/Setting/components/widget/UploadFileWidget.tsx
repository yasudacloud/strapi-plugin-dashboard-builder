import { Table, Tbody, Td, Tr } from '@strapi/design-system';
import {UploadFileMetaFields, WidgetProps, WidgetType} from '../../../../types';
import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { useWidget } from '../../provider';
import WidgetContainer from "../WidgetContainer";

const UploadFileWidget = (props: WidgetProps) => {
  const { isPreview, row_index, uuid } = props;
  const { data, widgetConfig } = useWidget();
  const [uploadData, setUploadData] = useState([]);
  const client = useFetchClient();

  useEffect(() => {
    const dashboardWidget = data[row_index].children.find((widget) => widget.uuid === uuid);
    const { sortKey, sortAction } = dashboardWidget?.metafields as UploadFileMetaFields;
    if (sortKey && sortAction) {
      const url = `/upload/files?sort=${sortKey}:${sortAction}&page=1&pageSize=5`;
      client.get(url).then((response) => {
        setUploadData(response.data.results);
      });
    }
  }, [isPreview]);

  return (
    <WidgetContainer widgetType={WidgetType.uploadFile}>
      <Table>
        <Tbody>
          <Tr>
            <Td>image</Td>
            <Td>size</Td>
            <Td>created</Td>
          </Tr>

          {uploadData.map((row: any) => (
            <Tr key={row.id}>
              <Td>
                <img src={row.url} draggable={false} className={'thumbnail'}/>
              </Td>
              <Td
                style={{
                  whiteSpace: 'break-spaces',
                  minWidth: 120,
                }}
              >
                {row.name}
                <br />
                {row.size}
              </Td>
              <Td>{row.createdAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </WidgetContainer>
  );
};
export default UploadFileWidget;
