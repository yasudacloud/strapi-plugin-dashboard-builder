import { Box, Flex, Status, Table, Tbody, Typography } from '@strapi/design-system';
import { WidgetProps, WidgetType } from '../../../../types';
import React, { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Tr } from '@strapi/design-system';
import { Td } from '@strapi/design-system';
import { Pencil } from '@strapi/icons';
import { TextButton } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import WidgetTitle from '../WidgetTitle';
import WidgetContainer from '../WidgetContainer';
import LocalizedDate from '../LocalizedDate';
import { translate } from '../../../../translate';

const capitalise = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const DocumentStatus = ({ status = 'draft' }: any) => {
  const statusVariant =
    status === 'draft' ? 'secondary' : status === 'published' ? 'success' : 'alternative';
  const { formatMessage } = useIntl();

  return (
    <Status variant={statusVariant} size="XS">
      <Typography tag="span" variant="omega" fontWeight="bold">
        {formatMessage({
          id: `content-manager.containers.List.${status}`,
          defaultMessage: capitalise(status),
        })}
      </Typography>
    </Status>
  );
};

const Title = styled(Typography)`
  color: #888;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const LastPublishWidget = (props: WidgetProps) => {
  const { isPreview } = props;
  const [data, setData] = useState<any[]>([]);
  const client = useFetchClient();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  useEffect(() => {
    if (isPreview) {
      client.get('/admin/homepage/recent-documents?action=publish').then((response) => {
        setData(response.data.data);
      });
    }
  }, [isPreview]);
  if (!isPreview) {
    return (
      <WidgetTitle title={formatMessage(translate('type.lastPublish', 'Last Published Entries'))} />
    );
  }
  return (
    <WidgetContainer widgetType={WidgetType.lastPublished}>
      <Flex
        width="100%"
        hasRadius
        direction="column"
        alignItems="flex-start"
        tag="section"
        gap={4}
        aria-labelledby={''}
      >
        <Box width={'100%'}>
          <Table colCount={5} rowCount={data.length} width={'100%'}>
            <Tbody>
              {data.map((entry) => (
                <Tr key={entry.documentId}>
                  <Td>
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {entry.title}
                    </span>
                  </Td>
                  <Td>
                    {formatMessage({
                      id: entry.kind,
                      defaultMessage: entry.kind,
                    })}
                  </Td>
                  <Td>{entry.status && <DocumentStatus status={entry.status} />}</Td>
                  <Td>
                    {entry.publishedAt && <LocalizedDate date={new Date(entry.publishedAt)} />}
                  </Td>
                  <Td>
                    <TextButton
                      onClick={() => {
                        if (entry.link) {
                          navigate(entry.link);
                        }
                      }}
                    >
                      <Pencil />
                    </TextButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </WidgetContainer>
  );
};
export default LastPublishWidget;
