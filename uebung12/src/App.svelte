<script>
  import StudentForm from "./components/StudentForm.svelte";
  import {onMount} from "svelte";
  export let name;
  import Student from "./components/Student.svelte";
  import {Student as StudentModel} from "./model/Students";

  let students = [];

  async function getStudents() {
    await fetch('http://localhost:3000/student/list', {
      method: 'GET',
    }).then(r => r.json()).then((data) => {
      students = [];
      data.forEach((ele) => {
        let newStudent = new StudentModel(ele.name, ele.semester, ele.degree)
        students = [...students, newStudent];
      })
    })
  }
  onMount(async () => {
    await getStudents();
  })
  let newItem = new StudentModel('', '', '');

  async function create() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({"name":newItem.name,"semester":newItem.semester,"degree":newItem.degree});
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    await fetch("http://localhost:3000/student/add", requestOptions)
    await getStudents();
    newItem = new StudentModel('', '', '');
  }
  async function remove(name) {
    await fetch(`http://localhost:3000/student/delete/${name}`, {
      method: 'DELETE',
    })
    await getStudents();
  }
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <StudentForm formItem={newItem} saveHandler={create}/>
    {#each students as student, i }
    <div>
        <Student student={student} index={i} deleteHandler={remove}/>
    </div>
    {/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
