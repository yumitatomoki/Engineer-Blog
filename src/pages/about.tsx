import { Box, Container, Flex, Heading, Image, Center } from '@chakra-ui/react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
// eslint-disable-next-line import/named
import { EntryCollection } from 'contentful'
import { GetServerSideProps, NextPage } from 'next'
import { IMyPostsFields } from '../../@types/generated/contentful'
import { options } from '../../lib/richTextOption'
import { client } from '../utils/contentfulClient'

type AboutProps = {
  myPosts: EntryCollection<IMyPostsFields>['items']
}

const About: NextPage<AboutProps> = ({ myPosts }) => {
  const myPost = myPosts[0].fields

  if (myPost === undefined) {
    return null
  }

  return (
    <>
      <Box bgColor={'blackAlpha.100'} py={100}>
        <Container maxW={1200}>
          <Center h='100%'>
            <Heading size='2xl'>{myPost.title}</Heading>
          </Center>
          <Flex
            my='50px'
            px={{ lg: '50px', base: '20px' }}
            gap='30px'
            display={{ lg: 'flex', base: 'grid' }}
          >
            <Box flexBasis='50%'>
              <Image
                mx='auto'
                src={myPost.image.fields.file.url}
                alt={myPost.image.fields.title}
                mr='auto'
              />
            </Box>
            <Box flexBasis='50%'>
              <Box mt={20}>{documentToReactComponents(myPost.content, options)}</Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default About

export const getServerSideProps: GetServerSideProps<AboutProps> = async () => {
  const res = await client.getEntries<IMyPostsFields>({
    content_type: 'myPosts',
  })

  const data = await res.items

  return {
    props: {
      myPosts: data,
    },
  }
}
