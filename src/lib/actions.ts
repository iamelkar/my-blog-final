"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export async function createBlog(formData:FormData) {
  //    const rawFormData = {
 //       title: formData.get('title') as string,
 //       content: formData.get('content') as string,
 //     };

 const title = formData.get('title') as string;
 const content = formData.get('content') as string;
 await prisma.blogs.create({ data : { title, content } });
 revalidatePath("/");
}

export async function updateBlog(id: string, formData: FormData){
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    await prisma.blogs.update({ 
        where: {
            id,
        },
        data:{
            title,
            content,
        },
    });
    revalidatePath("/");
}

export async function deleteBlog(id: string) {
    await prisma.blogs.delete({
        where:{
            id
        }
    });
    revalidatePath('/');
}

export async function readBlog(id:string,){
    // await prisma.blogs.findUnique({
    //     where: {
    //         id
    //     }
    // });

    try {
        const blog = await prisma.blogs.findUnique({
          where: {
            id,
          }, 
        });

        return{
            props: {
                blog
            }
        }
    //     if (post) {
    //       console.log('Post found:', post);
    //     } else {
    //       console.log('Post not found');
    //     }
      } catch (error) {
        console.error('Error retrieving post:', error);
      } 

}