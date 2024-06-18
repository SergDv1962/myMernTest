import Post from "../models/Post.js";
import User from "../models/User.js";
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