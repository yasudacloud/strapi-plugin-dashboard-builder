import { Flex, Typography } from '@strapi/design-system';
import { CheckCircle } from '@strapi/icons';
import React from 'react';
import styled from "styled-components";

interface Props {
  title: string;
}

const Center = styled(Flex)`
  align-items: center;
  position: relative;
  top: 70px;
  justify-content: center;
  color: #666;
`

const WidgetTitle = (props: Props) => {
  return (
    <Center>
      <CheckCircle width={24} height={24} />
      &nbsp;
      <Typography variant={'beta'}>{props.title}</Typography>
    </Center>
  );
};

export default WidgetTitle;
