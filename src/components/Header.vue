<template>
  <div class="header">
    <nav>
      <div
        class="clock"
        @touchstart="startTimer"
      >
        <div class="clo-red"></div>
        <div class="clo-gre"></div>
      </div>
    </nav>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        second: 8,
        inter: 0.5,
        interval: undefined
      };
    },
    methods: {
      startTimer() {
        let cloRed = document.querySelector("div.clo-red");
        let count = this.second;
        this.interval = setInterval(() => {
          if (count <= 0) {
            clearInterval(this.interval);
            cloRed.style.left = "100%";
            this.$store.commit("cutOff", true);
          } else {
            count -= this.inter;
            //  let red = window.getComputedStyle(cloRed, null);
            //如果不需要伪元素，第二个参数可以为 null
            let left = count / this.second;
            cloRed.style.left = parseInt(left * 100) + "%";
          }
        }, this.inter * 1000);
      },
      resetTimer() {
        let cloRed = document.querySelector("div.clo-red");
        clearInterval(this.interval);
        cloRed.style.left = "100%";
      }
    },
    computed: {
      ifCount: {
        get: function() {
          return this.$store.state.ifCount;
        },
        set: function() {}
      }
    },
    watch: {
      ifCount: function() {
        if (this.ifCount) {
          this.startTimer();
        } else {
          this.resetTimer();
        }
      }
    }
  };
</script>
<style lang="scss">
  header,
  nav {
    text-align: center;
  }

  .clock {
    position: relative;
    display: inline-block;
    width: 80vw;
    height: 5vw;
    border: 2px solid #e942e0;
    overflow: hidden;
  }

  .clo-red,
  .clo-gre {
    position: absolute;
    display: inline-block;
    width: 80vw;
    height: 5vw;
    border: none;
  }

  .clo-red {
    background-color: #f1c76a;
    top: 0;
    left: 100%;
    z-index: -1;
  }

  .clo-gre {
    background-color: #26e436;
    top: 0;
    left: 0;
    z-index: -2;
  }
</style>

