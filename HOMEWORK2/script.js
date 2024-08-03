// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. 
// В этом классе будет приватное свойство для хранения списка книг, 
// а также методы для добавления книги, удаления книги и получения информации о наличии книги.
// Класс должен содержать приватное свойство #books, 
// которое инициализируется пустым массивом и представляет собой список книг в библиотеке.
// Реализуйте геттер allBooks, который возвращает текущий список книг.
// Реализуйте метод addBook(title), который позволяет добавлять книгу в список.
// Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию.
// Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке
//  и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента.
// Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library {
    #books = [];

    constructor(books) {
        try {
            if (books.length === new Set(books).size) {
                this.#books = books;
            } else {
                throw new Error('В библиотеку можно добавлять только уникальные книги, а у вас есть дубликаты');
            }
        } catch (error) {
            console.error(error);
        }
    }

    get allBooks() {
        return this.#books;
    }

    addBook(title) {
        try {
            this.#books.forEach(book => {
                if (book === title) {
                    throw new Error('Такая книга уже есть в списке');
                }
            });
            this.#books.push(title);
        } catch (error) {
            console.error(error);
        }
    }

    hasBook(title) {
        const bookSet = new Set([...this.#books]);
        console.log(bookSet.has(title));
    }

    removeBook(title) {
        const bookSet = new Set([...this.#books]);
        const newBooks = []
        try {
            if (!bookSet.has(title)) {
                throw new Error('Такой книги нет в библиотеке, ее нельзя удалить');
            }
            this.#books.forEach(book => {
                if (book !== title) {
                    newBooks.push(book);
                }
            });
            this.#books = newBooks;
        } catch (error) {
            console.error(error);
        }
    }
}

//Создание библиотеки через конструктор
const library = new Library(['Джордж Мартин - Песнь льда и пламени',
    'Лобсанг Рампа - Ты вечен',
    'Йон Колфер - Космо Хилл']); //Создаст библиотеку с добавленными книгами
const libraryWithDuplicates = new Library(
    ['Джордж Мартин - Песнь льда и пламени',
        'Джордж Мартин - Песнь льда и пламени',
        'Лобсанг Рампа - Ты вечен',
        'Йон Колфер - Космо Хилл']); //Выдаст ошибку, поскольку в библиотеку добавляются только уникальные книги, а здесь есть дубликаты
//Проверка работы геттера
console.log(library.allBooks);
//Проверка работы метода addBook(title)
library.addBook('Джоан Роулинг - Гарри Поттер: Кубок огня'); //Отработает корректно, поскольку такой книги нет в библиотеке
console.log(library.allBooks);
library.addBook('Джордж Мартин - Песнь льда и пламени'); //Выдаст ошибку, поскольку такая книга уже есть в библиотеке
console.log(library.allBooks);
//Проверка работы метода hasBook(title)
library.hasBook('Джордж Мартин - Песнь льда и пламени'); //Выведет true, поскольку книга есть в библиотеке
library.hasBook('Лев Толстой - Война и мир'); //Выведет false, поскольку такой книги в библиотеке нет
//Проверка работы метода removeBook(title)
library.removeBook('Лобсанг Рампа - Ты вечен'); //Производим удаление существующей книги
console.log(library.allBooks); //Проверяем, что книга пропала из библиотеки
library.removeBook('Лев Толстой - Война и мир'); //Пытаемся удалить несуществующую книгу, получаем ошибку

// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта.
// Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или
// слишком длинные сообщения, вы решаете установить некоторые ограничения.
// Создайте HTML-структуру с текстовым полем для ввода отзыва,
// кнопкой для отправки и контейнером, где будут отображаться отзывы.
// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами.
// Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.
// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.

const productReviewsEl = document.querySelector('.product_reviews');
function demonstrateData (){
    initialData.forEach(product => {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="product">
        <h1 class="product_name">${product.product}</h1>
        </div>`);
        product.reviews.forEach(review => {
            document.body.insertAdjacentHTML('beforeend', `
    <div class="product_reviews">Отзыв #${review.id}:\n\n${review.text}</div>
    </div>`)
        });
    });
}

function demonstrateCommentInputArea() {
document.body.insertAdjacentHTML('afterbegin', `
    <h1>Отзывы на товары</h1>
    <textarea
      id="input_product"
      placeholder="Введите название продукта"
    ></textarea>
    <br>
    <textarea
      id="input_comment"
      placeholder="Введите ваш отзыв (от 50 до 500 символов)"
    ></textarea>
    <br>
    <button class="send_comment">Отправить отзыв</button>
`);
}

function learnLastID () {
    const reviewIDs = []
    initialData.forEach(product => {
        reviewIDs.push(Object.values(product)[Object.values(product).length - 1][Object.values(product)[Object.values(product).length - 1].length - 1].id);
    });
    return Math.max(...reviewIDs);
}

class Counter {
    
    returnAndIncreaseLastID() {
        return ++this.value;
    }
}

let counter = new Counter();
counter.value = learnLastID();


function addComment() {
    const inputComment = document.getElementById('input_comment');
    const commentText = inputComment.value.trim();
    const inputProduct = document.getElementById('input_product');
    const productName = inputProduct.value.trim();
    let isProductFound = false;
    try {
        if (productName.length === 0) {
            throw new Error('Вам необходимо ввести название продукта!');
            }
        if (commentText.length < 50 || commentText.length > 500) {
            throw new Error('Отзыв должен содержать от 50 до 500 символов!');
            }
        
        document.body.insertAdjacentHTML('beforeend', `
        <div class="product">
        <h1 class="product_name">${inputProduct.value}</h1>
        <div class="product_reviews">Отзыв #${counter.returnAndIncreaseLastID()}:\n\n${inputComment.value}</div>
        </div>
        </div>`);    
    } catch (error) {
        alert(error.message);
    }
    }

    demonstrateData();
    demonstrateCommentInputArea();
    const buttonEl = document.querySelector('.send_comment');
    buttonEl.addEventListener('click', () => {
        addComment();
    });
    