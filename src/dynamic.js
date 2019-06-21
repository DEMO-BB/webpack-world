function component(_) {
    var element = document.createElement('div');

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello')

    return element;
}

// function getComponent() {
async function getComponent() {
  const _ = await import('lodash')
  return component(_)
  // return import('lodash').then(function(_) {
  //   var element = document.createElement('div');

  //   // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  //   // Lodash, now imported by this script
  //   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  //   element.classList.add('hello')

  //   return element;
  // }).catch(function(error) {
  //   console.log('An error occurred while loading the component', error)
  // })
}

getComponent().then(function(component) {
  document.body.appendChild(component);
})
