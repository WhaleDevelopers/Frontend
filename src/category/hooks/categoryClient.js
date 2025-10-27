import { categoryBaseURL } from '../../common/hooks/apiBaseURL';
import { errorStatus, responseStatus } from '../../common/hooks/handleStatus';
import {connectSpring} from '../../common/hooks/preAxios';

const categoryClient = (url,type='post',data=null) => {
    const baseUrl = categoryBaseURL;
    if(type==='get')    return connectSpring.get   (baseUrl+url,data);
    if(type==='post')   return connectSpring.post  (baseUrl+url,data);
    // if(type==='put')    return connectSpring.put   (baseUrl+url,data);
    // if(type==='patch')  return connectSpring.patch (baseUrl+url,data);
    // if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

/*
    카테고리 조회
    * @param {object}  params - 쿼리 파라미터 객체
    * @param {boolean} [params.isActive] - 활성화 여부
*/
export const fetchCategories = async (params) => {
    console.log(`카테고리 조회 - ${params}`);
    try {
        const response = await categoryClient(``, 'get', { params });
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }
};

/*
    카테고리 조회
    * @param {object}  dto - AddCategoryRequestDto 객체
*/
export const addCategory = async (dto) => {
    console.log(`카테고리 추가 - ${dto}`);
    try {
        const response = await categoryClient(``, 'post', dto);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }
};