const url='http://20.244.56.144/test/auth';
const data={
    companyName: 'goMart',
    clientID: 'ec020fe5-a87d-428a-a152-ccd1a85a6ca0',
    clientSecret: 'VduvinvtIqIRunDT',
    ownerName: 'Suvarchala',
    ownerEmail: 'gadesuvarchala96@gmail.com',
    rollNo: '21BD1A05AG'
  };
fetch(url,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
})
.then(response=>response.json())
.then(data=>console.log(data))
.catch(err=>console.log(err));