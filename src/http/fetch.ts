enum REQUEST_METHODS {
  POST='POST',
  GET='GET',
  DELETE='DELETE',
  PUT='PUT',
}
interface RequestHandlers<T> {
  success:(x:T) => void
  errorHandler?:(response:Response) => void
  abortSignal?:AbortSignal
}
export interface BaseRequestParams<T> extends RequestHandlers<T> {
  url:string
  mapResult?:(_:unknown)=>T
  parseResponse?:(_:Response)=>Promise<any>
  headers?:{[_:string]:string}
  parameters?:{
    [key:string]:string|null|boolean|undefined
  }
}
interface PostRequestParams<T> extends BaseRequestParams<T> {
  body:object
}

interface GetRequestParams<T> extends BaseRequestParams<T>, RequestHandlers<T> {}

// todo: find a way to not duplicate these
export type RequestMethodArgs<TResponse> = RequestHandlers<TResponse>
export type PostRequestMethodArgs<RequestBody,TResponse> = {
  body:RequestBody
} & RequestMethodArgs<TResponse>

const BASE_HEADERS = {
  "Accept": "application/json",
  "Access-Control-Allow-Headers": "*",
}

const composedUrl = <T extends {}>(params:BaseRequestParams<T>) => {
  return (
    encodeURI(
      [
        params.url,
      ].concat(
        params.parameters
          ? Object.entries(params.parameters)
            .map(([key,val]) =>
              `${key}=${val}`
            )
            .join('&')
          : []
      ).join('?')
    )
  )
}

export const postRequest = async <T extends {}>(params:PostRequestParams<T>) => {
  const response = (await fetch(
    composedUrl(params), {
      method:REQUEST_METHODS.POST,
      body:JSON.stringify(params.body),
      headers:{
        ...BASE_HEADERS,
        'Content-Type': 'application/json',
        ...(params.headers || {}),
      },
      signal:params.abortSignal,
    },
  ))
  if (response.ok) {
    const parsed = params.parseResponse ? await params.parseResponse(response) : await response.json()
    params.success(
      params.mapResult ? params.mapResult(parsed) : parsed as T
    )
  } else {
    if (params.errorHandler){
      params.errorHandler(response)
    }
  }
}

export const getRequest = async <T extends {}>(params:GetRequestParams<T>) => {
  const response = (await fetch(
    composedUrl(params), {
      method:REQUEST_METHODS.GET,
      headers:{
        ...BASE_HEADERS,
        ...(params.headers || {}),
      },
      signal:params.abortSignal,
    },
  ))
  if (response.ok) {
    const parsed = params.parseResponse ? await params.parseResponse(response) : await response.json()
    params.success(params.mapResult ? params.mapResult(parsed) : parsed as T)
  } else {
    if (params.errorHandler){
      params.errorHandler(response)
    }
  }
}

export const deleteRequest = async <T extends {}>(params:GetRequestParams<T>) => {
  const response = (await fetch(
    params.url, {
      method:REQUEST_METHODS.DELETE,
      headers:{
        ...BASE_HEADERS,
        ...(params.headers || {}),
      },
      signal:params.abortSignal,
    },
  ))
  if (response.ok) {
    const parsed = params.parseResponse ? await params.parseResponse(response) : await response.json()
    params.success(params.mapResult ? params.mapResult(parsed) : parsed as T)
  } else {
    if (params.errorHandler){
      params.errorHandler(response)
    }
  }
}

export const putRequest = async <T extends {}>(params:PostRequestParams<T>) => {
    const response = (await fetch(
      params.url, {
        method:REQUEST_METHODS.PUT,
        body:JSON.stringify(params.body),
        headers:{
          ...BASE_HEADERS,
          'Content-Type': 'application/json',
          ...(params.headers || {}),
        },
        signal:params.abortSignal,
      },
    ))
    if (response.ok) {
      const parsed = params.parseResponse ? await params.parseResponse(response) : await response.json()
      params.success(
        params.mapResult ? params.mapResult(parsed) : parsed as T
      )
    } else {
      if (params.errorHandler){
        params.errorHandler(response)
      }
    }
}

const composedFormData = (obj: {[key: string]: any}) => {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any, index: number) => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach(subKey => {
            formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
          });
        } else {
          formData.append(`${key}[${index}]`, item);
        }
      });
    } else {
      formData.append(key, obj[key]);
    }
  });
  return formData;
};

export const postFormDataRequest = async <T extends {}>(params:PostRequestParams<T>) => {
    const response = (await fetch(
      composedUrl(params), {
        method:REQUEST_METHODS.POST,
        body:composedFormData(params.body),
        headers:{
          ...BASE_HEADERS,
          ...(params.headers || {}),
        },
        signal:params.abortSignal,
      },
    ))
    if (response.ok) {
      const parsed = params.parseResponse ? await params.parseResponse(response) : await response.json()
      params.success(
        params.mapResult ? params.mapResult(parsed) : parsed as T
      )
    } else {
      if (params.errorHandler){
        params.errorHandler(response)
      }
    }
}

export const putFormDataRequest = async <T extends {}>(params:PostRequestParams<T>) => {
    const response = (await fetch(
      composedUrl(params), {
        method:REQUEST_METHODS.PUT,
        body:composedFormData(params.body),
        headers:{
          ...BASE_HEADERS,
          ...(params.headers || {}),
        },
        signal:params.abortSignal,
      },
    ))
    if (response.ok) {
      const parsed = params.parseResponse ? await params.parseResponse(response) : await response.json()
      params.success(
        params.mapResult ? params.mapResult(parsed) : parsed as T
      )
    } else {
      if (params.errorHandler){
        params.errorHandler(response)
      }
    }
}