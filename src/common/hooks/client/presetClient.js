import { errorStatus, responseStatus } from '../handleStatus';
import {connectSpring} from '../preAxios';
import { presetBaseURL } from '../apiBaseURL';


const presetClient = (url,type='post',data=null) => {
    const baseUrl = presetBaseURL;
    if(type==='get')    return connectSpring.get   (baseUrl+url,data);
    // if(type==='post')   return connectSpring.post  (baseUrl+url,data);
    // if(type==='put')    return connectSpring.put   (baseUrl+url,data);
    // if(type==='patch')  return connectSpring.patch (baseUrl+url,data);
    // if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

/*
    문제 난이도 조회
*/
export const fetchQuizDifficulties = async () => {
    console.log(`문제 난이도 조회 API Active`);
    try {
        const response = await presetClient(`/questions-difficulties`, 'get');
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }
};