import Head from 'next/head'
import Link from 'next/link';

import { Header } from '../src/components/Header';
import { Hero } from '../src/components/Hero';
import { Post } from '../typing';

import { sanityClient, urlFor } from "../sanity";

interface Props {
  posts: [Post];
}

export function Home({ posts }: Props) {

  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Hero />

      {/* Post */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group cursor-pointer rounded-lg border overflow-hidden'>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={
                urlFor(post.mainImage).url()!
              } alt="" />

              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className="text-xs">{post.description} by {post.author.name}</p>
                </div>

                <img className='h-12 w-12 rounded-full object-fill' src={urlFor(post.author.image).url()!} alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    author-> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    }
  }
};