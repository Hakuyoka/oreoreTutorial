/**
 * Created by kotato on 2017/03/23.
 */

let obj = {}

obj.func1 = function(){
  let val = 1
  console.log(val)
}

obj.func2 = function(){
  let val = 2
  console.log(this.val)
}

obj.val = "Hi!"


obj.func3 = function(){
  let val = 3
  function show(){
    console.log(val)
  }
  show()
}

obj.func4 = function(){
  let val = 4
  function show(){
    console.log(this.val)
  }
  show()
}

val = "global"

obj.show = function(){
  console.log(this.val)
}

obj.func5 = function(){
  let val = 5
  this.show()
}


obj.func6 = function(){
  let val = 6
  var show = function(){
    console.log(val)
  }
  show()
}

obj.func7 = function(){
  let val = 7
  var show = function(){
    console.log(val)
  }
  this.show()
}

obj.func8 = function(){
  let val = 8
  function show(){
    console.log(this.val)
  }
  show.apply({val :"apply"})
}


function MyObject() {
  this.value = "MyObject"
  let value = "Innner"
  this.show1 = function() {
    console.log(this.value)
  };
  this.show2 = function() {
    console.log(value)
  };
}

obj.func1()
obj.func2()
obj.func3()
obj.func4()
obj.func5()
obj.func6()
obj.func7()
obj.func8()