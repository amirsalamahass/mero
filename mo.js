let title=document .getElementById('title');
let price=document .getElementById('price');
let taxet=document .getElementById('taxet');
let ads=document .getElementById('ads');
let discount=document .getElementById('discount');
let total=document .getElementById('totle');
let count=document .getElementById('count');
let category=document .getElementById('category');
let submit=document .getElementById('submit');

let mood="create";
let tmp;

//get totalلحساب جميع الارقام اللي في التوتيل 
function gettotle(){
if(price.value !=""){
    let resalt=( +price.value + +taxet.value + +ads.value)
    -+discount.value;
    total.innerHTML=resalt;
    total.style.background="#601cfc";
}else{
    total.innerHTML="";
    total.style.background="#3a6cf4"
}
}

//create product لو عاوز احفظ البينات في الوكل استوج واضيف داتة جديدة

let datapro;
if(localStorage.product != null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}



submit.onclick=function(){
    let newpro={
       title:title.value.toLowerCase(),
       price:price.value,
       taxet:taxet.value,
       ads:ads.value,
       discount:discount.value,
       total:total.innerHTML,
       count:count.value,
       category:category.value.toLowerCase() ,
    }

      
    if(mood ==="create"){
    if(newpro.count>1){
        for(let i=0;i<newpro.count;i++){

         datapro.push(newpro);
        }
 }
    
    else{
        datapro.push(newpro);
    }


}else{
    datapro[tmp  ]=newpro;
    mood="create";
    submit.innerHTML="create";
    count.style.display="block";
}
    //save localstorage
    localStorage.setItem("product",   JSON.stringify(datapro)      );
     cleardata()
     showdata()
}

//clear inputs
function cleardata(){
    title.value="";
    price.value="";
    taxet.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}

//read  
function showdata(){
    gettotle()
    let table="";
    for(let i = 0;i < datapro.length;i++){
      table +=`
      <tr>
         <td>${i+1}</td>
         <td>${datapro[i].title}</td>
         <td>${datapro[i].price}</td>
         <td>${datapro[i].taxet}</td>
         <td>${datapro[i].ads}</td>
         <td>${datapro[i].discount}</td>
         <td>${datapro[i].total}</td>
         <td>${datapro[i].category}</td>
         
         <td><button onclick="updatedata(${i})" id="update">update</button></td>
         <td><button onclick="deletedata(${i} )" id="delete">delete</button></td>
         </tr>
      `
    }
     document.getElementById("tbody").innerHTML=table;
     let btndelete=document.getElementById("deleteall");
     if(deletedata.length > 0){
        btndelete.innerHTML=`
        <button onclick="deleteall()">Delete All(${datapro.length})</button> 
        `
     }else{
        btndelete.innerHTML="";
     }
}
showdata()
  
//delete
function deletedata(i){
   datapro.splice(i,1);
   localStorage.product=JSON.stringify(datapro);
   showdata()
}

function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}

//count




//update
  function updatedata(i){
     title.value=datapro[i].title;
     price.value=datapro[i].price;
     taxet.value=datapro[i].taxet;
     ads.value=datapro[i].ads;
     discount.value=datapro[i].discount;
     gettotle()
     count.style.display="none";
     category.value=datapro[i].category;
     submit.innerHTML="update";
     mood="update";
     tmp=i;
     scroll({
        top:0,
        behavior:"smooth",
     })
  }


//search
let searchmood="title";
function getsearchmood(id){
    let search=document.getElementById("search");
    if(id =="searchtitle"){
        searchmood = "title";
        search.placeholder="search By Title";
    }else{
        searchmood = "category";
        search.placeholder ="search By Category";

    }
search.focus()
search.value= "";
showdata

}
function searchdata(value){
    let table ="";
  if(searchmood =="title"){




   for(let i=0;i<datapro.length;i++){
    if(datapro[i].title.includes(value.toLowerCase())){
        table +=`
      <tr>
         <td>${i}</td>
         <td>${datapro[i].title}</td>
         <td>${datapro[i].price}</td>
         <td>${datapro[i].taxet}</td>
         <td>${datapro[i].ads}</td>
         <td>${datapro[i].discount}</td>
         <td>${datapro[i].total}</td>
         <td>${datapro[i].category}</td>
        
         <td><button onclick="updatedata(${i})" id="update">update</button></td>
         <td><button onclick="deletedata(${i} )" id="delete">delete</button></td>
         </tr>
      `;
    }
}
}
  
  
  

            else{
                for(let i=0;i<datapro.length;i++){
                    if(datapro[i].category.includes(value.toLowerCase())){
            table +=`
          <tr>
             <td>${i}</td>
             <td>${datapro[i].title}</td>
             <td>${datapro[i].price}</td>
             <td>${datapro[i].taxet}</td>
             <td>${datapro[i].ads}</td>
             <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
             <td>${datapro[i].category}</td>
             
             <td><button onclick="updatedata(${i})" id="update">update</button></td>
             <td><button onclick="deletedata(${i} )" id="delete">delete</button></td>
            </tr> 
          `;
        }
                }
            }
  document.getElementById("tbody").innerHTML=table;


}





//clean data




