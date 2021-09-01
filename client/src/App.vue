<template>
    <div id="app">
        <Navbar/>
        <router-view/>
    </div>
</template>

<style>
#app
{
    text-align: center;
}
</style>
<script>
import Navbar from "@/components/Navbar";

export default
{
    components: {Navbar}
}
</script>