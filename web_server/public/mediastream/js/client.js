'use strict'

let audioSource = document.querySelector('select#audioSource');
let audioOutput = document.querySelector('select#audioOutput');
let videoSource = document.querySelector('select#videoSource');
// 特效
let filtersSelect = document.querySelector('select#filter')

let videoplay = document.querySelector('video#player');
// 图片捕获
let snapshot = document.querySelector('button#snapshot')

let picture = document.querySelector('canvas#picture')
picture.width = 320;
picture.height = 240;
// 采集音频
let audioplay = document.querySelector('audio#audioplayer')
// 获取视频约束
let divConstraints = document.querySelector('div#constraints')

let start = () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia is not supported!')
  } else {
    let deviceId = videoSource.value
    navigator.mediaDevices.getUserMedia(
      {
        audio: false, 
        video: {
          width: 480, height: 360,
          deviceId,
          facingMode: 'environment'
        }
      }
    )
      .then(stream => {
        videoplay.srcObject = stream
        // audioplay.srcObject = stream
        let videoTrack = stream.getVideoTracks()[0]
        divConstraints.textContent = JSON.stringify(videoTrack.getSettings(), null, 2)

        return navigator.mediaDevices.enumerateDevices()
      })
      .then(deviceInfos => {
        deviceInfos.forEach(deviceInfo => {
          console.log(`deviceKind = ${deviceInfo.kind}\nlabel = ${deviceInfo.label}\nid = ${deviceInfo.deviceId}\ngroupId = ${deviceInfo.groupId}`)
          let option = document.createElement('option');
          option.text = deviceInfo.label;
          option.value = deviceInfo.deviceId;
          switch (deviceInfo.kind) {
            case 'audioinput':
              audioSource.appendChild(option);
              break;
            case 'audiooutput':
              audioOutput.appendChild(option);
              break;
            case 'videoinput':
              videoSource.appendChild(option);
              break;
            default:
              break;
          }
        })
      })
      .catch(err => {
        console.log('getUserMedia error: ', err)
      })
  }
}
start()
videoSource.onchange = start

filtersSelect.onchange = () => {
  videoplay.className = filtersSelect.value
}

snapshot.onclick = () => {
  picture.getContext('2d').drawImage(videoplay, 0, 0, 320, 240)
}