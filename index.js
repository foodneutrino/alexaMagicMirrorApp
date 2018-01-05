var MagicMirror = require("./magicMirror");
const googleImages = require('google-images');
const Alexa   = require('alexa-sdk');
const AWS_IOT = require('aws-iot-device-sdk');

const APP_ID = 'amzn1.ask.skill.1b1aea4b-f9f3-4cc7-a99e-4122f1d24f7d';
/**
 * https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit/getting-started-guide
 */

// Setup MagicMirror
// magicMirror.setup();

// Define handlers for different alexa requests that come in
// Register these handlers with the alexa API
handlers = {
  'LaunchRequest': function() {
    console.log("onLaunch requestId=" + this.event.request.requestId
      + ", sessionId=" + this.event.session.sessionId);

    this.emit(':tell', 'Welcome to the Magic Mirror App. Ask me to show you something.')
  },

  'SessionEndedRequest': function() {
     console.log("onSessionStarted requestId=" + this.event.request.requestId
       + ", sessionId=" + this.event.session.sessionId);
  },

  'ShowText': function() {
    //var that = this
    const payload = this.event.request.intent.slots.displayText.value

    console.log('Intent: [Text]=[' + payload + ']')

    var magicMirror = new MagicMirror()
    magicMirror.setup(
      function() {
        magicMirror.displayText(payload)
      }
    );

    console.log('ShowText Handler Complete. Inform Alexa');
    this.emit(':tell', 'I told your mirror to say ' + payload)
  },

  'ShowImages': function() {
    var searchTerm = this.event.request.intent.slots.searchTerm.value
    console.log('Intent: [Image]=[' + searchTerm + ']')
    // Search for images
    const client = new googleImages('013522846389950653327:kvc3unan_c0', 'AIzaSyC8YzZ-24BNebSl_qlZ2X52L5mSp5D_f4g');
    client.search(searchTerm).then(images => {
        console.log("Found images: "+JSON.stringify(images));

        // Connect to AWS IoT
        var magicMirror = new MagicMirror()
        magicMirror.setup(function(){

            // Send images
            magicMirror.showImages(images,searchTerm);
        });
    });

    console.log("ShowImages Handler Complete. Inform Alexa")
    this.emit(':tell', "I told your mirror to show you images of "+searchTerm)
  }
};

exports.handler = function (event, context, callback) {
  const alexaId = event.session.application.applicationId
  const reqId = event.request.requestId
  console.log(`Event.Session.Application.applicationId: [${event.session.application.applicationId}]`);
  console.log(`Event.Request.requestId: [${reqId}]`);
  if (alexaId !== APP_ID) {
       context.fail("Invalid Application ID");
  }

  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = alexaId
  alexa.registerHandlers(handlers);
  alexa.execute();
};
