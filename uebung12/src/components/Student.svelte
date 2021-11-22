<script>
  export let student;
  export let index;
  export let deleteHandler;
</script>
<style>
</style>
<div>
    {index} - {student.name} - {student.semester} - {student.degree} <button on:click={() => deleteHandler(student.name)}>Delete</button>
</div>
