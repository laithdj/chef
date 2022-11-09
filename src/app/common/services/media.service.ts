import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { genrateQueryParams } from '../utils/queryParamsGenrator';

export const mediaTypes = {
  courseMaterial: 'COURSE_MAT',
  courseImage: 'COURSE_IMG',
  courseVideo: 'COURSE_VIDEO',
};

export function publicMediaUrlGenrator(type: string, id: string) {
    return `${baseUrl}/v1/media/getFile/${type}?id=${id}&try=${Date.now()}`;
  }

export function privateMediaUrlGenrator(id:string, params: Object) {
  return `${baseUrl}/v1/media/getCourseMaterial/${id}${genrateQueryParams(
    params
  )}`;
}

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private httpClient: HttpClient) {}

  uploadFile(
    mediaType: string,
    form: FormData,
    params?: Object,
    config?: Object
  ) {
    return this.httpClient.post(
      `${baseUrl}/v1/media/${mediaType}${genrateQueryParams(params)}`,
      form,
      config
    );
  }

  getFile(mediaType: string, params: Object) {
    return this.httpClient.get(
      `${baseUrl}/v1/media/${mediaType}${genrateQueryParams(params)}`
    );
  }

  getProtectedFile(mediaType: string, params: Object) {
    return this.httpClient.get(
      `${baseUrl}/v1/media/getCourseMaterial/${mediaType}${genrateQueryParams(
        params
      )}`
    );
  }

  deleteFile(mediaType: string, params: Object) {
    return this.httpClient.delete(
      `${baseUrl}/v1/media/${mediaType}${genrateQueryParams(params)}`
    );
  }
}
