import axios from 'axios';
import Table from 'cli-table3';



export async function create(args){
    let body = args.body || args.b || null;

    if(!body){
       console.log("invalid command, --body or -b is required, 'johnnieliMessage create --help' to see details");
       return;
    }

    let baseUri = `https://api.johnnieli.com/v1/messages`;
    
    const table = new Table({
        head: ['Id', 'Body', 'IsPalindrome', 'Status', 'CreatedAt'],
        colWidths: [27, 50, 14, 8, 26],
        wordWrap: true
    });
    try {
        let {data} =  await axios({
            method: 'post',
            url: baseUri,
            data: {body: body}
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