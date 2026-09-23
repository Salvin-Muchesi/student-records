const students = [
  { 
    id: 101,
    name: "Alice",
    age: 20,
    course: "Computer Science",
    scores: [78,85,92,67],
    active: true
  },
  {
    id: 102,
    name: "Brian",
    age: 22,
    course: "Information Technology",
    scores: [55,64,71,60],
    active: true
  },
  {
    id: 103,
    name: "Cynthia",
    age: 19,
    course: "Computer Science",
    scores: [88,91,95,89],
    active: true
  },
  {
    id: 104,
    name: "David",
    age: 21,
    course: "Software Engineering",
    scores: [45,52,38,60],
    active: true
  },
  {
    id: 105,
    name: "Eunice",
    age: 23,
    course: "Information Technology",
    scores: [72,75,80,78],
    active: true
  }
];
//Calculate the total of all scores
  function calculateTotal(scores){
    return scores.reduce((total, score) => total + score, 0);
  }

//Calculate the Average score
  function calculateAverage(scores){
    return calculateTotal(scores)/scores.length;
  }

//Get the highest score
  function getHighestScore(scores){
    return Math.max(...scores);
  }

//Get lowest score
  function getLowestScore(scores){
    return Math.min(...scores);
  }

//Determine the grade
  function getGrade(average){
    if (average >= 80) {
      return "A";
    } else if(average >= 70){
      return "B";
    } else if(average >= 60){
      return "C";
    } else if(average >= 50){
      return "D";
    }else{
      return "F"
    }
  }

function displayStudentGrades(){
  for(let i = 0; i < students.length; i++){
    const student = students[i];
    const average = calculateAverage(student.scores);
    const grade = getGrade(average);

    console.log(student.name + " - Grade: " + grade);
  }
}

function displayPassedStudentsUsingWhile(){
  let i = 0;
  while(i < students.length){
    const student = students[i];
    const average = calculateAverage(student.scores);

    if(hasPassed(average)){
      console.log(student.name + " - PASS");
    }
    i++;
  }
}

function displayStudentCourse() {
  for(const student of students) {
    console.log(student.name + " - " + student.course);
  }
}
//Determine whether the student has passed
  function hasPassed(average){
    return average >= 50;
  } 

//Find a student by ID
  function findStudentById(id) {
    return students.find(student => student.id === id);
  }

//Find a student by Name
  function findStudentByName(name){
    const searchName = name.trim().toLowerCase();
    return students.find(student =>
      student.name.toLowerCase().includes(searchName)
    );
  }

  console.log("\n---SEARCH TESTS ---");

  console.log("Find ID 104:");
  console.log(findStudentById(104));

  console.log("Find name Alice");
  console.log(findStudentByName("  alice  "));

  console.log("Find name David");
  console.log(findStudentByName("dav"));

//Function to add students and their details
  function addStudent(student){
    //Check if ID is missing
      if(student.id === undefined || student.id === null){
        throw new Error("Student ID is required.");
      }

    //Check if ID already exists
      if(students.some(existingStudent => existingStudent.id === student.id)){
        throw new Error("Student ID already exists.");
      }

    //Check if name is Valid
      if(!student.name || student.name.trim() === ""){
       throw new Error("Studentt name is required.");
      } 
    
    //Check if age is valid
      if(typeof student.age !== "number" || student.age <= 0){
        throw new Error("Student age must be a valid number.");
      }

    //Check if course is provided
      if(!student.course || student.course.trim() === ""){
        throw new Error("Student course is required.");
      }

    //Check if scores is an array
      if(!Array.isArray(student.scores)){
        throw new Error("Student scores must be an array.");
      }

    //Check that every score is between 0 and 100
      if(!student.scores.every(score => score >= 0 && score <= 100)){
        throw new Error("Every score must be between 0 and 100.");
      }

    //Add the student
      students.push(student);
      console.log(`${student.name} was added successfully.`)
  }

  console.log("\n--- ADD STUDENT TEST ---");

    try{
      addStudent({
        id:106,
        name: "Salvin",
        age: 23,
        course: "Computer Science",
        scores: [80, 89, 95, 77],
        active: true
      });
    } catch(error){
      console.log("Error:", error.message);
    }

  console.log("\n--- INVALID STUDENT TEST ---");

    try{
      addStudent({
        id: 107,
        name: "Sage",
        age: 21,
        course:"Information Technology",
        scores: [89, 145, 56, 99],
        active: true
      });
    } catch (error) {
        console.log("Error:", error.message);
    }

