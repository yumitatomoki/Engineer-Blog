import { Box,Container,Heading,Text, Center} from '@chakra-ui/react'
import { EntryCollection } from 'contentful';
import {client} from '../../utils/contentfulClient'
import { IMyPostsFields } from '../../../@types/generated/contentful'
import { NextPage,GetServerSideProps, GetServerSidePropsResult} from "next";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {options} from '../../../lib/richTextOption';

type PostDetailsPageProps = {
  blogPost: EntryCollection<IMyPostsFields>['items'][0]
}

const PostDetailsPage: NextPage<PostDetailsPageProps> = ({blogPost}) => {

  return (
    <Container maxW={1024}>
      <Center>
        <Heading mr='auto'>{blogPost.fields.title}</Heading>
        <Text>{(blogPost.sys.createdAt).substring(0, 10)}</Text>
      </Center>
      <Box>{documentToReactComponents(blogPost.fields.content,options)}</Box>
    </Container>
  )
} 

export default PostDetailsPage;

export const getServerSideProps: GetServerSideProps<PostDetailsPageProps> = async ({ params }) : Promise<GetServerSidePropsResult<PostDetailsPageProps>> => {
  const { items } = await client.getEntries<IMyPostsFields>({
    content_type: 'blogPosts',
    'fields.slug': (params?.slug ?? '').toString(),
  });

  if (!items.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: { blogPost: items[0] },
  };
};

