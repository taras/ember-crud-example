/* global FileReader: false */

var CanvasFileComponent = Ember.Component.extend({
  actions: {
    start: function() {
      var that = this;
      var input = this.get('input');
      input.click();
      input.change(function(event) {
        Ember.run(that, 'readFileData', this.files);
      });
    }
  },
  classNames: ['canvas-file'],
  didInsertElement: function() {
    this.resetFile();

    var canvas = this.$().find('canvas');
    canvas.attr('width', this.get('width'));
    canvas.attr('height', this.get('height'));

    this.set('canvas', canvas);
    this.set('canvasContext', canvas[0].getContext('2d'));
    this.set('img', this.$('img.preview'));
    this.set('shadow', this.$('img.shadow'));
    this.set('input', this.$().find('input'));
  },
  src: function() {
    if (Em.isNone(this.get('value'))) {
      return "http://placehold.it/%@x%@".fmt(this.get('width'), this.get('height'));
    } else {
      return this.get('value');
    }
  }.property('value', 'width', 'height'),
  readFileData: function(files) {
    // TODO: handle scenario when multiple files are selected
    // TODO: test for file types
    if (files.length) {
      var file = this.get('file');
      file.readAsDataURL(files[0]);
    }
  },
  resetFile: function() {
    var that = this;
    var file = new FileReader();
    file.onload = function(event) {
      that.resetFile();
      that.resetCanvas();
      that.get('shadow').attr('src', event.target.result);
      Ember.run(that, 'drawImage', that.get('shadow')[0]);
      that.set('value', that.get('canvas')[0].toDataURL("image/jpeg"));
    };
    this.set('file', file);
  },
  resetCanvas: function() {
    var context = this.get('canvasContext');
    context.beginPath();
    context.rect(0, 0, this.get('width'), this.get('height'));
    context.fillStyle = 'white';
    context.fill();
  },
  getNewDimensions: function(img) {
    var
    width = img.width,
      height = img.height,
      maxWidth = this.get('width'),
      maxHeight = this.get('height');

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }
    return {
      width: width,
      height: height
    };
  },
  drawImage: function(img) {
    var
    width = this.get('width'),
      height = this.get('height'),
      resized = this.getNewDimensions(img);
    this.get('canvasContext').drawImage(img, (width - resized.width) / 2, (height - resized.height) / 2, resized.width, resized.height);
  }
});

export default CanvasFileComponent;
