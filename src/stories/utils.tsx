import React from 'react'
import { faker } from '@faker-js/faker';

export namespace Ipsum {

  export const sentence = (maxWords?:number) =>
    faker.lorem.sentence({
      min:1,
      max:maxWords || 1,
    });

  export const paragraph = (paragraphCount?:number) =>
    faker.lorem.paragraphs({
      min:1,
      max:paragraphCount||1,
    })

  export const person = faker.person.fullName
  export const uuid = faker.string.uuid
}

export namespace StoryDecorators {
  export namespace Padding {
    export const bottom = (padding?:string) => (story:() => React.ReactNode) => (
      <div style={{paddingBottom:padding || '200px'}}>{story()}</div>
    )
  }
}