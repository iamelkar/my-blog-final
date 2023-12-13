'use client';
import ReactTextareaAutosize from "react-textarea-autosize";
import { updateBlog } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import Header from "@/components/header";

const inputClass = "w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300";
    
export default async function Page({params}: {params: {id: string}}) {
    const id = params.id;
    const data = await prisma.blogs.findUnique({
        where: {
            id
        },
    });

    const updateBlogWithId = updateBlog.bind(null, params.id);
    return(
    <div>
        <Header/>
        <form action={updateBlogWithId} className="max-w-md mx-auto p-4" >
            <div className="mb-4">
                <input type="text" className={inputClass} name="title"
                defaultValue={data?.title} />
            </div>

            <div className="mb-4">
                <ReactTextareaAutosize minRows={5} name="content" 
                className={inputClass}
                defaultValue={data?.content} />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold
            py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300
            w-full disabled:bg-gray-100">Submit</button>
        </form>
    </div>
    )
}