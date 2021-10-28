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

// 录制

let recVideo = document.querySelector('video#recplayer')
let btnRecord = document.querySelector('button#record')
let btnPlay = document.querySelector('button#recplay')
let btnDownload = document.querySelector('button#download')
let buffer, mediaRecorder

let start = () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
    console.log('getDisplayMedia is not supported!')
  } else {
    let deviceId = videoSource.value
    navigator.mediaDevices.getDisplayMedia(
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
        window.stream = stream
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
        console.log('getDisplayMedia error: ', err)
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

function startRecord() {
  buffer = []
  let options = {
    mimeType: 'video/webm;codecs=vp8'
  }
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not supported`)
    return
  }
  try{
    mediaRecorder = new MediaRecorder(window.stream, options)
  } catch(e) {
    console.error('Failed to create MediaRecorder: ', e)
    return
  }
  mediaRecorder.ondataavailable = (e) => {
    if (e && e.data && e.data.size > 0) {
      buffer.push(e.data)
    }
  }
  mediaRecorder.start(10)
}
function stopRecord() {
  mediaRecorder.stop()
}
 
btnRecord.onclick = () => {
  if (btnRecord.textContent === 'Start Record') {
    startRecord()
    btnRecord.textContent = 'Stop Record'
    btnPlay.disabled = true
    btnDownload.disabled = true
  } else {
    stopRecord()
    btnRecord.textContent = 'Start Record'
    btnPlay.disabled = false
    btnDownload.disabled = false
  }
}
btnPlay.onclick = () => {
  let blob = new Blob(buffer, {type: 'video/webm'})
  recVideo.src = window.URL.createObjectURL(blob)
  recVideo.srcObject = null
  recVideo.controls = true
  recVideo.width = 480
  recVideo.height = 360
  recVideo.play()
}
btnDownload.onclick = () => {
  let blob = new Blob(buffer, {type: 'video/webm'})
  let url = window.URL.createObjectURL(blob)
  let a = document.createElement('a')

  a.href = url
  a.style.display = 'none'
  a.download = 'record.webm'
  a.click()
}