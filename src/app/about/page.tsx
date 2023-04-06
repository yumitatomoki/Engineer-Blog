'use client'

import { Box,Container, Flex, Heading, Image, Text,Center,} from '@chakra-ui/react'
import { EntryCollection } from 'contentful';
import React, { useEffect,useState } from 'react'
import {client} from '../../utils/contentfulClient'
import styles from "./index.module.css";


type MyPost = {
  title:string
}

export default function page() {

  const [items,setItems] = useState<EntryCollection<MyPost>['items']>([]);

  useEffect(() => {
    (async () => {
      const res = await client.getEntries<MyPost>({
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
              <Text mt={20} >神奈川県出身のエンジニア。23歳の時にIT業界に転職し、常に新しい言語やフレームワークに興味を持ち、最新の技術について学ぶことに情熱を注いでいます。今後もさらにスキルを向上させ、ビジネス価値を提供できるエンジニアとして成長していきたいと思っています！</Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
} 
