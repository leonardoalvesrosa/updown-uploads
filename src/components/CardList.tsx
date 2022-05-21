import { Box, Flex, SimpleGrid, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

interface ModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function CardList({ cards }: CardsProps): JSX.Element {

  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgUrl, setImgUrl] = useState('');

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  const handleViewImage = (url: string): void => {
    onOpen();
    setImgUrl(url);
  }


  return (

    <>
      <Flex
        justify={'space-evenly'}
        flexWrap={'wrap'}
      >
        {cards?.map(card => (
          <>
            <Card
              data={card}
              viewImage={() => handleViewImage(card.url)}
              key={card.id}
            />
          </>
        ))}
      </Flex>

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={imgUrl}
      />

    </>

  );

}

