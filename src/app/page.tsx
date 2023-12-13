import Image from 'next/image'
import FormNewPost from '@/components/add-post'
import Header from '@/components/header'
import { prisma } from '@/lib/prisma'
import Link from 'next/link';
import { deleteBlog, readBlog } from '@/lib/actions';

export default async function Home() {
  const data = await prisma.blogs.findMany();

  return (
    <main className="max-w-4xl mx-auto my-5 ">
      <Header/>
    <FormNewPost/>

    <h1 className='font-bold mt-6 p-2'> BLOGS</h1>
    <div className="w-fit py-2 px-3 border border-black-300 rounded-md">
      {data.map((item) => {

        const deleteBlogWithId = deleteBlog.bind(null, item?.id);
        const readBlogWithId = readBlog.bind(null, item?.id);

        return(

          <div className='px-4 py-2 underline block' key={item?.id}>
            <div className='inline-flex justify-center items-center gap-2'>
              <Link href={`/blogs/${item?.id}`}>
                <p>{item?.title}</p></Link> 
              <form className='bg-red-600 p-2 w-fit rounded-lg' action={deleteBlogWithId}>
                <button type="submit" className='text-white font-bold'>
                  Delete
                </button>
              </form>
            
              <div>
              {/* <form action={readBlogWithId}>  */}
                  <Link href={`/my-blog/src/blogPost/${item?.id}`}> 
                    <button className='bg-blue-600 p-2 w-fit rounded-lg
                    text-white font-bold gap-2'>View Blog</button>
                  </Link>
              {/*  </form> */}
              </div>
          </div>
        </div>
      )})}
    </div>
  </main>
  )
}
