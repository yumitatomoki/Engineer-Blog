'use client'

import { Box,Container, Flex, Heading, Image, Text,Center,} from '@chakra-ui/react'
import { EntryCollection } from 'contentful';
import React, { useEffect,useState } from 'react'
import {client} from '../../utils/contentfulClient'
import { IMyPostsFields } from '../../../@types/generated/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {options} from '../../../lib/richTextOption';


export default function Page() {

  const [items,setItems] = useState<EntryCollection<IMyPostsFields>['items']>([]);


  useEffect(() => {
    (async () => {
      const res = await client.getEntries<IMyPostsFields>({
        content_type: 'myPosts'
      })
      setItems(res.items)
    })()
  }, [])

  const myPost = items[0]

  if(myPost === undefined) {
    return null
  }

  return (
    <>
      <Box bgColor={'blackAlpha.100'} py={100}>
        <Container maxW={1200}>
          <Center h='100%'>
            <Heading size='2xl'>{myPost.fields.title}</Heading>
          </Center>
          <Flex my='50px' px={{ lg: '50px', base: '20px' }} gap='30px' display={{ lg: 'flex', base: 'grid' }}>
            <Box flexBasis='50%'>
              <Image mx='auto' src='/cat.jpg' alt='Cat' mr='auto'/>
            </Box>
            <Box flexBasis='50%'>
              <Text mt={20} >{documentToReactComponents(myPost.fields.content,options)}</Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
} 
