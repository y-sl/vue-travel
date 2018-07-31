<template>
  <div class="city">
    <div class="header">
      <div class="header-top">
        <i class="iconfont back-icon" @click="backhome">&#xe624;</i>
        <span class="title">城市选择{{currentIndex}}</span>
      </div>
      <div class="header-bottom">
        <input type="text" class="header-input" placeholder="输入城市名或者拼音" v-model="keyword">
        <div class="search" v-show="keyword">
          <div class="scroll-wrapper" ref="searchCity">
            <ul class="wrapper">
              <li class="search-city border-bottom" v-for="item in searchList" 
                :key="item.id"
                @click="handleCityClick(item.name)"
              >{{item.name}}</li>
              <li class="nocity" v-show="!searchList.length">匹配不到结果</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="current-city
    ">
      <div class="title">当前城市</div>
      <div class="tag">
        <div class="item-wrapper">
          <div class="item">{{city}}</div>
        </div>
      </div>
    </div>
    <div class="hot-city">
      <div class="title">热门城市</div>
      <div class="tag">
        <ul>
          <li class="item-wrapper" v-for="item of cityList.hotCities" :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="item">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="city-lists" ref="citylists">
      <div class="city-lists-wrapper">
        <div class="city-all-list">
          <ul>
            <li class="city-list" v-for="(value, key, index) in cityList.cities"
                ref="citylist" 
                :key="index"
                
            >
              <div class="title" :class="{isCurrent: currentIndex === index}">{{key}}</div>
              <ul>
                <li class="city-item border-topbottom" v-for="item of value" ref="city" :key="item.id"
                  @click="handleCityClick(item.name)"
                >{{item.name}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="alphabet-wrapper">
      <li class="alphabet" v-for="(value, key, index) in cityList.cities"  
        :key="index" :class="{iscurrent: currentIndex === index}"
        @click="followCity(index)"
      >{{key}}</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import axios from "axios";
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      cityList: {},
      listHeight: [],
      scrollY: 0,
      keyword: '',
      searchList: []
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        console.log(height2);
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          console.log(this.scrollY + "----scrollY");
          console.log(this);
          return i;
        }
      }
      return 0;
    },
    ...mapState(['city'])
  },
  watch: {
    keyword () {
      let result = [];
      let cities = this.cityList.cities;
      for (let key in cities) {
        cities[key].forEach(item => {
          if (item.name.indexOf(this.keyword) > -1 || item.spell.indexOf(this.keyword) > -1) {
            result.push(item);
          }
        })
      }
      this.searchList = result;
      console.log(this);
    }
  },
  created() {
    axios.get("https://easy-mock.com/mock/5b3eba9c04502462c6feb598/ysl/city")
      .then(res => {
        this.cityList = res.data.data;
        this.$nextTick(() => {
          this.initScroll();
          this.calculateHeight();
        });
      });
  },
  methods: {
    calculateHeight() {
      let lists = this.$refs.citylist;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < lists.length; i++) {
        let itemHeight = lists[i].clientHeight;
        height += itemHeight;
        this.listHeight.push(height);
      }
    },
    initScroll() {
      this.scroll = new BScroll(this.$refs.citylists, {
        click: true,
        probeType: 3
      });
      this.searchScroll = new BScroll(this.$refs.searchCity, {
        click: true
      })
      this.scroll.on("scroll", pos => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
          // console.log(this.scrollY);
        }
      });
    },
    followCity (index) {
      this.scroll.scrollToElement(this.$refs.citylist[index], 300, 0, 0);
    },
    backhome () {
      this.$router.push('/')
    },
    handleCityClick (city) {
      this.changeCity(city);
      this.$router.push('/');
    },
    ...mapMutations(['changeCity'])
  }
  
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~styles/varibles.styl';

.city {
  height: 100%;

  .header {
    width: 100%;
    height: 1.58rem;
    background-color: $bgColor;

    .header-top {
      height: 0.86rem;
      color: #fff;
      font-size: 0.32rem;
      text-align: center;
      line-height: 0.86rem;

      .back-icon {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 10px 0 5px;
        font-size: 0.4rem;
      }
    }

    .header-bottom {
      .header-input {
        width: 98%;
        margin: 0rem 1% 0.12rem;
        height: 0.6rem;
        border-radius: 0.08rem;
        text-align: center;
        line-height: 0.6rem;
      }
      .search {
        position absolute
        top 1.58rem
        left 0
        bottom 0
        width 100%
        background-color #eee
        z-index 1000
        .scroll-wrapper {
          overflow hidden
          height 100%
        }
          .search-city {
            height 0.62rem
            padding-left 0.2rem
            background-color #fff
            line-height 0.62rem
            color #666
          }
        .nocity {
          height 0.62rem
          background-color #fff
          color #666
          text-align center
          line-height 0.62rem
        }
      }
    }
  }

  .current-city {
    .title {
      height: 0.54rem;
      background-color: #eee;
      padding-left: 0.2rem;
      color: #666;
      font-size: 0.26rem;
      line-height: 0.54rem;
    }

    .tag {
      overflow: hidden;
      padding: 0.1rem 0.6rem 0.1rem 0.1rem;

      .item-wrapper {
        float: left;
        width: 33.3%;

        .item {
          margin: 0.1rem;
          padding: 0.1rem 0;
          text-align: center;
          border: 0.02rem solid #ccc;
          border-radius: 0.06rem;
        }
      }
    }
  }

  .hot-city {
    .title {
      height: 0.54rem;
      background-color: #eee;
      padding-left: 0.2rem;
      color: #666;
      font-size: 0.26rem;
      line-height: 0.54rem;
    }

    .tag {
      overflow: hidden;
      padding: 0.1rem 0.6rem 0.1rem 0.1rem;

      .item-wrapper {
        float: left;
        width: 33.3%;

        .item {
          margin: 0.1rem;
          padding: 0.1rem 0;
          text-align: center;
          border: 0.02rem solid #ccc;
          border-radius: 0.06rem;
        }
      }
    }
  }

  .city-lists {
    position: absolute;
    overflow: hidden;
    top: 5.25rem;
    right: 0;
    left: 0;
    bottom: 0;

    .city-lists-wrapper {
      .city-all-list {
        position: relative;

        .city-list {
          .title {
            height: 0.54rem;
            background-color: #eee;
            padding-left: 0.2rem;
            color: #666;
            font-size: 0.26rem;
            line-height: 0.54rem;

            &.isCurrent {
              background-color: #ddd;
            }
          }

          .city-item {
            height: 0.76rem;
            padding-left: 0.2rem;
            line-height: 0.76rem;
          }
        }
      }
    }
  }

  .alphabet-wrapper {
    position: fixed;
    top: 5.3rem;
    right: 0;

    .alphabet {
      width: 0.4rem;
      height: 0.4rem;
      color: #00bcd4;
      line-height: 0.4rem;
      text-align: center;

      &.iscurrent {
        background-color #ccc
        color: #f00;
      }
    }
  }
}
</style>