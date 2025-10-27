
/* 
  역할 : Respsone 객체 '커스텀 Response'로 재초기화 및 반환환
  인증 : 
  비고 : 
    Http 상태번호 이용, 응답 성공여부 설정
    Http 상태번호 이용, 기본 제공 메세지 설정
*/

//Handle Response
export function responseStatus(response,data=null){
    const message = response.data?.message ?? response.data;
    let result = { success : false, message : 'No Response'};

    if(!response) return result;

    switch (response.status) {
        case 200:   //HttpStatus.OK
        case 201:   //HttpStatus.CREATED
        case 202:   //HttpStatus.ACCEPTED
            result = { 
                status: 299,
                success : true, 
                message : message || 'Succesful'
            };  
            break; 
        case 204:   //HttpStatus.NO_CONTENT
            result = { 
                status: 204,
                success : true, 
                message : message || 'No Data'
            };  
            break; 
        case 209:   //HttpStatus.CREATED
            result = { 
                status: 209,
                success : true, 
                message : message || 'Created'
            };  
            break; 
        default:
            result = { 
                status: 999,
                success : false, 
                message : response.data?.error || `Unexpected Error: ${response.status}`
            };
            break; 
    }
    return addData(result,data);
}

//Handle Response Error Status
export function errorStatus(error){
    const message = error.response?.data?.message;
    let result = { success : false, message : 'Internal Server Error. Please try again later'};
    if(!error || !error.response) return result;

    switch(error.response.status){
        case 400:   //HttpStatus.BAD_REQUEST
            result = { 
                status: 400,
                success : false, 
                message : message || 'Bad Request'
            };
            break; 
        case 401:   //HttpStatus.UNAUTHORIZED
            result = { 
                status: 401,
                success : false, 
                message : message || 'Unauthorized'
            };
            break; 
        case 403:   //HttpStatus.FORBIDDEN
            result = { 
                status: 403,
                success : false, 
                message : message || 'Forbidden. You do not have access'
            };
            break; 
        case 404:   //HttpStatus.NOT_FOUND
            result =  { 
                status: 404,
                success : false, 
                message : message || 'Not Found.'
            }; 
            break; 
        case 409:   //HttpStatus.CONFLICT
            result =  { 
                status: 409,
                success : false, 
                message : message || 'Already Exists.'
            }; 
            break; 
        case 409:   //HttpStatus.TOO_MANY_REQUESTS
            result =  { 
                status: 429,
                success : false, 
                message : message || 'Too Many Requests. Please try again later'
            }; 
            break;
        case 500:   //HttpStatus.INTERNAL_SERVER_ERROR
            result =  { 
                status: 500,
                success : false, 
                message : message || 'Internal Server Error. Please try again later'
            }; 
            break; 
        default:   
            result =  { 
                status: 999,
                success : false, 
                message : message || `An unexpected error occurred. ${error.response.data.error}`
            }; 
            break; 
    }

    return result;
}

//Add to result if data exists
function addData(result,data) {
    return data ? result = { ...result, 'data': data } : result;
}