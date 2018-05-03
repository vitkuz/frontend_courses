// function f1() {
//   console.log('this is function 1');
// }
//
// var o = {
//   name: 'Vitaly'
// };
//
// var arr1 = [1,'str1', o, f1];
//
// function copyFunction(fnToCopy) {
//   return fnToCopy.bind({})
// }
//
// function copyArray(arrToCopy) {
//   var copy = [];
//   for (var i=0; i < arrToCopy.length; i++) {
//     if (typeof arrToCopy[i] === 'object') {
//       console.log('Cloning object');
//       copy.push(copyObject(arrToCopy[i]));
//     } else if (typeof arrToCopy[i] === 'function') {
//       console.log('Cloning function');
//       copy.push(copyFunction(arrToCopy[i]));
//     } else {
//       copy.push(arrToCopy[i]);
//     }
//
//   }
//   return copy;
// }
//
// function copyObject(objToCopy) {
//   return Object.assign({}, objToCopy);
// }
//
// var f2 = copyFunction(f1);
//
// f2();
//
// var arr2 = copyArray(arr1);
//
// o.name = 'Varvara';
// console.log(arr1);
// console.log(arr2);

// var person = {
//   name: 'Vitaly',
//   logName: function () {
//     console.log(`->> ${this.name}`);
//   }
// };
//
// var manager = Object.create(person);


// console.log(manager.name);

// manager.logName();

function Observable (fn) {
  
  var nextArr = [];
  var errorArr = [];
  var completeArr = [];
  
  var observer =  {
    subscribe: function (next, error, complete) {
      nextArr.push(next);
      errorArr.push(error);
      completeArr.push(complete);
    },
    next: function(data) {
      nextArr.forEach(function(nextFn) {
        nextFn(data);
      })
    },
    error: function(error) {
      errorArr.forEach(function(errorFn) {
        errorFn(error);
      })
    },
    complete: function () {
      errorArr.forEach(function(completeFn) {
        completeFn(data);
      })
    }
  }
  
  var complete = fn(observer);
  
  observer.complete = complete;
  
  return observer;
}

var test$ = new Observable(function (observer) {
  var i = 0;
  var interval = setInterval(function () {
  
    i++
    
    if (i < 5) {
      observer.next(i);
    }
    
    if (i > 5) {
      observer.error(i);
    }
    
    if (i > 7) {
      observer.complete();
    }
    
  }, 1000)
  
  return function () {
    console.log('Complete!');
    clearInterval(interval);
  }
  
});


test$.subscribe(function (data) {
  console.log('Next was fired with'+data);
  },
  function (data) {
    console.log('Error was fired with'+data);
  });

test$.subscribe(function (data) {
      console.log('Next2 was fired with'+data);
    },
    function (data) {
      console.log('Error2 was fired with'+data);
    });