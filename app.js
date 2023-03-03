var courseApi = "http://localhost:3000/courses/";
var nameInput =document.querySelector('input[name = "name"]');
var descriptionInput =document.querySelector('input[name = "description"]');
function getInputValue(callback) {
    var name = nameInput.value;
        var description = descriptionInput.value;
        var data = {
            name: name,
            description: description
        }
    return callback(data)
}
function getCourses(callback) {
    fetch(courseApi)
        .then(function(response) {
            return response.json();
        }) 
        .then(callback)
}
function renderCourses(courses) {
    var listCoursesBlock =
        document.querySelector('#courses-block');
    var html = courses.map(function(course) {
        return `
            <li class = "course-item-${course.id}">
                <h2>${course.name}</h2>
                <p>${course.description}</p>
                <button onclick = handleDeleteCourse(${course.id})>Delete</button>
                <button onclick = handleChangeCourse(${course.id})>Change</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = html.join(' ');
}
function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        getInputValue(function(data) {
            createCourse(data);
        })
    }
}
function createCourse(data,callback) {
    var option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(courseApi,option)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function() {
            console.log("Có lỗi");
        })
}
function handleDeleteCourse(id) {
    var option = {
        method: 'DELETE',
    }
    var apiDelete = `${courseApi}${id}`;
    console.log(apiDelete);
    fetch(apiDelete, option)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            document.querySelector('.course-item-' + id).remove();
        })
        .catch(function() {
            console.log("Có lỗi");
        })
}
function handleChangeCourse(id) {
    getCourses(function(courses) {
        var currentCourse = courses.find(function(course) {
            return course.id == id;
        })
        console.log(currentCourse);
        nameInput.value = `${currentCourse.name}`;
        descriptionInput.value = `${currentCourse.description}`;
    })
    nameInput.focus();
    document.querySelector('#create').hidden = true;
    var saveBtn = document.querySelector('#save');
    saveBtn.hidden = false;
    saveBtn.onclick = function() {
        getInputValue(function(data) {
            changeCourse(id, data);
        })
    }

}
function changeCourse(id, data, callback) {
    var option = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    var apiChange = `${courseApi}${id}`;
    fetch(apiChange, option)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function() {
            console.log("Có lỗi");
        })
}
 function start() {
    //c1 
    getCourses(renderCourses);
    //c2
    // getCourses(function(courses) {
    //     renderCourses(courses);
    // })
    handleCreateForm();

}
start();