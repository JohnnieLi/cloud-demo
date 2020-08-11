import axios from 'axios';

export async function update(args){
    let body = args.body || args.b || null;
    let id = null;
    if(args._.length == 2){
         id = args._[1];
    }else{
         id = args.id || args.i || null;
    }
    if(!id){
       console.log("invalid command, --id or -i is required, 'johnnieliMessage update --help' to see details");
       return;
    }

    if(!body){
       console.log("invalid command, --body or -b is required, 'johnnieliMessage update --help' to see details");
       return;
    }

    let baseUri = `https://api.johnnieli.com/v1/messages/${id}`;
    
    try {
        let {data} =  await axios({
            method: 'put',
            url: baseUri,
            data: {body: body}
          })
        let result = data.result;
        if(result){
            console.log(`${id} is updated`);
            return;
        }
    } catch (error) {
        //not found: do nothing
    }
    console.log(`${id} update failed`);
    
}