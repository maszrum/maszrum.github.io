var PixelatedBackground=function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BackgroundSize=void 0;var n=function(){function t(t){this.pixelSize=t,this.widthPixels=-1,this.heightPixels=-1}return t.init=function(e){return this._instance=new t(e),this._instance},t.instance=function(){return this._instance},t.prototype.getPixelSize=function(){return this.pixelSize},t.prototype.recalculate=function(){var e=t.getWidthPixels(this.pixelSize),i=t.getHeightPixels(this.pixelSize),n=e!=this.widthPixels||i!=this.heightPixels;return n&&(this.widthPixels=e,this.heightPixels=i),n},t.prototype.getPixelsCount=function(){return this.widthPixels*(this.heightPixels+1)},t.prototype.indexToCoordinate=function(t){return{x:t%this.widthPixels,y:Math.floor(t/this.widthPixels)}},t.prototype.coordinateToIndex=function(t,e){return this.widthPixels*e+t},t.prototype.getSize=function(){return{width:this.widthPixels,height:this.heightPixels}},t.getWidthPixels=function(e){var i=t.getViewportWidth();return Math.ceil(i/e+.5)},t.getHeightPixels=function(e){var i=t.getViewportHeight();return Math.ceil(i/e+.5)},t.getViewportWidth=function(){return Math.max(document.documentElement.clientWidth,window.innerWidth||0)},t.getViewportHeight=function(){return Math.max(document.documentElement.clientHeight,window.innerHeight||0)},t}();e.BackgroundSize=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Color=void 0;var n=function(){function t(e,i,n,r){this.r=t.toColorComponent(e),this.g=t.toColorComponent(i),this.b=t.toColorComponent(n),this.a=null==r?1:r<0?0:r>1?1:r}return t.prototype.toStyleString=function(){return"rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")"},t.toColorComponent=function(t){return t<0?0:t>255?255:Math.round(t)},t.random=function(){return new t(this.getRandomColorComponent(),this.getRandomColorComponent(),this.getRandomColorComponent())},t.getRandomColorComponent=function(){return Math.floor(256*Math.random())},t.black=function(){return new t(0,0,0)},t.white=function(){return new t(255,255,255)},t.transparent=function(){return new t(0,0,0,0)},t.between=function(e,i,n){var r=1-n;return new t(e.r*n+i.r*r,e.g*n+i.g*r,e.b*n+i.b*r)},t.createCssGradient=function(t,e,i){return"linear-gradient("+Math.round(i)+"deg, "+t.toStyleString()+", "+e.toStyleString()+")"},t}();e.Color=n},function(t,e,i){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,i,n){void 0===n&&(n=i),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[i]}})}:function(t,e,i,n){void 0===n&&(n=i),t[n]=e[i]}),r=this&&this.__exportStar||function(t,e){for(var i in t)"default"===i||e.hasOwnProperty(i)||n(e,t,i)};Object.defineProperty(e,"__esModule",{value:!0}),e.Init=void 0,i(20);var o=i(3);r(i(1),e),r(i(3),e),r(i(10),e),r(i(11),e),r(i(14),e),r(i(17),e),e.Init=function(t){if(!("Promise"in window))return null;var e=document.getElementsByTagName("body")[0],i=document.createElement("div");i.id="background-container",e.prepend(i);var n=new o.PixelatedBackground(t,i);return window.onresize=function(){n.onWindowResized()},n}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PixelatedBackground=void 0;var n=i(0),r=i(4),o=i(1),a=i(5),s=function(){function t(t,e){this.scenes=[],this.initializeContainer(e,t),this.pixelSizeConverter=n.BackgroundSize.init(t),this.pixelsController=r.PixelsController.init(e.id)}return t.prototype.initializeContainer=function(t,e){var i=-Math.floor(e/2)+"px";t.style.top=i,t.style.left=i,t.style.width="calc(100vw + "+Math.floor(1.5*e)+"px - 1px)"},t.prototype.onWindowResized=function(){this.recalculateSize()&&this.currentScene&&(this.currentScene.stop(),this.currentScene.start())},t.prototype.recalculateSize=function(){var t=this.pixelSizeConverter.recalculate();if(t){var e=this.pixelSizeConverter.getPixelsCount();this.pixelsController.updateCount(e)}return t},t.prototype.updatePixelColor=function(t,e,i){var n,r;n=null==i?this.pixelSizeConverter.coordinateToIndex(t,e):i,r=this.currentScene?this.currentScene.getPixelColor(t,e):o.Color.transparent(),this.pixelsController.setPixelColor(n,r)},t.prototype.getSize=function(){return this.pixelSizeConverter.getSize()},t.prototype.startScene=function(t){var e=this.scenes.findIndex((function(e){return e.name==t}));if(-1!=e){var i=!1;this.currentScene?(this.currentScene.stop(),i=this.currentScene.getGradient().isStyleOnly()):this.recalculateSize(),this.currentScene=this.scenes[e],this.currentScene.start(i)}},t.prototype.appendScene=function(t){if(!t.hasTransition()){var e=new a.NoAnimation(this);t.withTransition(e,0)}this.scenes.push(t)},t.prototype.setFadingTime=function(t){this.pixelsController.setFadingTime(t)},t}();e.PixelatedBackground=s},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PixelsController=void 0;var n=i(0),r=function(){function t(t){this.fadingTime=0,this.element=document.getElementById(t)}return t.init=function(e){return this._instance=new t(e),this._instance},t.instance=function(){return this._instance},t.prototype.updateCount=function(t){var e=this.element.children.length;if(e!=t)if(e<t)for(var i=t-e,n=0;n<i;n++){var r=this.initializePixel();this.element.appendChild(r)}else if(e>t){var o=e-t;for(n=0;n<o;n++){var a=this.element.lastChild;this.element.removeChild(a)}}},t.prototype.initializePixel=function(){var e=document.createElement("div");e.style.width=t.getPixelSize()+"px",e.style.height=t.getPixelSize()+"px";var i=t.getFadingStyle(this.fadingTime);return e.style.transition=i,e},t.prototype.getDivAt=function(t){return this.element.children[t]},t.prototype.setPixelColor=function(t,e){this.getDivAt(t).style.backgroundColor=e.toStyleString()},t.prototype.setFadingTime=function(e){if(this.fadingTime!=e){this.fadingTime=e;for(var i=t.getFadingStyle(e),n=0;n<this.element.children.length;n++){this.element.children[n].style.transition=i}}},t.getFadingStyle=function(t){return t>0?"background-color "+t+"ms linear":""},t.getPixelSize=function(){return n.BackgroundSize.instance().getPixelSize()},t}();e.PixelsController=r},function(t,e,i){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0}),e.NoAnimation=void 0;var o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.calculateStepsCount=function(){return 1},e.prototype.startAnimation=function(t){for(var e=this.getSize(),i=0;i<e.height;i++)for(var n=0;n<e.width;n++)this.updatePixel(n,i)},e.prototype.stopAnimation=function(){},e}(i(6).AnimationBase);e.NoAnimation=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AnimationBase=void 0;var n=i(4),r=i(0),o=function(){function t(t,e){this.remaining=[],this.onFinish=function(){},this.finished=!1,this.fadingTimer=-1,this.pixelUpdater=t,this.fadingTime=e}return t.prototype.start=function(e,i){this.finished=!1,this.fadingTime?t.setFadingTime(this.fadingTime):t.setFadingTime(0),i&&(this.onFinish=i),this.initializeRemainingArray(),this.startAnimation(e)},t.prototype.stop=function(){this.finished=!1,this.remaining=[],-1!=this.fadingTimer&&(clearTimeout(this.fadingTimer),this.fadingTimer=-1),this.stopAnimation()},t.prototype.isFinished=function(){return this.finished},t.prototype.getSize=function(){return r.BackgroundSize.instance().getSize()},t.prototype.updatePixel=function(t,e){this.pixelUpdater.updatePixelColor(t,e);var i=this.remaining.findIndex((function(i){return i.x==t&&i.y==e}));if(i>=0){var n=this.isFinished();this.remaining.splice(i,1),0!=this.remaining.length||n||this.finish()}},t.prototype.getRemainingPixels=function(){return this.remaining},t.prototype.initializeRemainingArray=function(){var t=this.getSize();this.remaining=[];for(var e=0;e<t.height;e++)for(var i=0;i<t.width;i++)this.remaining.push({x:i,y:e})},t.prototype.finish=function(){var t=this;this.stop(),this.fadingTimer=setTimeout((function(){t.fadingTimer=-1,t.finished=!0,t.onFinish()}),this.fadingTime)},t.setFadingTime=function(t){n.PixelsController.instance().setFadingTime(t)},t}();e.AnimationBase=o},function(t,e,i){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0}),e.PixelatedLinearGradient=void 0;var o=i(1),a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.lfA=0,e.lfA_Denominator=-1,e}return r(e,t),e.prototype.isStyleOnly=function(){return!1},e.prototype.getColorAt=function(t,e){-1==this.lfA_Denominator&&this.initLF();var i=this.getSize();if(t>=i.width||e>=i.height)return o.Color.black();var n=2*(t/i.width-.5),r=2*(e/i.height-.5),a=(this.lfA*n-r)/this.lfA_Denominator;return(a=(a+1)/2)<0?a=0:a>1&&(a=1),o.Color.between(this.fromColor,this.toColor,a)},e.prototype.getStyle=function(){return o.Color.createCssGradient(this.fromColor,this.toColor,this.angleDegrees)},e.prototype.toPixelated=function(){return this},e.prototype.initLF=function(){var t=1;this.angleDegrees>=0&&this.angleDegrees<=90&&(t=-1),this.angleDegrees>=270&&this.angleDegrees<=360&&(t=-1),this.lfA=Math.tan(2*Math.PI*this.angleDegrees/360),this.lfA_Denominator=t*Math.sqrt(this.lfA*this.lfA+1)},e}(i(8).LinearGradient);e.PixelatedLinearGradient=a},function(t,e,i){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0}),e.LinearGradient=void 0;var o=function(t){function e(e,i,n){var r=t.call(this)||this;return r._fromColor=e,r._toColor=i,r._angle=n,r}return r(e,t),Object.defineProperty(e.prototype,"fromColor",{get:function(){return this._fromColor},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"toColor",{get:function(){return this._toColor},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"angleDegrees",{get:function(){return this._angle},enumerable:!1,configurable:!0}),e}(i(15).GradientBase);e.LinearGradient=o},function(t,e,i){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0}),e.TimedAnimation=void 0;var o=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.interval=-1,e}return r(e,t),e.prototype.startAnimation=function(t){var e=this,i=t/this.calculateStepsCount();this.interval=setInterval((function(){e.animationStep()}),i)},e.prototype.stopAnimation=function(){-1!=this.interval&&(clearInterval(this.interval),this.interval=-1)},e}(i(6).AnimationBase);e.TimedAnimation=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Scene=void 0;var n=function(){function t(t,e){this.transitionTime=-1,this.animationTime=-1,this.filters=[],this._name=t,this.gradient=e}return Object.defineProperty(t.prototype,"name",{get:function(){return this._name},enumerable:!1,configurable:!0}),t.prototype.withTransition=function(t,e){return this.transition=t,this.transitionTime=e,this},t.prototype.withAnimation=function(t,e){return this.animation=t,this.animationTime=e,this},t.prototype.appendFilter=function(t){return this.filters.push(t),this},t.prototype.start=function(t){var e=this;this.targetGradient&&(this.gradient=this.targetGradient);var i=this.transition;null==t?i.start(this.transitionTime,(function(){e.setStyleBackground(),e.startAnimation()})):this.gradient.isStyleOnly()?t?(this.targetGradient=this.gradient,this.gradient=this.gradient.toPixelated(),i.start(this.transitionTime,(function(){e.gradient=e.targetGradient,e.setStyleBackground(),i.start(e.transitionTime,(function(){e.startAnimation()}))}))):(this.setStyleBackground(),i.start(this.transitionTime,(function(){e.startAnimation()}))):i.start(this.transitionTime,(function(){e.setStyleBackground(),e.startAnimation()}))},t.prototype.stop=function(){var t;this.transition&&!this.transition.isFinished()&&this.transition.stop(),null===(t=this.animation)||void 0===t||t.stop()},t.prototype.hasTransition=function(){return-1!=this.transitionTime},t.prototype.getGradient=function(){return this.gradient},t.prototype.getPixelColor=function(t,e){var i=this.getBasePixelColor(t,e);return i=this.applyFiltersForPixel(i,t,e)},t.prototype.applyFiltersForPixel=function(t,e,i){for(var n=0;n<this.filters.length;n++)t=this.filters[n].apply(t,e,i,this.gradient);return t},t.prototype.getBasePixelColor=function(t,e){return this.gradient.getColorAt(t,e)},t.prototype.setStyleBackground=function(){var t=this.gradient.getStyle();console.log(this.gradient);var e=document.getElementsByTagName("body")[0];t.length>0?(e.style.backgroundImage=t,e.style.backgroundAttachment="fixed"):e.style.backgroundImage=""},t.prototype.startAnimation=function(){var t=this;this.animation&&(this.animation.stop(),this.animation.start(this.animationTime,(function(){t.startAnimation()})))},t}();e.Scene=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(12);Object.defineProperty(e,"BlowFilter",{enumerable:!0,get:function(){return n.BlowFilter}});var r=i(13);Object.defineProperty(e,"NoiseFilter",{enumerable:!0,get:function(){return r.NoiseFilter}})},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BlowFilter=void 0;var n=function(){function t(t,e){this.factor=1-t,this.customGradient=e||null}return t.prototype.apply=function(t,e,i,n){if(Math.random()>this.factor){var r=this.customGradient||n,o=r.getSize();return e=Math.floor(Math.random()*o.width),i=Math.floor(Math.random()*o.height),r.getColorAt(e,i)}return t},t}();e.BlowFilter=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.NoiseFilter=void 0;var n=function(){function t(t,e){this.factor=255*t,this.customGradient=e}return t.prototype.apply=function(t,e,i,n){this.customGradient&&(t=this.customGradient.getColorAt(e,i));var r=this.factor*(Math.random()-.5);return t.r=t.r+r,t.g=t.g+r,t.b=t.b+r,t},t}();e.NoiseFilter=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(7);Object.defineProperty(e,"PixelatedLinearGradient",{enumerable:!0,get:function(){return n.PixelatedLinearGradient}});var r=i(16);Object.defineProperty(e,"SmoothLinearGradient",{enumerable:!0,get:function(){return r.SmoothLinearGradient}})},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GradientBase=void 0;var n=i(0),r=function(){function t(){}return t.prototype.getSize=function(){return n.BackgroundSize.instance().getSize()},t}();e.GradientBase=r},function(t,e,i){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0}),e.SmoothLinearGradient=void 0;var o=i(1),a=i(8),s=i(7),u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.getColorAt=function(t,e){return o.Color.transparent()},e.prototype.isStyleOnly=function(){return!0},e.prototype.getStyle=function(){return o.Color.createCssGradient(this.fromColor,this.toColor,this.angleDegrees)},e.prototype.toPixelated=function(){return new s.PixelatedLinearGradient(this.fromColor,this.toColor,this.angleDegrees)},e}(a.LinearGradient);e.SmoothLinearGradient=u},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(18);Object.defineProperty(e,"DiagonalAnimation",{enumerable:!0,get:function(){return n.DiagonalAnimation}}),Object.defineProperty(e,"DiagonalStart",{enumerable:!0,get:function(){return n.DiagonalStart}});var r=i(19);Object.defineProperty(e,"GlitterAnimation",{enumerable:!0,get:function(){return r.GlitterAnimation}});var o=i(5);Object.defineProperty(e,"NoAnimation",{enumerable:!0,get:function(){return o.NoAnimation}})},function(t,e,i){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0}),e.DiagonalAnimation=e.DiagonalStart=void 0;var o,a=i(2),s=i(9);!function(t){t[t.TopLeft=0]="TopLeft",t[t.TopRight=1]="TopRight",t[t.BottomRight=2]="BottomRight",t[t.BottomLeft=3]="BottomLeft"}(o=e.DiagonalStart||(e.DiagonalStart={}));var u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.stepFunction=e.stepTopLeft,e}return r(e,t),e.prototype.startsAt=function(t){switch(t){case o.TopLeft:this.stepFunction=this.stepTopLeft;break;case o.TopRight:this.stepFunction=this.stepTopRight;break;case o.BottomRight:this.stepFunction=this.stepBottomRight;break;case o.BottomLeft:this.stepFunction=this.stepBottomLeft}return this},e.prototype.calculateStepsCount=function(){var t=this.getSize();return t.width+t.height-1},e.prototype.animationStep=function(){this.stepFunction()},e.prototype.stepTopLeft=function(){var t=this.getSize(),e=this.getRemainingPixels(),i=e[0].x,n=e[0].y;this.updatePixel(i,n);var r=!1;do{n+=1,(r=(i-=1)>=0&&n<t.height)&&this.updatePixel(i,n)}while(r)},e.prototype.stepTopRight=function(){var t=this.getSize(),e=this.getRemainingPixels(),i=0,n=0;if(0==e[0].y){var r=e.filter((function(t){return 0==t.y}));i=r[r.length-1].x,n=0}else i=e[0].x,n=e[0].y;this.updatePixel(i,n);var o=!1;do{n+=1,(o=(i+=1)<t.width&&n<t.height)&&this.updatePixel(i,n)}while(o)},e.prototype.stepBottomRight=function(){var t=this.getSize(),e=this.getRemainingPixels(),i=0,n=0,r=e[e.length-1];if(r.y==t.height-1)i=r.x,n=r.y;else{var o=e.filter((function(t){return 0==t.x}));i=0,n=o[o.length-1].y}this.updatePixel(i,n);var a=!1;do{n-=1,(a=(i+=1)<t.width&&n>=0)&&this.updatePixel(i,n)}while(a)},e.prototype.stepBottomLeft=function(){var t=this.getSize(),e=this.getRemainingPixels(),i=0,n=0,r=e.filter((function(t){return 0==t.x}));0==r.length?(i=e[0].x,n=0):(i=0,n=r[r.length-1].y),this.updatePixel(i,n);var o=!1;do{n+=1,(o=(i+=1)<t.width&&n<t.height)&&this.updatePixel(i,n)}while(o)},e}(s.TimedAnimation);e.DiagonalAnimation=u,a.PixelatedBackground.prototype.createDiagonalAnimation=function(t){return new u(this,t)}},function(t,e,i){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0}),e.GlitterAnimation=void 0;var o=i(2),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.calculateStepsCount=function(){var t=this.getSize();return t.width*t.height},e.prototype.animationStep=function(){var t=this.getRemainingPixels(),e=t[Math.floor(Math.random()*t.length)];this.updatePixel(e.x,e.y)},e}(i(9).TimedAnimation);e.GlitterAnimation=a,o.PixelatedBackground.prototype.createGlitterAnimation=function(t){return new a(this,t)}},function(t,e){}]);