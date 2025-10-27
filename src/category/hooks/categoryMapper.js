import CategoryResponseDto from '../../common/hooks/client/generated/src/model/CategoryResponseDto';

/**
 * API로 받은 순수 객체 배열을 CategoryResponseDto 인스턴스 배열로 변환
 * @param {Array<Object>} data - API 응답으로 받은 순수 객체 배열
 * @returns {Array<CategoryResponseDto>} - CategoryResponseDto 인스턴스 배열
 */
export function createCategoryInstances(data) {
  if (data && Array.isArray(data)) {
    return data.map(plainObject => 
      CategoryResponseDto.constructFromObject(plainObject)
    );
  }
  return []; 
}