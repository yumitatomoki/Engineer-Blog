import { Box,Container, Flex, Heading, Image, Text,Center,} from '@chakra-ui/react'
import { EntryCollection } from 'contentful';
import React, { useEffect,useState } from 'react'
import {client} from '../utils/contentfulClient'
import { IMyPostsFields } from '../../@types/generated/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {options} from '../../lib/richTextOption';
import { GetServerSideProps } from "next";

const About = ({ myPosts }:{ myPosts: EntryCollection<IMyPostsFields>['items']}) => {

  const myPost = myPosts[0].fields;

  if(myPost === undefined) {
    return null
  }

  return (
    <>
      <Box bgColor={'blackAlpha.100'} py={100}>
        <Container maxW={1200}>
          <Center h='100%'>
            <Heading size='2xl'>{myPost.title}</Heading>
          </Center>
          <Flex my='50px' px={{ lg: '50px', base: '20px' }} gap='30px' display={{ lg: 'flex', base: 'grid' }}>
            <Box flexBasis='50%'>
              <Image mx='auto' src='/cat.jpg' alt='Cat' mr='auto'/>
            </Box>
            <Box flexBasis='50%'>
              <Box mt={20}>{documentToReactComponents(myPost.content,options)}</Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
} 

export default About;

export const getServerSideProps: GetServerSideProps = async () => {

  const res = await client.getEntries<IMyPostsFields>({
    content_type: 'myPosts'
  })

  const data = await res.items;

  return {
    props: {
      myPosts:data,
    },
  }
};
