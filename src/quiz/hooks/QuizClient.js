import { quizBaseURL } from '../../common/hooks/apiBaseURL';
import { errorStatus, responseStatus } from '../../common/hooks/handleStatus';
import {connectSpring} from '../../common/hooks/preAxios';

const quizClient = (url,type='post',data=null) => {
    const baseUrl = quizBaseURL;
    // if(type==='get')    return connectSpring.get   (baseUrl+url,data);
    if(type==='post')   return connectSpring.post  (baseUrl+url,data);
    // if(type==='put')    return connectSpring.put   (baseUrl+url,data);
    // if(type==='patch')  return connectSpring.patch (baseUrl+url,data);
    // if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

/*
    Quiz 추가
    * @param {object}  dto - Quiz 추가 DTO 객체
*/
export const addQuiz = async (dto) => {
    console.log("Quiz 추가 API Active");
    try {
        const response = await quizClient(``, 'post', dto);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};