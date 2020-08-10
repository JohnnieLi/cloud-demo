import axios from 'axios';
import Table from 'cli-table3';



export async function list(args){
    let page = args.page || args.p || null;
    let size = args.size || args.s ||10;
    let baseUri = 'http://18.234.123.12:30629/v1/messages';
    if(page){
        baseUri += `?page=${page}&size=${size}`
    }
    let {data} =  await axios({
      method: 'get',
      url: baseUri
    });
    let result = data.result;
    const table = new Table({
        head: ['Id', 'Body', 'IsPalindrome', 'Status', 'CreatedAt'],
        colWidths: [27, 50, 14, 8, 26],
        wordWrap: true
      });
    if(result instanceof Array){
        result.forEach(element => {
            table.push([
                element._id,
                element.body,
                element.isPalindrome,
                element.status,
                element.createdAt
                ]);
        });
    }
    if(result.docs instanceof Array){
        result.docs.forEach(element => {
            table.push([
                element._id,
                element.body,
                element.isPalindrome,
                element.status,
                element.createdAt
                ]);
        });
        console.log(`Currrent page: ${result.page} -- Size: ${result.limit} -- TotalPages: ${result.totalPages} -- TotalItems:  ${result.totalDocs}`);
    }
    console.log(table.toString());
}