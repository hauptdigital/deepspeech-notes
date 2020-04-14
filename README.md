# deepspeech-notes

## Deployment

To deploy this application, your production environment must meet the following requirements:

1. node.js
2. npm

After you moved the repository content to your webspace, you need to run these preconfigured scripts from the repository root directory:

1. `npm prod-prebuild`
2. `npm prod-build`
3. Rename `.env.example` into `.env` and change content to desired port

The `Express` server will handle the following requests:

1. `https://your-url.com/storybook` will route to the storybook build
2. All other requests (including `https://your-url.com`) will route to the React application build (= `"client/build"`)
