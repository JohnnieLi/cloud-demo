import axios from 'axios';


export async function deleteItem(args){
    let id = null;
    if(args._.length == 2){
         id = args._[1];
    }else{
         id = args.id || args.i || null;
    }
    if(!id){
       console.log("invalid command, --id or -i is required, 'johnnieliMessage rm --help' to see details");
       return;
    }

    let baseUri = `https://api.johnnieli.com/v1/messages/${id}`;
    
    try {
        let {data} =  await axios({
            method: 'delete',
            url: baseUri
          })
        let result = data.result;
        if(result){
            console.log(`${id} deleted`);
            return
        }
        
    } catch (error) {
        //not found: do nothing
    }
    console.log(`${id} delete failed`);
    
}