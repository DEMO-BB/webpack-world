// import _ from 'lodash';
import './style.css'
import img from './assets/beth.png'
// import Data from './assets/data.xml';
// import printMe from './print.js';
import { cube } from './math.js';

console.log('process.env.NODE_ENV111', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.createElement('div');

  // this.alert('hello shimming')

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // Lodash, now imported by this script
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  element.classList.add('hello')

  // 将图像添加到div中
  var image = new Image()
  image.src = img
  // element.appendChild(image)

  // console.log(Data);

  // 添加按钮
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;
  btn.onclick = e => import('./print').then(module => {
    var print = module.default;

    print();
  })
  element.appendChild(btn);

  // 添加一个模块
  var element1 = document.createElement('pre');
  element1.innerHTML = ['Hello webpack!', '5 cubed is equal to ' + cube(5)].join('\n\n');
  element.appendChild(element1);

  fetch('https://jsonplaceholder.typicode.com/users')
   .then(response => response.json())
   .then(json => {
     console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
     console.log(json)
   })
   .catch(error => console.error('Something went wrong when fetching this data: ', error))

  return element;
}

document.body.appendChild(component());

console.log(module.hot, 'module.hot')
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Acception the updated printMe module!');
    printMe();
  })
}
