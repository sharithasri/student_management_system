const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];

function displayStudents(){

studentList.innerHTML = "";

students.forEach((student,index)=>{

const card = document.createElement("div");

card.classList.add("student-card");

card.innerHTML = `

<h3>${student.name}</h3>
<p><strong>Age:</strong> ${student.age}</p>
<p><strong>Course:</strong> ${student.course}</p>

<button onclick="editStudent(${index})">Edit</button>
<button onclick="deleteStudent(${index})">Delete</button>

`;

studentList.appendChild(card);

});

}

form.addEventListener("submit",function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const age = document.getElementById("age").value;
const course = document.getElementById("course").value;

const newStudent = {
name,
age,
course
};

students.push(newStudent);

localStorage.setItem("students",JSON.stringify(students));

displayStudents();

form.reset();

});

function deleteStudent(index){
function editStudent(index){

document.getElementById("name").value = students[index].name;
document.getElementById("age").value = students[index].age;
document.getElementById("course").value = students[index].course;

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

displayStudents();

}

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

displayStudents();

}

displayStudents();
const searchInput = document.getElementById("searchStudent");

searchInput.addEventListener("keyup",function(){
document.getElementById("totalStudents").innerText =
"Total Students: " + students.length;

const searchValue = searchInput.value.toLowerCase();

const cards = document.querySelectorAll(".student-card");

cards.forEach(card=>{

const text = card.innerText.toLowerCase();

if(text.includes(searchValue)){
card.style.display="block";
}else{
card.style.display="none";
}

});

});
function updateChart(){

const courses={};

students.forEach(student=>{

if(courses[student.course]){
courses[student.course]++;
}else{
courses[student.course]=1;
}

});

const labels=Object.keys(courses);
const data=Object.values(courses);

const ctx=document.getElementById("studentChart");

new Chart(ctx,{
type:"bar",
data:{
labels:labels,
datasets:[{
label:"Students per Course",
data:data
}]
}
});

}
updateChart();