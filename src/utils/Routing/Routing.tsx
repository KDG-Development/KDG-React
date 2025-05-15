import React from 'react'
import { createBrowserRouter,RouteObject,RouterProvider, useRouteError, createHashRouter, useParams } from "react-router-dom"

export enum RouteType {
  PUBLIC="PUBLIC",
  PRIVATE="PRIVATE",
}
type RouteRenderHandleType = {
  render: React.ReactElement
}
type RouteBase = {
  paths:string[]
  errorElement?:React.ReactNode
} & RouteRenderHandleType//<T>

type PublicRouteKind = RouteBase & {
  kind:RouteType.PUBLIC
}

type PrivateRouteGateConfig = {
  allow:boolean
  onNotAllow:RouteRenderHandleType
}
type PrivateRouteKind = RouteBase & {
  kind:RouteType.PRIVATE
  gate:PrivateRouteGateConfig
}

type Route = PublicRouteKind | PrivateRouteKind

const routeGateRenderHandler = (x:Route):RouteRenderHandleType => {
  switch (x.kind){
    case RouteType.PUBLIC:
      return {
        render: x.render
      }
    case RouteType.PRIVATE:
      return x.gate.allow
        ? {
          render:x.render,
        } : {
          render:x.gate.onNotAllow.render,
        }
  }
}

export const useRouterErrors = () => useRouteError()

const DefaultErrorBoundary = () => {
  const errors = useRouterErrors()
  console.error('Errors during route render', errors)
  return (
    <React.Fragment>
      Something Unexpected Happened
    </React.Fragment>
  )
}

type ComposedBrowserRouterProps = {
  routes:Route[],
  defaultErrorElement?:React.ReactNode
}

const composeBrowserRouter = (props:ComposedBrowserRouterProps) => createBrowserRouter(
  props.routes.reduce((agg,x) => {
    const gatedRouteHandling = routeGateRenderHandler(x)
    return (
      // todo: remove duplication
      agg.concat(
        x.paths.map((path:string):RouteObject => ({
          path,
          element:gatedRouteHandling.render,
          errorElement:x.errorElement || props.defaultErrorElement || <DefaultErrorBoundary/>,
        }))
      )
    )
  }, [] as RouteObject[])
)

type ComposedHashRouterProps = ComposedBrowserRouterProps & {}
const composeHashRouter = (props:ComposedBrowserRouterProps) => createHashRouter(
  props.routes.reduce((agg,x) => {
    const gatedRouteHandling = routeGateRenderHandler(x)
    return (
      // todo: remove duplication
      agg.concat(
        x.paths.map((path:string):RouteObject => ({
          path,
          element:gatedRouteHandling.render,
          errorElement:x.errorElement || props.defaultErrorElement || <DefaultErrorBoundary/>,
        }))
      )
    )
  }, [] as RouteObject[])
)

// todo: remove duplication
export const composeAppRoutingProvider = (props:ComposedBrowserRouterProps) => {
  const router = composeBrowserRouter(props)
  return (
    <RouterProvider router={router}/>
  )
}

// todo: remove duplication
export const composeAppHashRoutingProvider = (props:ComposedHashRouterProps) => {
  const router = composeHashRouter(props)
  return (
    <RouterProvider router={router}/>
  )
}

type ExtractRouteParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never

type ParamsObject<Path extends string> =
  ExtractRouteParams<Path> extends never
    ? {}
    : { [K in ExtractRouteParams<Path>]: string }

export const composeParameterizedRoutePath = <Path extends string>(
  path: Path,
  parameters: ParamsObject<Path>
): string =>
  path.replace(/:(\w+)/g, (match, p1) => {
    // @ts-expect-error: wont know at runtime, but compile-time is enforced
    return parameters[p1] ?? match;
  })

/**
 * useTypedRouteParams - a hook to get typed route parameters from useParams, based on the path string
 * @example
 *   const params = useTypedRouteParams<'/home-visit/:clientId'>();
 *   // params: { clientId: string }
 */
export const useTypedRouteParams = <Path extends string>(): ParamsObject<Path> => {
  return useParams() as ParamsObject<Path>;
}
