<script>
  export let formItem;
  export let saveHandler;
</script>
<style>
</style>
<div>
    <input type="text" bind:value={formItem.name}>
    <input type="text" bind:value={formItem.semester}>
    <input type="text" bind:value={formItem.degree}>
    <button on:click={saveHandler} disabled="{!formItem.name || !formItem.semester || !formItem.degree}">create</button>
</div>
