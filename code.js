let shortVideos = [
  {
    src: 'iu.mp4',
    title: '사랑스러운 아이유',
    description: '아이유는 매우 사랑스럽고 이쁘다 ^^ 그리고 정말 정말 부자이고 착하고 부지런하다!!!!!!!'
  },
  {
    src: 'cat.mp4',
    title: '개구쟁이 고양이',
    description: '고양이와 즐거운 점심시간 !'
  },
  {
    src: 'snow.mp4',
    title: '설현 컴백',
    description: '설현이 이번주에 컴백한다 ㄷㄷㄷ'
  },
]

document.querySelector('.shorts .shorts-wrap').innerHTML = shortVideos.map(function(video, index){
  return `
    <div class="video-wrapper">
      <div class="video">
        <video src="./videos/${video.src}" index="${index}" onclick="playpause(this)" autoplay="false" loop>
      </div>
      <div class="details">
        <h2>${video.title}</h2>
        <p>${video.description}</p>
      </div>
    </div>
  `
}).join('')

let currentIndex = 0
function playpause(ref){
  if(ref.getAttribute('index') != currentIndex){ // 현재 플레이되는 영상이 아닌 경우
    return 
  }
  if(ref.paused){
    ref.play()
  }else{
    ref.pause()
  }
}
function setPlay(index){
  try{
    let videos = document.querySelectorAll('.shorts .shorts-wrap .active')
    for(let i=0;i<videos.length;i++){
      videos[i].classList.remove('active')
      videos[i].pause()
    }
  }catch(e){
    console.log(e)
  }
  let videoWrapper = document.querySelectorAll('.shorts .shorts-wrap .video-wrapper')[index]
  let video = videoWrapper.querySelector('video')
  video.classList.add('active')
  video.play()
}

// 스와이프한 비디오의 인덱스값이 callback 으로 넘어와서 자동으로 해당 영상이 플레이됨
new Swipe(document.querySelector('#shorts'), {
  startSlide: 0,
  draggable: true,
  autoRestart: false,
  continuous: false,
  disableScroll: true,
  stopPropogation: true ,
  callback: function(index){
    currentIndex = index
    setPlay(index)
  }
})
setPlay(currentIndex) // 사용자가 처음에 재생버튼을 클릭하지 않고 자동재생하려면 에러남
