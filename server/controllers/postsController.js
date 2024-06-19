import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import path, {dirname} from "path"; //для можливості імпортувати картинку з запросу
import { fileURLToPath } from "url"; //для можливості імпортувати картинку з запросу

//Create Post
export const createPost = async (req, res) => {
   try {
      const { title, text } = req.body
      const user = await User.findById(req.userId)

      if(req.files) {
         //формуємо ім`я картинки, котру будемо загружати з request-а у папку uploads
         let fileName = Date.now().toString() + req.files.image.name
         // у __dirname ми отримаємо шлях папки у котрій ми знаходимось(у нашому випадку це controllers).
         const __dirname = dirname(fileURLToPath(import.meta.url))
         // переміщуємо картинку по сформованому нижче шляху
         //__dirname -текуща папка у котрій знаходимось
         //.. -виходимо з текущій папки
         //uploads -заходимо у цю папку
         //fileName - під яким ім'ям розміщуємо файл
         //mv -метод котрий здійснює переміщення
         req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
         // формуємо сам пост
         const newPostWithImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: fileName,
            author: req.userId
         })

         await newPostWithImage.save()
         //додаємо (push) до масива постів юзера його новий пост 
         await User.findByIdAndUpdate(req.userId, {
            $push: {posts: newPostWithImage}
         })

         return res.json(newPostWithImage)
      }
      //  але якщо пост прийшов без картинки то
      const newPostWithoutImage = new Post({
         username: user.username,
         title,
         text,
         imgUrl: '',
         author: req.userId,
      })
      await newPostWithoutImage.save()

      await User.findByIdAndUpdate(req.userId, {
         $push: { posts: newPostWithoutImage}
      })

      return res.json(newPostWithoutImage)

   } catch (error) {
      res.json('Something went wrong')
   }
}

//Get All Posts
export const getAll = async (req, res) => {
   try {
      const posts = await Post.find().sort('-createdAt')
      const popularPosts = await Post.find().limit(5).sort('-views')

      if(!posts) {
         return res.json({message: 'Постов не маємо'})
      }

      res.json({posts, popularPosts})
   } catch (error) {
      res.json({ message: 'Something went wrong'})
   }
}

//Get Post By Id
export const getById = async (req, res) => {
   
   try {
      // post = await Post.findOneAndUpdate({_id: req.params.id}, {...} //  той самий варіант пошуку post по id
      const post = await Post.findByIdAndUpdate(req.params.id, {
         $inc: { views: 1},  // збільшуємо кількість просмотрів кожен раз на одиницю
      })
      
      return res.json(post)
   } catch (error) {
      return res.json({ message: 'Something went wrong into getById'})
   }
}

//Get My Posts
export const getMyPosts = async (req, res) => {
   
   try {
      const user = await User.findById(req.userId)
      const list = await Promise.all(
         user.posts.map(post => {
            return Post.findById(post._id)
         })
      )

      return res.json(list)
   } catch (error) {
      return res.json({ message: 'Something went wrong into getById'})
   }
}

//Remove post
export const removePost = async (req, res) => {
   
   try {
      const post = await Post.findByIdAndDelete(req.params.id)
      if(!post) return res.json('Цього поста не існує')
      
      await User.findByIdAndUpdate(req.userId, {
         $pull: {posts: req.params.id},
      })
      return res.json({message: 'Пост був видалений'})
   } catch (error) {
      return res.json({ message: 'Something went wrong into getById'})
   }
}

//Update post
export const updatePost = async (req, res) => {
   
   try {
      const { title, text, id } = req.body
      const post  = await Post.findById(id)

      if(req.files) {
         let fileName = Date.now().toString() + req.files.image.name
         const __dirname = dirname(fileURLToPath(import.meta.url))
         req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
         post.imgUrl = fileName || ''
      }

      post.title = title
      post.text = text

      await post.save()
      
      res.json(post)
   } catch (error) {
      return res.json({ message: 'Something went wrong into updatePost'})
   }
}

// Get Post Comment
export const getPostComments = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)
      const list = await Promise.all(
         post.comments.map((comment) => {
            return Comment.findById(comment)
         })
      )
      //повертаємо перелік всіх коментів
      return res.json(list) 
   } catch (error) {
      return res.json({ message: 'Something went wrong into getPostComments'})
   }
}