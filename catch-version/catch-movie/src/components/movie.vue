<template>
  <div>
    <!--@loadeddata="onPlayerLoadeddata($event)"-->
    <!--@waiting="onPlayerWaiting($event)"-->
    <!--@playing="onPlayerPlaying($event)"-->
    <!--@timeupdate="onPlayerTimeupdate($event)"-->
    <!--@canplay="onPlayerCanplay($event)"-->
    <!--@canplaythrough="onPlayerCanplaythrough($event)"-->
    <!--@statechanged="playerStateChanged($event)"-->
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="false"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     @ended="onPlayerEnded($event)"
                     @ready="playerReadied"
                     @timeupdate="onPlayerTimeupdate($event)"
                    >
      </video-player>
  </div>
</template>

<script>
  // custom skin css
  import './../css/movie.css'
  import 'video.js/dist/video-js.css'
//  import 'vue-video-player/src/custom-theme.css'
  import 'videojs-contrib-hls'
  import { videoPlayer } from 'vue-video-player'
  export default {
    data() {
      return {
        // videojs options
        current:0,
        playerOptions: {
          preload:"auto",
//          height: '500',
          autoplay: false,
          language: 'zh-CN',
          aspectRatio: '16:9',
          controls: false,
          sources: [{
            type: "video/mp4",
            src: "",
//            type:'application/x-mpegURL',
//            src:'http://1258371471.vod2.myqcloud.com/f2a5dd91vodtranscq1258371471/7b5438325285890783812495450/v.f240.m3u8',
          }],
          poster: "",
        }
      }
    },
    props:['movieItem'],
    mounted() {
      var type = this.movieItem.url.includes('m3u8') ? 'application/x-mpegURL' : 'video/mp4';
      this.playerOptions.sources = [{
        type:type,
        src: this.movieItem.url,
      }]
      this.playerOptions.poster = this.movieItem.image
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    components: {
      videoPlayer
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        this.$emit('playVideo');
      },
      onPlayerPause(player) {
        this.$emit('changeAfterPause')
      },
      onPlayerEnded(player) {
        this.$emit('endVideo')
      },
//      onPlayerLoadeddata(player) {
//         console.log('player Loadeddata!', player)
//      },
//      onPlayerWaiting(player) {
//         console.log('player Waiting!', player)
//      },
//      onPlayerPlaying(player) {
//         console.log('player Playing!', player)
//      },
//      onPlayerCanplay(player) {
//        console.log('player Canplay!', player)
//      },
//      onPlayerCanplaythrough(player) {
//        console.log('player Canplaythrough!', player)
//      },
//      // or listen state event
//      playerStateChanged(playerCurrentState) {
//        console.log('player current update state', playerCurrentState)
//      },
      onPlayerTimeupdate(player) {
        if((player.currentTime() - this.current) >1){
          player.currentTime(this.current)
        }else {
          this.current = player.currentTime()
        }
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        var video = document.querySelector('video');
//        video.setAttribute('raw-controls',true)
        video.setAttribute('playsinline',true)
        video.setAttribute('webkit-playsinline',true)
        video.setAttribute('x5-playsinline',true)
        if(this.isIos){
//          this.playerOptions.controls = true;
          video.setAttribute('controls',true)
        }
        console.log('example player 1 readied', player)
      }
    },
  }
</script>

