import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Blog } from "../entity/Blog";
import * as cache from "memory-cache";

export class BlogController {

    static async getBlogs(req: Request, res: Response) {
        const keyCache = 'all_blogs'
        const data = cache.get(keyCache)
        if(data) {
            return res.status(200).json({ data, cache: "true"})
        }else{
            const blogRepository = AppDataSource.getRepository(Blog)
            const blogs = await blogRepository.find()

            cache.put(keyCache, blogs, 300)
            return res.status(200).json({ data: blogs, cache: "false"})
        }
    }

    static async getBlogById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if(!id){
            return res.status(400).json({
                message: "id not provided"
            })
        }
        const keyCache = 'blog_'+id
        const data = cache.get(keyCache)
        if(data){
            return res.status(200).json({ data, cache: "true"})
        }else{
            const blogRepository = AppDataSource.getRepository(Blog)
            const blog = await blogRepository.findOne({ where: { id }});

            cache.put(keyCache, blog, 300)
            return res.status(200).json({ blog, cache: "false"})
        }
    }

    static async createBlog(req: Request, res: Response) {
        const { title, content } = req.body;
        if(!title ||!content) {
            return res.status(400).json({
                message: "title and content are required"
            })
        }
        const blog = new Blog()
        blog.title = title
        blog.content = content
        blog.views = 0
        blog.createdAt = new Date()
        blog.updatedAt = new Date()
        blog.user = req["currentUser"]
        const blogRepository = AppDataSource.getRepository(Blog)
        await blogRepository.save(blog)
        return res.status(200).json({ message: "Blog created successfully", data:blog})
    }

    static async updateBlog(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if(!id){
            return res.status(400).json({
                message: "id not provided"
            })
        }
        const { title, content } = req.body;
        if(!title ||!content) {
            return res.status(400).json({
                message: "title and content are required"
            })
        }
        const blogRepository = AppDataSource.getRepository(Blog)
        const blog = await blogRepository.findOne({ where: { id }});
        blog.title = title
        blog.content = content
        blog.updatedAt = new Date()
        await blogRepository.save(blog)
        return res.status(200).json({ message: "Blog updated successfully", data:blog})
    }

    static async deleteBlog(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        if(!id){
            return res.status(400).json({
                message: "id not provided"
            })
        }
        const blogRepository = AppDataSource.getRepository(Blog)
        const blog = await blogRepository.findOne({ where: { id }});
        await blogRepository.remove(blog)
        return res.status(200).json({ message: "Blog deleted successfully", data:blog})
    }

}