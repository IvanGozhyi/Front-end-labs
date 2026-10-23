let Course_list = [
    {
        id: 1,
        name: "Весела математика",
        author: "Автор 1",
        lecturers: ["Вчитель 1", "Вчитель 1.1"],
        type: "Інтерактивна гра",
        q_of_viewers_1: 100,
        q_of_viewers_2: 200,
        duration: "1 год 30 хв",
    },
    {
        id: 2,
        name: "Пізнаємо світ",
        author: "Автор 2",
        lecturers: ["Вчитель 2"],
        type: "Цікаві досліди",
        q_of_viewers_1: 150,
        q_of_viewers_2: 300,
        duration: "2 год 00 хв",
    },
    {
        id: 3,
        name: "Лего-конструювання",
        author: "Автор 3",
        lecturers: ["Вчитель 3", "Вчитель 3.1", "Вчитель 3.2"],
        type: "Майстер-клас",
        q_of_viewers_1: 500,
        q_of_viewers_2: 1200,
        duration: "3 год 45 хв",
    },
    {
        id: 4,
        name: "Казкове читання",
        author: "Автор 4",
        lecturers: ["Вчитель 4", "Вчитель 4.1"],
        type: "Читаємо разом",
        q_of_viewers_1: 250,
        q_of_viewers_2: 420,
        duration: "1 год 15 хв",
    },
    {
        id: 5,
        name: "Англійська з пісеньками",
        author: "Автор 5",
        lecturers: ["Вчитель 5"],
        type: "Музичний урок",
        q_of_viewers_1: 800,
        q_of_viewers_2: 950,
        duration: "1 год 00 хв",
    },
    {
        id: 6,
        name: "Світ диких тварин",
        author: "Автор 6",
        lecturers: ["Вчитель 6", "Вчитель 6.1"],
        type: "Відео-екскурсія",
        q_of_viewers_1: 120,
        q_of_viewers_2: 180,
        duration: "2 год 30 хв",
    },
    {
        id: 7,
        name: "Малювання пальчиками",
        author: "Автор 7",
        lecturers: ["Вчитель 7", "Вчитель 7.1"],
        type: "Творча майстерня",
        q_of_viewers_1: 340,
        q_of_viewers_2: 600,
        duration: "4 год 20 хв",
    },
    {
        id: 8,
        name: "Космічна подорож",
        author: "Автор 8",
        lecturers: ["Вчитель 8"],
        type: "Пізнавальний мультик",
        q_of_viewers_1: 90,
        q_of_viewers_2: 150,
        duration: "1 год 45 хв",
    },
    {
        id: 9,
        name: "Ліпка з пластиліну",
        author: "Автор 9",
        lecturers: ["Вчитель 9", "Вчитель 9.1", "Вчитель 9.2"],
        type: "Практичне заняття",
        q_of_viewers_1: 420,
        q_of_viewers_2: 550,
        duration: "2 год 10 хв",
    },
    {
        id: 10,
        name: "Безпека на вулиці",
        author: "Автор 10",
        lecturers: ["Вчитель 10", "Вчитель 10.1"],
        type: "Навчальна гра",
        q_of_viewers_1: 210,
        q_of_viewers_2: 380,
        duration: "1 год 50 хв",
    }
];

function getMinutes(durationStr) {
    if (!durationStr) return 0;
    let hours = 0, minutes = 0;
    let hMatch = durationStr.match(/(\d+)\s*год/);
    let mMatch = durationStr.match(/(\d+)\s*хв/);
    if (hMatch) hours = parseInt(hMatch[1]);
    if (mMatch) minutes = parseInt(mMatch[1]);
    return hours * 60 + minutes;
}

console.log("=== КУРСИ ===");

let sortedByDuration = [...Course_list].sort((a, b) => getMinutes(a.duration) - getMinutes(b.duration));
console.log("1. Відсортовано за тривалістю:", sortedByDuration);

let totalUsers = Course_list.reduce((sum, course) => sum + course.q_of_viewers_1 + course.q_of_viewers_2, 0);
let averageUsers = totalUsers / Course_list.length;
console.log(`Середня кількість користувачів (за дві доби): ${averageUsers}`);

let minCourse = Course_list.reduce((min, course) => (course.q_of_viewers_2 < min.q_of_viewers_2) ? course : min);
console.log(`2. ID курсу з мінімумом переглядів за добу_2: ${minCourse.id} (Кількість: ${minCourse.q_of_viewers_2})`);

function addNewCourse(newCourse) {
    let isMissingInfo = Object.values(newCourse).some(val =>
        val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)
    );

    if (isMissingInfo) {
        Course_list.unshift(newCourse);
        console.log(`3. Курс "${newCourse.name}" додано НА ПОЧАТОК списку (неповна інформація).`);
    } else {
        let insertIndex = Course_list.findIndex(course => course.author.localeCompare(newCourse.author) > 0);
        if (insertIndex === -1) {
            Course_list.push(newCourse);
        } else {
            Course_list.splice(insertIndex, 0, newCourse);
        }
        console.log(`3. Курс "${newCourse.name}" додано за алфавітом (Автор: ${newCourse.author}).`);
    }
}

addNewCourse({ id: 11, name: "Курс з пропусками", author: "Автор 11", lecturers: [], type: "", q_of_viewers_1: 10, q_of_viewers_2: 20, duration: "1 год 00 хв" });
addNewCourse({ id: 12, name: "Астрономія", author: "Автор 0", lecturers: ["Вчитель 0"], type: "Теорія", q_of_viewers_1: 100, q_of_viewers_2: 150, duration: "0 год 45 хв" });

