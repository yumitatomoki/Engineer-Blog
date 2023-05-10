import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Card,
  CardBody,
  Stack,
  SimpleGrid,
  Center,
} from '@chakra-ui/react'
// eslint-disable-next-line import/named
import { EntryCollection } from 'contentful'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { IMyPostsFields } from '../../@types/generated/contentful'
import { client } from '../utils/contentfulClient'

type BLOGProps = {
  blogPosts: EntryCollection<IMyPostsFields>['items']
}

const BLOG: NextPage<BLOGProps> = ({ blogPosts }) => {
  return (
    <>
      <Box bgColor={'blackAlpha.100'} py={100}>
        <Container maxW={1024} display={{ base: 'none', md: 'flex', sm: 'none' }}>
          <SimpleGrid columns={3} spacing={5}>
            {blogPosts &&
              blogPosts.map((post) => (
                <Link href={`posts/${post.fields.slug}`} key={post.sys.id}>
                  <Card maxW='sm' _hover={{ opacity: 0.7 }} transition='0.5s'>
                    <CardBody>
                      <Image
                        src={post.fields.image.fields.file.url}
                        alt={post.fields.image.fields.title}
                        borderRadius='lg'
                      />
                      <Stack mt='6' spacing='3'>
                        <Heading size='md'>{post.fields.title}</Heading>
                      </Stack>
                      <Text textAlign='right'>{post.sys.createdAt.substring(0, 10)}</Text>
                    </CardBody>
                  </Card>
                </Link>
              ))}
          </SimpleGrid>
        </Container>
        <Container maxW={1024} display={{ base: 'block', md: 'none', sm: 'block' }}>
          <SimpleGrid columns={1} spacing={5}>
            {blogPosts &&
              blogPosts.map((post) => (
                <Link href={`posts/${post.fields.slug}`} key={post.sys.id}>
                  <Center h='100%'>
                    <Card maxW='sm' _hover={{ opacity: 0.7 }} transition='0.5s'>
                      <CardBody>
                        <Image
                          src={post.fields.image.fields.file.url}
                          alt='Green double couch with wooden legs'
                          borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                          <Heading size='md'>{post.fields.title}</Heading>
                        </Stack>
                        <Text textAlign='right'>{post.sys.createdAt.substring(0, 10)}</Text>
                      </CardBody>
                    </Card>
                  </Center>
                </Link>
              ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  )
}

export default BLOG

export const getServerSideProps: GetServerSideProps<BLOGProps> = async () => {
  const res = await client.getEntries<IMyPostsFields>({
    content_type: 'blogPosts',
  })

  const data = await res.items

  return {
    props: {
      blogPosts: data,
    },
  }
}
