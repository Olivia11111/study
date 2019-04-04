
    var myPlayer = videojs('my-player',{
        playbackRates: [0.5, 1, 1.5, 2],
        
    });

    //plugin
    videojs.registerPlugin('examplePlugin', examplePlugin);
    function examplePlugin(options) {

        if (options.customClass) {
          this.addClass(options.customClass);
        }
      
        this.on('playing', function() {
          console.log('Plugin: playback began!');
        });
      }
      myPlayer.examplePlugin({customClass:"me"});
      //advanced plugin
      const Plugin = videojs.getPlugin('plugin');
      class exampleAdvancedPlugin extends Plugin {
        constructor(player, options) {
            super(player, options);
        
            if (options.customClass) {
              player.addClass(options.customClass);
            }
      
          player.on('playing', function() {
            console.log('Advanced plugin: playback began!');
          });
        }
      }
      videojs.registerPlugin('exampleAdvancedPlugin', exampleAdvancedPlugin);
      myPlayer.exampleAdvancedPlugin({customClass:"me"});
      myPlayer.exampleAdvancedPlugin().on('example-event', function() {
        videojs.log('example plugin received an example-event');
      });
      myPlayer.exampleAdvancedPlugin().trigger('example-event');

    var goTo50s = function(){
        console.log("video duration:%ds",myPlayer.duration())
        myPlayer.currentTime(50);
    }
    var Component = videojs.getComponent('Component');
    var myComponent = new Component(myPlayer);
    var myButton = myComponent.addChild('MyButton', {
    text: 'Press Me',
    buttonChildExample: {
        buttonChildOption: true
    }
    });
    var button = myPlayer.addChild('button');
    console.log(button.el());
