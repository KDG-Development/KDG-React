import React, { useEffect, useState } from 'react'

import { Loader } from '../Loader/Loader'
import { Conditional } from '../Conditional/Conditional'

type P<T> = {
  loadData:()=>Promise<T>
  onLoaded:(_:T,reload:() => void)=>React.ReactNode
  onNoData?:()=>React.ReactNode
}

export const DataLoaded = <T extends {}>(props:P<T>) => {

  const [loading, setloading] = useState(false)
  const [data, setdata] = useState<T|null>(null)

  useEffect(() => {
    loadData()
  },[])

  const loadData = async () => {
    setloading(true)
    const data = await props.loadData()
    setdata(data)
    setloading(false)
  }

  return (
    <Conditional
        condition={ !!loading }
        onTrue={ () => <Loader/> }
        onFalse={ () =>
          <Conditional
            condition={ !!data }
            onTrue={ () => (
              <>{props.onLoaded(data!, () => loadData()) }</>
            )}
            onFalse={ () => (
              <>{props.onNoData ? props.onNoData() : null}</>
            )}
          />
        }
      />
  )
}
