"use strict";(self.webpackChunkcourse_project=self.webpackChunkcourse_project||[]).push([[592],{902:(a,r,t)=>{t.d(r,{o:()=>s});class s{constructor(d,n){this.name=d,this.amount=n}}},856:(a,r,t)=>{t.d(r,{_:()=>d});var s=t(902),o=t(639);let d=(()=>{class n{constructor(){this.ingredients=new Map([["apples",new s.o("Apples",5)],["tomatoes",new s.o("Tomatoes",10)]]),this.ingredientsChanged=new o.vpe}getIngredients(){return new Map(this.ingredients)}addIngredient(e){this.addIngredientToMap(e),this.ingredientsChanged.emit(this.ingredients)}addIngredients(e){for(let i of e)this.addIngredientToMap(i);this.ingredientsChanged.emit(this.ingredients)}addIngredientToMap(e){let i=this.ingredients.get(e.name.toLowerCase());null!=i?i.amount+=e.amount:this.ingredients.set(e.name.toLowerCase(),e)}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()}}]);