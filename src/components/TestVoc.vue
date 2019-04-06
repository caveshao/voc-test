<template>
  <div class="voc-test">
    <section class="instrouction">
      <span>
        左滑为认识，右滑为不认识
      </span>
    </section>
    <section id="test-block">
      <transition name="result">
        <div
          class="result-card"
          v-show="ifResult"
        >
          <span class="result">{{result}}</span>
        </div>
      </transition>
      <v-touch @tap="startAnswer">
        <transition name="start">
          <div
            class="start-card"
            v-show="!ifStart"
          >
            <span class="start"></span>
          </div>
        </transition>
      </v-touch>
      <v-touch
        @panmove="answer"
        @panend="touchEnd"
      >
        <transition name="voc">
          <div
            class="voc-card"
            v-show="showVoc"
          >
            <span>
              {{voc}}
            </span>
          </div>
        </transition>
      </v-touch>
    </section>
  </div>
</template>
<script>
  import { mapMutations } from "vuex";
  import srevice from "../api/index.js";
  import service from "../api/index.js";

  export default {
    name: "test-voc",
    data() {
      return {
        vocs: ["message", "is", "are"],
        voc: "",
        result: 0,
        weights: [],
        ifStart: false,
        ifResult: false,
        showVoc: false,
        positionX: undefined //由于touch第一次无法获取left（尚未解决）且 left 为百分比形式，此属性只用来位置比较
      };
    },
    methods: {
      ...mapMutations([
        "startCount", // 将 `this.startCount()` 映射为 `this.$store.commit('startCount')`
        "endCount",
        "cutOff"
      ]),
      startAnswer() {
        this.getWeight();

        service
          .request({
            url: "http://localhost:8080/voc",
            method: "get",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            let vocs = res.data.vocs;
            this.vocs.splice(0, this.vocs.length);
            vocs.forEach(voc => {
              this.vocs.push(voc);
            });

            this.voc = this.vocs[0];
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        this.ifStart = true;
        this.ifResult = false;
        this.result = 0;
        this.startCount();
        //this 在箭头函数中指外包含块的 this
        setTimeout(() => (this.showVoc = true), 1000);
        // setInterval(function() {
        // console.log(this); Window
        // }, 1000);
      },
      getWeight() {
        //正态分布函数
        function gaussianRandom(start, end) {
          return Math.floor(start + gaussianRand() * (end - start + 1));
        }
        function gaussianRand() {
          var rand = 0;
          for (var i = 0; i < 6; i += 1) {
            rand += Math.random();
          }
          return rand / 6;
        }
        ////////////////////////////

        let leftWeights = [];
        let rightWeights = [];

        //形成反向的正态分布
        for (let i = 0; i < 10; i++) {
          leftWeights.push(gaussianRandom(0, 2000));
          rightWeights.push(gaussianRandom(0, 2000));
        }

        leftWeights = leftWeights.sort((a, b) => {
          return b - a;
        });

        rightWeights = rightWeights.sort((a, b) => {
          return a - b;
        });

        this.weights = leftWeights.concat(rightWeights);
      },
      answer(event) {
        event.target.style.left = event.center.x + "px";
        if (!this.positionX) {
          this.positionX = event.center.x;
        }
      },
      touchEnd(event) {
        this.showVoc = false;
        this.endCount();
        if (event !== undefined) {
          if (parseInt(event.target.style.left) < this.positionX) {
            let index = this.vocs.indexOf(this.voc);
            this.result += this.weights[index];
            console.log(this.result);
          } else {
            console.log("error");
          }
        } else {
          console.log("can't answer");
        }

        setTimeout(() => {
          this.nextVoc();
          //不用触摸调用时，没有 event
          if (event !== undefined) {
            event.target.style.left = "50%";
          }
          this.positionX = undefined;
        }, 1000);
      },
      nextVoc() {
        let nextVoc = this.vocs.indexOf(this.voc) + 1;

        if (nextVoc === -1) {
          console.log("no find");
        } else if (nextVoc < this.vocs.length) {
          this.voc = this.vocs[nextVoc];
          this.showVoc = true;
          this.startCount();
        } else if (nextVoc === this.vocs.length) {
          this.ifStart = false;
          this.ifResult = true;
          this.endCount();
        }
      }
    },
    computed: {
      cutOff: {
        get: function() {
          return this.$store.state.cutOff;
        },
        set: function() {}
      }
    },
    watch: {
      cutOff: function() {
        if (this.cutOff) {
          this.touchEnd();
          this.$store.commit("cutOff", false);
        } else {
        }
      }
    }
  };
</script>
<style lang="scss">
  /*动画样式 */
  .voc-enter-active {
    animation: move-in 1s;
  }

  .voc-leave-active {
    animation: bounce-out 0.5s;
  }

  .result-enter-active,
  .start-enter-active {
    animation: bounce-out 1s reverse;
  }

  .result-leave-active,
  .start-leave-active {
    animation: bounce-out 1s;
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes move-in {
    0% {
      transform: translateY(100vw);
    }
    100% {
      transform: translateY(0);
    }
  }

  /**布局*/
  #test-block {
    position: relative;
    margin-top: 15vw;
  }

  .voc-card,
  .start-card,
  .result-card {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 30vw;
    height: 30vw;
    padding: 5vw;
    color: #ffc0cb;
    border: 1px solid #e942e0;
    border-radius: 50%;
    text-align: center;
    overflow: hidden;
  }

  .start-card .start {
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    border: 7vw solid #97c901;
    border-right: none;
    border-color: transparent #97c901;
    top: 50%;
    left: 50%;
    margin-top: -7vw;
    margin-left: -3.5vw;
  }

  .voc-card {
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -15vw;
  }

  .result-card {
    border-color: #97c901;
  }
  .voc-card > span,
  .result-card > span {
    display: inline-block;
    word-break: break-all;
    text-align: left;
    pointer-events: none;
  }

  .result-card > span {
    line-height: 20vw;
  }

  .instrouction {
    text-align: center;
    color: #ffc0cb;
  }
</style>


