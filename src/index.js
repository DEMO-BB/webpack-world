import _ from 'lodash';
import './style.css'
import img from './assets/beth.png'
import Data from './assets/data.xml';

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello')

  // 将图像添加到div中
  var image = new Image()
  image.src = img
  element.appendChild(image)

  console.log(Data);
  return element;
}

document.body.appendChild(component());