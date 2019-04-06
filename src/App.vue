<template>
  <div id="app">
    <div id="nav">
      <div class="box active">
        <router-link to="/">词汇测试</router-link>
      </div>
      <div class="box">
        <router-link to="/about">关于我</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
  export default {
    mounted() {
      this.changeBox();
    },
    data() {
      return {};
    },
    methods: {
      changeBox() {
        let boxs = document.querySelectorAll("#nav .box");
        boxs.forEach(element => {
          element.addEventListener(
            "touchstart",
            function(evt) {
              // console.log(evt.target);
              let boxAct = document.querySelector("#nav .active");
              boxAct.classList.remove("active");
              this.classList.add("active");
            },
            false
          );
        });
      }
    }
  };
</script>


<style lang="scss">
  body {
    background-color: rgb(0, 0, 0);
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ffc0cb;
  }
  #nav {
    padding: 5vw;
    padding-bottom: 3vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .box {
      position: relative;
      padding: 0 1vw;
      border: 1px solid black;
    }
    .active {
      border-bottom-color: #e942e0;
      &:before {
        content: "";
        position: absolute;
        left: 25%;
        top: 0;
        bottom: auto;
        right: auto;
        height: 1px;
        width: 50%;
        background-color: #e942e0;
      }
    }

    a {
      font-weight: 100;
      color: #ffc0cb;
      text-decoration: none;
      &.router-link-exact-active {
        /*链接被精确匹配时应该激活的 class*/
        color: #ffc0cb;
      }
    }
  }
</style>
