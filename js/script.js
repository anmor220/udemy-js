/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */




/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против всех"
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          genre = document.querySelector('.promo__genre'),
          bg = document.querySelector('.promo__bg'),
          list = document.querySelector('.promo__interactive-list'),
    
          add = document.querySelector('.add'),
          btn = add.querySelector('button'),
          inpt = add.querySelector('.adding__input')
    
    
    
    // 1
    adv.forEach(item => {
        item.remove();
    });
    
    // 2
    genre.textContent = 'Драма';
    
    // 3
    bg.style.backgroundImage = ('url(img/bg.jpg');
    
    //4-5
    function updateMyFilms() {
        list.innerHTML = "";
    
        movieDB.movies.forEach((item, index, movies) => {
            movies[index] = item.toLowerCase(); // 5 втрого задания
        });
    
        movieDB.movies.sort();
    
        movieDB.movies.forEach((film, i) => {
            list.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
    }
    updateMyFilms();
    
    
    
    // 1
    function clickEv(event) {
        event.preventDefault();
        if (inpt.value.length > 21) {
            movieDB.movies.push(inpt.value.slice(0, 21) + "..."); // 2
        } else {
            movieDB.movies.push(inpt.value);
        }
        
        updateMyFilms();
    }
    
    btn.addEventListener('click', clickEv);
    
    // 3
    // Первая твоя ошибка, ты выбирала элементы с верху на 55 строчке, затем ты их все удаляла на 80 строчке
    // Поэтому потом когда ты обращалась с низу к этим элементам - они уже не существовали а на их месте были новые, поэтому выбирать их нужно перед тем как добавлять новую функцию
    // Когда потом опять какой элемент удалишь и затем добавишь, к этому элементу нужно будет заново подцепить эту функцию
    let deleteElements = list.querySelectorAll('.delete');
    
    deleteElements.forEach((item) => {
        item.addEventListener('click', (it) => {
            // Когда происходит нажатие в переменную it прилетает то событие, из него можно вытянуть элемент на котором это событие произошло, через метод target,
            // А с этотого элемента на котором произолшло событие можно вытянуть родителя через метод parentNode и просто его удалить
            it.target.parentNode.remove();
        });
    });
    
    // 4
    let checkbox = document.querySelector('input[type="checkbox"]');
    
    checkbox.addEventListener('change', () => {
        if (checkbox.checked == true) {
        console.log('Добавляем любимый фильм');
    }
    });
    
    // 5
    function sortElements(a) {
        a.sort();
    }
    sortElements(movieDB.movies);

});

