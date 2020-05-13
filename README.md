[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
![GitHub top language,](https://img.shields.io/github/languages/top/hauptdigital/deepspeech-notes?style=flat-square)

<div align="center">

![alt text](https://github.com/hauptdigital/deepspeech-notes/blob/master/client/src/assets/logo.svg?raw=true)

# DeepSpeechNotes

</div>

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Get Started](#get-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About the project

DeepSpeechNotes is a note taking app that uses Mozilla's DeepSpeech, Web Audio API and Node Voice Activity Detection to transcribe speech into text on the go.

It is my graduation project that was coded from scratch in 4 weeks. My main goal was to showcase current Open Source Text-To-Speech technology.

### 🚀 Built With

#### 💅 Front End

- React
- Web Audio API
- @picovoice/web-voice-processor
- Socket.io-client
- @emotion/core and styled
- storybook

#### 🧱 Back End

- Express
- MongoDB
- DeepSpeech
- Node Voice Activity Detection
- Socket.io

## About The Project

[![DeepSpeechNotes Screen Shot][product-screenshot]](https://deepspeech.haupt.digital)

[Go to Demo](https://deepspeech-notes.haupt.digital)

I wanted to learn something new in terms of technology, so I picked the topics Machine Learning and Speech-To-Text recognition and apply them practically. The result is DeepSpeechNotes, a note taking app that transcribes voice in near real-time.

## Get Started

To use DeepSpeechNotes, you must meet the following requirements:

1. node.js
2. npm
3. MongoDB

After you moved the repository content to your webspace, you need to run these preconfigured scripts from the repository root directory:

1. `npm prod-prebuild`
2. `npm prod-build`
3. Rename `.env.example` into `.env` and change content to desired port and connect to your MongoDB

The `Express` server will handle the following requests:

1. `https://your-url.com/storybook` will route to the storybook build
2. All other requests (including `https://your-url.com`) will route to the React application build (= `"client/build"`)

You need a pretrained model for DeepSpeech to work. Please look at this [readme](src/model/README.md) to find out how to download the model.

## Roadmap and contributing

Please have a look at [open issues](https://github.com/hauptdigital/deepspeech-notes/issues) and maybe add your own 💡.

Contributions are **greatly appreciated**:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE.txt) for more information.

## Contact

Marc Haupt - [Twitter: @Marc_Haupt](https://twitter.com/Marc_Haupt) - [GitHub: hauptdigital](https://github.com/hauptdigital) - marc@haupt.digital

![Twitter Follow](https://img.shields.io/twitter/follow/Marc_Haupt?style=social)
![GitHub followers](https://img.shields.io/github/followers/hauptdigital?style=social)

Project Link: [https://github.com/hauptdigital/deepspeech-notes](https://github.com/hauptdigital/deepspeech-notes)

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Socket.io](https://socket.io/)
- [@emotion](https://emotion.sh/docs/introduction)
- [Storybook](https://storybook.js.org)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [DeepSpeech](https://github.com/mozilla/DeepSpeech)
- [Node Voice Activity Detection](https://github.com/snirpo/node-vad)
- [@picovoice/web-voice-processor](https://github.com/Picovoice/web-voice-processor)
- [Neue Fische Coding Bootcamp](https://www.neuefische.de/)
- [Img Shields](https://shields.io)

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/hauptdigital/deepspeech-notes.svg?style=flat-square
[contributors-url]: https://github.com/hauptdigital/deepspeech-notes/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/hauptdigital/deepspeech-notes.svg?style=flat-square
[forks-url]: https://github.com/hauptdigital/deepspeech-notes/network/members
[stars-shield]: https://img.shields.io/github/stars/hauptdigital/deepspeech-notes.svg?style=flat-square
[stars-url]: https://github.com/hauptdigital/deepspeech-notes/stargazers
[issues-shield]: https://img.shields.io/github/issues/hauptdigital/deepspeech-notes.svg?style=flat-square
[issues-url]: https://github.com/hauptdigital/deepspeech-notes/issues
[license-shield]: https://img.shields.io/github/license/hauptdigital/deepspeech-notes.svg?style=flat-square
[license-url]: https://github.com/hauptdigital/deepspeech-notes/blob/master/LICENSE.txt
[product-screenshot]: docs/screenshot.png
