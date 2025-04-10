import {Flex, Typography} from '@strapi/design-system';
import styled from 'styled-components';

const Center = styled(Flex)`
  position: relative;
  top: 70px;
  justify-content: center;
`

const ErrorText = styled(Typography)`
  color: #ff3333;
`;

const WidgetError = () => {
  return (
    <>
      <Center style={{ textAlign: 'center' }}>
        <ErrorText variant={'beta'}>Setting Error</ErrorText>
      </Center>
    </>
  );
};

export default WidgetError;