function calculateStudyTime(selectedCourses) {
    let totalMins = selectedCourses.reduce((sum, course) => sum + getMinutes(course.duration), 0);

    if (selectedCourses.length > 3) {
        totalMins = totalMins * 1.5;
        console.log(`4. Обрано більше 3-х курсів (${selectedCourses.length}). Час збільшено у 1.5 рази.`);
    } else {
        console.log(`4. Обрано ${selectedCourses.length} курс(и). Час не змінюється.`);
    }

    let finalHours = Math.floor(totalMins / 60);
    let finalMins = Math.floor(totalMins % 60);
    return `${finalHours} год ${finalMins} хв`;
}

console.log(`Час вивчення 3 курсів: ${calculateStudyTime([Course_list[0], Course_list[1], Course_list[2]])}`);
console.log(`Час вивчення 4 курсів: ${calculateStudyTime([Course_list[0], Course_list[1], Course_list[2], Course_list[3]])}`);



class ChildAccount {
    constructor(lastName, firstName, age, email, feedbackPurpose, contactDate, contactTime) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.email = email;
        this.feedbackPurpose = feedbackPurpose;
        this.contactDate = new Date(contactDate);
        this.contactTime = contactTime;
    }
}

class FeedbackManager {
    constructor() {
        this.accounts = [];
    }

    addAccount(account) {
        this.accounts.push(account);
    }

    getByMonthAndTime(month, timeStr) {
        console.log(`\n--- Звернення за ${month}-й місяць о ${timeStr} ---`);
        const result = this.accounts.filter(acc =>
            (acc.contactDate.getMonth() + 1) === month && acc.contactTime === timeStr
        );

        if (result.length === 0) {
            console.log("Записів не знайдено.");
        } else {
            result.forEach(acc => console.log(`${acc.firstName} ${acc.lastName} (Вік: ${acc.age})`));
        }
    }

    getYoungestChildInfo() {
        console.log(`\n--- Наймолодша дитина ---`);
        const youngest = this.accounts.reduce((minAcc, currentAcc) =>
            (currentAcc.age < minAcc.age) ? currentAcc : minAcc
        );

        console.log(`Вік: ${youngest.age} роки(ів)`);
        console.log(`E-mail батьків: ${youngest.email}`);
        console.log(`Дата звернення: ${youngest.contactDate.toLocaleDateString('uk-UA')}`);
    }

    categorizeByAge() {
        console.log(`\n--- Статистика за віковими групами ---`);
        const stats = { early: 0, middle: 0, preschool: 0, school: 0 };

        this.accounts.forEach(acc => {
            if (acc.age <= 3) stats.early++;
            else if (acc.age > 3 && acc.age <= 5) stats.middle++;
            else if (acc.age > 5 && acc.age <= 7) stats.preschool++;
            else stats.school++;
        });

        console.log(`Ранній вік (до 3-х років): ${stats.early}`);
        console.log(`Середній вік (від 3 до 5): ${stats.middle}`);
        console.log(`Дошкільний вік (5-7 років): ${stats.preschool}`);
        console.log(`Шкільний вік (більше 7 років): ${stats.school}`);
    }

    sortByEmail() {
        console.log(`\n--- Відсортовано за E-mail ---`);
        const sorted = [...this.accounts].sort((a, b) => a.email.localeCompare(b.email));

        sorted.forEach(acc => {
            console.log(`Email: ${acc.email} | Мета: ${acc.feedbackPurpose}`);
        });
    }
}

const manager = new FeedbackManager();

manager.addAccount(new ChildAccount("Шевченко", "Іван", 6, "shevchenko@gmail.com", "Пропозиція співпраці", "2023-10-15", "14:30"));
manager.addAccount(new ChildAccount("Коваленко", "Марія", 3, "kovalenko@ukr.net", "Помилка в контенті", "2023-10-15", "14:30"));
manager.addAccount(new ChildAccount("Бойко", "Олег", 8, "boyko.o@gmail.com", "Скарга", "2023-09-10", "10:00"));
manager.addAccount(new ChildAccount("Мельник", "Анна", 2, "melnyk_fam@gmail.com", "Питання по курсу", "2023-10-12", "09:15"));
manager.addAccount(new ChildAccount("Ткаченко", "Дмитро", 5, "dtkach@yahoo.com", "Подяка", "2023-11-05", "16:45"));
manager.addAccount(new ChildAccount("Кравченко", "Софія", 4, "kravch@gmail.com", "Скарга", "2023-10-20", "11:20"));
manager.addAccount(new ChildAccount("Олійник", "Максим", 7, "oliynyk_m@ukr.net", "Пропозиція співпраці", "2023-08-30", "18:00"));
manager.addAccount(new ChildAccount("Григоренко", "Денис", 1, "grigorenko.parents@gmail.com", "Помилка в реєстрації", "2023-10-01", "14:30"));
manager.addAccount(new ChildAccount("Лисенко", "Єва", 9, "lysenko_e@gmail.com", "Питання щодо оплати", "2023-12-01", "12:00"));
manager.addAccount(new ChildAccount("Петренко", "Артем", 5, "apetrenko@gmail.com", "Подяка", "2023-10-25", "15:10"));

manager.getByMonthAndTime(10, "14:30");
manager.getYoungestChildInfo();
manager.categorizeByAge();
manager.sortByEmail();