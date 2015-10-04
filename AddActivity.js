'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableHighlight,
  ListView,
} = React;

var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var Button = React.createClass({
    handlePress: function() {
        this.props.onClick();
    },
    render: function() {
        return (
            <View style={styleHeader.container}>
                <TouchableHighlight onPress={this.handlePress} underlayColor="#efefef">
                    <Text style={styleHeader.button}>{this.props.children}</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

var BodyButton = React.createClass({
    handlePress: function() {
        this.props.onClick();
    },
    render: function() {
        return (
            <View>
                <TouchableHighlight onPress={this.handlePress} underlayColor="#efefef">
                    <Text style={styles1.imageBtn}>{this.props.children}</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

// Specify any or all of these keys
var options = {
  title: '选择照片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照...',
  takePhotoButtonHidden: false,
  chooseFromLibraryButtonTitle: '从相册选取...',
  chooseFromLibraryButtonHidden: false,
  // customButtons: {
  //   'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  // },
  maxWidth: 100,
  maxHeight: 100,
  returnBase64Image: false,
  returnIsVertical: false,
  quality: 0.2,
  allowsEditing: false, // Built in iOS functionality to resize/reposition the image
  //storageOptions: {   // if provided, the image will get saved in the documents directory (rather than tmp directory)
  //  skipBackup: true, // will set attribute so the image is not backed up to iCloud
  //  path: "images",   // will save image at /Documents/images rather than the root
  //}
};

var AddActivity = React.createClass({
	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      title: 0,
      content: 0,
		};
	},

  getPhoto: function() {
    // The first arg will be the options object for customization, the second is
    // your callback which sends string: responseType, string: response.
    // responseType will be either 'cancel', 'data', 'uri', or one of your custom button values
    UIImagePickerManager.showImagePicker(options, (responseType, response) => {
      console.log(`Response Type = ${responseType}`);

      if (responseType !== 'cancel') {
        let source;
        if (responseType === 'data') { // New photo taken OR passed returnBase64Image true -  response is the 64 bit encoded image data string
          source = {uri: 'data:image/jpeg;base64,' + response, isStatic: true};
        }
        else if (responseType === 'uri') { // Selected from library - response is the URI to the local file asset
          source = {uri: response.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  },

  addItem: function() {
      fetch("https://api.leancloud.cn/1.1/classes/Activity", {
          method: "POST",
          headers: {
              'X-LC-Id': 'vGdoWipkgLukG49FCz6beS1D',
              'X-LC-Key': '5LubapRJJIphAkmklcQw8zx2',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: Math.ceil(Math.random() * 10000),
              content: this.state.content,
              title: this.state.title,
          })
      }).then(function() {
          this.props.navigator.pop();
      }.bind(this), function() {
          console.error("fail");
      });
  },

  uploadPhoto: function(name) {
    var file = this.state.avatarSource;
    fetch("https://api.leancloud.cn/1.1/classes/Avatar", {
        method: "POST",
        headers: {
            'X-LC-Id': 'vGdoWipkgLukG49FCz6beS1D',
            'X-LC-Key': '5LubapRJJIphAkmklcQw8zx2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            file: file,
        })
    }).then(function() {
        // this.props.navigator.pop();
        alert('上传成功!');
    }.bind(this), function() {
        console.error("fail");
    });
  },

  renderHeader: function(title) {
    return (
      <View style={styleHeader.headerContainer}>
        <Button style={styleHeader.headerBtn} onClick={this.onBack}>返回</Button>
        <Text style={style.header}>{title}</Text>
        <Button onClick={this.addItem} style={styleHeader.toolbar}>添加</Button>
      </View>
    )
  },

  onBack: function() {
      this.props.navigator.pop();
  },

	render: function() {
    return (
      <View style={style.rootContainer}>
      {this.renderHeader('添加活动')}
      <View>
        <Text>活动标题：</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({title:text})}
          value={this.state.title}/>
        <Text>活动内容：</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({content:text})}
          value={this.state.content}/>
          <BodyButton onClick={this.getPhoto} style={styles1.imageBtn}>添加图片</BodyButton>
          <Image source={this.state.avatarSource} style={styles1.uploadAvatar} />
          <BodyButton onClick={this.uploadPhoto} style={styles1.imageBtn}>上传</BodyButton>
      </View>
      </View>
    );
  },

});

var style = require("./style");

var styleHeader = require("./styleHeader");

var styles1 = StyleSheet.create({
  imageBtn: {
    borderColor: '#696969',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadAvatar: {
    height: 100,
    width: 375,
  },
});

module.exports = AddActivity;