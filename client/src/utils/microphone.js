function startMicrophone() {
  /* const audioContext = new AudioContext(); */

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then(console.log('success'))
      .catch(console.log('fail'));
  } else {
    navigator.getUserMedia(
      {
        video: false,
        audio: true,
      },
      console.log('success'),
      console.log('fail')
    );
  }
}

export default startMicrophone;
