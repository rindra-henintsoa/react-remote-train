import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import useFetch from "../hooks/useFetch";

const Post = () => {
    
    const { loading, posts, errors } = useFetch(`${process.env.REACT_APP_API_ROOT}/posts?_embed`);

    return (
        <>
            <div className="mx-auto max-w-prose text-center py-12">
                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                    Wordpress Post API retriever
                </h3>
            </div>
            { loading && <div className="text-center">Chargement...</div>}
            { errors && 
                <div className="text-center text-red-500">
                    {errors.toString()}
                </div>
            }
            { posts &&
                <div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                        {
                            posts && posts.map((post)=>{
                                const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                                return (
                                    <div className="h-32 rounded bg-gray-300">
                                        <article key={post.id} className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25">
                                            {featuredImage && (
                                                <img alt={post.title.rendered} src={featuredImage} className="h-56 w-full object-cover" />
                                            )}

                                            <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
                                            <time datetime="2022-10-10" className="block text-xs text-gray-500 dark:text-gray-400">
                                                10th Oct 2022
                                            </time>

                                            <a href="#">
                                                <h3 className="mt-0.5 text-lg text-gray-900 dark:text-white">
                                                    {parse(post.title.rendered)}
                                                </h3>
                                            </a>

                                            <div className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                                                {parse(post.content.rendered)}
                                            </div>
                                            </div>
                                        </article>
                                    </div>   
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}   

export default Post;