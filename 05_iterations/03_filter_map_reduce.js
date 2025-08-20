/* filter() - It is a callback function,it does return values if we wish
Selects elements that pass a condn & rets new 
arr with only those elements.*/
const nums=[1,15,42,81,2,-11]
const newNums=nums.filter((values) => { return values>10})
// console.log(newNums)

const books = [
    { title: 'Book One', genre: 'Fiction', publish: 1981, edition: 2004 },
    { title: 'Book Two', genre: 'Non-Fiction', publish: 1992, edition: 2008 },
    { title: 'Book Three', genre: 'History', publish: 1999, edition: 2007 },
    { title: 'Book Four', genre: 'Non-Fiction', publish: 1989, edition: 2010 },
    { title: 'Book Five', genre: 'Science', publish: 2009, edition: 2014 },
    { title: 'Book Six', genre: 'Fiction', publish: 1987, edition: 2010 },
    { title: 'Book Seven', genre: 'History', publish: 1986, edition: 1996 },
    { title: 'Book Eight', genre: 'Science', publish: 2011, edition: 2016 },
    { title: 'Book Nine', genre: 'Non-Fiction', publish: 1981, edition: 1989 },
  ];

let userBooks=books.filter((bk)=>(bk.genre==='Fiction'))
userBooks=books.filter((bk)=>{ return bk.publish>2000 && bk.edition>2010})

/* maps() - a callback function that returns values 
 - transform each element of the given array*/
let someNums = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// someNums = someNums.map( (element) => { return element + 10})
// console.log(someNums)
// someNums = someNums.map((element) => 
//     element+10).map((val) => val+3).filter((ele) => ele<=35)
// console.log(someNums)

/* reduce() - it is a callback function with this syntax:
arr.reduce((accumulator, currval) => { return acc+currval },initialVal)

In first step, acc takes its val from initialVal;
then acc=acc+curr;
*/
let small=[2,3,4]
const smallSum=small.reduce((acc,curr) => (acc+curr),1)

const shoppingCart=[
  {course: "Python Basics", price: 3000},
  {course: "Web Dev", price: 6000},
  {course: "Data Science", price: 13000},
  {course: "Data Structures & Algorithms", price: 8000},
]
let totalPrice=shoppingCart.reduce((acc,obj) => (acc+obj.price),0)
console.log(`Total course prices add upto ${totalPrice} INR`)