import * as React from "react"
import {rawData} from "../data/raw.data"
import {Button} from "./button"

import Grid from 'react-css-grid'

const box = {
  height: 15,
  width: "10%",
  paddingBottom: 8,
  border: "1px solid #000",
  backgroundColor:"#eee"
}

export class App extends React.Component {
  state = {
      csv: rawData,
      data: [],
      amountPrice: Number,
      objectArr: [],
      listItems: [],
    }

  handleTextAreaChange = (ev) => {
    this.setState({ 
      csv: ev.value,
    })
  }

  generateReport =(ev) => {
     let pricesArray =[];
     var totalSum = 0;
     const arrayString = rawData.split('\n');
     const mArray = arrayString.splice(1,22);
     function createObj(val){
     let keys = {
       id: val[0],
       date: val[1],
       time: val[2],
       rest: val[3],
       price: val[4]
      }
      return keys;
     }
     var arraysOfItems = mArray.reduce(function(r, item) {    
       (r.hash[item] || (r.hash[item] = r.mArray[r.mArray.push([]) - 1])).push(item);
     
       return r;
       }, { mArray: [], hash: {} }).mArray;

        var objectArray = arraysOfItems.map((element,ind)=>{
         let strstr = element.join();
         let amount = 0;
         let val = strstr.split(',');
         let keys = createObj(val);
         amount = parseFloat(keys.price.slice(1));
         pricesArray.push(amount);
         return keys;
         })
         const listItems = objectArray.map((objectArray,ind) =>
         <Grid
            width={1}
	          align='baseline' style={{box}}>
          <h5>{objectArray.id}</h5>
          <h5>{objectArray.date}</h5> 
          <h5>{objectArray.time}</h5>  
          <h5>{objectArray.rest}</h5> 
          <h5>{objectArray.price}</h5> 
          </Grid>
         );
        

      const employeeShareCount = pricesArray.reduce((total, amount) =>{
        calculateTotal(amount);
        return parseFloat(amount) > 400 ? total + (amount-400) : total + 0 ;
        })

      function calculateTotal(sum){
        totalSum += sum;
      }
      
      var companyShare = totalSum - employeeShareCount;
      this.setState({
        data: objectArray,
        amountPrice: employeeShareCount,
        objectArr: objectArray,
        listItems: listItems,
        companyShare: companyShare
      })
    }
   render() {
      const {csv,data,amountPrice,objectArr,listItems,companyShare} = this.state; 
     return <div className="flexbox-column" style={{padding: 16, alignItems: "left"}}>
       <div style={{fontSize: 24, paddingBottom: 16}}>10bis Report</div>
       <div style={{paddingBottom: 5, width: "100%"}}>
         <textarea style={{height: 200, width: "100%"}} value={csv} onChange={this.handleTextAreaChange}/>
       </div>
       <div style={{paddingBottom: 16, width: "75%"}}>
        <textarea className="flexbox-column" style={{height: 150, width: "100%"}}
          value={data.map((item,id)=>{
          <div key={id}>
          <h5>{item.id}</h5>
          <h5>{item.date}</h5> 
          <h5>{item.time}</h5>  
          <h5>{item.rest}</h5> 
          <h5>{item.price}</h5> 
          </div>
          })}
          onChange={this.generateReport}>
          </textarea>
          <div style={{fontSize: 24, paddingBottom: 16}}>Employee share: {amountPrice} </div>
          <div style={{fontSize: 24, paddingBottom: 16}}>Company share: {companyShare} </div>
          {listItems}
       </div>
     </div>
    }
  }