import {
  LocalDate as JLocalDate,
  convert,
  DateTimeFormatter,
  Instant as JInstant,
  ZonedDateTime as JZonedDateTime,
  LocalDateTime,
  nativeJs
} from "@js-joda/core"
import { Locale as JLocale } from '@js-joda/locale_en-us'


export namespace DateUtils {
  export const Locale = JLocale
  export namespace LocalDate {
    export const now = () => JLocalDate.now()
    export const parse = (v:string)  => JLocalDate.parse(v)
    export const toDate = (v:JLocalDate) => convert(v).toDate()
    export const fromDate = (x:Date) => nativeJs(x).toLocalDate()

    export enum EFormat {
      Date='M/d/Y',
      DayDate='EE, M/d/Y'
    }

    export const format = (
      x:JLocalDate,
      f:EFormat|string,
      l?:JLocale
    ) =>
      x.format(
        DateTimeFormatter
          .ofPattern(f)
          .withLocale(l || Locale.US)
      )
  }
  export namespace Instant {
    export const now = () => JInstant.now()
    export const parse =  (v:string) => JInstant.parse(v)
    export const toLocalDate = (v:JInstant) => JLocalDate.ofInstant(v)
    export const fromDate = (v:Date) => nativeJs(v).toInstant()

    export enum EFormat {
      Date='M/d/Y',
      DateTime='M/d/Y hh:mma',
      DayDateTime='EE, M/d/Y hh:mma'
    }

    export const format = (
      x:JInstant,
      f:EFormat|string,
      l?:JLocale
    ) =>
      LocalDateTime
        .ofInstant(x)
        .format(
          DateTimeFormatter
            .ofPattern(f)
            .withLocale(l || Locale.US)
          )
  }
  export namespace ZonedDateTime {
    export const now = () => JZonedDateTime.now()
    export const parse = (v:string) => JZonedDateTime.parse(v)
    export const toLocalDate = (v:JZonedDateTime) => v.toLocalDate()

    export enum EFormat {
      Date='M/d/Y',
      DateZone='M/d/Y z',
      DateTime='M/d/Y hh:mma',
      DateTimeZone='M/d/Y hh:mma z',
      DayDateTime='EE, M/d/Y hh:mma',
      DayDateTimeZone='EE, M/d/Y hh:mma z'
    }

    export const format = (
      x:JZonedDateTime,
      f:EFormat|string,
      l?:JLocale
    ) =>
      x.format(
        DateTimeFormatter
          .ofPattern(f)
          .withLocale(l || Locale.US)
      )
  }
}