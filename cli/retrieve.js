import axios from 'axios';
import Table from 'cli-table3';



export async function retrieve(args){
    let id = null;
    if(args._.length == 2){
         id = args._[1];
    }else{
         id = args.id || args.i || null;
    }
    if(!id){
       console.log("invalid command, --id or -i is required, 'johnnieliMessage ps --help' to see details");
       return;
    }

    let baseUri = `https://api.johnnieli.com/v1/messages/${id}`;
    
    const table = new Table({
        head: ['Id', 'Body', 'IsPalindrome', 'Status', 'CreatedAt'],
        colWidths: [27, 50, 14, 8, 26],
        wordWrap: true
    });

    try {
        let {data} =  await axios({
            method: 'get',
            url: baseUri
          })
        let result = data.result;
   
       
        table.push([
            result._id,
            result.body,
            result.isPalindrome,
            result.status,
            result.createdAt
            ]);
    } catch (error) {
        //not found: do nothing
    }
    console.log(table.toString());
    
}