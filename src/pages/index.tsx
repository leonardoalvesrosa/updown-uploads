import { Button, Box, Flex } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { Card } from '../components/Card';
import { string } from 'yup';


interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImagesResponse {
  data: {
    after: string;
    data: Image[];
  }
}

export default function Home(): JSX.Element {

  const fetchImages = async ({ pageParam = 0 }): Promise<GetImagesResponse> =>
    await api
      .get(`/api/images`, {
        params: {
          after: pageParam,
        },
      })
      .then(res => res);


  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError
  } = useInfiniteQuery(
    'images', fetchImages, {
    getNextPageParam: lastPage => lastPage?.data.after || null
  }
  );


  const formattedData = useMemo(() => {
    return data?.pages.map(({ data: currentData }) =>
      currentData.data).flat();
  }, [data]);



  if (isLoading && !isError) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Error />;
  }


  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>

        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage
              ? 'Carregando...'
              : 'Carregar mais'
            }
          </Button>
        )}
      </Box>
    </>
  );
}
