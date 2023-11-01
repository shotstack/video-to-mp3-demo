# Shotstack Video to MP3 Demo

This demo shows you how to use the Shotstack Ingest API to [convert a video to
mp3](https://shotstack.io/demo/video-to-mp3/). The Ingest API is a [video transformation
API](https://shotstack.io/product/ingest-api/) that can be used to upload store and convert videos and images to a
variety of formats, sizes, frame-rates, speeds and more.

An HTML web form lets the user upload a video or enter the URL of a video that is hosted online. The user can then
submit the form which will convert the video to and mp3 audio file. The file can be played back in the browser or
downloaded. It is also possible to change the speed and pitch of the audio when converted to an mp3 file.

View the live demo at: https://shotstack.io/demo/video-to-mp3/

The demo is built using Node JS and can be used with either Express Framework or deployed as a serverless projects using
AWS Lambda and API Gateway.

### Requirements

- Node 16+
- Shotstack API key: https://dashboard.shotstack.io/register

### Project Structure

The project is divided in to a two components:

#### Backend API

The backend API has an endpoint that receives the video and any speed settings. The parameters are prepared in the [JSON
format](https://shotstack.io/docs/api/#tocs_source) required by the Ingest API and posted to the API. A status endpoint
is called to check the progress of the transformation and when complete the final mp3 audio file URL is returned.

The backend API source code is in the _api_ directory.

#### Frontend Web Form & Player

The frontend is a simple HTML form using Bootstrap that allows the user to upload a video file. They can also adjust
playback speed and pitch. The form uses jQuery to submit the data to the backend API and poll the status of the current
conversion. There is also an audio player that is loaded with the final audio file when ready.

The front end API source code is in the _web_ directory.

### Installation

Install node module dependencies:

```bash
cd api
npm install
```

### Configuration

Copy the .env.dist file and rename it .env:

```
cp .env.dist .env
```

Replace the environment variables below with your Shotstack API key (stage key) and a writable S3 bucket name:

```bash
SHOTSTACK_API_KEY=replace_with_your_shotstack_key
SHOTSTACK_HOST=https://api.shotstack.io/ingest/stage/
AWS_S3_UPLOADS_BUCKET=replace_with_an_s3_bucket_name
```

### Run Locally

To start the API and serve the front end form (from the _api_ directory):

```bash
npm run start
```

Then visit [http://localhost:3000](http://localhost:3000)


### Deploy Serverless Application (optional)

The project has been built as a serverless application using the Serverless Framework and AWS Lambda. To understand more
about the Serverless Framework and how to set everything up consult the documentation:
https://serverless.com/framework/docs/providers/aws/

To deploy to AWS Lambda (from the _api_ directory):

```bash
cd api
npm run serverless
```

Once the API is deployed set the `var apiEndpoint` variable in **web/app.js** to the returned API Gateway URL.

Run the **web/index.html** file locally or use AWS S3 static hosting to serve the web page.
