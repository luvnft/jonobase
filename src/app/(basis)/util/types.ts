export interface TextProps {
  text: string,
}

export interface ChildrenProps {
  children: JSX.Element[] | JSX.Element, 
}

export interface ItemProps {
  lang: { [x: string]: string}, 
  item: any,
  view?: any, 
}

export interface ParamsProps {
  finds: string,
  kinds: string,
  lists: string,
  takes: string
}

export interface PageProps {
  params: ParamsProps, 
  searchParams: {
    p: number,
    l: number
  },
}