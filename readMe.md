# start 17.06.24
This file is for test my knowledge  the express , mongoose, react, nodejs
# Step 1
//BACKEND// 
1. Будування серверної частини у папці server
1.1. ініціалізація та загрузка пакетів express, mongoose, cors, bcryptjs, dotenv, jsonwebtoken та nodemon -D. Cors - пакет для того щоб ми могли відправляти запроси з різних api-адрес і у бекенда не було проблем, dotenv - для змінних, jsonwebtoken - для регістрації та отримання токіна
1.2. створення файлу index.js та скріпту запуску dev, всановлюємо type:"module"
1.3. Підключення на index сервера через express та бази даних через mongoose
1.4. Створення файлу .gitignore та ігнорування в ньому папки  node_modules
## commit 'create server and connect db'
1.5. У файлі index.js  формуємо підключення до MongoDB  за допомогою констант-ключив пакету dotenv та його файлу .env
## commit 'config connect to MongoDB'
1.6. Налаштовуємо мінімальні налаштування нашого express, це підключення пакету cors - пакет для того щоб ми могли відправляти запроси з різних api-адрес і у бекенда не було проблем. А також app.use(express.json()); для того щоб сказати що ми бубемо постійно приймати з фронтенда запроси у форматі json.
## commit 'min config express'
1.7. перевіряємо роботу бекенда: для цього створюємо запрос (endpoint) та тестуємо на Постмене
## commit 'text work backend-frontend'
2. Регістрація та авторізація. Початок створення застосунку.
2.1. Регістрація 
2.1.1 Створюємо модель User
2.1.2 Створюємо роут та контролер для регістрації.  Внеси токен у регістрації так же як і у логін (Дивись 7.9.) 
2.1.3 Перевіряємо на Постмане пост запрос: реєструемо нового юзера test, а потім перевіряемо знову його. Повинно відповісти що юзер вже зареєстрован
## commit 'start registration'
2.2. Login. Створеня входження зареєстрованого юзера
2.2.1. Створюємо роут та контролер для логіна
2.2.2. У контролері у фунціі логін також застосовуємо токін. Він потрібен для з'ясування: ми зайшли у систему або ні (авторізувались чи ні). Може використовуватись для захисту деяких роутов для доступу. Наприклад: як до нашего застосунку то якщо ми не залогінились то не можемо додати пост можемо тільки дивитись. У файлі .env створюємо постійну JWT_SECRET=1234qwer12345asdf. У контролері { expiresIn: "30d" } це час дії токена
2.2.3 Перевіряємо на Постмані пост логін. На тому ж самому юзері test. Повинні отримати юзера і повідомлення що ми зайшли у систему
## commit 'add login of the user'
2.3.1. Get Me. Це отримання самого профілю. Тут перевіряєтся є токін чи немає. Це й роут відпрацьовує постій но якщо ви наприклад оновлюєте сторінку
2.3.2. Для цього створюємо додаткову функцію checkAuth у папці utils. В ній вшиваємо у запити нову властивість userId
2.3.3. Створюємо роут та контролер для нього.
2.3.4. тут ми вже використовуємо вшитий userId у запитах для пошуку юзера
## commit 'add Get Me of the user'
# Step 2
//FRONTEND
3. Формуємо реакт застосунок
3.1. Створюємо папку фронтенда client та грузимо реакт-застосунок \npx create-react-app .\. Прибираємо зайві файли з арр. Підключаємо шріфт попінс
3.2. Загружаємо пакет Tailwind CSS /npm install -D tailwindcss/
3.3. Ініціалізуємо \npx tailwindcss init\ і у з'явившейся папці конфіг налаштовуємо конфігурацію згідно сайту. Копіюємо з сайту налаштування у файлі index.css
4. Формуємо папки pages та components з компонентами сторінок формату .jsx
5. Встановлюємо пакети \npm i react-router-dom\. Перевіряємо відображення у браузері
## commit 'create react app & congif it'
6. Створюємо роутінг та формуємо сторінки.
6.1. У файлі index.js огортаємо App у роутінг всього зостосунку - BrowserRouter
6.2. Формуємо роути(Route) у App.js
6.3. Формуємо компонент Layout
6.4. Формуємо компонент Navbar
6.5. Потрітно перегрузити застосунок щоб налаштування Tailwind CSS почали діяти
6.6. Реалізація форми(сторінки) login. 
6.6.1 Для цього тимчасово у Navbar потрібно \const isAuth = true\ встановити false, що відповідає положенюю при логінізації
6.6.2 Формуємо сторінку-компонент LoginPage
6.6.3. Перевіряємо відображення у браузері
6.7. Реалізація форми(сторінки) регісткація RegisterPage.
6.7.1. Так як форми сторінок обнакові то копіюємо логін сторінку і вносимо деякі зміни
6.7.2. Перевіряємо відображення у браузері
## commit 'add pages & component. Routing. Login&Registation'
7. Застосовуємо REDUX
7.1. Грузимо пакети \@reduxjs/toolkit\ та \react-redux\
7.2. Створюємо папку redux і там папку features та файл store.js. Заповнюемо файл
7.3. У файлі index.js огортаємо у Provider застосунок App  і додаємо проп store до Provider
7.4. Створюємо у папці  features папку auth з файлом authSlice.js
7.5. Загружаємо пакети axios
7.6. Створююмо папку units з файлом axios. Доповнюємо вньому axios
7.7. Заповнюємо файл authSlice.js початково з фунцією authSlice 
7.8. Там же створюємо асінхроний запрос registerUse.
7.9. //BACKEND//  Внесли забутий токен у регістрації на бекенді в контролерс  auth
7.10. вмикаємо кнопку "підтвердити" у RegisterPage. Перевіряємо у роботу на браузері при створені адміна отримуємо його у бд
## commit 'Registration user is working'
8. Застосовуемо Toastify для визуалізації вспливаючих повідомлень про події та помилки
8.1. \npm i react-toastify\
8.2. імпортуємо його у App.js, а потім в RegisterPage і там його використовуєм
8.3. Перевіряємо в браузері Спочатку зареєструвати тогож самого адміна а потім нового
## commit 'add react-toastify'
9. Авторизація
9.1. Починаємо у authSlice створюємо loginUser асінх.запрос
9.2. Далі ідемо в LoginPage і робимо як у RegisterPage
9.3. Перевіряємо в браузері на Авторизації адміна. Дивимось що в нетворк є запит а у локалсторідж є токен
## commit 'autorisation login'
10. Get Me отримання профілю
10.1. Починаємо у authSlice створюємо GetMe асінх.запрос та змінну checkIsAuth
10.2. В App.js додаємо GetMe котре буде діспачитись при кожному оновленю сторінки. Тим самим зареєстрованому юзеру не прий дется кожен раз реєтруватись
10.3. Повертаємось у authSlice і для того щоб при натискані кнопки вийти нам почистити ключи та токіни створюємо у reducers функцію logout. В неї ми оновлюємо наш стайт
10.4. Далі в Navbar у змінній isAuth через useSelector даємо значення (checkIsAuth) і проводимо інші дії о видаленю токена з локалсторідж
10.5. Перевіряємо роботу у брайзері. ПРи натискані на кнопку  вийти з локалсторідж токін видаляеться
10.6. У LoginPage створюємо isAuth та навігацію для переходу на головну сторінку
10.7. Теж саме проводимо для RegisterPage
## commit 'add GetMe & finish authorisation'
# Step 3
/BACKEND/
11. Створення Поста
11.1. Створюємо файл моделі поста Post
11.2. У папці routes створюємо файл posts і пишемо код для Create post
11.3. У файлі index.js додаємо роут для поста і імпортуємо його
11.4. У папці controllers створюємо файл postControllers. Пишемо код для createPost.
11.5. Для файлів постів(майбутні картинки) створюємо у папці server папку uploads
11.6. Продовжуємо код у файлі postControllers
## commit 'create Post into backend'
# Step 4
/FRONTEND/
12. Додавання поста AddPostPage
12.1. Заповнюємо кодом сторінку додавання поста AddPostPage в частині форми і дивимось результат у браузері
12.2. Створюємо у папці redux папку post з файлом postSlice.js. Пишемо код для  postSlice
12.3. Йдемо у store і робимо редюсер для post: postSlice,
12.4. Пишемо у файлі postSlice функцію котра буде експортувати пост- createPost. А далі доповнюємо екстраредюсер "створення поста"
12.5. В файлі AddPostPage дописуємо код з єкшинами.
12.6. Для того щоб вірно вказати шлях для зображення котре лежить в середині імпута потрібно прописати: \img src={URL.createObjectURL(image)}\
12.6. //BACKEND// Для того щоб ми могли загружати картинки нам потрібні додаткові пакети тому повертаємось у папку сервер і загружаємо - npm i express-fileupload.
12.7. //BACKEND// Далі у файлі index.js імпортуємо import fileUpload from "express-fileupload"; і створюємо Middleware: app.use(fileUpload()); та app.use(express.static('uploads')). 
Де uploads це шлях коди будуть загружатись зображення
12.8. Перевіряємо у браузері загрузку поста з зображенням та отримання потса в бд.
## commit 'The adding of the Post'
# Step 5
13. Отримання всі постів Get All Post
/BACKEND/
13.1. Йдемо routes/posts.js створюємо роут для функції getAll
13.2. Далі у controllers/postsController створюємо функцію getAll
/FRONTEND/
13.3. Далі у postSlice.js створюємо асінх.функцію getAllPosts та доповнюємо екстраредюсер
13.3. Переходимо у MainPage.js та пишемо код сторінки
13.4. У components створюємо сторінку PostItem. Пишемо код сторінки
13.5. Встановлюємо додаткову бібліотеку \npm install react-icons --save\ для реакт іконок та імпортуємо іконки у PostItem
13.6. Також встановлюємо бібліотеку \npm i react-moment\ та імпортуємо Moment для встановлення формату дати
13.7. У components створюємо сторінку PopularPosts. Пишемо код сторінки
13.8. У MainPage.js отримуємо posts та передаємо як пропси post у сторінки PostItem та PopularPosts
## commit 'Get all Posts'
14. Отримання поста по id. getById
/BACKEND/ 
14.1. Йдемо routes/posts.js створюємо роут для функції getById
14.2. Далі у controllers/postsController створюємо функцію getById
/FRONTEND/
14.3. Сторінка де ми цей пост будемо показувати PostPage.jsx. Пишемо код.
14.4. PostItem ми обгортали у Link для того щоб отримати params.id коли ми обираємо пост клікаючи по ньому де вказано \\Link to={`/${post._id}`}\\. 
14.5. Перевіряємо у браузері клікаючи на пост ми на нього переходимо.(4:09:50 відіо)
## commit 'Get Post by ID start'
15. Виводимо мої пости get My Posts
/BACKEND/ 
15.1. Йдемо routes/posts.js створюємо роут для функції getMyPosts
15.2. Далі у controllers/postsController створюємо функцію getMyPosts
/FRONTEND/
15.3. Йдемо на сторінку PostsPage.jsx. Пишемо код.
15.4. перевіряємо на браузері в закладці мої пости
## commit 'get My Posts'










