"strict"

const mediaBtn = document.getElementById('record-media-btn');

const mediaRecord = () => {
    navigator.mediaDevices.getDisplayMedia({video: true})
    .then(stream => {
        const recorder = new MediaRecorder(stream);
        recorder.start();

        const buffer = [];

        recorder.addEventListener('dataavailable', (event) => {
            buffer.push(event.data);
        })

        recorder.addEventListener('stop', () => {
            const video = new Blob(buffer, {type: 'video/mp4'});

            const a = document.createElement('a');
            a.href = URL.createObjectURL(video);
            a.download = 'recording.mp4'
            a.click();
        })
    })
    .catch(() => { alert("Screen recording canceled."); })
}
mediaBtn.addEventListener('click', mediaRecord);