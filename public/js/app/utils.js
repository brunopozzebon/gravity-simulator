function newtonGravitationLaw(m1, m2, d) {
  const G = GRAVITATION_CONSTANT
  return G * (m1 * m2 / (d * d))
}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

function fillBufferWithInicialValue(array,x,y,z){
  let type = 0;
  for (let index = 0; index < array.length; index++) {
    switch(type){
      case 0:
        array[index] = x;
        type=1;
      break;
      case 1:
        array[index] = y;
        type=2;
      break;
      case 2:
        array[index]=z;
        type=0;
    }
    
  }
}