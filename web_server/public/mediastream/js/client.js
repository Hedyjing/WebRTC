'use strict'

if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia is not supported!')
} else {
  navigator.mediaDevices.getUserMedia({audio: true, video: true})
  .then(stream => {
    document.querySelector('video#player').srcObject = stream
    return navigator.mediaDevices.enumerateDevices()
  })
  .then(deviceInfos => {
    deviceInfos.forEach(deviceInfo => {
      console.log(`deviceKind = ${deviceInfo.kind}\nlabel = ${deviceInfo.label}\nid = ${deviceInfo.deviceId}\ngroupId = ${deviceInfo.groupId}`)
      let option = document.createElement('option');
      option.text = deviceInfo.label;
      option.value = deviceInfo.deviceId;
      switch(deviceInfo.kind) {
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