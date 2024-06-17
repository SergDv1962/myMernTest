import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
   //нам потрібно з headers запиту у authorization витягнути значеня token. 
   // для цього він використовує метод replace з регуляторним виразом, 
   // але це можна зробити за допомогою методу split як це робив лектор у Genius Space
   // У network можно побачити req.headers.authorization = Bearer qwerety1234567ghjkdfghjkl;'vbnm,.hjkl;'  --після Bearer строка  token
   const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

   if(token) {
      try {
         //разшифровуємо токін
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         //вшиваємо нове поле userId у req для подальшого використання. З цього воно буде постійно присутне у запитах
         req.userId = decoded.id

         next()
      } catch (error) {
         return res.json({
            message: 'Не має доступу'
         })
      }
   } else {
      return res.json({
         message: 'Не має доступу'
      })
   }
}