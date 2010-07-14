YUI.add("node-flick",function(B){var P="host",N="parentNode",J="boundingBox",L="offsetHeight",D="offsetWidth",K="bounce",E="minDistance",M="minVelocity",C="bounceDistance",O="deceleration",A="step",I="duration",F="easing",G="flick";function H(Q){H.superclass.constructor.apply(this,arguments);}H.ATTRS={deceleration:{value:0.98},bounce:{value:0.7},bounceDistance:{value:150},minVelocity:{value:0},minDistance:{value:10},boundingBox:{valueFn:function(){return this.get(P).get(N);}},step:{value:10},duration:{},easing:{}};H.NAME="pluginFlick";H.NS="flick";B.extend(H,B.Plugin.Base,{initializer:function(){this._node=this.get(P);this.setBounds();this._setStyles();this._node.on(G,B.bind(this._onFlick,this),{minDistance:this.get(E),minVelocity:this.get(M)});},setBounds:function(){var T=this.get(J),U=T.get(L),S=T.get(D),R=this._node.get(L),Q=this._node.get(D);if(R>U){this._maxY=R-U;this._minY=0;this._scrollY=true;}if(Q>S){this._maxX=Q-S;this._minX=0;this._scrollX=true;}this._x=this._y=0;},_setStyles:function(){var Q=this.get(J);Q.setStyle("overflow","hidden");if(Q.getStyle("position")!=="absolute"){Q.setStyle("position","relative");}this._node.setStyle("position","absolute");},_onFlick:function(Q){this._v=Q.velocity*Q.direction;this._flick=true;this._flickAnim();},_flickAnim:function(){var X=this._y,Y=this._x,Q=this._maxY,T=this._minY,R=this._maxX,U=this._minX,V=this._v,S=this.get(A),W=this.get(O),Z=this.get(K);this._v=(V*W);if(this._scrollX){Y=Y-(V*S);}if(this._scrollY){X=X-(V*S);}if(Math.abs(V).toFixed(4)<=0.015){this._flick=false;this._killTimer(!(this._exceededYBoundary||this._exceededXBoundary));if(this._scrollX){if(Y<U){this._snapToEdge=true;this._setX(U);}else{if(Y>R){this._snapToEdge=true;this._setX(R);}}}if(this._scrollY){if(X<T){this._snapToEdge=true;this._setY(T);}else{if(X>Q){this._snapToEdge=true;this._setY(Q);}}}}else{if(this._scrollX&&(Y<U||Y>R)){this._exceededXBoundary=true;this._v*=Z;}if(this._scrollY&&(X<T||X>Q)){this._exceededYBoundary=true;this._v*=Z;}if(this._scrollX){this._setX(Y);}if(this._scrollY){this._setY(X);}this._flickTimer=B.later(S,this,this._flickAnim);}},_setX:function(Q){this._move(Q,null,this.get(I),this.get(F));},_setY:function(Q){this._move(null,Q,this.get(I),this.get(F));},_move:function(Q,T,R,S){if(Q!==null){Q=this._bounce(Q);}else{Q=this._x;}if(T!==null){T=this._bounce(T);}else{T=this._y;}R=R||this._snapToEdge?400:0;S=S||this._snapToEdge?"ease-out":null;this._x=Q;this._y=T;this._anim(Q,T,R,S);},_anim:function(Q,U,S,T){var R=this._node;if(S){T=T||"cubic-bezier(0, 0.1, 0, 1.0)";R.setStyle("-webkit-transition",S+"ms -webkit-transform");R.setStyle("-webkit-transition-timing-function",T);}else{R.setStyle("-webkit-transition",null);R.setStyle("-webkit-transition-timing-function",null);}R.setStyle("-webkit-transform","translate3d("+(Q*-1)+"px,"+(U*-1)+"px,0)");},_bounce:function(U,Q){var S=this.get(K),T=this.get(C),R=S?-T:0;Q=S?Q+T:Q;if(!S){if(U<R){U=R;}else{if(U>Q){U=Q;}}}return U;},_killTimer:function(Q){if(this._flickTimer){this._flickTimer.cancel();}if(Q){}}});B.Plugin.Flick=H;},"@VERSION@",{requires:["event-flick","plugin"]});