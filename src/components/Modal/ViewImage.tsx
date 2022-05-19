import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Button,
  Box,
  useBreakpointValue
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
  // size: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
  // size,
}: ModalViewImageProps): JSX.Element {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })


  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
      <ModalOverlay />
      {isWideVersion ?
        <ModalContent w={'80%'}>
          <Image src={imgUrl} alt="image" />
          <ModalFooter bg={'gray.50'}>
            <Link href={imgUrl} isExternal>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
        :
        <ModalContent w={'50%'}>
          <Image src={imgUrl} alt="image" />
          <ModalFooter bg={'gray.50'}>
            <Link href={imgUrl} isExternal>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      }
    </Modal >
  )
}