//Remove a student by ID
  function removeStudent(id){
    const index = students.findIndex(student => student.id === id);
    if(index === -1){
      console.log("Student not found.");
      return;
    }
    const removedStudent = students.splice(index, 1);
    console.log(`${removedStudent[0].name} was removed successfully.`);
  }

  console.log("\n--- REMOVE STUDENT TEST ---");
  removeStudent(106);

//Update Student information
  function updateStudent(id, updates){
    const student = students.find(student => student.id === id);
    if(!student){
      console.log("Student not found");
      return;
    }
    const updatedStudent = {
      ...student,
      ...updates
    };
    const index = students.findIndex(student => student.id === id);
    students[index] = updatedStudent;
    console.log(`${updatedStudent.name}'s information was updated successfully`)
  }

  console.log("\n--- UPDATE STUDENT TEST---");
    updateStudent(104, {
      age:34,
      active: false
    });

//FILTER TESTS
function getActiveStudents(){
  return students.filter(student => student.active === true);
}

function getInactiveStudents(){
  return students.filter(student => student.active === false);
}

function getPassedStudents(){
  return students.filter(student => hasPassed(calculateAverage(student.scores)));
}

function getFailedStudents(){
  return students.filter(student => !hasPassed(calculateAverage(student.scores)));
}

function getStudentsByCourse(course){
  return students.filter(student => 
    student.course.toLowerCase()=== course.trim().toLowerCase());
}

function getStudentNames(){
  return students.map(student => student.name);
}

function getStudentSummaries(){
  return students.map(student => {
    const average = calculateAverage(student.scores);
    return{
      id: student.id,
      name: student.name,
      average: average,
      grade: getGrade(average),
      result: hasPassed(average) ? "PASS" : "FAIL"
    };
  });
}

function getStudentsRankedByPerformance(){
  return [...students].sort((a, b) => {
    const averageA = calculateAverage(a.scores);
    const averageB = calculateAverage(b.scores);

    return averageB - averageA;
  });
}

function getTopStudent(){
  const rankedStudents = getStudentsRankedByPerformance();

  return rankedStudents[0];
}

//OBJECTS
  function showStudentKeys() {
    const student = students[0];

    console.log(Object.keys(student));
  }

  function showStudentValues() {
    const student = students[0];

    console.log(Object.values(student));
  }

  function showStudentEntries() {
    const student = students[0];

    console.log(Object.entries(student));
  }

  function showStudentDetails() {
    const student = students[0];
    const {id, name, age , course} = student;

    console.log("ID:", id);
    console.log("NAME:", name);
    console.log("AGE", age);
    console.log("COURSE:", course);
  }

  function showStudentScores() {
    const student = students[0];

    console.log("Student:", student.name);
    console.log("Scores:", student.scores);
    console.log("First Score:", student.scores[0]);
  }

  console.log("\n---FILTER TESTS---");

   console.log("Active Students:");
   console.log(getActiveStudents());

   console.log("Inactive Students:");
   console.log(getInactiveStudents());

   console.log("Passed Students:");
   console.log(getPassedStudents());

   console.log("Failed Students:");
   console.log(getFailedStudents());

   console.log("Computer Science Students:");
   console.log(getStudentsByCourse("Computer Science"));

   console.log("\n---MAPPING TESTS---");

   console.log("Student Names:");
   console.log(getStudentNames());

   console.log("Student Summaries:");
   console.log(getStudentSummaries());

   console.log("\n ---RANKING TEST ---");

   console.log("Students ranked by performance: ");
   console.log(getStudentsRankedByPerformance());

   console.log("\n---TOP STUDENT TEST---");

   const topStudent = getTopStudent();

   console.log("Top Student:");
   console.log(topStudent.name);

   console.log("Average:", calculateAverage(topStudent.scores));
   console.log("Grade:",getGrade(calculateAverage(topStudent.scores)));

console.log("\n ---FOR LOOP GRADE TEST ---");

  displayStudentGrades();

console.log("\n---WHILE LOOP TEST---");

  displayPassedStudentsUsingWhile();

console.log("\n---FOR...OF LOOP TEST---");

  displayStudentCourse();

console.log("\n---OBJECT KEY TEST---");

  showStudentKeys();

console.log("\n---OBJECT VALUES TEST---");

  showStudentValues();

console.log("\n---OBJECT ENTRIES TEST---");

  showStudentEntries();

console.log("\n---DESTRUCTURING TEST---");

  showStudentDetails();

console.log("\n---NESTED TESTS---");

  showStudentScores();