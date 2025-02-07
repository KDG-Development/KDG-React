import { handleDiscriminatedUnion } from "../../components"
import { DiscriminatedUnion, Union } from "../../types/DiscriminatedUnion"
import { Flattened } from "../../types/Flattened"

export type TError<T> = Flattened<T,string>

/**
 * @description
 * a mapping defined to parse a property from an json response body.
 * If your API can return varying data structures, an array for each should be provided here.
 * @param jsonResponseBody the result of Response.json()
 * @param property the property you are trying to parse from the body
 */
export type ErrorParseMap = ((jsonResponseBody:any,property:string)=>(string|undefined))

type ErrorParseConfig<T> = {
  response:DiscriminatedUnion<[
    Union<'Response', {
      response:Response
      parseResponse?:(response:Response) => Promise<void>
    }>,
    Union<'ParsedResponse', unknown|any>
  ]>,
  parsers:TError<T>
  parseMaps:ErrorParseMap[]
}

const tryParsePropertyError = (parseMaps:ErrorParseMap[], body:any, property:string) =>
  parseMaps.map(parse => parse(body,property)).find(x => !!x)

export const tryParseErrors = async <T extends {}>(args:ErrorParseConfig<T>) => {
  try {

    const parsed =
      await handleDiscriminatedUnion({
        value:args.response,
        config:{
          Response:async x =>
            x.value.parseResponse
              ? await x.value.parseResponse(x.value.response)
              : await x.value.response.json(),
          ParsedResponse:x => x
        }
      })

    return Object.keys(args.parsers).reduce((agg,key) => {
      try {
        return {
          ...agg,
          [key]:args.parsers[key as keyof TError<T>]
            ? tryParsePropertyError(args.parseMaps, parsed,args.parsers[key as keyof T]!)
            : undefined,
        }
      } catch (e) {
        console.error(`Failed parsing error for given key: ${key}`, e)
        return agg
      }
    }, {} as TError<T>)
  } catch (e) {
    console.error('exception while parsing error response', e)
    return {} // Return an empty object if we are unable to parse any errors
  }

}