// Переключение на личный кабинет
document.addEventListener("DOMContentLoaded", function () {
    const mainSection = document.getElementById("main-section");
    const accountSection = document.getElementById("account-section");
    const notification = document.querySelector(".notification");
  
    document.querySelector(".user-account").addEventListener("click", function () {
      mainSection.style.display = "none";
      notification.style.display = "none";
      accountSection.style.display = "block";
    });
  });
  
  function showMain() {
    document.getElementById("main-section").style.display = "";
    document.querySelector(".notification").style.display = "";
    document.getElementById("account-section").style.display = "none";
  }
  
  function showDetails(button) {
    const row = button.closest("tr");
    const course = row.cells[1].textContent;
    const status = row.cells[2].textContent;
    const modalBody = document.querySelector("#detailsModal .modal-body");
  
    modalBody.innerHTML = `<p>Course: ${course}</p><p>Status: ${status}</p>`;
  
    const modal = new bootstrap.Modal(document.getElementById("detailsModal"));
    modal.show();
  }
  
  function editOrder(button) {
    alert("Edit functionality coming soon!");
  }
  
  function deleteOrder(button) {
    if (confirm("Are you sure you want to delete this order?")) {
      button.closest("tr").remove();
    }
  }

// Данные о курсах
const coursesData = {
    beginner: {
      title: "Beginner Course",
      instructor: "Anna Petrova",
      duration: "3 months",
      price: "$199",
      description: "This course is designed for absolute beginners. You'll learn basic grammar, vocabulary and pronunciation."
    },
    intermediate: {
      title: "Intermediate Course",
      instructor: "Ivan Ivanov",
      duration: "4 months",
      price: "$299",
      description: "For students with basic knowledge. Focus on conversation skills and more complex grammar."
    },
    advanced: {
      title: "Advanced Course",
      instructor: "Elena Smirnova",
      duration: "6 months",
      price: "$399",
      description: "Perfect your fluency, learn advanced vocabulary and prepare for proficiency exams."
    }
  };
  
  // Обработчик загрузки страницы
  document.addEventListener('DOMContentLoaded', function() {
    handleRoute();
  
    // Обработчик кликов по ссылкам курсов
    document.querySelectorAll('.course-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const courseId = this.getAttribute('href').split('/')[2];
        showCourse(courseId);
        // Добавляем запись в историю браузера
        history.pushState({ course: courseId }, '', `/course/${courseId}`);
      });
    });
  
    // Обработчик кнопки "Back to Courses"
    document.querySelector('#course-content a.btn').addEventListener('click', function(e) {
      e.preventDefault();
      showCoursesList();
      history.pushState({}, '', '/courses');
    });
  });
  
  // Обработчик событий popstate (нажатие кнопок назад/вперёд)
  window.addEventListener('popstate', function() {
    handleRoute();
  });
  
  function handleRoute() {
    const path = window.location.pathname;
  
    // Проверяем путь и выводим либо список курсов, либо детальную информацию о курсе
    if (path.startsWith('/course/')) {
      const courseId = path.split('/')[2];
      showCourse(courseId);
    } else if (path.startsWith('/courses')) {
      const urlParams = new URLSearchParams(window.location.search);
      const page = parseInt(urlParams.get('page')) || 1;
      showCoursesList(page);
    }
  }
  
  function showCourse(courseId) {
    const course = coursesData[courseId];
    if (!course) return showCoursesList();
  
    document.getElementById('course-content').style.display = 'block';
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-instructor').textContent = course.instructor;
    document.getElementById('course-duration').textContent = course.duration;
    document.getElementById('course-price').textContent = course.price;
    document.getElementById('course-description').textContent = course.description;
  }
  
  function showCoursesList(page = 1) {
    const coursesPerPage = 2;
    const courseIds = Object.keys(coursesData);
    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const coursesOnPage = courseIds.slice(startIndex, endIndex);
  
    const courseListElement = document.getElementById('course-list');
    courseListElement.innerHTML = '';
    coursesOnPage.forEach(courseId => {
      const course = coursesData[courseId];
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="/course/${courseId}" class="course-link">${course.title}</a>`;
      courseListElement.appendChild(listItem);
    });
  
    // Отображение или скрытие пагинации в зависимости от страницы
    const pagination = document.getElementById('pagination');
    pagination.style.display = (courseIds.length > coursesPerPage) ? 'block' : 'none';
  }