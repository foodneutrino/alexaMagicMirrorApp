var awsIot = require('aws-iot-device-sdk');
var config = require("./config");

class MagicMirror {
  constructor() {
    this.device = null
    this.TOPIC_IMAGES = "MagicMirror/new_images";
    this.TOPIC_TEXT = "MagicMirror/new_text";
  }

  // Setup our AWS IoT device gateway
  setup(callback) {
      // Auth with AWS
      this.device = awsIot.device(config.aws.magicmirror);

      console.log("Attempt to connect to AWS ");
      this.device.on("connect",function(){
          console.log("Connected to AWS ");
          callback();
      });
  }

  // Method that will accept an array of images and publish to AWS IoT
  showImages(images, searchTerm, callback) {
      var callback = callback || function(){};
      var searchTerm = searchTerm || null;
      var imageList = images || [];
      var timestamp = new Date().getTime();
      var update = {"images":imageList,"displayText":searchTerm, timestamp:timestamp};

      // validate?
      if(!imageList.length) return;

      this.device.publish(this.TOPIC_IMAGES,
        JSON.stringify(update),
        () => {
          console.log("Published: \nTopic => "+this.TOPIC_IMAGES
                      +" Data => "+JSON.stringify(update));
          callback();
          this.device.end()
      });
  }

  // Method that will accept an array of images and publish to AWS IoT
  displayText(text, callback) {
      var callback = callback || function(){};
      var displayText = text || "Oops. I missed it. Try again.";
      var timestamp = new Date().getTime();
      var update = {"displayText":displayText, "timestamp":timestamp};


      var updateJson = JSON.stringify(update);
      console.log('Attemp to display [ ' + updateJson + ' ]');

      this.device.publish(
        this.TOPIC_TEXT,
        updateJson,
        () => {
          console.log(
            "Published: \nTopic => " + this.TOPIC_TEXT + " \nData => " + updateJson
          );
          callback();
          this.device.end()
        }
      );
      console.log("Sent msg to topic");
  }
}

module.exports = MagicMirror;
