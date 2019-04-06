<template>
  <div class="home">
    <Header />
    <TestVoc />
  </div>
</template>

<script>
  // @ is an alias to /src
  import TestVoc from "@/components/TestVoc.vue";
  import Header from "../components/Header.vue";

  export default {
    name: "home",
    components: {
      TestVoc,
      Header
    }
  };
</script>
